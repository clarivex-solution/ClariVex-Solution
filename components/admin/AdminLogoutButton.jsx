"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AdminLogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' })
      if (response.ok) {
        toast.success("Logged out successfully.")
      }
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-[#8892a4] hover:text-red-400 transition text-sm text-left w-full disabled:opacity-50"
    >
      {isLoading ? 'Logging out...' : 'Log out'}
    </button>
  )
}
