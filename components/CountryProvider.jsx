"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CountryContext = createContext({ country: "general", setCountry: () => {} });

const VALID_COUNTRIES = ["us", "uk", "au", "ca"];

const GEO_MAP = {
  US: "us",
  GB: "uk",
  IE: "uk",
  CA: "ca",
  AU: "au",
  NZ: "au",
};

function readCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? match.split("=")[1] : null;
}

function writeCookie(name, value) {
  document.cookie = `${name}=${value};max-age=86400;path=/`;
}

export function CountryProvider({ children }) {
  const [country, setCountryState] = useState("general");
  const [ready, setReady] = useState(false);

  function setCountry(code) {
    const resolved = VALID_COUNTRIES.includes(code) ? code : "general";
    setCountryState(resolved);
    writeCookie("preferred-country", resolved);
  }

  useEffect(() => {
    const existing = readCookie("preferred-country");

    if (existing && (VALID_COUNTRIES.includes(existing) || existing === "general")) {
      setCountryState(existing);
      setReady(true);
      return;
    }

    // No cookie — detect via IP geolocation
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detected = GEO_MAP[data.country_code] || "general";
        setCountryState(detected);
        writeCookie("preferred-country", detected);
      })
      .catch(() => {
        setCountryState("general");
        writeCookie("preferred-country", "general");
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
