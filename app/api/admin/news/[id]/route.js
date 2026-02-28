import { verifyAdminRequest } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const article = await prisma.newsArticle.findUnique({ where: { id } });
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const updatedArticle = await prisma.newsArticle.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        summary: body.summary,
        url: body.url || null,
        source: body.source,
        category: body.category,
        country: body.country,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      },
    });
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const article = await prisma.newsArticle.findUnique({ where: { id } });
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (article.sourceType === 'automated' && article.url) {
      await prisma.blockedUrl.upsert({
        where: { url: article.url },
        update: {},
        create: { url: article.url },
      });
    }
    await prisma.newsArticle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
