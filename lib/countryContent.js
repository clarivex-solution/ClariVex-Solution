/**
 * Country-specific content for all 5 versions.
 * Structural data (processSteps, serviceCards, whyChooseUsCards) stays in siteData.js
 * since it's the same across all countries. Only copy/numbers/tools change here.
 */

import { siteUrl } from "@/lib/constants";

const countryContent = {
  us: {
    seo: {
      title: "Outsourced Accounting for US | ClariVex",
      description: "Expert outsourced bookkeeping, QuickBooks accounting, payroll & IRS tax compliance for US startups and SMEs. 120+ American clients.",
      ogDescription: "QuickBooks-certified accounting, payroll & tax compliance for American businesses from ClariVex Solutions.",
      keywords: "outsourced accounting USA, bookkeeping America, QuickBooks accountant, US payroll, IRS compliance",
      h1: "Outsourced Accounting & Finance for US Businesses",
    },
    hero: {
      countryLabel: "US OUTSOURCED ACCOUNTING & FINANCE",
      h1Line1: "Financial Clarity",
      h1Line2: "for US Businesses",
      subtitle:
        "QuickBooks-certified accounting, payroll, and tax compliance for American startups and SMEs.",
      flagSrc: "/flags/us.svg",
    },
    compliance: {
      note: "IRS compliance coverage including federal and state tax filing support, payroll controls, and month-end reporting discipline.",
      tools: ["QuickBooks Online", "Gusto", "ADP", "Expensify"],
    },
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "120+", label: "US Clients" },
      { value: "22", label: "Industries Served" },
      { value: "100%", label: "On-Time Close" },
    ],
    trustedSoftware: ["QuickBooks", "Gusto", "ADP", "Expensify", "NetSuite", "Fathom"],
    softwareColumns: [
      { title: "Accounting & ERP", tools: ["QuickBooks Online", "QuickBooks Desktop", "NetSuite"] },
      { title: "Payroll & Expense", tools: ["Gusto", "ADP", "Expensify"] },
      { title: "Reporting & MIS", tools: ["Fathom", "Spotlight Reporting"] },
    ],
    contactEmail: "us@clarivexsolutions.com",
    ctaLabel: "Talk to a US Expert",
    schema: {
      telephone: "+919898028812",
      email: "us@clarivexsolutions.com",
      areaServed: "US",
    },
  },

  uk: {
    seo: {
      title: "Outsourced Accounting for UK | ClariVex",
      description: "Xero-certified bookkeeping, VAT returns, MTD compliance & payroll for UK businesses. HMRC-aligned support for London & all UK regions.",
      ogDescription: "Xero-certified bookkeeping, VAT compliance & payroll for British businesses from ClariVex Solutions.",
      keywords: "outsourced accounting UK, Xero bookkeeping, VAT returns, MTD compliance, HMRC",
      h1: "Outsourced Accounting & Finance for UK Businesses",
    },
    hero: {
      countryLabel: "UK OUTSOURCED ACCOUNTING & FINANCE",
      h1Line1: "Financial Clarity",
      h1Line2: "for UK Businesses",
      subtitle:
        "Xero-certified bookkeeping, VAT compliance, and payroll for British businesses of all sizes.",
      flagSrc: "/flags/uk.svg",
    },
    compliance: {
      note: "HMRC-aligned compliance support with VAT returns, Making Tax Digital obligations, payroll processing, and reporting controls.",
      tools: ["Xero", "Sage", "FreeAgent", "Fathom"],
    },
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "80+", label: "UK Clients" },
      { value: "18", label: "Industries Served" },
      { value: "100%", label: "On-Time Filing" },
    ],
    trustedSoftware: ["Xero", "Sage", "FreeAgent", "Fathom", "Expensify", "Spotlight"],
    softwareColumns: [
      { title: "Accounting & ERP", tools: ["Xero", "Sage", "FreeAgent"] },
      { title: "Payroll & Expense", tools: ["Xero Payroll", "Expensify"] },
      { title: "Reporting & MIS", tools: ["Fathom", "Spotlight Reporting"] },
    ],
    contactEmail: "uk@clarivexsolutions.com",
    ctaLabel: "Talk to a UK Expert",
    schema: {
      telephone: "+919898028812",
      email: "uk@clarivexsolutions.com",
      areaServed: "GB",
    },
  },

  au: {
    seo: {
      title: "Outsourced Accounting for Australia | ClariVex",
      description: "MYOB & Xero bookkeeping, BAS lodgement, GST compliance & payroll for Australian businesses. ATO-aligned support, 50+ AU clients.",
      ogDescription: "MYOB & Xero bookkeeping, BAS lodgement & payroll for Australian businesses from ClariVex Solutions.",
      keywords: "outsourced accounting Australia, MYOB bookkeeper, BAS lodgement, Xero Australia, GST",
      h1: "Outsourced Accounting & Finance for Australian Businesses",
    },
    hero: {
      countryLabel: "AU OUTSOURCED ACCOUNTING & FINANCE",
      h1Line1: "Financial Clarity",
      h1Line2: "for Australian Businesses",
      subtitle:
        "MYOB and Xero bookkeeping, BAS lodgement, and payroll support for Australian businesses.",
      flagSrc: "/flags/au.svg",
    },
    compliance: {
      note: "ATO compliance coverage with BAS lodgement, GST obligations, payroll tax support, and close-cycle finance controls.",
      tools: ["MYOB", "Xero", "Spotlight Reporting", "Expensify"],
    },
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "50+", label: "AU Clients" },
      { value: "16", label: "Industries Served" },
      { value: "100%", label: "BAS On-Time" },
    ],
    trustedSoftware: ["MYOB", "Xero", "Spotlight", "Expensify", "ADP", "Fathom"],
    softwareColumns: [
      { title: "Accounting & ERP", tools: ["MYOB", "Xero", "NetSuite"] },
      { title: "Payroll & Expense", tools: ["MYOB Payroll", "ADP", "Expensify"] },
      { title: "Reporting & MIS", tools: ["Spotlight Reporting", "Fathom"] },
    ],
    contactEmail: "au@clarivexsolutions.com",
    ctaLabel: "Talk to an AU Expert",
    schema: {
      telephone: "+919898028812",
      email: "au@clarivexsolutions.com",
      areaServed: "AU",
    },
  },

  ca: {
    seo: {
      title: "Outsourced Accounting for Canada | ClariVex",
      description: "QuickBooks & Xero bookkeeping, GST/HST filing, CRA compliance & payroll for Canadian businesses. Serving all provinces remotely.",
      ogDescription: "QuickBooks & Xero bookkeeping, GST/HST compliance & payroll for Canadian businesses from ClariVex Solutions.",
      keywords: "outsourced accounting Canada, QuickBooks Canada, GST HST filing, CRA compliance",
      h1: "Outsourced Accounting & Finance for Canadian Businesses",
    },
    hero: {
      countryLabel: "CA OUTSOURCED ACCOUNTING & FINANCE",
      h1Line1: "Financial Clarity",
      h1Line2: "for Canadian Businesses",
      subtitle:
        "QuickBooks and Xero bookkeeping, GST/HST compliance, and payroll support for Canadian businesses.",
      flagSrc: "/flags/ca.svg",
    },
    compliance: {
      note: "CRA compliance support covering GST/HST returns, payroll reporting, and monthly accounting discipline for Canadian entities.",
      tools: ["QuickBooks Online", "Xero", "Fathom", "ADP"],
    },
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "45+", label: "CA Clients" },
      { value: "15", label: "Industries Served" },
      { value: "100%", label: "Filing Accuracy" },
    ],
    trustedSoftware: ["QuickBooks", "Xero", "Fathom", "ADP", "Expensify", "Sage"],
    softwareColumns: [
      { title: "Accounting & ERP", tools: ["QuickBooks Online", "Xero", "Sage"] },
      { title: "Payroll & Expense", tools: ["ADP", "Expensify"] },
      { title: "Reporting & MIS", tools: ["Fathom", "Spotlight Reporting"] },
    ],
    contactEmail: "ca@clarivexsolutions.com",
    ctaLabel: "Talk to a CA Expert",
    schema: {
      telephone: "+919898028812",
      email: "ca@clarivexsolutions.com",
      areaServed: "CA",
    },
  },

  general: {
    seo: {
      title: "ClariVex Solutions \u2014 Outsourced Accounting",
      description: "Elite outsourced accounting, bookkeeping, payroll & tax compliance for US, UK, AU & CA businesses. 15+ years, 280+ clients worldwide.",
      ogDescription: "Your outsourced accounting partner \u2014 expert bookkeeping, payroll & tax compliance across US, UK, AU & Canada.",
      keywords: "outsourced accounting, bookkeeping services, payroll outsourcing, tax compliance, finance operations",
      h1: "Outsourced Accounting & Finance Operations",
    },
    hero: {
      countryLabel: "OUTSOURCED ACCOUNTING & FINANCE",
      h1Line1: null,
      h1Line2: null,
      subtitle:
        "Your outsourced accounting and finance operations partner \u2014 combining expert support and smart technology to help US, UK, AU & CA businesses scale with confidence.",
      flagSrc: null,
    },
    compliance: null,
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "280+", label: "Active Clients" },
      { value: "22", label: "Industries Served" },
      { value: "100%", label: "On-Time Close" },
    ],
    trustedSoftware: ["QuickBooks", "Xero", "NetSuite", "Sage", "MYOB", "Gusto", "ADP", "Expensify", "Fathom", "Spotlight"],
    softwareColumns: [
      { title: "Accounting & ERP", tools: ["QuickBooks", "Xero", "NetSuite", "Sage", "MYOB"] },
      { title: "Payroll & Expense", tools: ["Gusto", "ADP", "Expensify"] },
      { title: "Reporting & MIS", tools: ["Fathom", "Spotlight Reporting"] },
    ],
    contactEmail: "info@clarivex.net",
    ctaLabel: "Talk to Experts",
    schema: {
      telephone: "+919898028812",
      email: "info@clarivex.net",
      areaServed: ["US", "GB", "AU", "CA"],
    },
  },
};

export function getContent(countryCode) {
  return countryContent[countryCode] || countryContent.general;
}

/**
 * Generate full Next.js metadata object for a country route.
 */
export function generateCountryMetadata(countryCode) {
  const content = getContent(countryCode);
  const { seo } = content;
  const path = countryCode === "general" ? "" : `/${countryCode}`;
  const canonical = `${siteUrl}${path}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical,
      languages: {
        "en-US": `${siteUrl}/us`,
        "en-GB": `${siteUrl}/uk`,
        "en-AU": `${siteUrl}/au`,
        "en-CA": `${siteUrl}/ca`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.ogDescription,
      url: canonical,
      siteName: "ClariVex Solutions",
      locale: countryCode === "general" ? "en" : `en_${countryCode.toUpperCase()}`,
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "ClariVex Solutions — Outsourced Accounting & Finance",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.ogDescription,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default countryContent;
