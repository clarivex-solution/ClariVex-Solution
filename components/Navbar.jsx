"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

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
  { href: "/us", code: "US", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { href: "/uk", code: "UK", flag: "\uD83C\uDDEC\uD83C\uDDE7" },
  { href: "/au", code: "AU", flag: "\uD83C\uDDE6\uD83C\uDDFA" },
  { href: "/ca", code: "CA", flag: "\uD83C\uDDE8\uD83C\uDDE6" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-20 transition-all duration-500 ${
        isScrolled
          ? "border-b border-[#1e2330] bg-[#0d0f14]/95 shadow-2xl backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <span className="mr-3 inline-block h-8 w-0.5 bg-[#c9a96e]" />
          <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">
            ClariVex
            <span className="ml-1 text-[#6aa595]">Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm text-[#8892a4] transition-colors duration-200 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#6aa595] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <details className="group relative">
            <summary className="flex list-none cursor-pointer items-center gap-1 rounded-full border border-[#1e2330] bg-[#13161e] px-3 py-1.5 text-xs text-[#8892a4] transition-colors duration-200 hover:text-white">
              <span>{"\uD83C\uDDFA\uD83C\uDDF8"}</span>
              <span>US</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </summary>
            <div className="absolute right-0 mt-2 min-w-36 rounded-2xl border border-[#1e2330] bg-[#13161e] p-1 shadow-2xl">
              {countries.map((country) => (
                <Link
                  key={country.href}
                  href={country.href}
                  className="block rounded-xl px-3 py-2 text-xs text-[#8892a4] transition-colors duration-200 hover:bg-[#181d28] hover:text-white"
                >
                  {country.flag} {country.code}
                </Link>
              ))}
            </div>
          </details>

          <Link
            href="/#contact"
            className="rounded-full bg-[#5a688e] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#6aa595]"
          >
            Book a Call
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center p-2 text-white lg:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-b border-[#1e2330] bg-[#0d0f14] transition-all duration-500 lg:hidden ${
          isMobileOpen ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-6 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="border-b border-[#1e2330]/50 py-4 text-sm text-[#8892a4] transition-colors duration-200 hover:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="grid grid-cols-2 gap-2 py-4">
            {countries.map((country) => (
              <Link
                key={country.href}
                href={country.href}
                className="rounded-full border border-[#1e2330] bg-[#13161e] px-3 py-2 text-center text-xs text-[#8892a4] transition-colors duration-200 hover:text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                {country.flag} {country.code}
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            className="w-full rounded-full bg-[#5a688e] px-6 py-2.5 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-[#6aa595]"
            onClick={() => setIsMobileOpen(false)}
          >
            Book a Call
          </Link>
        </nav>
      </div>
    </header>
  );
}
