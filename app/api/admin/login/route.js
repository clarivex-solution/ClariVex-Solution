import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const MAX_LOGIN_ATTEMPTS = 5
const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000
const loginAttempts = new Map()

function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  return request.headers.get('x-real-ip') || 'unknown'
}

function cleanupExpiredLoginAttempts(now) {
  for (const [ip, entry] of loginAttempts.entries()) {
    const timestamps = entry.timestamps.filter(
      (timestamp) => now - timestamp < LOGIN_ATTEMPT_WINDOW_MS,
    )

    if (timestamps.length === 0) {
      loginAttempts.delete(ip)
      continue
    }

    loginAttempts.set(ip, { count: timestamps.length, timestamps })
  }
}

function getActiveAttemptTimestamps(ip, now) {
  const entry = loginAttempts.get(ip)

  if (!entry) {
    return []
  }

  return entry.timestamps.filter(
    (timestamp) => now - timestamp < LOGIN_ATTEMPT_WINDOW_MS,
  )
}

function recordFailedLoginAttempt(ip, now) {
  const timestamps = getActiveAttemptTimestamps(ip, now)
  timestamps.push(now)
  loginAttempts.set(ip, { count: timestamps.length, timestamps })
}

export async function POST(request) {
  const now = Date.now()
  const ip = getClientIp(request)

  cleanupExpiredLoginAttempts(now)

  if (getActiveAttemptTimestamps(ip, now).length >= MAX_LOGIN_ATTEMPTS) {
    return NextResponse.json(
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
    recordFailedLoginAttempt(ip, now)
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
