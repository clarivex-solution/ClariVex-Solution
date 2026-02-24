"use client";

import { useCountry } from "@/components/CountryProvider";
import { blogPosts } from "@/lib/blogData";
import { countries } from "@/lib/countryData";
import Link from "next/link";
import { useMemo, useState } from "react";

const categoryOptions = [
  "All",
  "Bookkeeping",
  "Tax & Compliance",
  "Payroll",
  "Advisory",
];

const countryFilterOptions = [
  { key: "all", label: "All Countries" },
  ...countries.map((c) => ({ key: c.code, label: c.label, flagSrc: c.flagSrc })),
  { key: "general", label: "General" },
];

function filterPillClass(isActive) {
  return `rounded-full border px-5 py-2 text-xs transition-colors ${
    isActive
      ? "bg-[#5a688e] text-white border-[#5a688e]"
      : "bg-white border-[#e2e4e9] text-[#5a6478] hover:border-[#5a688e]/40 hover:text-[#1a1a2e]"
  }`;
}

export default function BlogPageClient() {
  const { country } = useCountry();
  const [activeCategory, setActiveCategory] = useState("All");

  // Default country filter: when a specific country is active, show that + General
  // When general is active, show all
  const defaultCountryFilter = country === "general" ? "all" : country;
  const [activeCountryFilter, setActiveCountryFilter] = useState(defaultCountryFilter);

  // Sync default on country change from context
  const [prevCountry, setPrevCountry] = useState(country);
  if (country !== prevCountry) {
    setPrevCountry(country);
    setActiveCountryFilter(country === "general" ? "all" : country);
  }

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const categoryMatch =
        activeCategory === "All" || post.category === activeCategory;

      let countryMatch = true;
      if (activeCountryFilter === "all") {
        countryMatch = true; // show everything
      } else if (activeCountryFilter === "general") {
        countryMatch = post.country === "All" || post.country === "General";
      } else {
        // Show country-specific + General/All posts
        countryMatch =
          post.country === activeCountryFilter.toUpperCase() ||
          post.country === "All" ||
          post.country === "General";
      }

      return categoryMatch && countryMatch;
    });
  }, [activeCategory, activeCountryFilter]);

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
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">Filter Posts</p>

          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Category</p>
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
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Country</p>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {countryFilterOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={filterPillClass(activeCountryFilter === opt.key)}
                  onClick={() => setActiveCountryFilter(opt.key)}
                >
                  {opt.flagSrc && (
                    <img
                      src={opt.flagSrc}
                      alt=""
                      className="mr-1.5 inline-block rounded-sm align-middle"
                      style={{ width: 16, height: 11 }}
                    />
                  )}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">Latest Articles</p>

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
                    <CountryBadge country={post.country} />
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

function CountryBadge({ country }) {
  if (!country || country === "All" || country === "General") {
    return (
      <span className="rounded-full bg-[#6aa595]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#6aa595]">
        General
      </span>
    );
  }

  const code = country.toLowerCase();
  const match = countries.find((c) => c.code === code);
  const flagSrc = match?.flagSrc;

  return (
    <span className="flex items-center gap-1 rounded-full bg-[#5a688e]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#5a688e]">
      {flagSrc && (
        <img src={flagSrc} alt="" className="rounded-sm" style={{ width: 14, height: 10 }} />
      )}
      {country}
    </span>
  );
}
