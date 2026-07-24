import { siteUrl } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const isDev = process.env.NODE_ENV !== "production";

// Rate limit: 3 attempts per 15 minutes per IP
const attempts = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 3;
  const record = attempts.get(ip);
  if (!record || now - record.firstAttempt > windowMs) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }
  if (record.count >= maxAttempts) return true;
  record.count += 1;
  return false;
}

function buildResetUrl(token) {
  const rawBaseUrl = String(
    process.env.NEXT_PUBLIC_SITE_URL || siteUrl || "",
  ).trim();
  const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, "");
  return `${normalizedBaseUrl}/admin/reset-password-link?token=${encodeURIComponent(token)}`;
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ success: true }); // silent — don't reveal rate limit
  }

  try {
    const { email } = await request.json();

    const submittedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const adminEmail = String(process.env.ADMIN_EMAIL || "")
      .trim()
      .toLowerCase();

    if (!submittedEmail || !adminEmail || submittedEmail !== adminEmail) {
      if (isDev)
        console.log(
          "[forgot-password] Ignored: email did not match ADMIN_EMAIL",
        );
      return NextResponse.json({ success: true });
    }

    await prisma.adminPasswordReset.deleteMany({
      where: { email: submittedEmail },
    });

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.adminPasswordReset.create({
      data: { token, email: submittedEmail, expiresAt },
    });

    const resetUrl = buildResetUrl(token);

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const sendResult = await resend.emails.send({
        from:
          process.env.FROM_EMAIL || "ClariVex Admin <onboarding@resend.dev>",
        to: submittedEmail,
        subject: "ClariVex Admin - Password Reset",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
            <div style="height:2px;width:48px;background:#c9a96e;margin-bottom:24px"></div>
            <h2 style="color:#1a1a2e;font-size:22px;margin-bottom:8px">Reset your admin password</h2>
            <p style="color:#5a6478;margin-bottom:24px">Click the button below to set a new password. This link expires in 1 hour.</p>
            <a href="${resetUrl}" style="display:inline-block;background:#1a1a2e;color:white;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:600">Reset Password</a>
            <p style="color:#8892a4;font-size:12px;margin-top:24px">If the button does not open, copy this URL into your browser:</p>
            <p style="word-break:break-all;color:#5a6478;font-size:12px;margin-top:8px">${resetUrl}</p>
          </div>
        `,
      });
      if (isDev)
        console.log(
          "[forgot-password] Email sent",
          sendResult?.data?.id || null,
        );
    } catch (emailError) {
      console.error("Forgot password email send failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password request failed:", error);
    return NextResponse.json({ success: true });
  }
}
