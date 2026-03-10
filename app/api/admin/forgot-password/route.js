import { siteUrl } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const isDev = process.env.NODE_ENV !== 'production'

export async function POST(request) {
  try {
    const { email } = await request.json()

    const submittedEmail = String(email || '').trim().toLowerCase()
    const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()

    // Always return 200 - do not reveal if email matched.
    if (!submittedEmail || !adminEmail || submittedEmail !== adminEmail) {
      if (isDev) {
        console.log('[forgot-password] Ignored request: email did not match ADMIN_EMAIL')
      }
      return NextResponse.json({ success: true })
    }

    // Clean up old tokens for this email
    await prisma.adminPasswordReset.deleteMany({ where: { email: submittedEmail } })

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.adminPasswordReset.create({
      data: { token, email: submittedEmail, expiresAt },
    })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteUrl
    const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`

    try {
      const sendResult = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'ClariVex Admin <onboarding@resend.dev>',
        to: submittedEmail,
        subject: 'ClariVex Admin - Password Reset',
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

      if (isDev) {
        console.log('[forgot-password] Reset email accepted by provider', sendResult?.data?.id || null)
      }
    } catch (emailError) {
      console.error('Forgot password email send failed:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password request failed:', error)
    return NextResponse.json({ success: true })
  }
}
