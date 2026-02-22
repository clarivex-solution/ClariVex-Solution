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
    title: "Outsourced Accounting Services USA | ClariVex Solutions",
    description:
      "Expert bookkeeping, payroll, and tax support for US businesses. QuickBooks specialists serving startups and SMEs across America.",
    keywords:
      "outsourced accounting USA, bookkeeping America, QuickBooks accountant, US CPA support",
    alternates: {
      canonical: `${siteUrl}/us`,
      languages: languageAlternates,
    },
  };
}

export default function USPage() {
  return (
    <CountryLandingPage
      countryName="United States"
      flag="\uD83C\uDDFA\uD83C\uDDF8"
      countryLabel="US OUTSOURCED ACCOUNTING & FINANCE"
      h1Line1="Financial Clarity"
      h1Line2="for US Businesses"
      subtitle="QuickBooks-certified accounting, payroll, and tax compliance for American startups and SMEs."
      tools={["QuickBooks Online", "Gusto", "ADP", "Expensify"]}
      complianceNote="IRS compliance coverage including federal and state tax filing support, payroll controls, and month-end reporting discipline."
    />
  );
}
