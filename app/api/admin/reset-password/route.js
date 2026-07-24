import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Rate limit: 5 attempts per 15 minutes per IP
const attempts = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 5;
  const record = attempts.get(ip);
  if (!record || now - record.firstAttempt > windowMs) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }
  if (record.count >= maxAttempts) return true;
  record.count += 1;
  return false;
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  const { token, password } = await request.json();

  if (!token || !password || password.length < 8) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const resetRecord = await prisma.adminPasswordReset.findUnique({
    where: { token },
  });

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Token expired or invalid" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.adminCredential.findFirst();
  if (existing) {
    await prisma.adminCredential.update({
      where: { id: existing.id },
      data: { passwordHash },
    });
  } else {
    await prisma.adminCredential.create({ data: { passwordHash } });
  }

  // Revoke all active sessions so old sessions can't be reused after password change
  await prisma.adminSession.deleteMany({});

  // Delete used reset token
  await prisma.adminPasswordReset.delete({ where: { token } });

  return NextResponse.json({ success: true });
}
