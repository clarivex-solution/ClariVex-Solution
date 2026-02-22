import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3 shadow-sm">

          {/* Logo */}
          <Link href="/" className="text-xl font-semibold text-[#0F172A]">
            ClariVex
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-8 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#0F172A] transition">
              Home
            </Link>
            <Link href="/services" className="hover:text-[#0F172A] transition">
              Services
            </Link>
            <Link href="/contact" className="hover:text-[#0F172A] transition">
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="bg-[var(--primary-blue)] text-white text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-sm"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
