"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function AdminResetPasswordLinkPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = useMemo(() => searchParams.get('token') || '', [searchParams])

  useEffect(() => {
    if (!token) return

    const timeoutId = setTimeout(() => {
      router.replace(`/admin/reset-password?token=${encodeURIComponent(token)}`)
    }, 700)

    return () => clearTimeout(timeoutId)
  }, [router, token])

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white border border-[#e2e4e9] shadow-sm rounded-2xl p-8 w-full max-w-sm text-center">
        <div className="mb-8 text-left">
          <div className="h-px w-12 bg-[#c9a96e] mb-6" />
          <Image
            src="/logo-dark.png"
            alt="ClariVex"
            width={200}
            height={58}
            className="w-auto h-12 mb-3 object-contain"
          />
          <p className="text-[#6aa595] text-[10px] font-bold tracking-widest uppercase">Admin Panel</p>
        </div>

        {!token ? (
          <>
            <p className="text-sm text-red-600 font-medium">This reset link is invalid.</p>
            <Link
              href="/admin/forgot-password"
              className="mt-5 inline-flex rounded-full bg-[#1a1a2e] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6aa595]"
            >
              Request New Link
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#e2e4e9] border-t-[#6aa595]" />
            <p className="text-sm text-[#1a1a2e] font-medium">Verifying your reset link...</p>
            <p className="mt-2 text-xs text-[#8892a4]">You will be redirected automatically.</p>
            <button
              type="button"
              onClick={() => router.replace(`/admin/reset-password?token=${encodeURIComponent(token)}`)}
              className="mt-5 inline-flex rounded-full border border-[#e2e4e9] px-5 py-2 text-xs font-medium text-[#5a6478] transition-colors hover:border-[#6aa595] hover:text-[#6aa595]"
            >
              Continue Now
            </button>
          </>
        )}
      </div>
    </div>
  )
}
