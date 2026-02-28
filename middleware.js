import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  if (isLoginPage) return NextResponse.next()
  if (!token) return NextResponse.redirect(new URL('/admin/login', request.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
