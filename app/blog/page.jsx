import BlogPageClient from '@/components/BlogPageClient'
import { siteUrl } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

export function generateMetadata() {
  return {
    title: 'Accounting & Finance Blog | ClariVex Solution',
    description: 'Expert insights on bookkeeping, tax compliance, payroll, and financial management for US, UK, AU, and CA businesses.',
    keywords: 'accounting blog, bookkeeping tips, tax compliance, payroll guide, financial advice, HMRC, IRS, ATO, CRA, outsourced accounting',
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
    openGraph: {
      title: 'Accounting & Finance Blog | ClariVex Solution',
      description: 'Expert accounting and finance insights for US, UK, AU & CA businesses.',
      url: `${siteUrl}/blog`,
      type: 'website',
      siteName: 'ClariVex Solution',
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Accounting & Finance Blog | ClariVex Solution',
      description: 'Expert accounting insights for US, UK, AU & CA businesses.',
      images: [`${siteUrl}/og-image.png`],
    },
    robots: { index: true, follow: true },
  }
}

export default async function BlogPage() {
  const recentBlogs = await prisma.blog.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: 10,
    select: { slug: true, title: true },
  })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ClariVex Accounting & Finance Blog',
    url: `${siteUrl}/blog`,
    publisher: { '@type': 'Organization', name: 'ClariVex Solution', url: siteUrl },
    blogPost: recentBlogs.map((b, i) => ({
      '@type': 'BlogPosting',
      position: i + 1,
      headline: b.title,
      url: `${siteUrl}/blog/${b.slug}`,
    })),
  }

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <BlogPageClient />
    </>
  )
}
