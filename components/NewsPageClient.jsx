"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Newspaper } from "lucide-react";

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
  return `rounded-full border px-4 py-2 text-sm font-semibold transition ${
    active === key
      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
  }`;
}

export default function NewsPageClient() {
  const [activeTab, setActiveTab] = useState("US");

  const activeNews = useMemo(() => newsByCountry[activeTab] || [], [activeTab]);

  return (
    <main className="bg-white text-[#1E293B]">
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">Finance &amp; Tax News</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75">
            Daily accounting regulations and tax updates by country.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-slate-200 bg-white/95 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 sm:px-6 lg:px-8">
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
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {activeNews.map((item) => (
              <article
                key={item.slug}
                className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                    {item.source}
                  </span>
                  <span className="text-slate-500">{item.date}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[#0A1628]">{item.headline}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  <Newspaper className="h-4 w-4" />
                  Read Full Story &rarr;
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-slate-50 p-8 text-center">
            <h3 className="text-2xl font-bold text-[#0A1628]">Get Daily Finance Updates</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
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
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Mail className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
