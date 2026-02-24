import { geoToCountry } from '@/lib/countryData'
import { NextResponse } from 'next/server'

export function middleware(request) {
  const geo = request.geo?.country || 'US'
  const detected = geoToCountry[geo] || 'us'
  const response = NextResponse.next()

  // Only set cookie if user hasn't manually selected
  const existing = request.cookies.get('preferred-country')
  if (!existing) {
    response.cookies.set('preferred-country', detected, {
      maxAge: 86400,
      path: '/',
    })
  }

  return response
}

export const config = {
  matcher: ['/', '/us', '/uk', '/au', '/ca', '/blog/:path*', '/news/:path*', '/services/:path*'],
}
