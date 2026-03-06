import { verifyAdminRequest as verifyAdminSession } from '@/lib/adminAuth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const auth = await verifyAdminSession(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'CRON_SECRET not configured in environment variables.' }, { status: 500 });
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_SITE_URL not configured in environment variables.' }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const country = String(body?.country || 'GENERAL').toUpperCase();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
    const response = await fetch(
      `${baseUrl}/api/cron/fetch-news?country=${encodeURIComponent(country)}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
        cache: 'no-store',
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || 'Failed to trigger news fetch.' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error triggering news fetch:', error);
    return NextResponse.json({ error: 'Failed to trigger news fetch' }, { status: 500 });
  }
}

