export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '200'), 500);
    const cursor = searchParams.get('cursor') || undefined;

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
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });

    const nextCursor =
      newsArticles.length === limit ? newsArticles[newsArticles.length - 1].id : null;

    return NextResponse.json({ articles: newsArticles, nextCursor });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
