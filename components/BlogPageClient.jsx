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
  return `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-[#6aa595] text-white border border-[#6aa595]"
      : "bg-white border border-[#e2e4e9] text-[#5a6478] hover:border-[#6aa595]/40"
  }`;
}

export default function BlogPageClient() {
  const { country } = useCountry();
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCountryFilter, setActiveCountryFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setActiveCountryFilter(country === "general" ? "all" : country);
  }, [country]);

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
      const categoryMatch = activeCategory === "All" || post.category === activeCategory;

      let countryMatch = true;
      if (activeCountryFilter === "all") {
        countryMatch = true;
      } else if (activeCountryFilter === "general") {
        countryMatch = post.country === "All" || post.country === "General";
      } else {
        countryMatch = post.country === activeCountryFilter.toUpperCase();
      }

      return categoryMatch && countryMatch;
    });
  }, [blogPosts, activeCategory, activeCountryFilter]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleCount(6);
    setLoadingMore(false);
  }, [activeCategory, activeCountryFilter]);

  function handleLoadMore() {
    if (loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((value) => value + 6);
      setLoadingMore(false);
    }, 180);
  }

  function clearFilters() {
    setActiveCategory("All");
    setActiveCountryFilter("all");
  }

  return (
    <main className="bg-white text-[#1a1a2e]">
      <section className="relative overflow-hidden bg-[#f4f3ee] py-24 text-center">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-[#5a688e]/6 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 sm:px-6 lg:px-12">
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

      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">Filter Posts</p>

          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Category</p>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none">
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
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none">
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

      <section className="bg-white py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">Latest Articles</p>

          {loading ? (
            <div className="mt-8 grid gap-6 transition-all duration-300 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 animate-pulse">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="h-5 w-24 rounded-full bg-[#e2e4e9]" />
                    <div className="h-5 w-16 rounded-full bg-[#e2e4e9]" />
                  </div>
                  <div className="mb-2 h-6 w-full rounded bg-[#e2e4e9]" />
                  <div className="mb-3 h-4 w-4/5 rounded bg-[#e2e4e9]" />
                  <div className="mb-1 h-4 w-full rounded bg-[#e2e4e9]" />
                  <div className="mb-1 h-4 w-full rounded bg-[#e2e4e9]" />
                  <div className="mb-6 h-4 w-2/3 rounded bg-[#e2e4e9]" />
                  <div className="h-4 w-20 rounded bg-[#e2e4e9]" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="mt-8 rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-12 text-center">
              <div className="mx-auto mb-4 h-px w-12 bg-[#c9a96e]" />
              <p className="text-base font-medium text-[#1a1a2e]">No articles found</p>
              <p className="mt-2 text-sm text-[#5a6478]">Try adjusting your filters or check back later.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-full border border-[#5a688e] px-6 py-2 text-sm text-[#5a688e] cursor-pointer hover:bg-[#5a688e] hover:text-white active:scale-95 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 transition-all duration-300 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-[#e2e4e9] p-8 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#6aa595]/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="bg-[#6aa595]/10 text-[#6aa595] text-xs rounded-full px-3 py-1">
                      {post.category}
                    </span>
                    <CountryBadge country={post.country} />
                  </div>

                  <h2 className="font-[family-name:var(--font-playfair)] font-bold text-lg text-[#1a1a2e] mt-3 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#5a6478] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#6aa595] font-semibold text-sm inline-flex items-center gap-1.5 mt-4 hover:gap-3 transition-all"
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
                type="button"
                disabled={loadingMore}
                onClick={handleLoadMore}
                className="rounded-full border border-[#5a688e] px-8 py-3 text-sm font-medium text-[#5a688e] cursor-pointer transition-colors hover:bg-[#5a688e] hover:text-white active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingMore ? "Loading..." : "Load More Articles"}
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
      <span className="bg-[#f8f9fa] border border-[#e2e4e9] text-xs rounded-full px-2 py-0.5 text-[#1a1a2e]">
        General
      </span>
    );
  }

  const code = country.toLowerCase();
  const match = countries.find((c) => c.code === code);
  const flagSrc = match?.flagSrc;

  return (
    <span className="flex items-center gap-1 bg-[#f8f9fa] border border-[#e2e4e9] text-xs rounded-full px-2 py-0.5 text-[#1a1a2e]">
      {flagSrc && (
        <img src={flagSrc} alt="" className="rounded-sm" style={{ width: 14, height: 10 }} />
      )}
      {country}
    </span>
  );
}
