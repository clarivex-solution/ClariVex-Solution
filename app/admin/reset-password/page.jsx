"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AdminResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tokenError, setTokenError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setTokenError(false)

    if (!token) {
      setTokenError(true)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      if (!response.ok) {
        setTokenError(true)
        return
      }

      toast.success('Password updated successfully')
      window.location.href = '/admin/login'
    } catch {
      setTokenError(true)
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
            src="/logo-dark.webp"
            alt="ClariVex"
            width={200}
            height={58}
            className="w-auto h-12 mb-3 object-contain"
          />
          <p className="text-[#6aa595] text-[10px] font-bold tracking-widest uppercase">Admin Panel</p>
        </div>

        {tokenError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-600">
            This reset link is invalid or has expired.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              className="w-full bg-white border border-[#e2e4e9] text-[#1a1a2e] rounded-lg px-4 py-3 placeholder-[#8892a4] focus:outline-none focus:ring-2 focus:ring-[#6aa595]/30 focus:border-[#6aa595] transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8892a4] hover:text-[#1a1a2e] cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              className="w-full bg-white border border-[#e2e4e9] text-[#1a1a2e] rounded-lg px-4 py-3 placeholder-[#8892a4] focus:outline-none focus:ring-2 focus:ring-[#6aa595]/30 focus:border-[#6aa595] transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8892a4] hover:text-[#1a1a2e] cursor-pointer"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error ? <p className="text-red-500 text-sm">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#1a1a2e] py-3 font-medium text-white cursor-pointer transition-colors hover:bg-[#6aa595] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/admin/login" className="text-xs text-[#8892a4] hover:text-[#6aa595] transition-colors">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
