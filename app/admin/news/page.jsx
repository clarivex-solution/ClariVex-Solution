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
    <div className="min-h-screen bg-[#0d0f14] p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">News Management</h1>
        <Link
          href="/admin/news/new"
          className="rounded-lg bg-[#5a688e] px-4 py-2.5 text-white cursor-pointer transition hover:bg-[#4a5573] active:scale-95"
        >
          Add Manual News
        </Link>
      </div>

      <div className="mb-6 rounded-xl border border-[#1e2330] bg-[#13161e] p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Manual News Fetch</h2>
        <p className="mb-4 text-xs text-[#8892a4]">
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
                className={`rounded-lg border border-[#1e2330] px-4 py-2 text-xs font-medium text-[#8892a4] cursor-pointer transition-colors hover:border-[#5a688e]/50 hover:text-white active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
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
          <span className="text-sm text-[#8892a4]">Country:</span>
          {["All", "US", "UK", "AU", "CA"].map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => setCountryFilter(country)}
              className={`rounded-full border px-3 py-1 text-sm cursor-pointer transition-colors active:scale-95 ${
                countryFilter === country
                  ? "border-[#5a688e] bg-[#5a688e] text-white"
                  : "border-[#1e2330] bg-transparent text-[#8892a4] hover:border-[#5a688e]"
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#8892a4]">Type:</span>
          {["All", "Automated", "Manual"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`rounded-full border px-3 py-1 text-sm cursor-pointer transition-colors active:scale-95 ${
                typeFilter === type
                  ? "border-[#5a688e] bg-[#5a688e] text-white"
                  : "border-[#1e2330] bg-transparent text-[#8892a4] hover:border-[#5a688e]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-[#8892a4]">Total count: {filteredNews.length}</div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#8892a4]">Loading news...</div>
      ) : filteredNews.length === 0 ? (
        <div className="rounded-lg border border-[#1e2330] py-20 text-center text-[#8892a4]">
          No news articles found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-[#1e2330]">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#1e2330] bg-[#1e2330]/50">
                <th className="px-4 py-3 text-sm font-medium text-[#8892a4]">Title</th>
                <th className="px-4 py-3 text-sm font-medium text-[#8892a4]">Source</th>
                <th className="px-4 py-3 text-sm font-medium text-[#8892a4]">Country</th>
                <th className="px-4 py-3 text-sm font-medium text-[#8892a4]">Category</th>
                <th className="px-4 py-3 text-sm font-medium text-[#8892a4]">Type</th>
                <th className="px-4 py-3 text-sm font-medium text-[#8892a4]">Date</th>
                <th className="px-4 py-3 text-sm font-medium text-[#8892a4]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item) => {
                const isAutomated = item.sourceType === "automated";

                return (
                  <tr
                    key={item._id || item.id}
                    className="group border-b border-[#1e2330] transition-colors duration-150 last:border-0 hover:bg-[#5a688e]/5"
                  >
                    <td className="max-w-xs truncate px-4 py-3" title={item.title}>{item.title}</td>
                    <td className="px-4 py-3">{item.sourceName || item.source}</td>
                    <td className="px-4 py-3">{item.country}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`whitespace-nowrap rounded px-2 py-1 text-xs ${
                          isAutomated
                            ? "border border-blue-500/30 bg-blue-500/20 text-blue-400"
                            : "border border-purple-500/30 bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {item.sourceType || "manual"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-[#8892a4]">
                      {new Date(item.publishedAt || item.createdAt || new Date()).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        {!isAutomated && (
                          <Link
                            href={`/admin/news/${item._id || item.id}/edit`}
                            className="text-blue-400 transition hover:text-blue-300"
                          >
                            Edit
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="cursor-pointer text-red-400 transition hover:text-red-300"
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
        <DialogContent className="max-w-md border border-[#1e2330] bg-[#13161e] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Delete</DialogTitle>
            <DialogDescription className="text-[#8892a4]">
              Are you sure you want to delete "{deleteTarget?.title}"? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-lg border border-[#1e2330] px-4 py-2 text-sm font-medium text-[#8892a4] cursor-pointer transition-colors hover:bg-[#1e2330] active:scale-95"
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
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white cursor-pointer transition-colors hover:bg-red-600 active:scale-95"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
