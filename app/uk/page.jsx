import CountryLandingPage from "@/components/CountryLandingPage";

const siteUrl = "https://clarivex.net";

const languageAlternates = {
  "en-US": `${siteUrl}/us`,
  "en-GB": `${siteUrl}/uk`,
  "en-AU": `${siteUrl}/au`,
  "en-CA": `${siteUrl}/ca`,
};

export function generateMetadata() {
  return {
    title: "Outsourced Accounting Services UK | ClariVex Solutions",
    description:
      "Xero-certified bookkeeping, VAT returns, and payroll for UK businesses. Serving all UK regions remotely.",
    keywords:
      "outsourced accounting UK, bookkeeping London, Xero accountant UK, VAT returns, MTD",
    alternates: {
      canonical: `${siteUrl}/uk`,
      languages: languageAlternates,
    },
  };
}

export default function UKPage() {
  return (
    <CountryLandingPage
      countryName="UK"
      flag="\uD83C\uDDEC\uD83C\uDDE7"
      heroH1="Financial Clarity for UK Businesses"
      heroSub="Xero-certified bookkeeping, VAT compliance, and payroll for British businesses of all sizes."
      heroBadge="\uD83C\uDDEC\uD83C\uDDE7 Supporting companies across the United Kingdom"
      tools={["Xero", "Sage", "Fathom", "Expensify"]}
      taxNote="HMRC compliance, VAT returns, Making Tax Digital (MTD) support"
    />
  );
}
