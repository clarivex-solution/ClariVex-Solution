export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { BookOpen, FileText, Globe, PenSquare } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [totalBlogs, publishedBlogs, draftBlogs, totalNews] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: 'published' } }),
    prisma.blog.count({ where: { status: 'draft' } }),
    prisma.newsArticle.count(),
  ]);

  const stats = [
    { title: 'Total Blogs',      value: totalBlogs,      href: '/admin/blog',              icon: BookOpen,   color: 'text-[#6aa595]', bg: 'bg-[#6aa595]/10' },
    { title: 'Published',        value: publishedBlogs,  href: '/admin/blog?filter=published', icon: Globe,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Drafts',           value: draftBlogs,      href: '/admin/blog?filter=draft',  icon: FileText,   color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Total News',       value: totalNews,       href: '/admin/news',              icon: PenSquare,  color: 'text-[#5a688e]', bg: 'bg-[#5a688e]/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <div className="h-px w-12 bg-[#c9a96e] mb-4" />
        <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] text-[#1a1a2e] font-semibold">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[#5a6478]">Welcome back — here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className="bg-white border border-[#e2e4e9] rounded-xl p-4 sm:p-6 transition-all duration-300 cursor-pointer hover:border-[#6aa595]/40 hover:shadow-md hover:-translate-y-0.5 group">
              <div className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${stat.bg} mb-3`}>
                <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
              </div>
              <p className="text-[11px] sm:text-xs text-[#5a6478] font-medium mb-1 uppercase tracking-wide">
                {stat.title}
              </p>
              <p className="text-3xl sm:text-4xl text-[#1a1a2e] font-light">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-[#e2e4e9] rounded-xl p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-[#1a1a2e] mb-4 uppercase tracking-wide">
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/admin/blog/new"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1a1a2e] text-white text-sm font-medium cursor-pointer transition-all hover:bg-[#6aa595] active:scale-95"
          >
            <PenSquare className="h-4 w-4" />
            New Blog Post
          </Link>
          <Link
            href="/admin/news/new"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] text-sm font-medium cursor-pointer transition-all hover:bg-[#1a1a2e] hover:text-white active:scale-95"
          >
            <Globe className="h-4 w-4" />
            Add News Article
          </Link>
        </div>
      </div>

      {/* Nav shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Link href="/admin/blog">
          <div className="bg-white border border-[#e2e4e9] rounded-xl p-5 hover:border-[#6aa595]/40 hover:shadow-sm transition-all duration-200 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#1a1a2e] group-hover:text-[#6aa595] transition-colors">Manage Blog</p>
                <p className="text-sm text-[#5a6478] mt-0.5">{totalBlogs} posts · {draftBlogs} drafts</p>
              </div>
              <BookOpen className="h-5 w-5 text-[#e2e4e9] group-hover:text-[#6aa595] transition-colors" />
            </div>
          </div>
        </Link>
        <Link href="/admin/news">
          <div className="bg-white border border-[#e2e4e9] rounded-xl p-5 hover:border-[#6aa595]/40 hover:shadow-sm transition-all duration-200 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#1a1a2e] group-hover:text-[#6aa595] transition-colors">Manage News</p>
                <p className="text-sm text-[#5a6478] mt-0.5">{totalNews} articles total</p>
              </div>
              <Globe className="h-5 w-5 text-[#e2e4e9] group-hover:text-[#6aa595] transition-colors" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
