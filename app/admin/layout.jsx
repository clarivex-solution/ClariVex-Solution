"use client";

import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Toaster } from 'sonner';

const navItems = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/blog', label: 'Blog', exact: false },
  { href: '/admin/news', label: 'News', exact: false },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <>
        <meta name="robots" content="noindex, nofollow" />
        {children}
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#1a1a2e]">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e2e4e9] flex flex-col p-6
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <button
          type="button"
          className="lg:hidden absolute top-4 right-4 text-[#5a6478] cursor-pointer transition-colors hover:text-[#1a1a2e] active:scale-95"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <div className="mb-10">
          <div className="mb-2">
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <Image src="/logo-dark.png" alt="ClariVex Solutions" width={140} height={40} className="w-auto h-8 object-contain" />
            </Link>
          </div>
          <p className="text-[#6aa595] text-[10px] font-bold tracking-widest uppercase mt-4">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setSidebarOpen(false)}
                className={`block px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#eef5f3] text-[#6aa595] font-medium border-l-4 border-[#6aa595]'
                    : 'text-[#5a6478] hover:text-[#1a1a2e] hover:bg-[#f8f9fa]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-[#e2e4e9]">
          <AdminLogoutButton />
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8 min-h-screen">
        <meta name="robots" content="noindex, nofollow" />
        <button
          type="button"
          className="lg:hidden mb-4 p-2 text-[#5a6478] cursor-pointer transition-colors hover:text-[#1a1a2e] active:scale-95"
          onClick={() => setSidebarOpen(true)}
        >
          Menu
        </button>
        {children}
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}
