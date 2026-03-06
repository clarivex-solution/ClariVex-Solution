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
    <div className="flex min-h-screen bg-[#0d0f14]">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#13161e] border-r border-[#1e2330] flex flex-col p-6
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <button
          type="button"
          className="lg:hidden absolute top-4 right-4 text-[#8892a4] cursor-pointer transition-colors hover:text-white active:scale-95"
          onClick={() => setSidebarOpen(false)}
        >
          X
        </button>

        <div className="mb-10">
          <div className="mb-1">
            <Image src="/logo-white.png" alt="ClariVex Solutions" width={200} height={58} className="h-11 w-auto object-contain" />
          </div>
          <p className="text-[#6aa595] text-xs font-semibold tracking-wider uppercase">Admin Panel</p>
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
                    ? 'bg-[#5a688e]/20 text-[#6aa595] font-medium border-l-2 border-[#6aa595]'
                    : 'text-[#8892a4] hover:text-white hover:bg-[#1e2330]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-[#1e2330]">
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
          className="lg:hidden mb-4 p-2 text-[#8892a4] cursor-pointer transition-colors hover:text-white active:scale-95"
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

