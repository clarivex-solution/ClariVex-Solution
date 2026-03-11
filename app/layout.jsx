import ClientLayout from "@/components/ClientLayout";
import { CountryProvider } from "@/components/CountryProvider";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    template: "%s | ClariVex Solutions",
    default: "ClariVex Solutions — Elite Outsourced Accounting for US, UK, AU & CA",
  },
  description:
    "ClariVex Solutions provides elite outsourced accounting, bookkeeping, tax planning and payroll services for businesses across the US, UK, Australia and Canada.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"
  ),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app",
    languages: {
      "en-US": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/us`,
      "en-GB": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/uk`,
      "en-AU": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/au`,
      "en-CA": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/ca`,
      "x-default": process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="bg-white font-[family-name:var(--font-inter)] text-[#1a1a2e]">
        <CountryProvider>
          <ClientLayout>{children}</ClientLayout>
        </CountryProvider>
      </body>
    </html>
  );
}
 
