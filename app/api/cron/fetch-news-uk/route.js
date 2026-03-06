export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET(request) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const authHeader = request.headers.get('authorization') || '';
  const headers = { authorization: authHeader };

  const results = {};

  // Fetch UK
  try {
    const ukRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=UK`, {
      headers,
      cache: 'no-store',
    });
    results.UK = await ukRes.json();
  } catch (e) {
    results.UK = { error: e.message };
  }

  // Fetch AU
  try {
    const auRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=AU`, {
      headers,
      cache: 'no-store',
    });
    results.AU = await auRes.json();
  } catch (e) {
    results.AU = { error: e.message };
  }

  // Fetch GENERAL
  try {
    const genRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=GENERAL`, {
      headers,
      cache: 'no-store',
    });
    results.GENERAL = await genRes.json();
  } catch (e) {
    results.GENERAL = { error: e.message };
  }

  return NextResponse.json(results);
}
