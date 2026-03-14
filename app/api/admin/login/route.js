import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const loginAttempts = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxAttempts = 5

  const record = loginAttempts.get(ip)

  if (!record || now - record.firstAttempt > windowMs) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now })
    return false
  }

  if (record.count >= maxAttempts) {
    return true
  }

  record.count += 1
  return false
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many login attempts. Please try again in 15 minutes.' },
      { status: 429 },
    )
  }

  const { password } = await request.json()
  const inputPassword = String(password || '')

  // Check for a stored bcrypt hash in DB (set after first password reset)
  const credential = await prisma.adminCredential.findFirst()

  const isValid = credential?.passwordHash
    ? await bcrypt.compare(inputPassword, credential.passwordHash)
    : process.env.ADMIN_PASSWORD_HASH
      ? await bcrypt.compare(inputPassword, process.env.ADMIN_PASSWORD_HASH)
      : inputPassword === String(process.env.ADMIN_PASSWORD || '')

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  loginAttempts.delete(ip)

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
