export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [totalBlogs, publishedBlogs, draftBlogs, totalNews] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: 'published' } }),
    prisma.blog.count({ where: { status: 'draft' } }),
    prisma.newsArticle.count(),
  ])

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <div className="h-px w-12 bg-[#c9a96e] mb-4"></div>
        <h1 className="text-3xl font-playfair text-[#1a1a2e] font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/blog">
          <StatCard title="Total Blogs" value={totalBlogs} />
        </Link>
        <Link href="/admin/blog?filter=published">
          <StatCard title="Published Blogs" value={publishedBlogs} />
        </Link>
        <Link href="/admin/blog?filter=draft">
          <StatCard title="Draft Blogs" value={draftBlogs} />
        </Link>
        <Link href="/admin/news">
          <StatCard title="Total News" value={totalNews} />
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <Link
          href="/admin/blog/new"
          className="px-6 py-2.5 rounded-full border border-[#1a1a2e] text-[#1a1a2e] bg-transparent cursor-pointer hover:bg-[#1a1a2e] hover:text-white active:scale-95 transition-colors duration-300 font-medium"
        >
          New Blog Post
        </Link>
        <Link
          href="/admin/news/new"
          className="px-6 py-2.5 rounded-full border border-[#1a1a2e] text-[#1a1a2e] bg-transparent cursor-pointer hover:bg-[#1a1a2e] hover:text-white active:scale-95 transition-colors duration-300 font-medium"
        >
          Add News
        </Link>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-[#e2e4e9] rounded-xl p-6 transition-all duration-300 cursor-pointer hover:border-[#6aa595]/40 hover:shadow-md hover:-translate-y-1">
      <p className="text-[#5a6478] text-sm font-medium mb-2">{title}</p>
      <p className="text-4xl text-[#1a1a2e] font-inter font-light">{value}</p>
    </div>
  )
}
