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
        <h1 className="text-3xl font-playfair text-white">Dashboard</h1>
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
          className="px-6 py-2.5 rounded-full border border-[#5a688e] text-[#5a688e] hover:bg-[#5a688e] hover:text-white transition-colors duration-300 font-medium"
        >
          New Blog Post
        </Link>
        <Link
          href="/admin/news/new"
          className="px-6 py-2.5 rounded-full border border-[#5a688e] text-[#5a688e] hover:bg-[#5a688e] hover:text-white transition-colors duration-300 font-medium"
        >
          Add News
        </Link>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#13161e] border border-[#1e2330] rounded-xl p-6 transition-transform hover:-translate-y-1 duration-300 cursor-pointer transition-all hover:border-[#5a688e]/60 hover:shadow-lg hover:-translate-y-0.5">
      <p className="text-[#8892a4] text-sm font-medium mb-2">{title}</p>
      <p className="text-4xl text-white font-inter font-light">{value}</p>
    </div>
  )
}
