"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const router = useRouter();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) {
        const data = await res.json();
        setNews(Array.isArray(data) ? data : (data.news || []));
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchNews();
      } else {
        alert("Failed to delete the article.");
      }
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  const filteredNews = news.filter((item) => {
    const matchCountry = countryFilter === "All" || item.country === countryFilter;
    const matchType = typeFilter === "All" || item.sourceType?.toLowerCase() === typeFilter.toLowerCase();

    return matchCountry && matchType;
  });

  return (
    <div className="p-6 bg-[#0d0f14] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Management</h1>
        <Link
          href="/admin/news/new"
          className="bg-[#5a688e] hover:bg-[#4a5573] text-white px-4 py-2.5 rounded-lg transition"
        >
          Add Manual News
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-[#8892a4] text-sm">Country:</span>
          {["All", "US", "UK", "AU", "CA"].map((c) => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              className={`px-3 py-1 rounded-full text-sm border ${
                countryFilter === c
                  ? "bg-[#5a688e] border-[#5a688e] text-white"
                  : "bg-transparent border-[#1e2330] text-[#8892a4] hover:border-[#5a688e]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-[#8892a4] text-sm">Type:</span>
          {["All", "Automated", "Manual"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-full text-sm border ${
                typeFilter === t
                  ? "bg-[#5a688e] border-[#5a688e] text-white"
                  : "bg-transparent border-[#1e2330] text-[#8892a4] hover:border-[#5a688e]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-[#8892a4] text-sm">
        Total count: {filteredNews.length}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-[#8892a4]">
          Loading news...
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-20 border border-[#1e2330] rounded-lg text-[#8892a4]">
          No news articles found.
        </div>
      ) : (
        <div className="overflow-x-auto border border-[#1e2330] rounded-lg">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#1e2330]/50 border-b border-[#1e2330]">
                <th className="px-4 py-3 text-[#8892a4] font-medium text-sm">Title</th>
                <th className="px-4 py-3 text-[#8892a4] font-medium text-sm">Source</th>
                <th className="px-4 py-3 text-[#8892a4] font-medium text-sm">Country</th>
                <th className="px-4 py-3 text-[#8892a4] font-medium text-sm">Category</th>
                <th className="px-4 py-3 text-[#8892a4] font-medium text-sm">Type</th>
                <th className="px-4 py-3 text-[#8892a4] font-medium text-sm">Date</th>
                <th className="px-4 py-3 text-[#8892a4] font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item) => {
                const isAutomated = item.sourceType === "automated";

                return (
                  <tr key={item._id || item.id} className="border-b border-[#1e2330] last:border-0 hover:bg-[#1e2330]/30 transition">
                    <td className="px-4 py-3 max-w-xs truncate" title={item.title}>{item.title}</td>
                    <td className="px-4 py-3">{item.sourceName || item.source}</td>
                    <td className="px-4 py-3">{item.country}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                        isAutomated
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}>
                        {item.sourceType || "manual"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#8892a4] text-sm whitespace-nowrap">
                      {new Date(item.publishedDate || item.createdAt || new Date()).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        {!isAutomated && (
                          <Link
                            href={`/admin/news/${item._id || item.id}/edit`}
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            Edit
                          </Link>
                        )}
                        <button
                          onClick={() => handleDelete(item._id || item.id)}
                          className="text-red-400 hover:text-red-300 transition"
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
    </div>
  );
}
