import ClientLayout from "@/components/ClientLayout";
import { CountryProvider } from "@/components/CountryProvider";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
    template: "%s | ClariVex Solution",
    default:
      "ClariVex Solution | Outsourced Accounting, Bookkeeping & Tax Compliance",
  },
  description:
    "ClariVex Solution provides elite outsourced accounting, bookkeeping, tax planning and payroll services for businesses across the US, UK, Australia and Canada. 15+ years experience serving 280+ clients worldwide.",
  openGraph: {
    title:
      "ClariVex Solution | Outsourced Accounting, Bookkeeping & Tax Compliance",
  },

  keywords: [
    "outsourced accounting",
    "bookkeeping services",
    "tax planning",
    "payroll services",
    "accounting outsourcing",
    "accounting services USA UK AU CA",
    "ClariVex Solution",
  ],

  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app",
  ),
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app",
    languages: {
      "en-US": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/us`,
      "en-GB": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/uk`,
      "en-AU": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/au`,
      "en-CA": `${process.env.NEXT_PUBLIC_SITE_URL || "https://clarivex-website.vercel.app"}/ca`,
      "x-default":
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://clarivex-website.vercel.app",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D1KB80YGF0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D1KB80YGF0');
          `}
        </Script>
      </body>
    </html>
  );
}



