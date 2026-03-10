import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { email } = await request.json()

  // Always return 200 — don't reveal if email matched
  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ success: true })
  }

  // Clean up old tokens for this email
  await prisma.adminPasswordReset.deleteMany({ where: { email } })

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await prisma.adminPasswordReset.create({ data: { token, email, expiresAt } })

  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password?token=${token}`

  await resend.emails.send({
    from: process.env.FROM_EMAIL || 'ClariVex Admin <onboarding@resend.dev>',
    to: email,
    subject: 'ClariVex Admin — Password Reset',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <div style="height:2px;width:48px;background:#c9a96e;margin-bottom:24px"></div>
        <h2 style="color:#1a1a2e;font-size:22px;margin-bottom:8px">Reset your admin password</h2>
        <p style="color:#5a6478;margin-bottom:24px">Click the button below to set a new password. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display:inline-block;background:#1a1a2e;color:white;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:600">Reset Password</a>
        <p style="color:#8892a4;font-size:12px;margin-top:24px">If you didn't request this, ignore this email.</p>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
