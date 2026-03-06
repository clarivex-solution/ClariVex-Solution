export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET(request) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const authHeader = request.headers.get('authorization') || '';
  const headers = { authorization: authHeader };

  const results = {};

  // Fetch US
  try {
    const usRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=US`, {
      headers,
      cache: 'no-store',
    });
    results.US = await usRes.json();
  } catch (e) {
    results.US = { error: e.message };
  }

  // Fetch CA
  try {
    const caRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=CA`, {
      headers,
      cache: 'no-store',
    });
    results.CA = await caRes.json();
  } catch (e) {
    results.CA = { error: e.message };
  }

  return NextResponse.json(results);
}
