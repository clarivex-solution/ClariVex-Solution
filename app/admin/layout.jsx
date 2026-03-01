export const metadata = { title: 'Admin Panel | ClariVex' }
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#13161e] border-r border-[#1e2330] h-screen fixed left-0 top-0 flex flex-col p-6">
        <div className="mb-10">
          <div className="mb-1">
            <Image src="/logo-white.png" alt="ClariVex Solutions" width={200} height={58} className="h-11 w-auto object-contain" />
          </div>
          <p className="text-[#6aa595] text-xs font-semibold tracking-wider uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2.5 rounded-lg text-[#8892a4] hover:text-white hover:bg-[#1e2330] transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/blog"
            className="block px-4 py-2.5 rounded-lg text-[#8892a4] hover:text-white hover:bg-[#1e2330] transition"
          >
            Blog
          </Link>
          <Link
            href="/admin/news"
            className="block px-4 py-2.5 rounded-lg text-[#8892a4] hover:text-white hover:bg-[#1e2330] transition"
          >
            News
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#1e2330]">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
