"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        toast.success("Welcome back!")
        router.push('/admin')
      } else {
        toast.error("Invalid password. Please try again.")
        setError('Incorrect password')
      }
    } catch (err) {
      toast.error("Login failed. Check your connection.")
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center p-4">
      <div className="bg-[#13161e] border border-[#1e2330] rounded-2xl p-8 w-full max-w-sm">
        <div className="mb-8">
          <div className="h-px w-12 bg-[#c9a96e] mb-4"></div>
          <h1 className="text-3xl font-playfair text-[#c9a96e] mb-2">ClariVex</h1>
          <p className="text-[#6aa595] text-xs font-semibold tracking-wider uppercase">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d0f14] border border-[#1e2330] text-white rounded-lg px-4 py-3 placeholder-[#8892a4] focus:outline-none focus:border-[#5a688e] transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5a688e] hover:bg-[#4a567a] text-white rounded-full py-3 font-medium transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Logging in...' : 'Login step'}
          </button>
        </form>
      </div>
    </div>
  )
}
