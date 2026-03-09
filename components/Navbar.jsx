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
];

const allOptions = [...countries, generalCountry];

function FlagImage({ src, alt, size = 20 }) {
  if (!src) return <Globe className="h-4 w-4 text-[#6aa595]" />;
  return (
    <img src={src} alt={alt} width={size} height={Math.round(size * 0.67)}
      className="inline-block rounded-sm object-cover"
      style={{ width: size, height: Math.round(size * 0.67) }} />
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') { setActiveSection(''); return; }
    const sectionIds = ['services', 'process', 'about', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    const handleScroll = () => { if (window.scrollY < 100) setActiveSection(''); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observers.forEach((obs, i) => {
        const el = document.getElementById(sectionIds[i]);
        if (obs && el) obs.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const prev = document.body.style.overflow;
    // Measure scrollbar width before hiding it to prevent layout shift on fixed elements
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelectCountry(code) {
    setCountry(code);
    setDropdownOpen(false);
    setIsMobileOpen(false);
    if (code !== "general") {
      router.push(`/${code}`);
    } else {
      const isCountryHomepage = COUNTRY_ROUTES.some((r) => pathname === `/${r}` || pathname === `/${r}/`);
      if (isCountryHomepage) router.push("/");
    }
  }

  function handleDetectLocation() {
    detectLocation();
    setDropdownOpen(false);
    setIsMobileOpen(false);
  }

  const isActive = (href) => {
    if (href === '/') return pathname === '/' && activeSection === '';
    if (href.startsWith('/#')) return activeSection === href.replace('/#', '');
    return pathname === href;
  };

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-500 ${isScrolled ? "border-b border-[#e2e4e9] bg-white/95 shadow-lg backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Image src="/logo-dark.png" alt="ClariVex" width={120} height={36} className="w-[110px] lg:w-[130px]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center justify-center gap-1 md:flex md:flex-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link key={link.label} href={link.href} aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap px-2 py-1 text-[13px] transition-all duration-200 ${active ? 'text-[#1a1a2e] font-semibold' : 'text-[#5a6478] font-medium hover:text-[#1a1a2e]'}`}>
                  <span className="inline-block transition-transform duration-200 hover:-translate-y-px">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {/* Desktop country selector */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border border-[#e2e4e9] bg-[#f8f9fa] px-3 py-1.5 text-xs text-[#5a6478] transition-all duration-200 hover:border-[#1a1a2e]/40 hover:text-[#1a1a2e] active:scale-95">
                <FlagImage src={selected.flagSrc} alt={selected.name} size={16} />
                <span className="hidden font-medium lg:inline">{country === "general" ? "Region" : selected.label}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#e2e4e9] rounded-xl shadow-2xl shadow-black/10 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#e2e4e9]">
                    <p className="text-[#5a6478] text-xs uppercase tracking-widest">Select Region</p>
                  </div>
                  {allOptions.map((opt) => (
                    <button key={opt.code} type="button" onClick={() => handleSelectCountry(opt.code)}
                      className={`flex w-full items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#f8f9fa] transition-colors group ${country === opt.code ? "bg-[#f8f9fa]" : ""}`}>
                      <FlagImage src={opt.flagSrc} alt={opt.name} size={20} />
                      <div className="flex-1 text-left">
                        <p className={`text-sm font-medium transition-colors ${country === opt.code ? "text-[#6aa595]" : "text-[#5a6478] group-hover:text-[#1a1a2e]"}`}>{opt.name}</p>
                      </div>
                      {country === opt.code && <div className="w-1.5 h-1.5 rounded-full bg-[#6aa595]" />}
                    </button>
                  ))}
                  <button type="button" onClick={handleDetectLocation} disabled={detecting}
                    className="flex w-full items-center gap-3 px-4 py-3 border-t border-[#e2e4e9] cursor-pointer hover:bg-[#f8f9fa] transition-colors group disabled:opacity-60 disabled:cursor-not-allowed">
                    {detecting ? <Loader2 className="h-4 w-4 animate-spin text-[#6aa595]" /> : <LocateFixed className="h-4 w-4 text-[#5a688e]" />}
                    <span className="text-sm text-[#5a6478] group-hover:text-[#1a1a2e] transition-colors">{detecting ? "Detecting..." : "Detect my location"}</span>
                  </button>
                  <div className="px-4 py-3 border-t border-[#e2e4e9]">
                    <p className="text-[#5a6478] text-[10px] leading-relaxed">Content adapts to your selected region</p>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#contact"
              className="whitespace-nowrap rounded-full bg-[#1a1a2e] px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-[#2d3550] active:scale-95">
              Book a Call
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button type="button" aria-label="Open navigation menu"
            className="inline-flex items-center justify-center p-2 text-[#1a1a2e] cursor-pointer md:hidden"
            onClick={() => setIsMobileOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#e2e4e9] px-5">
            <Link href="/" onClick={() => setIsMobileOpen(false)}>
              <Image
                src="/logo-dark.png"
                alt="ClariVex"
                width={130}
                height={38}
                priority
                className="h-auto w-[110px] object-contain sm:w-[130px]"
              />
            </Link>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1a1a2e] hover:bg-[#f8f9fa] transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex flex-1 flex-col overflow-y-auto px-5 sm:px-6">
            {/* Nav links */}
            <nav className="mt-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center border-b border-[#f0f0f0] py-4 text-[15px] transition-colors ${
                      active
                        ? "font-semibold text-[#1a1a2e]"
                        : "font-normal text-[#5a6478] hover:text-[#1a1a2e]"
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Region selector */}
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8892a4]">
                Select Your Region
              </p>
              <div className="overflow-hidden rounded-xl border border-[#e2e4e9]">
                {allOptions.map((opt, i) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => handleSelectCountry(opt.code)}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 transition-colors ${
                      i > 0 ? "border-t border-[#f0f0f0]" : ""
                    } ${
                      country === opt.code
                        ? "bg-[#f8f9fa] text-[#6aa595]"
                        : "text-[#5a6478] hover:bg-[#f8f9fa] hover:text-[#1a1a2e]"
                    }`}
                  >
                    <FlagImage src={opt.flagSrc} alt={opt.name} size={22} />
                    <span className="text-sm font-medium">{opt.name}</span>
                    {country === opt.code && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6aa595]" />
                    )}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={detecting}
                  className="flex w-full items-center gap-3 border-t border-[#f0f0f0] px-4 py-3.5 text-[#5a6478] transition-colors hover:bg-[#f8f9fa] hover:text-[#1a1a2e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {detecting
                    ? <Loader2 className="h-4 w-4 animate-spin text-[#6aa595]" />
                    : <LocateFixed className="h-4 w-4 text-[#5a688e]" />
                  }
                  <span className="text-sm font-medium">
                    {detecting ? "Detecting…" : "Detect my location"}
                  </span>
                </button>
              </div>
            </div>

            {/* Spacer so button doesn't sit right on content */}
            <div className="mt-6" />
          </div>

          {/* Fixed bottom CTA */}
          <div className="shrink-0 border-t border-[#e2e4e9] px-5 py-4 sm:px-6">
            <Link
              href="/#contact"
              className="block w-full rounded-full bg-[#1a1a2e] py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2d3550] active:scale-95"
              onClick={() => setIsMobileOpen(false)}
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
