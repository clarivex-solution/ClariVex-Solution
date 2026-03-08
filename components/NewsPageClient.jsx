"use client";

import { Calendar, CalendarCheck, CalendarDays, ChevronDown, Globe, LayoutGrid, Locate } from "lucide-react";
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
          {selectedOption.triggerIcon || selectedOption.icon || defaultIcon}
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



export default function NewsPageClient() {
  const detectedCountry = "US"; // default removed context hook manually to fix unused import
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (detectedCountry && detectedCountry !== "general") {
      setSelectedCountry(detectedCountry.toUpperCase());
    }
  }, [detectedCountry]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsPosts(Array.isArray(data) ? data : []);
      } catch {
        setNewsPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    const now = Date.now();

    return newsPosts.filter((item) => {
      const countryOk = selectedCountry === "all" || item.country === selectedCountry || item.country === "General";
      const categoryOk = selectedCategory === "All" || item.category === selectedCategory;
      const ageMs = now - new Date(item.publishedAt).getTime();
      const dateOk = dateFilter === "today" ? ageMs < 86400000 : dateFilter === "week" ? ageMs < 604800000 : true;

      return countryOk && categoryOk && dateOk;
    });
  }, [newsPosts, selectedCountry, selectedCategory, dateFilter]);

  useEffect(() => {
    setVisibleCount(9);
    setLoadingMore(false);
  }, [selectedCountry, selectedCategory, dateFilter]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  function clearFilters() {
    setSelectedCountry("all");
    setSelectedCategory("All");
    setDateFilter("all");
  }

  function handleLoadMore() {
    if (loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((value) => value + 9);
      setLoadingMore(false);
    }, 180);
  }

  return (
    <main className="bg-white text-[#1a1a2e]">
      <section className="relative overflow-hidden bg-[#f4f3ee] py-24 text-center">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-[#5a688e]/6 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 sm:px-6 lg:px-12">
          <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">Market Intelligence</p>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#1a1a2e] sm:text-4xl lg:text-6xl">
            Finance &amp; Tax News
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#5a6478]">
            {detectedCountry === "general"
              ? "Accounting regulations and tax updates across all markets."
              : `Latest accounting and tax updates for ${detectedCountry?.toUpperCase()} businesses.`}
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
                value={selectedCountry}
                onChange={(val) => {
                  if (val === "detect") {
                    alert("Location detection available soon.");
                    return;
                  }
                  setSelectedCountry(val);
                }}
                header="SELECT REGION"
                footer="Content adapts to your selected region"
                defaultIcon={<Globe className="w-[18px] h-[18px] text-[#8892a4]" />}
                options={[
                  { value: "all", label: "All Countries", icon: <Globe className="w-[18px] h-[18px] text-[#8892a4]" />, triggerIcon: <Globe className="w-[18px] h-[18px] text-[#8892a4]" /> },
                  { value: "US", label: "United States", icon: <img src="/flags/us.svg" alt="US" className="w-[18px] h-[12px] rounded-[1px] object-cover" />, triggerIcon: <span className="font-bold text-[10px] tracking-wider text-[#1a1a2e] mt-[1px]">US</span> },
                  { value: "UK", label: "United Kingdom", icon: <img src="/flags/uk.svg" alt="UK" className="w-[18px] h-[12px] rounded-[1px] object-cover" />, triggerIcon: <span className="font-bold text-[10px] tracking-wider text-[#1a1a2e] mt-[1px]">GB</span> },
                  { value: "AU", label: "Australia", icon: <img src="/flags/au.svg" alt="AU" className="w-[18px] h-[12px] rounded-[1px] object-cover" />, triggerIcon: <span className="font-bold text-[10px] tracking-wider text-[#1a1a2e] mt-[1px]">AU</span> },
                  { value: "CA", label: "Canada", icon: <img src="/flags/ca.svg" alt="CA" className="w-[18px] h-[12px] rounded-[1px] object-cover" />, triggerIcon: <span className="font-bold text-[10px] tracking-wider text-[#1a1a2e] mt-[1px]">CA</span> },
                  { value: "GENERAL", label: "Global", icon: <Globe className="w-[18px] h-[18px] text-[#6aa595]" />, triggerIcon: <Globe className="w-[18px] h-[18px] text-[#5a688e]" /> },
                  { value: "detect", label: "Detect my location", icon: <Locate className="w-[18px] h-[18px] text-[#5a688e]" />, triggerIcon: <Locate className="w-[18px] h-[18px] text-[#5a688e]" /> },
                ]}
              />
            </div>

            <div className="h-5 w-px bg-[#e2e4e9]" />

            {/* Category dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-widest text-[#8892a4] font-medium whitespace-nowrap">Category</label>
              <CustomSelect
                value={selectedCategory}
                onChange={setSelectedCategory}
                header="CONTENT TOPIC"
                defaultIcon={<LayoutGrid className="w-4 h-4 text-[#8892a4]" />}
                options={[
                  { value: "All", label: "All Categories", icon: <LayoutGrid className="w-4 h-4 text-[#8892a4]" /> },
                  { value: "Tax Compliance", label: "Tax Compliance", icon: <div className="w-2 h-2 rounded-full bg-[#5a688e]" /> },
                  { value: "Payroll", label: "Payroll", icon: <div className="w-2 h-2 rounded-full bg-[#6aa595]" /> },
                  { value: "Regulation Update", label: "Regulation Update", icon: <div className="w-2 h-2 rounded-full bg-[#c9a96e]" /> },
                  { value: "Bookkeeping", label: "Bookkeeping", icon: <div className="w-2 h-2 rounded-full bg-[#1a1a2e]" /> },
                ]}
              />
            </div>

            <div className="h-5 w-px bg-[#e2e4e9]" />

            {/* Date dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-widest text-[#8892a4] font-medium whitespace-nowrap">Date</label>
              <CustomSelect
                value={dateFilter}
                onChange={setDateFilter}
                header="TIMEFRAME"
                defaultIcon={<Calendar className="w-4 h-4 text-[#8892a4]" />}
                options={[
                  { value: "all", label: "All Time", icon: <CalendarDays className="w-4 h-4 text-[#8892a4]" /> },
                  { value: "week", label: "This Week", icon: <Calendar className="w-4 h-4 text-[#8892a4]" /> },
                  { value: "today", label: "Today", icon: <CalendarCheck className="w-4 h-4 text-[#8892a4]" /> },
                ]}
              />
            </div>

            {/* Results count — pushed to right */}
            <span className="ml-auto text-xs text-[#8892a4]">
              Showing {Math.min(visibleCount, filteredNews.length)} of {filteredNews.length} articles
            </span>

          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            {detectedCountry === "general" ? "Global News" : `${detectedCountry?.toUpperCase()} News`}
          </p>

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
          ) : filteredNews.length === 0 ? (
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
            <>
              <div className="mt-8 grid gap-6 transition-all duration-300 md:grid-cols-2 lg:grid-cols-3">
                {visibleNews.map((item) => (
                  <article
                    key={item.id || item.slug}
                    className="bg-white rounded-2xl border border-[#e2e4e9] p-8 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#6aa595]/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#6aa595]/10 text-[#6aa595] px-3 py-1 text-xs rounded-full">
                          {item.source}
                        </span>
                        {item.country && item.country !== "All" && item.country !== "General" && (
                          <span className="bg-[#f8f9fa] border border-[#e2e4e9] text-xs rounded-full px-2 py-0.5 text-[#1a1a2e]">
                            {item.country}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#8892a4]">
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                      </span>
                    </div>

                    <div className="mt-3">
                      <span className="bg-[#5a688e]/10 text-[#5a688e] text-xs rounded-full px-2 py-0.5 inline-block">
                        {item.category}
                      </span>
                    </div>

                    <h2 className="font-[family-name:var(--font-playfair)] font-bold text-lg text-[#1a1a2e] mt-3">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#5a6478] leading-relaxed mt-2 line-clamp-3 flex-1">
                      {item.summary}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`/news/${item.slug}`}
                        className="text-[#6aa595] font-semibold text-sm hover:underline"
                      >
                        Read More &rarr;
                      </Link>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#8892a4] hover:underline mt-[2px]"
                        >
                          Source &rarr;
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    disabled={loadingMore}
                    onClick={handleLoadMore}
                    className="border border-[#1a1a2e] text-[#1a1a2e] rounded-full px-8 py-3 text-sm font-medium cursor-pointer transition-all hover:bg-[#1a1a2e] hover:text-white active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}

          <div className="mt-14 rounded-2xl border border-[#1a1a2e] bg-[#1a1a2e] p-12 text-center shadow-lg">
            <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">Subscribe</p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-white">
              Get Daily Finance Updates
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">
              Subscribe for country-specific accounting and tax regulation news delivered to your inbox.
            </p>
            <form
              className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                alert("Thank you for subscribing!");
              }}
            >
              <label htmlFor="news-email" className="sr-only">Email</label>
              <input
                id="news-email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-full border border-[#e2e4e9] bg-white px-6 py-3 text-[#1a1a2e] outline-none transition-colors focus:border-[#5a688e]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#6aa595] px-8 py-3 font-semibold text-white cursor-pointer transition-colors hover:bg-[#5a688e] active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
