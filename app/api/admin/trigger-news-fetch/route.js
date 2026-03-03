import { verifyAdminRequest as verifyAdminSession } from '@/lib/adminAuth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const auth = await verifyAdminSession(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { country } = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/cron/fetch-news?country=${country}`,
      {
        headers: {
          authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
        cache: 'no-store',
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error triggering news fetch:', error);
    return NextResponse.json({ error: 'Failed to trigger news fetch' }, { status: 500 });
  }
}
