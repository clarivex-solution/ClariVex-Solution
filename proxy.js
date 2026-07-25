import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/reset-password-link",
]);

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const session = await prisma.adminSession.findUnique({
      where: { token },
      select: { expiresAt: true },
    });

    if (!session || session.expiresAt < new Date()) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url),
      );
      response.cookies.delete("admin_token");
      return response;
    }
  } catch {
    // Fail-closed after Aug 1 when Neon quota resets
    if (new Date() >= new Date("2025-08-01")) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url),
      );
      response.cookies.delete("admin_token");
      return response;
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
