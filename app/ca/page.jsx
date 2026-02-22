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
    title: "Outsourced Accounting Services Canada | ClariVex Solutions",
    description:
      "QuickBooks and Xero bookkeeping, GST/HST, and payroll for Canadian businesses.",
    keywords:
      "outsourced accounting Canada, bookkeeping Toronto, QuickBooks Canada, GST HST filing",
    alternates: {
      canonical: `${siteUrl}/ca`,
      languages: languageAlternates,
    },
  };
}

export default function CAPage() {
  return (
    <CountryLandingPage
      countryName="Canada"
      flag="\uD83C\uDDE8\uD83C\uDDE6"
      countryLabel="CA OUTSOURCED ACCOUNTING & FINANCE"
      h1Line1="Financial Clarity"
      h1Line2="for Canadian Businesses"
      subtitle="QuickBooks and Xero bookkeeping, GST/HST compliance, and payroll support for Canadian businesses."
      tools={["QuickBooks Online", "Xero", "Fathom", "ADP"]}
      complianceNote="CRA compliance support covering GST/HST returns, payroll reporting, and monthly accounting discipline for Canadian entities."
    />
  );
}
