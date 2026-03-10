import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { password } = await request.json()

  // Check for a stored bcrypt hash in DB (set after first password reset)
  const credential = await prisma.adminCredential.findFirst()

  const isValid = credential
    ? await bcrypt.compare(password, credential.passwordHash)
    : process.env.ADMIN_PASSWORD_HASH
      ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
      : password === process.env.ADMIN_PASSWORD

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await prisma.adminSession.create({ data: { token, expiresAt } })

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    expires: expiresAt,
  })

  return response
}
