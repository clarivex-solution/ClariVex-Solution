"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["Business", "Tax Compliance", "Payroll", "Regulation Update", "Policy", "VAT", "GST-HST", "Platform Update"];
const COUNTRIES = ["US", "UK", "AU", "CA", "All"];

function generateSlug(title) {
  return title.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const fieldClass = "w-full bg-white border border-[#e2e4e9] text-[#1a1a2e] rounded-lg px-4 py-2.5 text-sm placeholder-[#8892a4] focus:outline-none focus:ring-2 focus:ring-[#6aa595]/30 focus:border-[#6aa595] transition-colors";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-[#5a6478] mb-1.5";

export default function NewNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    url: "",
    source: "",
    category: "Business",
    country: "US",
    publishedAt: new Date().toISOString().split('T')[0],
  });

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
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("News article added.");
        router.push("/admin/news");
      } else {
        const error = await res.json();
        toast.error(`Failed to save: ${error.error || "Unknown error"}`);
      }
    } catch {
      toast.error("Failed to add. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-px w-12 bg-[#c9a96e] mb-3" />
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] text-[#1a1a2e] font-semibold">Add Manual News</h1>
          <p className="mt-1 text-sm text-[#5a6478]">Create a manually curated news article</p>
        </div>
        <Link href="/admin/news" className="shrink-0 text-sm text-[#5a6478] hover:text-[#1a1a2e] font-medium transition-colors pt-1">
          ← Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#e2e4e9] rounded-xl p-5 sm:p-6 space-y-5">
        {/* Title */}
        <div>
          <label className={labelClass}>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className={fieldClass} placeholder="Article headline" />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>Slug <span className="normal-case text-[10px] text-[#8892a4] font-normal">(auto-generated)</span></label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className={fieldClass} placeholder="article-slug" />
        </div>

        {/* Summary */}
        <div>
          <label className={labelClass}>Summary</label>
          <textarea name="summary" value={formData.summary} onChange={handleChange} required rows={4}
            className={`${fieldClass} resize-y`} placeholder="Brief description of the article…" />
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Source Name</label>
            <input type="text" name="source" value={formData.source} onChange={handleChange} required className={fieldClass} placeholder="e.g. Reuters" />
          </div>
          <div>
            <label className={labelClass}>Source URL <span className="normal-case text-[10px] text-[#8892a4] font-normal">(optional)</span></label>
            <input type="url" name="url" value={formData.url} onChange={handleChange} className={fieldClass} placeholder="https://…" />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className={fieldClass}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <select name="country" value={formData.country} onChange={handleChange} required className={fieldClass}>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Published Date</label>
            <input type="date" name="publishedAt" value={formData.publishedAt} onChange={handleChange} required className={fieldClass} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#e2e4e9]">
          <Link href="/admin/news" className="px-5 py-2.5 rounded-full border border-[#e2e4e9] text-sm font-medium text-[#5a6478] hover:border-[#1a1a2e] hover:text-[#1a1a2e] transition-all active:scale-95">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-[#1a1a2e] text-white text-sm font-medium cursor-pointer hover:bg-[#6aa595] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving…" : "Save Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
