"use client";

import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import { LayoutDashboard, Menu, Newspaper, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/admin',      label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/blog', label: 'Blog',      icon: Newspaper,       exact: false },
  { href: '/admin/news', label: 'News',      icon: Newspaper,       exact: false },
];

const publicAdminPages = new Set([
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
  '/admin/reset-password-link',
]);

export default function AdminShell({ authenticated, children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  // Fix bfcache: when user hits back button after logout, browser restores
  // a memory snapshot without making a network request (bypassing middleware).
  // pageshow fires on bfcache restore — we detect it and redirect to login.
  useEffect(() => {
    const handlePageShow = (e) => {
      if (e.persisted) {
        // Page was restored from bfcache — force a fresh server check
        router.replace(pathname);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [pathname, router]);

  const isPublicAdminPage = publicAdminPages.has(pathname);

  // Public auth pages — no admin chrome, just render children.
  if (isPublicAdminPage) {
    return (
      <>
        <meta name="robots" content="noindex, nofollow" />
        {children}
      </>
    );
  }

  // Not authenticated — render nothing (server already redirected, but just in case)
  if (!authenticated) return null;

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#1a1a2e]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e2e4e9]
          flex flex-col transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e4e9]">
          <div>
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <Image
                src="/logo-dark.png"
                alt="ClariVex Solutions"
                width={140}
                height={40}
                className="w-auto h-9 object-contain"
              />
            </Link>
            <p className="text-[#6aa595] text-[9px] font-bold tracking-widest uppercase mt-1.5">
              Admin Panel
            </p>
          </div>
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-[#5a6478] hover:text-[#1a1a2e] hover:bg-[#f8f9fa] transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[#eef5f3] text-[#6aa595] border-l-4 border-[#6aa595] pl-3'
                    : 'text-[#5a6478] hover:text-[#1a1a2e] hover:bg-[#f8f9fa]'
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-[#e2e4e9]">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <meta name="robots" content="noindex, nofollow" />

        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-white border-b border-[#e2e4e9] px-4 py-3 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#5a6478] hover:text-[#1a1a2e] hover:bg-[#f8f9fa] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Image
            src="/logo-dark.png"
            alt="ClariVex"
            width={120}
            height={34}
            className="h-8 w-auto object-contain"
          />
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

