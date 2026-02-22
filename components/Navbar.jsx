"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const countries = [
  { href: "/us", label: "US\uD83C\uDDFA\uD83C\uDDF8" },
  { href: "/uk", label: "UK\uD83C\uDDEC\uD83C\uDDE7" },
  { href: "/au", label: "AU\uD83C\uDDE6\uD83C\uDDFA" },
  { href: "/ca", label: "CA\uD83C\uDDE8\uD83C\uDDE6" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-lg" : "bg-white/80"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-cyan-400" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#0A1628]">ClariVex</span>{" "}
            <span className="text-blue-600">Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors duration-200 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
              US\uD83C\uDDFA\uD83C\uDDF8
              <ChevronDown className="h-4 w-4" />
            </summary>
            <div className="absolute right-0 mt-2 min-w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
              {countries.map((country) => (
                <Link
                  key={country.href}
                  href={country.href}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                >
                  {country.label}
                </Link>
              ))}
            </div>
          </details>

          <Link
            href="/#contact"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:bg-blue-700"
          >
            Book a Call
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-200/70 bg-white/95 transition-all duration-300 lg:hidden ${
          isMobileOpen ? "max-h-[520px]" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 grid grid-cols-2 gap-2">
            {countries.map((country) => (
              <Link
                key={country.href}
                href={country.href}
                className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                onClick={() => setIsMobileOpen(false)}
              >
                {country.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            className="mt-3 rounded-full bg-blue-600 px-5 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            onClick={() => setIsMobileOpen(false)}
          >
            Book a Call
          </Link>
        </nav>
      </div>
    </header>
  );
}
