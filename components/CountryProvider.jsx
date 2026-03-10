"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const VALID = ["us", "uk", "au", "ca", "general"];

const LS_COUNTRY = "preferred-country";
const LS_TIMESTAMP = "preferred-country-timestamp";
const SS_DETECTED = "detected-country";
const SS_SESSION = "session-country";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function resolve(code) {
  return VALID.includes(code) ? code : "general";
}


/** Check if this page load is a direct/manual URL entry (not in-app navigation) */
function isDirectNavigation() {
  if (typeof document === "undefined") return true;
  const ref = document.referrer;
  if (!ref) return true; // no referrer = typed URL, bookmark, or new tab
  try {
    const refOrigin = new URL(ref).origin;
    return refOrigin !== window.location.origin; // from different site
  } catch {
    return true;
  }
}

/** Fetch country via internal geo API. Silently returns "general" on any failure. */
async function fetchIPCountry() {
  try {
    const res = await fetch('/api/geo', { cache: 'no-store' })
    if (!res.ok) return 'general'
    const { country } = await res.json()
    return country || 'general'
  } catch {
    return 'general'
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

const CountryContext = createContext({
  country: "general",
  ready: false,
  detecting: false,
  setCountry: () => {},
  detectLocation: () => {},
});

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */

export function CountryProvider({ children }) {
  const [country, setCountryState] = useState(null);
  const [ready, setReady] = useState(false);
  const [detecting, setDetecting] = useState(false);

  /* ----------------------------------------------------------------
   *  Priority 1 — URL route detection (useLayoutEffect)
   *  Runs synchronously after DOM mount, before browser paint.
   *  Eliminates skeleton flash on country routes without hydration errors.
   * ---------------------------------------------------------------- */
  useLayoutEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/us")) { setCountryState("us"); setReady(true); }
    else if (path.startsWith("/uk")) { setCountryState("uk"); setReady(true); }
    else if (path.startsWith("/ca")) { setCountryState("ca"); setReady(true); }
    else if (path.startsWith("/au")) { setCountryState("au"); setReady(true); }
  }, []);

  /* ----------------------------------------------------------------
   *  Manual selection — called from Navbar / Footer
   *  Only handles storage + context. NO navigation (Fix 3).
   * ---------------------------------------------------------------- */
  const setCountry = useCallback((code) => {
    const resolved = resolve(code);
    setCountryState(resolved);

    /* Persist to localStorage + sessionStorage */
    try {
      localStorage.setItem(LS_COUNTRY, resolved);
      localStorage.setItem(LS_TIMESTAMP, Date.now().toString());
    } catch { /* private browsing */ }
    try {
      sessionStorage.setItem(SS_DETECTED, resolved);
      sessionStorage.setItem(SS_SESSION, resolved);
    } catch {}
  }, []);

  /* ----------------------------------------------------------------
   *  Detect My Location — clears storage, re-runs IP detection
   * ---------------------------------------------------------------- */
  const detectLocation = useCallback(async () => {
    setDetecting(true);

    try { localStorage.removeItem(LS_COUNTRY); } catch {}
    try { localStorage.removeItem(LS_TIMESTAMP); } catch {}
    try { sessionStorage.removeItem(SS_DETECTED); } catch {}

    const detected = await fetchIPCountry();

    setCountryState(detected);
    try { sessionStorage.setItem(SS_DETECTED, detected); } catch {}

    setDetecting(false);
  }, []);

  /* ----------------------------------------------------------------
   *  Initial detection — runs once on mount
   *  Skipped entirely if URL route already resolved synchronously.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    /* If URL route was detected synchronously, we're already done */
    if (ready) return;

    let cancelled = false;

    async function detect() {
      /*
       * Determine if we're on the general route (/).
       * On /, localStorage preference is skipped — IP detection
       * is the source of truth for the homepage every new session.
       */
      const isGeneralRoute =
        window.location.pathname === "/" || window.location.pathname === "";

      /* Priority 2 — localStorage manual preference (< 30 days)
       * SKIPPED on / route — only applies to non-homepage routes */
      if (!isGeneralRoute) {
        try {
          const stored = localStorage.getItem(LS_COUNTRY);
          const ts = localStorage.getItem(LS_TIMESTAMP);
          if (stored && VALID.includes(stored) && ts) {
            const age = Date.now() - Number(ts);
            if (age < THIRTY_DAYS_MS) {
              if (!cancelled) { setCountryState(stored); setReady(true); }
              return;
            }
            /* Expired — clean up */
            localStorage.removeItem(LS_COUNTRY);
            localStorage.removeItem(LS_TIMESTAMP);
          }
        } catch {}
      }

      /* Priority 3 — sessionStorage cached IP detection */
      try {
        const cached = sessionStorage.getItem(SS_DETECTED);
        if (cached && VALID.includes(cached)) {
          if (!cancelled) { setCountryState(cached); setReady(true); }
          return;
        }
      } catch {}

      /*
       * Priority 3b — session-country continuity
       * Only applies during in-app navigation (clicking links).
       * If this is a direct URL entry (typed URL, bookmark, new tab)
       * skip session-country and proceed to IP detection.
       */
      if (!isDirectNavigation()) {
        try {
          const session = sessionStorage.getItem(SS_SESSION);
          if (session && VALID.includes(session)) {
            if (!cancelled) { setCountryState(session); setReady(true); }
            return;
          }
        } catch {}
      }

      /* Priority 4 — Fresh IP detection */
      const detected = await fetchIPCountry();
      if (!cancelled) {
        setCountryState(detected);
        try { sessionStorage.setItem(SS_DETECTED, detected); } catch {}
        setReady(true);
      }

      /* Priority 5 — general fallback is implicit: fetchIPCountry always returns a valid value */
    }

    detect();

    return () => { cancelled = true; };
  }, [ready]);

  /* ----------------------------------------------------------------
   *  Cross-tab sync — storage event listener (Fix 5)
   *  Runs once on mount. Only on window. Context update only, NO navigation.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    function onStorage(e) {
      if (e.key === LS_COUNTRY && e.newValue) {
        const synced = resolve(e.newValue);
        setCountryState(synced);
        /* NO router.push — context update only */
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ----------------------------------------------------------------
   *  Render
   * ---------------------------------------------------------------- */
  return (
    <CountryContext.Provider
      value={{ country: country || "general", setCountry, ready, detecting, detectLocation }}
    >
      {children}
    </CountryContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */

export function useCountry() {
  return useContext(CountryContext);
}
