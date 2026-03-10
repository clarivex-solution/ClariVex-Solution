import { siteUrl } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

// Google News requires only articles from the last 2 days
export default async function newsSitemap() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)

  const articles = await prisma.newsArticle.findMany({
    where: { publishedAt: { gte: twoDaysAgo } },
    select: { slug: true, publishedAt: true },
    orderBy: { publishedAt: 'desc' },
    take: 1000,
  })

  return articles.map(a => ({
    url: `${siteUrl}/news/${a.slug}`,
    lastModified: a.publishedAt,
    changeFrequency: 'daily',
    priority: 0.9,
  }))
}
