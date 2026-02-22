"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";

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
  },
  {
    slug: "understanding-mtd-uk-businesses-2025",
    title: "Understanding MTD: What UK Businesses Need to Know in 2025",
    country: "UK",
    countryLabel: "UK\uD83C\uDDEC\uD83C\uDDE7",
    category: "Tax & Compliance",
  },
  {
    slug: "bas-lodgement-checklist-australia",
    title: "BAS Lodgement Checklist for Australian Businesses",
    country: "AU",
    countryLabel: "AU\uD83C\uDDE6\uD83C\uDDFA",
    category: "Tax & Compliance",
  },
  {
    slug: "gst-hst-filing-guide-canada-small-business",
    title: "GST/HST Filing Guide for Canadian Small Businesses",
    country: "CA",
    countryLabel: "CA\uD83C\uDDE8\uD83C\uDDE6",
    category: "Tax & Compliance",
  },
  {
    slug: "streamline-payroll-growing-teams",
    title: "How to Streamline Payroll for Growing Teams",
    country: "All",
    countryLabel: "All",
    category: "Payroll",
  },
  {
    slug: "month-end-close-step-by-step-checklist",
    title: "Month-End Close: A Step-by-Step Checklist",
    country: "All",
    countryLabel: "All",
    category: "Bookkeeping",
  },
];

const categoryBadgeClass = {
  Bookkeeping: "bg-blue-50 text-blue-700 border-blue-200",
  "Tax & Compliance": "bg-amber-50 text-amber-700 border-amber-200",
  Payroll: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Advisory: "bg-purple-50 text-purple-700 border-purple-200",
};

function buttonClass(isActive) {
  return `rounded-full border px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
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
    <main className="bg-slate-50 text-[#1E293B]">
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">Accounting &amp; Finance Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75">
            Practical guidance for bookkeeping, tax, payroll, and finance operations
            across global markets.
          </p>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Filter className="h-4 w-4" />
              Filter by Category
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={buttonClass(activeCategory === category)}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span>Country</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {countryOptions.map((country) => (
                <button
                  key={country.key}
                  type="button"
                  className={buttonClass(activeCountry === country.key)}
                  onClick={() => setActiveCountry(country.key)}
                >
                  {country.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      categoryBadgeClass[post.category]
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{post.countryLabel}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[#0A1628]">{post.title}</h2>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Read More &rarr;
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
