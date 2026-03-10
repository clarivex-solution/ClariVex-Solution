import { siteUrl } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

const services = [
  'bookkeeping', 'reconciliation', 'ap-support', 'ar-support',
  'payroll', 'tax-planning', 'audit', 'advisory', 'data-security',
]

export default async function sitemap() {
  const now = new Date().toISOString()

  const [blogs, newsArticles] = await Promise.all([
    prisma.blog.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    }),
    prisma.newsArticle.findMany({
      select: { slug: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    }),
  ])

  const staticRoutes = [
    { url: siteUrl, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${siteUrl}/us`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${siteUrl}/uk`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${siteUrl}/au`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${siteUrl}/ca`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${siteUrl}/blog`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${siteUrl}/news`, lastModified: now, priority: 0.9, changeFrequency: 'daily' },
    { url: `${siteUrl}/terms`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${siteUrl}/privacy`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
  ]

  const serviceRoutes = services.map(slug => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  const blogRoutes = blogs.map(b => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt?.toISOString() || now,
    priority: 0.7,
    changeFrequency: 'weekly',
  }))

  const newsRoutes = newsArticles.map(a => ({
    url: `${siteUrl}/news/${a.slug}`,
    lastModified: a.publishedAt?.toISOString() || now,
    priority: 0.8,
    changeFrequency: 'daily',
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...newsRoutes]
}
