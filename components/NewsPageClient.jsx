"use client";

import { useCountry } from "@/components/CountryProvider";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function NewsPageClient() {
  const { country } = useCountry();
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const activeNews = useMemo(() => {
    if (country === "general") {
      return newsPosts; // Show all news in general mode
    }
    const code = country.toUpperCase();
    return newsPosts.filter((n) => n.country === code);
  }, [country, newsPosts]);

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

      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            {country === "general" ? "Global News" : `${country.toUpperCase()} News`}
          </p>

          {loading ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse bg-[#e2e4e9] rounded-xl h-32" />
              ))}
            </div>
          ) : activeNews.length === 0 ? (
            <div className="mt-8 rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 text-[#5a6478]">
              No news available for this region yet.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeNews.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 transition-all hover:border-[#5a688e]/40 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                      {item.source}
                    </span>
                    <span className="text-xs text-[#5a6478]">{item.date}</span>
                  </div>
                  <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1a1a2e]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5a6478]">{item.summary}</p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="mt-6 inline-flex text-sm text-[#6aa595] transition-colors hover:text-[#1a1a2e]"
                  >
                    Read More &rarr;
                  </Link>
                </article>
              ))}
            </div>
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
