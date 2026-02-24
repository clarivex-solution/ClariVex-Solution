import { NextResponse } from 'next/server'

export function middleware(request) {
  const geo = request.geo?.country || 'US'

  const geoMap = {
    US: 'us', CA: 'ca',
    GB: 'uk', IE: 'uk',
    AU: 'au', NZ: 'au',
  }

  const detected = geoMap[geo] || 'us'
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
