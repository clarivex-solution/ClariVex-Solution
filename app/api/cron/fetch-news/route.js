import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const API_KEY = process.env.NEWS_API_KEY;
    if (!API_KEY) {
      console.error('NEWS_API_KEY is not defined');
      return NextResponse.json({ error: 'News API key configuration error' }, { status: 500 });
    }

    const countries = [
      { code: 'us', name: 'US' },
      { code: 'gb', name: 'UK' },
      { code: 'au', name: 'AU' },
      { code: 'ca', name: 'CA' },
    ];

    const fetchPromises = countries.map(country =>
      fetch(`https://gnews.io/api/v4/top-headlines?category=business&country=${country.code}&max=20&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => ({ country: country.name, data }))
    );

    const results = await Promise.all(fetchPromises);
    let totalCount = 0;

    for (const result of results) {
      if (!result.data.articles) {
        console.error(`Error fetching news for ${result.country}:`, result.data.message || 'Unknown error');
        continue;
      }

      for (const article of result.data.articles) {
        if (!article.url || article.title === '[Removed]') continue;

        const blockedUrlExists = await prisma.blockedUrl.findUnique({
          where: { url: article.url }
        });
        if (blockedUrlExists) continue;

        const existingArticle = await prisma.newsArticle.findFirst({
          where: { url: article.url }
        });
        if (existingArticle) continue;

        const baseSlug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 70);
        const slug = `${baseSlug}-${Date.now()}`;

        await prisma.newsArticle.create({
          data: {
            title: article.title,
            slug,
            summary: article.description || article.title,
            url: article.url,
            source: article.source?.name || 'Unknown',
            category: 'Business',
            country: result.country,
            sourceType: 'automated',
            publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
          }
        });

        totalCount++;
      }
    }

    return NextResponse.json({ success: true, saved: totalCount });

  } catch (error) {
    console.error('Error in news cron job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
