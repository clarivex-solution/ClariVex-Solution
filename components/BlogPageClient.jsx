"use client";

import { countries } from "@/lib/countryData";
import { ChevronDown, Globe, LayoutGrid, Locate } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function CustomSelect({ value, onChange, options, header, footer, defaultIcon }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-3 rounded-full border bg-white px-5 py-2.5 text-sm font-medium transition-colors w-full min-w-[200px] ${
          isOpen
            ? "border-[#6aa595] ring-2 ring-[#6aa595]/20 text-[#1a1a2e]"
            : "border-[#e2e4e9] text-[#5a6478] hover:border-[#6aa595]/40 hover:text-[#1a1a2e]"
        }`}
      >
        <span className="flex items-center gap-2.5">
          {selectedOption.icon || defaultIcon}
          <span>{selectedOption.label}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-[#8892a4] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 mt-2 w-full min-w-[260px] rounded-xl border border-[#e2e4e9] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {header && (
            <div className="px-5 py-4 border-b border-[#e2e4e9]">
              <span className="text-xs uppercase tracking-[0.15em] text-[#5a688e] font-semibold">{header}</span>
            </div>
          )}

          <div className="flex flex-col py-2">
            {options.map((option) => {
              const isActive = value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full px-5 py-3 flex items-center justify-between text-left text-sm transition-colors ${
                    isActive
                      ? "bg-[#f8f9fa] text-[#6aa595] font-semibold"
                      : "text-[#5a6478] hover:bg-[#f8f9fa] hover:text-[#1a1a2e]"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex w-6 justify-center items-center">{option.icon}</span>
                    <span>{option.label}</span>
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#6aa595] ml-2" />}
                </button>
              );
            })}
          </div>

          {footer && (
            <div className="px-5 py-3.5 border-t border-[#e2e4e9] bg-[#f8f9fa]">
              <span className="text-xs text-[#5a6478] leading-relaxed block">{footer}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
  const country = "US"; // Unused context, fixing lint
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

      <section className="sticky top-20 z-30 border-y border-[#e2e4e9] bg-[#f8f9fa]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-4 py-6">

            {/* Country dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-widest text-[#8892a4] font-medium whitespace-nowrap">Country</label>
              <CustomSelect
                value={activeCountryFilter}
                onChange={(val) => {
                  if (val === "detect") {
                    alert("Location detection available soon.");
                    return;
                  }
                  setActiveCountryFilter(val);
                }}
                header="SELECT REGION"
                footer="Content adapts to your selected region"
                defaultIcon={<Globe className="w-[18px] h-[18px] text-[#8892a4]" />}
                options={[
                  { value: "all", label: "All Countries", icon: <Globe className="w-[18px] h-[18px] text-[#8892a4]" /> },
                  { value: "US", label: "United States", icon: <img src="/flags/us.svg" alt="US" className="w-[18px] h-[12px] rounded-[1px] object-cover" /> },
                  { value: "UK", label: "United Kingdom", icon: <img src="/flags/uk.svg" alt="UK" className="w-[18px] h-[12px] rounded-[1px] object-cover" /> },
                  { value: "AU", label: "Australia", icon: <img src="/flags/au.svg" alt="AU" className="w-[18px] h-[12px] rounded-[1px] object-cover" /> },
                  { value: "CA", label: "Canada", icon: <img src="/flags/ca.svg" alt="CA" className="w-[18px] h-[12px] rounded-[1px] object-cover" /> },
                  { value: "general", label: "Global", icon: <Globe className="w-[18px] h-[18px] text-[#6aa595]" /> },
                  { value: "detect", label: "Detect my location", icon: <Locate className="w-[18px] h-[18px] text-[#5a688e]" /> },
                ]}
              />
            </div>

            <div className="h-5 w-px bg-[#e2e4e9]" />

            {/* Category dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-widest text-[#8892a4] font-medium whitespace-nowrap">Category</label>
              <CustomSelect
                value={activeCategory}
                onChange={setActiveCategory}
                header="CONTENT TOPIC"
                defaultIcon={<LayoutGrid className="w-4 h-4 text-[#8892a4]" />}
                options={[
                  { value: "All", label: "All Categories", icon: <LayoutGrid className="w-4 h-4 text-[#8892a4]" /> },
                  { value: "Tax & Compliance", label: "Tax & Compliance", icon: <div className="w-2 h-2 rounded-full bg-[#5a688e]" /> },
                  { value: "Payroll", label: "Payroll", icon: <div className="w-2 h-2 rounded-full bg-[#6aa595]" /> },
                  { value: "Bookkeeping", label: "Bookkeeping", icon: <div className="w-2 h-2 rounded-full bg-[#c9a96e]" /> },
                  { value: "Advisory", label: "Advisory", icon: <div className="w-2 h-2 rounded-full bg-[#1a1a2e]" /> },
                  { value: "Reconciliation", label: "Reconciliation", icon: <div className="w-2 h-2 rounded-full bg-[#5a688e]" /> },
                  { value: "AP & AR", label: "AP & AR", icon: <div className="w-2 h-2 rounded-full bg-[#6aa595]" /> },
                  { value: "Data Security", label: "Data Security", icon: <div className="w-2 h-2 rounded-full bg-[#c9a96e]" /> },
                  { value: "General", label: "General", icon: <div className="w-2 h-2 rounded-full bg-[#1a1a2e]" /> },
                ]}
              />
            </div>

            {/* Results count — pushed to right or full width on mobile */}
            <div className="mt-2 w-full text-left sm:mt-0 sm:w-auto sm:ml-auto">
              <span className="text-xs text-[#8892a4]">
                Showing {Math.min(visibleCount, filteredPosts.length)} of {filteredPosts.length} articles
              </span>
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
