import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const token = request.cookies.get('admin_token')?.value
  if (token) await prisma.adminSession.deleteMany({ where: { token } })

  const response = NextResponse.redirect(new URL('/admin/login', request.url))

  // Clear the auth cookie
  response.cookies.set('admin_token', '', {
    expires: new Date(0),
    path: '/',
    httpOnly: true,
    sameSite: 'strict'
  })

  // Prevent browser from caching admin pages in bfcache or regular cache
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  response.headers.set('Pragma', 'no-cache')
  // This header explicitly tells browser to not use bfcache
  response.headers.set('Clear-Site-Data', '"cache"')

  return response
}
