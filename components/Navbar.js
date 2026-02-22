import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          ClariVex
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors duration-200 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/90 text-white rounded-xl px-4 py-2 text-sm">
          Book Consultation
        </Button>
      </div>
    </header>
  );
}
