export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

const GEO_MAP = { US: 'us', GB: 'uk', CA: 'ca', AU: 'au' }

/**
 * Returns the visitor's country code using Vercel's free built-in geo header.
 * Works with ad blockers. No external API. No rate limits.
 * Used by CountryProvider.jsx instead of ipapi.co
 */
export async function GET(request) {
  const countryCode = request.headers.get('x-vercel-ip-country') || ''
  const country = GEO_MAP[countryCode] || 'general'
  return NextResponse.json({ country })
}
