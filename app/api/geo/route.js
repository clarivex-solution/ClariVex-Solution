import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const countryCode = request.headers.get('x-vercel-ip-country') || ''
  const GEO_MAP = { US: 'us', GB: 'uk', CA: 'ca', AU: 'au' }
  const country = GEO_MAP[countryCode] || 'general'
  return NextResponse.json({ country })
}
