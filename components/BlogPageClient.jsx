"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const categoryOptions = [
  "All",
  "Bookkeeping",
  "Tax & Compliance",
  "Payroll",
  "Advisory",
];

const countryOptions = [
  { key: "US", label: "US\uD83C\uDDFA\uD83C\uDDF8" },
  { key: "UK", label: "UK\uD83C\uDDEC\uD83C\uDDE7" },
  { key: "AU", label: "AU\uD83C\uDDE6\uD83C\uDDFA" },
  { key: "CA", label: "CA\uD83C\uDDE8\uD83C\uDDE6" },
];

const posts = [
  {
    slug: "quickbooks-tips-us-small-business",
    title: "5 QuickBooks Tips Every US Small Business Should Know",
    country: "US",
    countryLabel: "US\uD83C\uDDFA\uD83C\uDDF8",
    category: "Bookkeeping",
    excerpt:
      "Practical ways to tighten coding standards, automate reconciliations, and speed up month-end close for US operators.",
  },
  {
    slug: "understanding-mtd-uk-businesses-2025",
    title: "Understanding MTD: What UK Businesses Need to Know in 2025",
    country: "UK",
    countryLabel: "UK\uD83C\uDDEC\uD83C\uDDE7",
    category: "Tax & Compliance",
    excerpt:
      "A focused breakdown of MTD obligations, filing readiness, and record-keeping standards for UK businesses.",
  },
  {
    slug: "bas-lodgement-checklist-australia",
    title: "BAS Lodgement Checklist for Australian Businesses",
    country: "AU",
    countryLabel: "AU\uD83C\uDDE6\uD83C\uDDFA",
    category: "Tax & Compliance",
    excerpt:
      "A compliance-first BAS checklist to reduce lodgement errors and maintain strong GST reporting discipline.",
  },
  {
    slug: "gst-hst-filing-guide-canada-small-business",
    title: "GST/HST Filing Guide for Canadian Small Businesses",
    country: "CA",
    countryLabel: "CA\uD83C\uDDE8\uD83C\uDDE6",
    category: "Tax & Compliance",
    excerpt:
      "Key GST/HST filing workflows for Canadian SMBs, including documentation, timing, and control checks.",
  },
  {
    slug: "streamline-payroll-growing-teams",
    title: "How to Streamline Payroll for Growing Teams",
    country: "All",
    countryLabel: "All",
    category: "Payroll",
    excerpt:
      "How growing teams can structure approvals, calendars, and reporting to reduce payroll risk and rework.",
  },
  {
    slug: "month-end-close-step-by-step-checklist",
    title: "Month-End Close: A Step-by-Step Checklist",
    country: "All",
    countryLabel: "All",
    category: "Bookkeeping",
    excerpt:
      "A dependable close framework covering reconciliations, review checkpoints, and management reporting handoff.",
  },
];

function filterPillClass(isActive) {
  return `rounded-full border px-5 py-2 text-xs transition-colors ${
    isActive
      ? "bg-[#5a688e] text-white border-[#5a688e]"
      : "bg-white border-[#e2e4e9] text-[#5a6478] hover:border-[#5a688e]/40 hover:text-[#1a1a2e]"
  }`;
}

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCountry, setActiveCountry] = useState("US");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch =
        activeCategory === "All" ? true : post.category === activeCategory;
      const countryMatch =
        post.country === "All" ? true : post.country === activeCountry;

      return categoryMatch && countryMatch;
    });
  }, [activeCategory, activeCountry]);

  return (
    <main className="bg-white text-[#1a1a2e]">
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-32">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-[#5a688e]/6 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-12">
          <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            Insights Library
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#1a1a2e] sm:text-4xl lg:text-6xl">
            Accounting &amp; Finance Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#5a6478]">
            Practical guidance for bookkeeping, tax, payroll, and finance operations
            across global markets.
          </p>
        </div>
      </section>

      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            Filter Posts
          </p>

          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">
              Category
            </p>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={filterPillClass(activeCategory === category)}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">
              Country
            </p>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {countryOptions.map((country) => (
                <button
                  key={country.key}
                  type="button"
                  className={filterPillClass(activeCountry === country.key)}
                  onClick={() => setActiveCountry(country.key)}
                >
                  {country.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">
            Editorial Focus
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#1a1a2e] sm:text-4xl">
            Structured Insights for Finance Leaders
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Filter by category and country to access practical finance guidance tailored
            to your market and reporting priorities.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            Latest Articles
          </p>

          {filteredPosts.length === 0 ? (
            <div className="mt-8 rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 text-[#5a6478]">
              No posts found for the selected filters.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 transition-all hover:border-[#5a688e]/40 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#5a6478]">{post.countryLabel}</span>
                  </div>

                  <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a2e]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5a6478]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex text-sm text-[#6aa595] transition-colors hover:text-[#1a1a2e]"
                  >
                    Read More &rarr;
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
