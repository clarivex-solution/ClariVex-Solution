"use client";

import { useCountry } from "@/components/CountryProvider";
import { useEffect } from "react";

/**
 * Client component that forces a country code into context on mount.
 * Used by /us, /uk, /au, /ca route pages.
 */
export default function SetCountryOnMount({ code, children }) {
  const { country, setCountry } = useCountry();

  useEffect(() => {
    if (country !== code) {
      setCountry(code);
    }
  }, [code, country, setCountry]);

  return <>{children}</>;
}
