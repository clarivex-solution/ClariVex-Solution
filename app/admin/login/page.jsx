"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        toast.success('Welcome back!')
        window.location.href = '/admin'
      } else {
        toast.error('Invalid password. Please try again.')
        setError('Incorrect password')
        setLoading(false)
      }
    } catch (err) {
      toast.error('Login failed. Check your connection.')
      setError('An error occurred. Please try again.')
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-white border border-[#e2e4e9] text-[#1a1a2e] rounded-lg px-4 py-3 placeholder-[#8892a4] focus:outline-none focus:ring-2 focus:ring-[#6aa595]/30 focus:border-[#6aa595] transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#1a1a2e] py-3 font-medium text-white cursor-pointer transition-colors hover:bg-[#6aa595] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center mt-4">
            <Link href="/admin/forgot-password" className="text-xs text-[#8892a4] hover:text-[#6aa595] transition-colors">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

