"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const countryTabs = [
  { key: "US", label: "\uD83C\uDDFA\uD83C\uDDF8 US" },
  { key: "UK", label: "\uD83C\uDDEC\uD83C\uDDE7 UK" },
  { key: "AU", label: "\uD83C\uDDE6\uD83C\uDDFA AU" },
  { key: "CA", label: "\uD83C\uDDE8\uD83C\uDDE6 CA" },
];

const newsByCountry = {
  US: [
    {
      slug: "irs-updated-standard-mileage-rates-2025",
      source: "IRS",
      date: "March 11, 2026",
      headline: "IRS Announces Updated Standard Mileage Rates for 2025",
      summary:
        "The IRS released revised mileage rates for business, medical, and charitable travel, impacting reimbursement and deduction planning.",
    },
    {
      slug: "new-1099k-reporting-threshold-takes-effect",
      source: "IRS",
      date: "March 8, 2026",
      headline: "New 1099-K Reporting Threshold Takes Effect",
      summary:
        "Businesses and payment platforms are preparing for updated reporting requirements as 1099-K thresholds shift.",
    },
    {
      slug: "small-business-tax-credits-extended-new-act",
      source: "US Congress",
      date: "March 4, 2026",
      headline: "Small Business Tax Credits Extended Under New Act",
      summary:
        "A new legislative package extends selected credits, creating additional planning opportunities for eligible small businesses.",
    },
  ],
  UK: [
    {
      slug: "hmrc-updates-mtd-itsa-timeline",
      source: "HMRC",
      date: "March 10, 2026",
      headline: "HMRC Updates MTD for Income Tax Self Assessment Timeline",
      summary:
        "HMRC clarified implementation milestones for MTD ITSA and issued fresh guidance for affected sole traders and landlords.",
    },
    {
      slug: "national-insurance-changes-2025-26",
      source: "HMRC",
      date: "March 7, 2026",
      headline: "National Insurance Changes for 2025-26 Tax Year",
      summary:
        "Updated National Insurance rates and thresholds have been published for payroll planning in the upcoming tax year.",
    },
    {
      slug: "hmrc-launches-online-vat-account-features",
      source: "HMRC",
      date: "March 3, 2026",
      headline: "HMRC Launches New Online VAT Account Features",
      summary:
        "New VAT account capabilities provide improved visibility into submissions, liabilities, and payment status.",
    },
  ],
  AU: [
    {
      slug: "ato-guidance-contractor-vs-employee",
      source: "ATO",
      date: "March 9, 2026",
      headline: "ATO Releases Guidance on Contractor vs Employee Classification",
      summary:
        "The ATO published updated criteria to help businesses correctly assess worker classification and withholding obligations.",
    },
    {
      slug: "super-guarantee-rate-increase-11-5-confirmed",
      source: "ATO",
      date: "March 6, 2026",
      headline: "Super Guarantee Rate Increase to 11.5% Confirmed",
      summary:
        "Employers are preparing payroll systems for the confirmed Super Guarantee rate increase and related compliance checks.",
    },
    {
      slug: "new-ato-small-business-support-measures",
      source: "ATO",
      date: "March 2, 2026",
      headline: "New ATO Small Business Support Measures Announced",
      summary:
        "New support measures aim to simplify tax administration and improve payment flexibility for small business taxpayers.",
    },
  ],
  CA: [
    {
      slug: "cra-updates-t4-reporting-requirements-2025",
      source: "CRA",
      date: "March 10, 2026",
      headline: "CRA Updates T4 Reporting Requirements for 2025",
      summary:
        "The CRA introduced revised T4 filing expectations, including updates to employer reporting workflows and submission standards.",
    },
    {
      slug: "gst-hst-rate-changes-digital-services",
      source: "CRA",
      date: "March 7, 2026",
      headline: "GST/HST Rate Changes for Digital Services",
      summary:
        "Businesses providing digital services are reviewing GST/HST treatment under updated rate guidance and location rules.",
    },
    {
      slug: "new-cra-my-business-account-features",
      source: "CRA",
      date: "March 4, 2026",
      headline: "New CRA My Business Account Features Launched",
      summary:
        "Recent enhancements to CRA My Business Account expand self-service access and improve account activity visibility.",
    },
  ],
};

function tabClass(active, key) {
  return `rounded-full transition-colors ${
    active === key
      ? "bg-[#5a688e] text-white rounded-full px-5 py-2"
      : "text-[#8892a4] px-5 py-2 hover:text-white"
  }`;
}

export default function NewsPageClient() {
  const [activeTab, setActiveTab] = useState("US");

  const activeNews = useMemo(() => newsByCountry[activeTab] || [], [activeTab]);

  return (
    <main className="bg-[#0d0f14] text-white">
      <section className="relative overflow-hidden bg-[#0d0f14] py-16 sm:py-20 lg:py-32">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-[#5a688e]/10 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-12">
          <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            Market Intelligence
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-white sm:text-4xl lg:text-6xl">
            Finance &amp; Tax News
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#8892a4]">
            Daily accounting regulations and tax updates by country.
          </p>
        </div>
      </section>

      <section className="border-y border-[#1e2330] bg-[#13161e] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            Select Country
          </p>
          <div className="flex flex-wrap gap-2 overflow-x-auto rounded-full border border-[#1e2330] bg-[#13161e] p-1">
            {countryTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={tabClass(activeTab, tab.key)}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f0efe9] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">
            Regulatory Focus
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#0d0f14] sm:text-4xl">
            Country-Specific Compliance Signals
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Track policy shifts, filing updates, and practical actions for finance teams
            operating across the US, UK, AU, and CA.
          </p>
        </div>
      </section>

      <section className="bg-[#0d0f14] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            Latest News
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeNews.map((item) => (
              <article
                key={item.slug}
                className="rounded-xl border border-[#1e2330] bg-[#13161e] p-6 transition-all hover:border-[#5a688e]/40 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                    {item.source}
                  </span>
                  <span className="text-xs text-[#8892a4]">{item.date}</span>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                  {item.headline}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#8892a4]">{item.summary}</p>
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-6 inline-flex text-sm text-[#6aa595] transition-colors hover:text-white"
                >
                  Read More &rarr;
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-[#1e2330] bg-[#13161e] p-12 text-center">
            <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">Subscribe</p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-white">
              Get Daily Finance Updates
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#8892a4]">
              Subscribe for country-specific accounting and tax regulation news delivered
              to your inbox.
            </p>
            <div className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <label htmlFor="news-email" className="sr-only">
                Email
              </label>
              <input
                id="news-email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-[#1e2330] bg-[#0d0f14] px-6 py-3 text-white outline-none transition-colors focus:border-[#5a688e]"
              />
              <button
                type="button"
                className="rounded-full bg-[#5a688e] px-8 py-3 text-white transition-colors hover:bg-[#6aa595]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
