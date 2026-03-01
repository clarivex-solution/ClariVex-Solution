"use client";

import { useCountry } from "@/components/CountryProvider";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function NewsPageClient() {
  const { country } = useCountry();
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    let isMounted = true;

    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();

        if (isMounted) {
          setNewsPosts(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setNewsPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (country && country !== "general") setSelectedCountry(country.toUpperCase());
  }, [country]);

  const filteredNews = useMemo(() => {
    return newsPosts.filter((item) => {
      const countryOk =
        selectedCountry === "all" || item.country === selectedCountry || item.country === "General";
      const catOk = selectedCategory === "All" || item.category === selectedCategory;
      return countryOk && catOk;
    });
  }, [newsPosts, selectedCountry, selectedCategory]);

  useEffect(() => setVisibleCount(9), [selectedCountry, selectedCategory]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  return (
    <main className="bg-white text-[#1a1a2e]">
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-32">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-[#5a688e]/6 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-12">
          <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            Market Intelligence
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#1a1a2e] sm:text-4xl lg:text-6xl">
            Finance &amp; Tax News
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#5a6478]">
            {country === "general"
              ? "Accounting regulations and tax updates across all markets."
              : `Latest accounting and tax updates for ${country.toUpperCase()} businesses.`}
          </p>
        </div>
      </section>

      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-5">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Country</p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All" },
                { key: "US", label: "US" },
                { key: "UK", label: "UK" },
                { key: "AU", label: "AU" },
                { key: "CA", label: "CA" },
                { key: "General", label: "Global" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedCountry(opt.key)}
                  className={`rounded-full border px-5 py-2 text-xs transition-colors ${
                    selectedCountry === opt.key
                      ? "bg-[#5a688e] text-white border-[#5a688e]"
                      : "bg-white border-[#e2e4e9] text-[#5a6478] hover:border-[#5a688e]/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#5a6478]">Category</p>
            <div className="flex flex-wrap gap-2">
              {["All", "Tax Compliance", "Payroll", "Regulation Update", "Bookkeeping", "Advisory"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full border px-5 py-2 text-xs transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#5a688e] text-white border-[#5a688e]"
                      : "bg-white border-[#e2e4e9] text-[#5a6478] hover:border-[#5a688e]/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-[#8892a4]">
            Showing {Math.min(visibleCount, filteredNews.length)} of {filteredNews.length} articles
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            {country === "general" ? "Global News" : `${country.toUpperCase()} News`}
          </p>

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
          ) : filteredNews.length === 0 ? (
            <div className="mt-8 rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 text-[#5a6478]">
              No news available for this region yet.
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleNews.map((item) => (
                  <article
                    key={item.slug}
                    className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 transition-all hover:border-[#5a688e]/40 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                          {item.source}
                        </span>
                        <span className="rounded-full bg-[#c9a96e]/10 px-3 py-1 text-xs text-[#c9a96e]">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-xs text-[#5a6478]">{item.date}</span>
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
                          className="ml-4 text-xs text-[#8892a4] hover:text-[#c9a96e] transition-colors"
                        >
                          Source →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setVisibleCount((v) => v + 9)}
                    className="rounded-full border border-[#5a688e] px-8 py-3 text-sm font-medium text-[#5a688e] transition-colors hover:bg-[#5a688e] hover:text-white"
                  >
                    Load More
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
              onSubmit={(e) => {
                e.preventDefault();
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
                className="rounded-full bg-[#5a688e] px-8 py-3 text-white transition-colors hover:bg-[#6aa595]"
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
