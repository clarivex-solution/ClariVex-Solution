import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { password } = await request.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await prisma.adminSession.create({ data: { token, expiresAt } })
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true, sameSite: 'strict', path: '/', expires: expiresAt,
  })
  return response
}
