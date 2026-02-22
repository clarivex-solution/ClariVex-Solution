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
      countryName="United Kingdom"
      flag="\uD83C\uDDEC\uD83C\uDDE7"
      countryLabel="UK OUTSOURCED ACCOUNTING & FINANCE"
      h1Line1="Financial Clarity"
      h1Line2="for UK Businesses"
      subtitle="Xero-certified bookkeeping, VAT compliance, and payroll for British businesses of all sizes."
      tools={["Xero", "Sage", "Fathom", "Expensify"]}
      complianceNote="HMRC-aligned compliance support with VAT returns, Making Tax Digital obligations, payroll processing, and reporting controls."
    />
  );
}
