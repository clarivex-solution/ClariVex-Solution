import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function verifyAdminRequest(request) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return { authenticated: false }
  const session = await prisma.adminSession.findUnique({ where: { token } })
  if (!session || session.expiresAt < new Date()) return { authenticated: false }
  return { authenticated: true }
}

// For use in Server Components (pages, layouts)
export async function verifyAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return { authenticated: false }
  const session = await prisma.adminSession.findUnique({ where: { token } })
  if (!session || session.expiresAt < new Date()) return { authenticated: false }
  return { authenticated: true }
}
