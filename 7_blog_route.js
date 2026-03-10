export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '200'), 500);
    const cursor = searchParams.get('cursor') || undefined;

    const blogs = await prisma.blog.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        country: true,
        publishedAt: true,
      },
    });

    const nextCursor = blogs.length === limit ? blogs[blogs.length - 1].id : null;

    return NextResponse.json({ blogs, nextCursor });
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
