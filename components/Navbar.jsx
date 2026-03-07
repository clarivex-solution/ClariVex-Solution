"use client";

import { useCountry } from "@/components/CountryProvider";
import { countries, COUNTRY_ROUTES, generalCountry, getCountryByCode } from "@/lib/countryData";
import { ChevronDown, Globe, Loader2, LocateFixed, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Process', href: '/#process' },
  { label: 'Services', href: '/#services' },
  { label: 'Blog', href: '/blog' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

const allOptions = [...countries, generalCountry];

function FlagImage({ src, alt, size = 20 }) {
  if (!src) {
    return <Globe className="h-4 w-4 text-[#6aa595]" />;
  }
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={Math.round(size * 0.67)}
      className="inline-block rounded-sm object-cover"
      style={{ width: size, height: Math.round(size * 0.67) }}
    />
  );
}

export default function Navbar() {
  const { country, setCountry, detecting, detectLocation } = useCountry();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropdownRef = useRef(null);

  const selected = getCountryByCode(country);
  const isDarkPage = pathname.includes('/blog/') || pathname.includes('/news/');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Only run scroll spy on homepage
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const sectionIds = ['services', 'process', 'about', 'contact']

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })

    // Reset to home when at top
    const handleScroll = () => {
      if (window.scrollY < 100) setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observers.forEach((obs, i) => {
        const el = document.getElementById(sectionIds[i])
        if (obs && el) obs.unobserve(el)
      })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelectCountry(code) {
    setCountry(code);
    setDropdownOpen(false);
    setIsMobileOpen(false);

    /* Navigation logic (Fix 3: lives in component, not provider) */
    if (code !== "general") {
      router.push(`/${code}`);
    } else {
      /* General selected - navigate to / only from country homepages */
      const isCountryHomepage = COUNTRY_ROUTES.some(
        (r) => pathname === `/${r}` || pathname === `/${r}/`
      );
      if (isCountryHomepage) {
        router.push("/");
      }
    }
  }

  function handleDetectLocation() {
    detectLocation();
    setDropdownOpen(false);
    setIsMobileOpen(false);
  }

  const isActive = (href) => {
    if (href === '/') return pathname === '/' && activeSection === ''
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '')
      return activeSection === id
    }
    return pathname === href
  }

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
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  <Image src="/logo-dark.png" alt="ClariVex" width={140} height={40} />
</Link>

          <nav className="hidden items-center justify-center gap-4 md:flex md:flex-1 lg:gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    relative text-sm transition-all duration-200 px-1 py-0.5
                    ${active
                      ? 'text-[#1a1a2e] font-bold'
                      : 'text-[#5a6478] font-medium hover:text-[#1a1a2e]'
                    }
                  `}
                >
                  <span className="inline-block transition-transform duration-200 hover:-translate-y-px">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* DESKTOP COUNTRY SELECTOR */}
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-[#f8f9fa] border border-[#e2e4e9] rounded-full px-4 py-2 text-xs text-[#5a6478] cursor-pointer hover:border-[#1a1a2e]/40 hover:text-[#1a1a2e] active:scale-95 transition-all duration-200"
              >
                <FlagImage src={selected.flagSrc} alt={selected.name} size={18} />
                <span className="font-medium">
                  {country === "general" ? "Select Country" : selected.label}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#e2e4e9] rounded-xl shadow-2xl shadow-black/10 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#e2e4e9]">
                    <p className="text-[#5a6478] text-xs uppercase tracking-widest">
                      Select Region
                    </p>
                  </div>

                  {allOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => handleSelectCountry(opt.code)}
                      className={`flex w-full items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#f8f9fa] transition-colors group ${
                        country === opt.code ? "bg-[#f8f9fa]" : ""
                      }`}
                    >
                      <FlagImage src={opt.flagSrc} alt={opt.name} size={20} />
                      <div className="flex-1 text-left">
                        <p
                          className={`text-sm font-medium transition-colors ${
                            country === opt.code
                              ? "text-[#6aa595]"
                              : "text-[#5a6478] group-hover:text-[#1a1a2e]"
                          }`}
                        >
                          {opt.name}
                        </p>
                      </div>
                      {country === opt.code && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6aa595]" />
                      )}
                    </button>
                  ))}

                  {/* Detect My Location */}
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={detecting}
                    className="flex w-full items-center gap-3 px-4 py-3 border-t border-[#e2e4e9] cursor-pointer hover:bg-[#f8f9fa] transition-colors group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {detecting ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#6aa595]" />
                    ) : (
                      <LocateFixed className="h-4 w-4 text-[#5a688e]" />
                    )}
                    <span className="text-sm text-[#5a6478] group-hover:text-[#1a1a2e] transition-colors">
                      {detecting ? "Detecting..." : "Detect my location"}
                    </span>
                  </button>

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
              className="rounded-full bg-[#1a1a2e] px-5 py-2.5 text-sm font-medium text-white cursor-pointer transition-colors duration-300 hover:bg-[#2d3550] active:scale-95 lg:px-6"
            >
              Book a Call
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            className="inline-flex items-center justify-center p-2 text-[#1a1a2e] cursor-pointer md:hidden"
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
                className="flex items-center gap-2"
                onClick={() => setIsMobileOpen(false)}
              >
                <Image src="/logo.png" alt="ClariVex" width={140} height={40} />
              </Link>

              <button
                type="button"
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center p-2 text-[#1a1a2e] cursor-pointer"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block border-b border-[#e2e4e9]/60 py-4 text-base transition-colors ${
                      active ? "text-[#1a1a2e]" : "text-[#5a6478] hover:text-[#1a1a2e]"
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#e2e4e9] mt-2">
              <p className="text-[#5a6478] text-xs uppercase tracking-widest px-4 mb-2">
                Select Your Region
              </p>
              {allOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelectCountry(opt.code)}
                  className={`flex w-full items-center gap-3 px-4 py-3 border-b border-[#e2e4e9]/50 cursor-pointer transition-colors ${
                    country === opt.code ? "text-[#6aa595]" : "text-[#5a6478]"
                  }`}
                >
                  <FlagImage src={opt.flagSrc} alt={opt.name} size={22} />
                  <span className="text-sm">{opt.name}</span>
                  {country === opt.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6aa595] ml-auto" />
                  )}
                </button>
              ))}

              {/* Detect My Location - mobile */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={detecting}
                className="flex w-full items-center gap-3 px-4 py-3 border-b border-[#e2e4e9]/50 cursor-pointer transition-colors text-[#5a6478] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {detecting ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[#6aa595]" />
                ) : (
                  <LocateFixed className="h-5 w-5 text-[#5a688e]" />
                )}
                <span className="text-sm">
                  {detecting ? "Detecting..." : "Detect my location"}
                </span>
              </button>
            </div>

            <Link
              href="/#contact"
              className="mb-8 mt-auto w-full rounded-full bg-[#1a1a2e] px-6 py-3 text-center text-sm font-medium text-white cursor-pointer transition-colors duration-300 hover:bg-[#2d3550] active:scale-95"
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
