import Link from "next/link";
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
  { href: "/us", label: "\uD83C\uDDFA\uD83C\uDDF8 United States" },
  { href: "/uk", label: "\uD83C\uDDEC\uD83C\uDDE7 United Kingdom" },
  { href: "/au", label: "\uD83C\uDDE6\uD83C\uDDFA Australia" },
  { href: "/ca", label: "\uD83C\uDDE8\uD83C\uDDE6 Canada" },
];

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0A1628] pb-8 pt-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-cyan-400" />
              <p className="text-xl font-bold">
                <span>ClariVex</span> <span className="text-blue-400">Solutions</span>
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Empowering Growth Through Financial Clarity
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Serving US, UK, AU &amp; CA clients globally
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                NDA Protected
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                15+ Years
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                280+ Clients
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Countries
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {countryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 pt-6 text-sm text-slate-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>&copy; 2026 Clarivex Solution. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/919104791017"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 p-4 text-white shadow-lg transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
}
