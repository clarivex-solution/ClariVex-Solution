import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
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

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
