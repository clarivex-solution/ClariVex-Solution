"use client";

import { useCountry } from "@/components/CountryProvider";
import { countries } from "@/lib/countryData";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const categoryOptions = [
  "All",
  "Bookkeeping",
  "Tax & Compliance",
  "Payroll",
  "Advisory",
  "Reconciliation",
  "AP & AR",
  "Data Security",
  "General",
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
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    let isMounted = true;

    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();

        if (isMounted) {
          setBlogPosts(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setBlogPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

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
        // Show strict country match
        countryMatch = post.country === activeCountryFilter.toUpperCase();
      }

      return categoryMatch && countryMatch;
    });
  }, [blogPosts, activeCategory, activeCountryFilter]);

  const [visibleCount, setVisibleCount] = useState(6);
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => setVisibleCount(6), [activeCategory, activeCountryFilter]);

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

          {loading ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 animate-pulse">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="h-5 w-24 rounded-full bg-[#e2e4e9]" />
                    <div className="h-5 w-16 rounded-full bg-[#e2e4e9]" />
                  </div>
                  <div className="h-6 w-full rounded bg-[#e2e4e9] mb-2" />
                  <div className="h-4 w-4/5 rounded bg-[#e2e4e9] mb-3" />
                  <div className="h-4 w-full rounded bg-[#e2e4e9] mb-1" />
                  <div className="h-4 w-full rounded bg-[#e2e4e9] mb-1" />
                  <div className="h-4 w-2/3 rounded bg-[#e2e4e9] mb-6" />
                  <div className="h-4 w-20 rounded bg-[#e2e4e9]" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="mt-8 rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 text-[#5a6478]">
              No posts found for the selected filters.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
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

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((v) => v + 6)}
                className="rounded-full border border-[#5a688e] px-8 py-3 text-sm font-medium text-[#5a688e] transition-colors hover:bg-[#5a688e] hover:text-white"
              >
                Load More Articles
              </button>
              <p className="mt-3 text-xs text-[#8892a4]">
                Showing {Math.min(visibleCount, filteredPosts.length)} of {filteredPosts.length} articles
              </p>
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
