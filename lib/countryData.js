export const countries = [
  {
    code: "us",
    flagSrc: "/flags/us.svg",
    name: "United States",
    label: "US",
    href: "/us",
    geo: ["US"],
  },
  {
    code: "uk",
    flagSrc: "/flags/uk.svg",
    name: "United Kingdom",
    label: "UK",
    href: "/uk",
    geo: ["GB", "IE"],
  },
  {
    code: "au",
    flagSrc: "/flags/au.svg",
    name: "Australia",
    label: "AU",
    href: "/au",
    geo: ["AU", "NZ"],
  },
  {
    code: "ca",
    flagSrc: "/flags/ca.svg",
    name: "Canada",
    label: "CA",
    href: "/ca",
    geo: ["CA"],
  },
];

export const generalCountry = {
  code: "general",
  flagSrc: null,
  name: "Global",
  label: "General",
  href: "/",
  geo: [],
};

export const geoToCountry = {
  US: "us",
  CA: "ca",
  GB: "uk",
  IE: "uk",
  AU: "au",
  NZ: "au",
};

/** Find a country object by code (falls back to generalCountry) */
export function getCountryByCode(code) {
  return countries.find((c) => c.code === code) || generalCountry;
}
