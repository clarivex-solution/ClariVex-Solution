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
    title: "Outsourced Accounting Services Australia | ClariVex Solutions",
    description:
      "MYOB and Xero bookkeeping, BAS lodgement, and payroll for Australian businesses.",
    keywords:
      "outsourced accounting Australia, MYOB bookkeeper, BAS lodgement, Xero Australia",
    alternates: {
      canonical: `${siteUrl}/au`,
      languages: languageAlternates,
    },
  };
}

export default function AUPage() {
  return (
    <CountryLandingPage
      countryName="Australia"
      flag="\uD83C\uDDE6\uD83C\uDDFA"
      heroH1="Financial Clarity for Australian Businesses"
      heroSub="MYOB and Xero bookkeeping, BAS lodgement, and payroll for Australian businesses."
      heroBadge="\uD83C\uDDE6\uD83C\uDDFA Finance and compliance operations for Australian businesses"
      tools={["MYOB", "Xero", "Spotlight Reporting", "Expensify"]}
      taxNote="ATO compliance, BAS lodgement, GST and payroll tax support"
    />
  );
}
