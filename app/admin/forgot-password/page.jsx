"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      // Always show success message regardless of response (security)
      setSent(true)
      toast.success('If this address matches our records, a reset link has been sent.')
    } catch {
      setError('We could not process your request right now. Please try again.')
      toast.error('Request failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white border border-[#e2e4e9] shadow-sm rounded-2xl p-8 w-full max-w-sm">
        <div className="mb-8">
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

        {sent ? (
          <div className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-4 text-sm leading-relaxed text-[#5a6478]">
            If this address matches our records, a reset link has been sent. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Admin Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-white border border-[#e2e4e9] text-[#1a1a2e] rounded-lg px-4 py-3 placeholder-[#8892a4] focus:outline-none focus:ring-2 focus:ring-[#6aa595]/30 focus:border-[#6aa595] transition-colors"
                required
              />
            </div>

            {error ? <p className="text-red-500 text-sm">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1a1a2e] py-3 font-medium text-white cursor-pointer transition-colors hover:bg-[#6aa595] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <Link href="/admin/login" className="text-xs text-[#8892a4] hover:text-[#6aa595] transition-colors">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
