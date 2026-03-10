import NewsPageClient from '@/components/NewsPageClient'
import { siteUrl } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

export function generateMetadata() {
  return {
    title: 'Financial News - Stock Markets, Banking, Crypto & More | ClariVex',
    description: 'Latest financial news covering stock markets, banking, cryptocurrency, gold, oil prices, and accounting regulations for US, UK, AU & CA businesses.',
    keywords: 'financial news, stock market update, banking news, cryptocurrency news, gold price today, oil price, accounting news, US finance, UK finance, Australia finance, Canada finance',
    alternates: {
      canonical: `${siteUrl}/news`,
    },
    openGraph: {
      title: 'Financial News | ClariVex Solutions',
      description: 'Latest financial news for US, UK, AU & CA - markets, banking, crypto, commodities.',
      url: `${siteUrl}/news`,
      type: 'website',
      siteName: 'ClariVex Solutions',
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Financial News | ClariVex Solutions',
      description: 'Stock markets, banking, crypto, gold, oil - latest financial news.',
      images: [`${siteUrl}/og-image.png`],
    },
    robots: { index: true, follow: true },
  }
}

export default async function NewsPage() {
  const recentNews = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 10,
    select: { slug: true, title: true },
  })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ClariVex Financial News',
    url: `${siteUrl}/news`,
    itemListElement: recentNews.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.title,
      url: `${siteUrl}/news/${a.slug}`,
    })),
  }

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <NewsPageClient />
    </>
  )
}
