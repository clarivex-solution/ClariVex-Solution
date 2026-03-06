export const dynamic = 'force-dynamic';

import { fetchAndSaveNews } from '@/services/newsAggregator';
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Allow Vercel's own cron scheduler (sends x-vercel-cron header)
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const authHeader = request.headers.get('authorization');

  if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country') || 'GENERAL';
  const since = searchParams.get('since') || null;

  try {
    const result = await fetchAndSaveNews({ country, since });
    return NextResponse.json({ ...result, status: 'ok' });
  } catch (error) {
    console.error('Cron fetch-news error:', error);
    return NextResponse.json(
      { error: 'Internal server error', detail: error.message },
      { status: 500 }
    );
  }
}
