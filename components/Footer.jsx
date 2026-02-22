import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const services = [
  "Bookkeeping",
  "Reconciliation",
  "AP Support",
  "AR Support",
  "Payroll",
  "Tax Planning",
  "Audit",
  "Advisory",
  "Data Security",
];

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/#process", label: "Process" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
];

const countryLinks = [
  { href: "/us", label: "US United States" },
  { href: "/uk", label: "UK United Kingdom" },
  { href: "/au", label: "AU Australia" },
  { href: "/ca", label: "CA Canada" },
];

export default function Footer() {
  return (
    <>
      <footer className="border-t border-[#1e2330] bg-[#0d0f14]">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="flex items-center">
                <span className="mr-3 inline-block h-8 w-0.5 bg-[#c9a96e]" />
                <Image
                  src="/logo.png"
                  alt="ClariVex Solutions"
                  width={160}
                  height={45}
                  className="object-contain brightness-0 invert"
                />
              </Link>

              <p className="mt-4 text-sm leading-relaxed text-[#8892a4]">
                Elite outsourced accounting and finance operations &mdash;
                combining expert support and smart technology for businesses
                across US, UK, AU &amp; CA.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#1e2330] bg-[#13161e] px-3 py-1 text-xs text-[#8892a4]">
                  NDA Protected
                </span>
                <span className="rounded-full border border-[#1e2330] bg-[#13161e] px-3 py-1 text-xs text-[#8892a4]">
                  15+ Years
                </span>
                <span className="rounded-full border border-[#1e2330] bg-[#13161e] px-3 py-1 text-xs text-[#8892a4]">
                  280+ Clients
                </span>
              </div>
            </div>

            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                Services
              </p>
              {services.map((service) => (
                <Link
                  key={service}
                  href="/#services"
                  className="mb-3 block text-sm text-[#8892a4] transition-colors hover:text-white"
                >
                  {service}
                </Link>
              ))}
            </div>

            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                Company
              </p>
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mb-3 block text-sm text-[#8892a4] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                Global Offices
              </p>
              {countryLinks.map((country) => (
                <Link
                  key={country.href}
                  href={country.href}
                  className="mb-3 block text-sm text-[#8892a4] transition-colors hover:text-white"
                >
                  {country.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />

          <div className="flex flex-col gap-4 pb-8 text-xs text-[#8892a4] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Clarivex Solution. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Link href="/privacy-policy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <span>&middot;</span>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/919104791017"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#25D366] p-3.5 text-white shadow-2xl transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
}
