"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CountryContext = createContext({ country: "general", setCountry: () => {} });

const VALID = ["us", "uk", "au", "ca", "general"];

const GEO_MAP = {
  US: "us",
  GB: "uk",
  IE: "uk",
  CA: "ca",
  AU: "au",
  NZ: "au",
};

const STORAGE_KEY = "preferred-country";

export function CountryProvider({ children }) {
  const [country, setCountryState] = useState("general");
  const [ready, setReady] = useState(false);

  function setCountry(code) {
    const resolved = VALID.includes(code) ? code : "general";
    setCountryState(resolved);
    try { localStorage.setItem(STORAGE_KEY, resolved); } catch {}
  }

  useEffect(() => {
    // 1. Check localStorage first
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID.includes(stored)) {
        setCountryState(stored);
        setReady(true);
        return;
      }
    } catch {}

    // 2. No stored value — detect via client-side IP geolocation
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detected = GEO_MAP[data.country_code] || "general";
        setCountryState(detected);
        try { localStorage.setItem(STORAGE_KEY, detected); } catch {}
      })
      .catch(() => {
        setCountryState("general");
      })
      .finally(() => setReady(true));
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry, ready }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
