"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const VALID = ["us", "uk", "au", "ca", "general"];
const COUNTRY_ROUTES = ["us", "uk", "ca", "au"];

const GEO_MAP = { US: "us", GB: "uk", CA: "ca", AU: "au" };

const LS_COUNTRY = "preferred-country";
const LS_TIMESTAMP = "preferred-country-timestamp";
const SS_DETECTED = "detected-country";
const SS_SESSION = "session-country";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const IP_TIMEOUT_MS = 2000;

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function resolve(code) {
  return VALID.includes(code) ? code : "general";
}

/** Extract country code from a pathname like /uk or /us/services */
function countryFromPath(pathname) {
  const seg = (pathname || "").split("/")[1]?.toLowerCase();
  return COUNTRY_ROUTES.includes(seg) ? seg : null;
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

/** Fetch IP-based country with a strict timeout. Silently returns "general" on any failure. */
async function fetchIPCountry() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), IP_TIMEOUT_MS);

  try {
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });

    /* HTTP 429 — rate-limited */
    if (res.status === 429) return "general";

    /* Any other non-OK response */
    if (!res.ok) return "general";

    const data = await res.json();

    /* Malformed / unexpected payload */
    if (!data || typeof data.country_code !== "string") return "general";

    return GEO_MAP[data.country_code] || "general";
  } catch {
    /* Network error, abort, JSON parse failure — all silently fall back */
    return "general";
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Synchronous URL-path check for useState initializer.
 * Runs before first render — zero skeleton flash on country routes.
 */
function getInitialCountry() {
  if (typeof window === "undefined") return null;
  return countryFromPath(window.location.pathname);
}

function getInitialReady() {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return ["/us", "/uk", "/ca", "/au"].some((r) => path.startsWith(r));
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
  /* Fix 2 — URL route detection runs synchronously in useState initializer */
  const [country, setCountryState] = useState(() => getInitialCountry());
  const [ready, setReady] = useState(() => getInitialReady());
  const [detecting, setDetecting] = useState(false);

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
      /* Priority 2 — localStorage manual preference (< 30 days) */
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

      /* Priority 3 — sessionStorage cached IP detection */
      try {
        const cached = sessionStorage.getItem(SS_DETECTED);
        if (cached && VALID.includes(cached)) {
          if (!cancelled) { setCountryState(cached); setReady(true); }
          return;
        }
      } catch {}

      /*
       * Priority 3b — session-country continuity (Fix 1)
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
