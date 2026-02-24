"use client";
import logo from "@/public/logo.png";
import { countries } from "@/lib/countryData";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  // Auto-detect from cookie on mount
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("preferred-country="))
      ?.split("=")[1];
    const match = countries.find((c) => c.code === cookie);
    if (match) setSelected(match);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 h-20 transition-all duration-500 ${
          isScrolled
            ? "border-b border-[#e2e4e9] bg-white/95 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
          <Link href="/" className="flex items-center">
            <span className="mr-3 inline-block h-8 w-0.5 bg-[#c9a96e]" />
            <Image
              src={logo}
              alt="ClariVex Solutions"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>

          <nav className="hidden items-center justify-center gap-4 md:flex md:flex-1 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm text-[#5a6478] transition-colors duration-200 hover:text-[#1a1a2e] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#6aa595] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* DESKTOP COUNTRY SELECTOR */}
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-[#f8f9fa] border border-[#e2e4e9] rounded-full px-4 py-2 text-xs text-[#5a6478] hover:border-[#5a688e]/50 hover:text-[#1a1a2e] transition-all duration-200"
              >
                <span>{selected.flag}</span>
                <span className="font-medium">{selected.label}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#e2e4e9] rounded-xl shadow-2xl shadow-black/10 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#e2e4e9]">
                    <p className="text-[#5a6478] text-xs uppercase tracking-widest">
                      Serving 4 Countries
                    </p>
                  </div>

                  {countries.map((country) => (
                    <Link
                      key={country.code}
                      href={country.href}
                      onClick={() => {
                        setSelected(country);
                        setDropdownOpen(false);
                        document.cookie = `preferred-country=${country.code};max-age=86400;path=/`;
                      }}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-[#f8f9fa] transition-colors group ${
                        selected.code === country.code ? "bg-[#f8f9fa]" : ""
                      }`}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium transition-colors ${
                            selected.code === country.code
                              ? "text-[#6aa595]"
                              : "text-[#5a6478] group-hover:text-[#1a1a2e]"
                          }`}
                        >
                          {country.name}
                        </p>
                      </div>
                      {selected.code === country.code && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6aa595]" />
                      )}
                    </Link>
                  ))}

                  <div className="px-4 py-3 border-t border-[#e2e4e9]">
                    <p className="text-[#5a6478] text-[10px] leading-relaxed">
                      Content adapts to your selected region
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#contact"
              className="rounded-full bg-[#5a688e] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#6aa595] lg:px-6"
            >
              Book a Call
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            className="inline-flex items-center justify-center p-2 text-[#1a1a2e] md:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-white md:hidden">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 sm:px-6">
            <div className="flex h-20 items-center justify-between border-b border-[#e2e4e9]">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="mr-3 inline-block h-8 w-0.5 bg-[#c9a96e]" />
                <Image
                  src="/logo.png"
                  alt="ClariVex Solutions"
                  width={140}
                  height={40}
                  className="object-contain"
                />
              </Link>

              <button
                type="button"
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center p-2 text-[#1a1a2e]"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block border-b border-[#e2e4e9]/60 py-4 text-base text-[#5a6478] transition-colors hover:text-[#1a1a2e]"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#e2e4e9] mt-2">
              <p className="text-[#5a6478] text-xs uppercase tracking-widest px-4 mb-2">
                Select Your Region
              </p>
              {countries.map((country) => (
                <Link
                  key={country.code}
                  href={country.href}
                  onClick={() => {
                    setSelected(country);
                    setIsMobileOpen(false);
                    document.cookie = `preferred-country=${country.code};max-age=86400;path=/`;
                  }}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-[#e2e4e9]/50 transition-colors ${
                    selected.code === country.code
                      ? "text-[#6aa595]"
                      : "text-[#5a6478]"
                  }`}
                >
                  <span>{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                  {selected.code === country.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6aa595] ml-auto" />
                  )}
                </Link>
              ))}
            </div>

            <Link
              href="/#contact"
              className="mb-8 mt-auto w-full rounded-full bg-[#5a688e] px-6 py-3 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-[#6aa595]"
              onClick={() => setIsMobileOpen(false)}
            >
              Book a Call
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
