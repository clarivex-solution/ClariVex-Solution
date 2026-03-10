"use client";

import { CountryFlag, formatDate, TypeBadge } from '@/components/admin/shared';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarDays, FolderOpen } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const manualFetchCountries = [
  { label: "US", value: "US" },
  { label: "UK", value: "UK" },
  { label: "AU", value: "AU" },
  { label: "CA", value: "CA" },
  { label: "General", value: "GENERAL" },
];

function NewsCard({ item, onDelete }) {
  const isAutomated = item.sourceType === "automated";
  return (
    <div className="bg-white border border-[#e2e4e9] rounded-xl p-4 space-y-3">
      <p className="font-medium text-[#1a1a2e] text-sm leading-snug line-clamp-2">{item.title}</p>
      <div className="flex flex-wrap gap-2">
        <TypeBadge sourceType={item.sourceType} />
        {item.country && <CountryFlag code={item.country} />}
        {item.category && <span className="inline-flex items-center gap-1 text-xs text-[#5a6478]"><FolderOpen className="h-3.5 w-3.5 text-[#c9a96e]" />{item.category}</span>}
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs text-[#8892a4]">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          {formatDate(item.publishedAt || item.createdAt || Date.now())}
        </span>
        <div className="flex items-center gap-2">
          {!isAutomated && (
            <Link
              href={`/admin/news/${item._id || item.id}/edit`}
              className="px-3 py-1.5 rounded-md border border-[#e2e4e9] bg-white text-xs font-medium text-[#1a1a2e] hover:border-[#1a1a2e] hover:bg-[#f8f9fa] active:scale-95 transition-all"
            >
              Edit
            </Link>
          )}
          <button
            type="button"
            onClick={() => onDelete(item)}
            className="px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 hover:border-red-300 active:scale-95 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingCountry, setFetchingCountry] = useState(null);
  const [countryFilter, setCountryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function fetchNews() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/news");
      if (!response.ok) return;
      const data = await response.json();
      setNews(Array.isArray(data) ? data : data.news || []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchNews(); }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (!response.ok) { toast.error("Could not delete. Please try again."); return; }
      toast.success("News article deleted.");
      fetchNews();
    } catch {
      toast.error("Could not delete. Please try again.");
    }
  }

  async function handleManualFetch(countryLabel, countryValue) {
    setFetchingCountry(countryValue);
    try {
      const response = await fetch("/api/admin/trigger-news-fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryValue }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Failed to fetch news.");
      const count = Number(data?.saved ?? data?.count ?? data?.newArticles ?? 0);
      toast.success(`Fetched ${count} new articles for ${countryLabel}`);
      fetchNews();
    } catch (error) {
      toast.error(error?.message || "Failed to fetch news.");
    } finally {
      setFetchingCountry(null);
    }
  }

  const filteredNews = news.filter((item) => {
    const countryMatch = countryFilter === "All" || item.country === countryFilter;
    const typeMatch = typeFilter === "All" || item.sourceType?.toLowerCase() === typeFilter.toLowerCase();
    return countryMatch && typeMatch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-px w-12 bg-[#c9a96e] mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] text-[#1a1a2e] font-semibold">News</h1>
          <p className="mt-1 text-sm text-[#5a6478]">{filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/news/new"
          className="shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1a1a2e] text-white text-sm font-medium hover:bg-[#6aa595] active:scale-95 transition-all"
        >
          + Add News
        </Link>
      </div>

      {/* Manual fetch panel */}
      <div className="bg-white border border-[#e2e4e9] rounded-xl p-4 sm:p-5">
        <p className="text-sm font-semibold text-[#1a1a2e] mb-1">Manual Fetch</p>
        <p className="text-xs text-[#5a6478] mb-3">Trigger a live news fetch for a specific region</p>
        <div className="flex flex-wrap gap-2">
          {manualFetchCountries.map((country) => (
            <button
              key={country.value}
              type="button"
              onClick={() => handleManualFetch(country.label, country.value)}
              disabled={fetchingCountry !== null}
              className={`rounded-lg border border-[#e2e4e9] px-4 py-2 text-xs font-medium bg-[#f8f9fa] text-[#5a6478] cursor-pointer transition-all hover:border-[#1a1a2e] hover:text-[#1a1a2e] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                fetchingCountry === country.value ? 'opacity-50' : ''
              }`}
            >
              {fetchingCountry === country.value ? 'Fetching…' : country.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[#5a6478] w-14">Country</span>
          <div className="flex flex-wrap gap-1.5">
            {["All", "US", "UK", "AU", "CA"].map((c) => (
              <button key={c} type="button" onClick={() => setCountryFilter(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium cursor-pointer transition-all active:scale-95 ${
                  countryFilter === c ? "border-[#1a1a2e] bg-[#1a1a2e] text-white" : "border-[#e2e4e9] bg-white text-[#5a6478] hover:border-[#1a1a2e]"
                }`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[#5a6478] w-14">Type</span>
          <div className="flex flex-wrap gap-1.5">
            {["All", "Automated", "Manual"].map((t) => (
              <button key={t} type="button" onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-3 py-1 text-xs font-medium cursor-pointer transition-all active:scale-95 ${
                  typeFilter === t ? "border-[#1a1a2e] bg-[#1a1a2e] text-white" : "border-[#e2e4e9] bg-white text-[#5a6478] hover:border-[#1a1a2e]"
                }`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="sm:hidden space-y-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#e2e4e9] rounded-xl p-4 space-y-3">
                <div className="h-4 w-4/5 animate-pulse rounded bg-[#e2e4e9]" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-[#e2e4e9]" />
                <div className="flex gap-2">
                  <div className="h-5 w-20 animate-pulse rounded-full bg-[#e2e4e9]" />
                  <div className="h-5 w-10 animate-pulse rounded-full bg-[#e2e4e9]" />
                  <div className="h-5 w-24 animate-pulse rounded-full bg-[#e2e4e9]" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 animate-pulse rounded bg-[#e2e4e9]" />
                  <div className="h-8 w-16 animate-pulse rounded-md bg-[#e2e4e9]" />
                </div>
              </div>
            ))
          : filteredNews.length === 0
          ? (
            <div className="rounded-xl border border-[#e2e4e9] bg-white py-12 text-center text-sm text-[#5a6478]">No articles found.</div>
          )
          : filteredNews.map((item) => (
            <NewsCard key={item._id || item.id} item={item} onDelete={(i) => setDeleteTarget(i)} />
          ))
        }
      </div>

      {/* Desktop: table */}
      {loading ? (
        <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-[#e2e4e9] bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-[#f8f9fa] border-b border-[#e2e4e9]">
              <tr>
                {["Title", "Source", "Country", "Category", "Type", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#5a6478]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-[#e2e4e9] last:border-0">
                  <td className="px-4 py-4"><div className="h-4 w-48 animate-pulse rounded bg-[#e2e4e9]" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-20 animate-pulse rounded bg-[#e2e4e9]" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-12 animate-pulse rounded bg-[#e2e4e9]" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-28 animate-pulse rounded bg-[#e2e4e9]" /></td>
                  <td className="px-4 py-4"><div className="h-5 w-20 animate-pulse rounded-full bg-[#e2e4e9]" /></td>
                  <td className="px-4 py-4"><div className="h-4 w-24 animate-pulse rounded bg-[#e2e4e9]" /></td>
                  <td className="px-4 py-4"><div className="h-8 w-16 animate-pulse rounded-md bg-[#e2e4e9]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="hidden sm:block rounded-xl border border-[#e2e4e9] bg-white py-16 text-center text-sm text-[#5a6478]">No articles found.</div>
      ) : (
        <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-[#e2e4e9] bg-white shadow-sm">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-[#f8f9fa] border-b border-[#e2e4e9]">
              <tr>
                {['Title', 'Source', 'Country', 'Category', 'Type', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item) => {
                const isAutomated = item.sourceType === "automated";
                return (
                  <tr key={item._id || item.id} className="group border-b border-[#e2e4e9] last:border-0 hover:bg-[#f8f9fa] transition-colors">
                    <td className="max-w-[220px] truncate px-4 py-3 text-sm font-medium text-[#1a1a2e] group-hover:text-[#6aa595] transition-colors" title={item.title}>{item.title}</td>
                    <td className="px-4 py-3 text-sm text-[#5a6478]">{item.sourceName || item.source}</td>
                    <td className="px-4 py-3 text-sm text-[#5a6478]"><CountryFlag code={item.country} /></td>
                    <td className="px-4 py-3 text-sm text-[#5a6478]">
                      <span className="inline-flex items-center gap-1.5"><FolderOpen className="h-3.5 w-3.5 text-[#c9a96e] shrink-0" />{item.category}</span>
                    </td>
                    <td className="px-4 py-3"><TypeBadge sourceType={item.sourceType} /></td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-[#5a6478]">
                      <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-[#8892a4] shrink-0" />{formatDate(item.publishedAt || item.createdAt || Date.now())}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!isAutomated && (
                          <Link
                            href={`/admin/news/${item._id || item.id}/edit`}
                            className="px-3 py-1.5 rounded-md border border-[#e2e4e9] bg-white text-xs font-medium text-[#1a1a2e] hover:border-[#1a1a2e] hover:bg-[#f8f9fa] active:scale-95 transition-all shadow-sm"
                          >
                            Edit
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 hover:border-red-300 active:scale-95 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirm dialog */}
      <Dialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent className="max-w-md border border-[#e2e4e9] bg-white text-[#1a1a2e] shadow-lg mx-4">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a2e] font-semibold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-[#5a6478]">
              Are you sure you want to delete &ldquo;{deleteTarget?.title}&rdquo;? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <button type="button" onClick={() => setDeleteTarget(null)}
              className="rounded-lg border border-[#e2e4e9] bg-white px-4 py-2 text-sm font-medium text-[#5a6478] hover:bg-[#f8f9fa] active:scale-95 transition-all cursor-pointer">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => { const id = deleteTarget?._id || deleteTarget?.id; if (!id) return; handleDelete(id); setDeleteTarget(null); }}
              className="rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-medium text-white cursor-pointer active:scale-95 transition-all"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
