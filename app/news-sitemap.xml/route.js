import { siteUrl } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600

export async function GET() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)

  const articles = await prisma.newsArticle.findMany({
    where: { publishedAt: { gte: twoDaysAgo } },
    select: { slug: true, publishedAt: true },
    orderBy: { publishedAt: 'desc' },
    take: 1000,
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${articles
  .map(
    (article) => `  <url>
    <loc>${siteUrl}/news/${article.slug}</loc>
    <lastmod>${article.publishedAt?.toISOString() ?? new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
