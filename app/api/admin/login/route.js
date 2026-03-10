import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { password } = await request.json()

  // Compare against bcrypt hash stored in env
  // To generate a hash: node -e "require('bcryptjs').hash('yourpassword',12).then(console.log)"
  const passwordHash = process.env.ADMIN_PASSWORD_HASH

  // Fallback: plain text comparison if hash not configured yet
  const isValid = passwordHash
    ? await bcrypt.compare(password, passwordHash)
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
