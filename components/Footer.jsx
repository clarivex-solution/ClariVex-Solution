"use client";

import { useCountry } from "@/components/CountryProvider";
import { countries, COUNTRY_ROUTES } from "@/lib/countryData";
import { Loader2, LocateFixed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const serviceLinks = [
  { href: "/services/bookkeeping", label: "Bookkeeping" },
  { href: "/services/reconciliation", label: "Reconciliation" },
  { href: "/services/ap-support", label: "AP Support" },
  { href: "/services/ar-support", label: "AR Support" },
  { href: "/services/payroll", label: "Payroll" },
  { href: "/services/tax-planning", label: "Tax Planning" },
  { href: "/services/audit", label: "Audit" },
  { href: "/services/advisory", label: "Advisory" },
];

const companyLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/#process", label: "Our Process" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const { country, setCountry, detecting, detectLocation } = useCountry();
  const router = useRouter();
  const pathname = usePathname();

  function handleSelectCountry(code) {
    setCountry(code);

    /* Navigation — same logic as Navbar (Fix 3) */
    if (code !== "general") {
      router.push(`/${code}`);
    } else {
      const isCountryHomepage = COUNTRY_ROUTES.some(
        (r) => pathname === `/${r}` || pathname === `/${r}/`
      );
      if (isCountryHomepage) {
        router.push("/");
      }
    }
  }

  return (
    <>
      <footer className="bg-[#0d0f14] py-16 sm:py-20 lg:py-24 text-[#8892a4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center">
                <span className="mr-2.5 inline-block h-6 w-0.5 bg-[#c9a96e]" />
                <Image src="/logo-white.png" alt="ClariVex Solutions" width={200} height={58} className="h-11 w-auto object-contain" />
              </Link>
              <p className="mt-4 text-sm leading-relaxed">
                Elite outsourced accounting and finance operations for US, UK,
                AU, and CA businesses.
              </p>

              {/* Worldwide Presence — clickable flag row */}
              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-widest text-[#5a6478]">
                  Worldwide Presence
                </p>
                <div className="flex items-center gap-3">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      title={c.name}
                      onClick={() => handleSelectCountry(c.code)}
                      className={`group relative rounded-md p-1 transition-all duration-200 ${
                        country === c.code
                          ? "ring-2 ring-[#6aa595] bg-[#6aa595]/10"
                          : "hover:ring-1 hover:ring-[#5a688e]/50 hover:bg-[#1e2330]"
                      }`}
                    >
                      <img
                        src={c.flagSrc}
                        alt={c.name}
                        width={28}
                        height={19}
                        className="rounded-sm"
                        style={{ width: 28, height: 19, display: "block" }}
                      />
                      {country === c.code && (
                        <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#6aa595]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Detect my location */}
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={detecting}
                  className="mt-3 flex items-center gap-1.5 text-xs text-[#5a6478] hover:text-[#6aa595] transition-colors"
                >
                  {detecting ? (
                    <Loader2 className="h-3 w-3 animate-spin text-[#6aa595]" />
                  ) : (
                    <LocateFixed className="h-3 w-3" />
                  )}
                  <span>{detecting ? "Detecting…" : "Detect my location"}</span>
                </button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Services</h3>
              <div className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Company</h3>
              <div className="space-y-2.5">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Contact</h3>
              <div className="space-y-2.5 text-sm">
                <p>421, Shivalik Shilp, Iscon Cross Road</p>
                <p>S.G. Highway, Ahmedabad &ndash; 380058</p>
                <a
                  href="mailto:info@clarivex.net"
                  className="block transition-colors hover:text-white"
                >
                  info@clarivex.net
                </a>
                <a
                  href="tel:+919898028812"
                  className="block transition-colors hover:text-white"
                >
                  +91 9898028812
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-[#1e2330] pt-8">
            <div className="flex flex-col items-center gap-4 text-center text-xs text-[#8892a4] lg:flex-row lg:justify-between lg:text-left">
              <p className="flex items-center justify-center gap-1"><Link href="/admin" className="select-none cursor-default pointer-events-auto text-xl leading-none">&copy;</Link> <span>2026 Clarivex Solution. All rights reserved.</span></p>
              <div className="flex items-center gap-2">
                <span className="text-[#8892a4]">Privacy Policy</span>
                <span>&middot;</span>
                <span className="text-[#8892a4]">Terms &amp; Conditions</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919104791017"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-[#25D366] p-3.5 text-white shadow-2xl transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.125 1.52 5.867L.054 23.65a.5.5 0 00.622.622l5.782-1.466A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.875 0-3.651-.506-5.19-1.448l-.372-.22-3.858.978.978-3.858-.22-.372A9.725 9.725 0 012.25 12c0-5.384 4.366-9.75 9.75-9.75S21.75 6.616 21.75 12s-4.366 9.75-9.75 9.75z" />
        </svg>
      </a>
    </>
  );
}
