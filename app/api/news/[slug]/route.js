export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const newsArticle = await prisma.newsArticle.findUnique({
      where: { slug },
    });

    if (!newsArticle) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(newsArticle);
  } catch (error) {
    console.error('Error fetching news article by slug:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

