"use client";

import { useEffect } from "react";

/**
 * Client component used by /us, /uk, /au, /ca route pages.
 * Saves the route country to sessionStorage for continuity
 * when user navigates away (e.g. /uk → /).
 * Does NOT call setCountry — the provider reads URL directly.
 */
export default function SetCountryOnMount({ code, children }) {
  useEffect(() => {
    try {
      sessionStorage.setItem("session-country", code);
    } catch {}
  }, [code]);

  return <>{children}</>;
}
