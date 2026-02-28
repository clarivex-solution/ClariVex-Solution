"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    url: "",
    source: "",
    category: "Business",
    country: "US",
    publishedAt: "",
  });

  const categories = [
    "Business", "Tax Compliance", "Payroll", "Regulation Update",
    "Policy", "VAT", "GST-HST", "Platform Update"
  ];

  const countries = ["US", "UK", "AU", "CA", "All"];

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/admin/news/${id}`);
        if (res.ok) {
          const article = await res.json();
          setFormData({
            title: article.title || "",
            slug: article.slug || "",
            summary: article.summary || "",
            url: article.url || "",
            source: article.source || "",
            category: article.category || "Business",
            country: article.country || "US",
            publishedAt: article.publishedAt
              ? new Date(article.publishedAt).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],
          });
        } else {
          alert("Article not found");
          router.push("/admin/news");
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchArticle();
  }, [id, router]);

  const generateSlug = (title) =>
    title.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData({ ...formData, title: value, slug: generateSlug(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/news");
      } else {
        const error = await res.json();
        alert(`Failed to update: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to update news:", error);
      alert("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6 bg-[#0d0f14] min-h-screen text-white flex justify-center items-center">
        <div className="text-[#8892a4]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0d0f14] min-h-screen text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit News Article</h1>
          <Link href="/admin/news" className="text-[#8892a4] hover:text-white transition">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[#8892a4] text-sm">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e]" />
          </div>

          <div className="space-y-2">
            <label className="block text-[#8892a4] text-sm">Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required
              className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e]" />
          </div>

          <div className="space-y-2">
            <label className="block text-[#8892a4] text-sm">Summary</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} required rows={4}
              className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[#8892a4] text-sm">Source Name</label>
              <input type="text" name="source" value={formData.source} onChange={handleChange} required
                className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e]" />
            </div>

            <div className="space-y-2">
              <label className="block text-[#8892a4] text-sm">Source URL (Optional)</label>
              <input type="url" name="url" value={formData.url} onChange={handleChange}
                className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e]" />
            </div>

            <div className="space-y-2">
              <label className="block text-[#8892a4] text-sm">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required
                className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e] appearance-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[#8892a4] text-sm">Country</label>
              <select name="country" value={formData.country} onChange={handleChange} required
                className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e] appearance-none">
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[#8892a4] text-sm">Published Date</label>
              <input type="date" name="publishedAt" value={formData.publishedAt} onChange={handleChange} required
                className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5a688e]" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading}
              className="bg-[#5a688e] hover:bg-[#4a5573] text-white px-6 py-2.5 rounded-lg transition disabled:opacity-50">
              {loading ? "Saving..." : "Update News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
