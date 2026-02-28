import { prisma } from '@/lib/prisma'

export async function verifyAdminRequest(request) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return { authenticated: false }
  const session = await prisma.adminSession.findUnique({ where: { token } })
  if (!session || session.expiresAt < new Date()) return { authenticated: false }
  return { authenticated: true }
}
