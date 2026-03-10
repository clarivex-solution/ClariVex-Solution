import { NextResponse } from 'next/server'

const PUBLIC_ADMIN_PATHS = new Set([
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
  '/admin/reset-password-link',
])

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Only apply auth gate to protected admin routes.
  if (pathname.startsWith('/admin') && !PUBLIC_ADMIN_PATHS.has(pathname)) {
    const token = request.cookies.get('admin_token')?.value

    // No token - redirect to login immediately.
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Token exists - force no-cache so back button always hits server.
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

