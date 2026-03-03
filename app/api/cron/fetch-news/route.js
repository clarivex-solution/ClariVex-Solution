import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function toSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').substring(0, 80)
}

function categoriseArticle(title) {
  const t = title.toLowerCase()
  if (t.includes('payroll') || t.includes('wage') || t.includes('pension') || t.includes('super')) return 'Payroll'
  if (t.includes('vat') || t.includes('gst') || t.includes('tax') || t.includes('irs') || t.includes('hmrc') || t.includes('ato') || t.includes('cra')) return 'Tax Compliance'
  if (t.includes('regulation') || t.includes('compliance') || t.includes('law') || t.includes('act')) return 'Regulation Update'
  if (t.includes('bookkeeping') || t.includes('accounting') || t.includes('reconcil')) return 'Bookkeeping'
  return 'Tax Compliance'
}

const FINANCE_KEYWORDS = ['tax', 'accounting', 'payroll', 'bookkeeping', 'financial', 'finance', 'irs', 'hmrc', 'ato', 'cra', 'gst', 'vat', 'income tax', 'corporation tax', 'superannuation', 'pension', 'audit', 'compliance', 'revenue', 'deduction', 'withholding']

const QUERIES = {
  US: ['IRS tax accounting small business', 'US payroll compliance 2026', 'federal tax regulation finance'],
  UK: ['HMRC tax accounting business', 'UK payroll pension compliance', 'Companies House financial regulation'],
  AU: ['ATO tax accounting small business', 'superannuation payroll Australia', 'ASIC financial regulation'],
  CA: ['CRA tax accounting business', 'Canada payroll CPP compliance', 'Canadian financial regulation'],
  GENERAL: ['international accounting standards IFRS', 'global tax compliance finance']
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')?.toUpperCase() || 'GENERAL'

    const API_KEY = process.env.GNEWS_API_KEY
    if (!API_KEY) {
      return NextResponse.json({ error: 'News API key configuration error' }, { status: 500 })
    }

    const queries = QUERIES[country] || QUERIES.GENERAL
    let fetched = 0
    let saved = 0
    let skipped = 0

    for (const query of queries) {
      const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=5&apikey=${API_KEY}`
      const res = await fetch(apiUrl, { cache: 'no-store' })
      const data = await res.json()

      if (!data.articles) continue
      fetched += data.articles.length

      for (const article of data.articles) {
        if (!article.url || article.title === '[Removed]') { skipped++; continue }

        const hasFinanceKeyword = FINANCE_KEYWORDS.some(kw =>
          article.title?.toLowerCase().includes(kw) || article.description?.toLowerCase().includes(kw)
        )
        if (!hasFinanceKeyword) { skipped++; continue }

        const blocked = await prisma.blockedUrl.findUnique({ where: { url: article.url } })
        if (blocked) { skipped++; continue }

        const slug = toSlug(article.title)

        await prisma.newsArticle.upsert({
          where: { slug },
          update: {},
          create: {
            title: article.title,
            slug,
            summary: article.description || article.title,
            url: article.url,
            source: article.source?.name || 'Unknown',
            category: categoriseArticle(article.title),
            country,
            sourceType: 'automated',
            publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
          }
        })
        saved++
      }
    }

    return NextResponse.json({ fetched, saved, skipped, country })

  } catch (error) {
    console.error('Error in news cron:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
