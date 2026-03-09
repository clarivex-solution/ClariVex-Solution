import { NextResponse } from 'next/server'

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Only apply to admin routes (excluding login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value

    // No token — redirect to login immediately
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Token exists — let the request through but set no-cache headers
    // so the browser back button always re-requests from server
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
