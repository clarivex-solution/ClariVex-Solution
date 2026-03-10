import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { token, password } = await request.json()

  if (!token || !password || password.length < 8) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const resetRecord = await prisma.adminPasswordReset.findUnique({ where: { token } })

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Token expired or invalid' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  // Upsert credential — replaces old hash
  const existing = await prisma.adminCredential.findFirst()
  if (existing) {
    await prisma.adminCredential.update({ where: { id: existing.id }, data: { passwordHash } })
  } else {
    await prisma.adminCredential.create({ data: { passwordHash } })
  }

  // Delete used token
  await prisma.adminPasswordReset.delete({ where: { token } })

  return NextResponse.json({ success: true })
}
