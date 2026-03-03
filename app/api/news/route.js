import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const newsArticles = await prisma.newsArticle.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        url: true,
        source: true,
        category: true,
        country: true,
        sourceType: true,
        publishedAt: true,
        createdAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json(newsArticles);
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
