"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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

  useEffect(() => {
    fetchNews();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Could not delete. Please try again.");
        return;
      }

      toast.success("News article deleted.");
      fetchNews();
    } catch (error) {
      console.error("Failed to delete news:", error);
      toast.error("Could not delete. Please try again.");
    }
  }

  async function handleManualFetch(countryLabel, countryValue) {
    setFetchingCountry(countryValue);

    try {
      const response = await fetch("/api/admin/trigger-news-fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: countryValue }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Failed to fetch news.");
      }

      const count = Number(data?.saved ?? data?.count ?? data?.newArticles ?? 0);
      toast.success(`Fetched ${count} new articles for ${countryLabel}`);
      fetchNews();
    } catch (error) {
      console.error("Failed to trigger manual fetch:", error);
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
    <div className="min-h-screen bg-[#f8f9fa] p-6 text-[#1a1a2e]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold font-playfair">News Management</h1>
        <Link
          href="/admin/news/new"
          className="rounded-lg border border-[#1a1a2e] bg-transparent px-4 py-2.5 font-medium text-[#1a1a2e] cursor-pointer transition-colors hover:bg-[#1a1a2e] hover:text-white active:scale-95"
        >
          Add Manual News
        </Link>
      </div>

      <div className="mb-6 rounded-xl border border-[#e2e4e9] bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-[#1a1a2e]">Manual News Fetch</h2>
        <p className="mb-4 text-xs text-[#5a6478]">
          Manually fetch latest finance news for a specific country
        </p>
        <div className="flex flex-wrap gap-2">
          {manualFetchCountries.map((country) => {
            const isLoading = fetchingCountry === country.value;

            return (
              <button
                key={country.value}
                type="button"
                onClick={() => handleManualFetch(country.label, country.value)}
                disabled={fetchingCountry !== null}
                className={`rounded-lg border border-[#e2e4e9] px-4 py-2 text-xs font-medium bg-[#f8f9fa] text-[#5a6478] cursor-pointer transition-colors hover:border-[#1a1a2e] hover:text-[#1a1a2e] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                {isLoading ? "Fetching..." : country.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#5a6478]">Country:</span>
          {["All", "US", "UK", "AU", "CA"].map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => setCountryFilter(country)}
              className={`rounded-full border px-3 py-1 text-sm cursor-pointer transition-colors active:scale-95 font-medium ${
                countryFilter === country
                  ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                  : "border-[#e2e4e9] bg-white text-[#5a6478] hover:border-[#1a1a2e]"
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#5a6478]">Type:</span>
          {["All", "Automated", "Manual"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`rounded-full border px-3 py-1 text-sm cursor-pointer transition-colors active:scale-95 font-medium ${
                typeFilter === type
                  ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                  : "border-[#e2e4e9] bg-white text-[#5a6478] hover:border-[#1a1a2e]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm font-medium text-[#5a6478]">Total count: {filteredNews.length}</div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#5a6478]">Loading news...</div>
      ) : filteredNews.length === 0 ? (
        <div className="rounded-lg border border-[#e2e4e9] bg-white py-20 text-center text-[#5a6478]">
          No news articles found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-[#e2e4e9] bg-white shadow-sm">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-[#f8f9fa] border-b border-[#e2e4e9]">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">Title</th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">Source</th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">Country</th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">Category</th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">Type</th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">Date</th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#5a6478]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item) => {
                const isAutomated = item.sourceType === "automated";

                return (
                  <tr
                    key={item._id || item.id}
                    className="group border-b border-[#e2e4e9] transition-colors duration-150 last:border-0 hover:bg-[#f8f9fa]"
                  >
                    <td className="max-w-xs truncate px-4 py-3 text-sm font-medium text-[#1a1a2e] group-hover:text-[#6aa595] transition-colors" title={item.title}>{item.title}</td>
                    <td className="px-4 py-3 text-sm text-[#5a6478]">{item.sourceName || item.source}</td>
                    <td className="px-4 py-3 text-sm text-[#5a6478]">{item.country}</td>
                    <td className="px-4 py-3 text-sm text-[#5a6478]">{item.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`whitespace-nowrap font-medium rounded-full px-2.5 py-1 text-xs ${
                          isAutomated
                            ? "bg-[#6aa595]/10 text-[#6aa595]"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {item.sourceType || "manual"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-[#5a6478]">
                      {new Date(item.publishedAt || item.createdAt || new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'})}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!isAutomated && (
                          <Link
                            href={`/admin/news/${item._id || item.id}/edit`}
                            className="px-3 py-1.5 rounded-md border border-[#e2e4e9] bg-white text-xs font-medium text-[#1a1a2e] cursor-pointer hover:border-[#1a1a2e] hover:bg-[#f8f9fa] active:scale-95 transition-colors duration-300 shadow-sm"
                          >
                            Edit
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-xs font-medium text-red-600 cursor-pointer hover:bg-red-100 hover:border-red-300 active:scale-95 transition-colors duration-300"
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

      <Dialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent className="max-w-md border border-[#e2e4e9] bg-white text-[#1a1a2e] shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a2e] font-semibold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-[#5a6478]">
              Are you sure you want to delete "{deleteTarget?.title}"? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg border border-[#e2e4e9] bg-white px-4 py-2 text-sm font-medium text-[#5a6478] cursor-pointer transition-colors hover:bg-[#f8f9fa] active:scale-95"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const targetId = deleteTarget?._id || deleteTarget?.id;
                if (!targetId) return;
                handleDelete(targetId);
                setDeleteTarget(null);
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white cursor-pointer transition-colors hover:bg-red-700 active:scale-95"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
