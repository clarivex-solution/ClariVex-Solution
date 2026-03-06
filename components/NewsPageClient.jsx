"use client";

import { useCountry } from "@/components/CountryProvider";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const activePillClass = "rounded-full border px-4 py-1.5 text-xs cursor-pointer transition-colors bg-[#5a688e] text-white border-[#5a688e]";
const inactivePillClass = "rounded-full border px-4 py-1.5 text-xs cursor-pointer transition-colors bg-white border-[#e2e4e9] text-[#5a6478] hover:border-[#5a688e]/40";

export default function NewsPageClient() {
  const { country: detectedCountry } = useCountry();
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
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-32">
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

      <section className="sticky top-20 z-30 border-y border-[#e2e4e9] bg-[#f8f9fa]/95 backdrop-blur-sm py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-5">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Country:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none">
              {[
                { key: "all", label: "All" },
                { key: "US", label: "US" },
                { key: "UK", label: "UK" },
                { key: "AU", label: "AU" },
                { key: "CA", label: "CA" },
                { key: "GENERAL", label: "Global" },
              ].map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedCountry(option.key)}
                  className={selectedCountry === option.key ? activePillClass : inactivePillClass}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Category:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none">
              {["All", "Tax Compliance", "Payroll", "Regulation Update", "Bookkeeping"].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? activePillClass : inactivePillClass}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Date:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none">
              {[
                { key: "all", label: "All Time" },
                { key: "week", label: "This Week" },
                { key: "today", label: "Today" },
              ].map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setDateFilter(option.key)}
                  className={dateFilter === option.key ? activePillClass : inactivePillClass}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs text-[#8892a4]">
            Showing {Math.min(visibleCount, filteredNews.length)} of {filteredNews.length} articles
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-32">
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
                    className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 cursor-pointer transition-all duration-300 hover:border-[#5a688e]/40 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                          {item.source}
                        </span>
                        <span className="rounded-full bg-[#c9a96e]/10 px-3 py-1 text-xs text-[#c9a96e]">
                          {item.category}
                        </span>
                        <span className="rounded-full bg-[#1a1a2e]/5 px-3 py-1 text-xs text-[#5a6478]">
                          {item.country}
                        </span>
                      </div>
                      <span className="text-xs text-[#5a6478]">
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ""}
                      </span>
                    </div>

                    <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a2e]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6478]">{item.summary}</p>
                    <div className="mt-6 flex items-center">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex text-sm text-[#6aa595] transition-colors hover:text-[#1a1a2e]"
                      >
                        Read More &rarr;
                      </Link>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 text-xs text-[#c9a96e] hover:underline"
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
                    className="rounded-full border border-[#5a688e] px-8 py-3 text-sm font-medium text-[#5a688e] cursor-pointer transition-colors hover:bg-[#5a688e] hover:text-white active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}

          <div className="mt-14 rounded-2xl border border-[#e2e4e9] bg-[#f8f9fa] p-12 text-center">
            <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">Subscribe</p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#1a1a2e]">
              Get Daily Finance Updates
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#5a6478]">
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
                className="rounded-full bg-[#5a688e] px-8 py-3 text-white cursor-pointer transition-colors hover:bg-[#6aa595] active:scale-95"
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
