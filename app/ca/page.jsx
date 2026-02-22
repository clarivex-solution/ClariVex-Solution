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
      heroH1="Financial Clarity for Canadian Businesses"
      heroSub="QuickBooks and Xero bookkeeping, GST/HST compliance, and payroll for Canadian businesses."
      heroBadge="\uD83C\uDDE8\uD83C\uDDE6 Remote accounting support across Canada"
      tools={["QuickBooks Online", "Xero", "Fathom", "ADP"]}
      taxNote="CRA compliance, GST/HST returns, T4 payroll support"
    />
  );
}
