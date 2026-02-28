import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const token = request.cookies.get('admin_token')?.value
  if (token) await prisma.adminSession.deleteMany({ where: { token } })
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', '', { expires: new Date(0), path: '/' })
  return response
}
