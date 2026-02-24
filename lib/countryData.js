export const countries = [
  {
    code: "us",
    flagSrc: "/flags/us.svg",
    name: "United States",
    label: "US",
  },
  {
    code: "uk",
    flagSrc: "/flags/uk.svg",
    name: "United Kingdom",
    label: "UK",
  },
  {
    code: "au",
    flagSrc: "/flags/au.svg",
    name: "Australia",
    label: "AU",
  },
  {
    code: "ca",
    flagSrc: "/flags/ca.svg",
    name: "Canada",
    label: "CA",
  },
];

export const generalCountry = {
  code: "general",
  flagSrc: null,
  name: "Global",
  label: "General",
};

/** Country codes that have dedicated routes (e.g. /us, /uk) */
export const COUNTRY_ROUTES = countries.map((c) => c.code);

/** Find a country object by code (falls back to generalCountry) */
export function getCountryByCode(code) {
  return countries.find((c) => c.code === code) || generalCountry;
}
