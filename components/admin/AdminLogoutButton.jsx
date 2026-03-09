"use client"

import { useState } from 'react'
import { toast } from 'sonner'

export default function AdminLogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      toast.success("Logged out successfully.")
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      // Hard redirect — forces full page reload, kills bfcache for admin pages
      window.location.href = '/admin/login'
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full cursor-pointer text-left text-sm font-medium text-[#5a6478] px-4 py-2.5 rounded-lg transition-colors hover:text-red-600 hover:bg-red-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? 'Logging out...' : 'Log out'}
    </button>
  )
}
