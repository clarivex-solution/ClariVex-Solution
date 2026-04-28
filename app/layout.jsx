import ClientLayout from "@/components/ClientLayout";
import { CountryProvider } from "@/components/CountryProvider";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteUrl } from "@/lib/constants";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


// ...fonts stay the same, add siteUrl import at the top of the file...

export const metadata = {
  title: {
    template: "%s | ClariVex Solution",
    default:
      "ClariVex Solution | Outsourced Accounting, Bookkeeping & Tax Compliance",
  },
  description:
    "ClariVex Solution provides elite outsourced accounting, bookkeeping, tax planning and payroll services for businesses across the US, UK, Australia and Canada. 15+ years experience serving 280+ clients worldwide.",

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

  metadataBase: new URL(siteUrl),

  openGraph: {
    title:
      "ClariVex Solution | Outsourced Accounting, Bookkeeping & Tax Compliance",
    description:
      "ClariVex Solution provides elite outsourced accounting, bookkeeping, tax planning and payroll services for businesses across the US, UK, Australia and Canada.",
    url: siteUrl,
    siteName: "ClariVex Solution",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ClariVex Solution",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "ClariVex Solution | Outsourced Accounting, Bookkeeping & Tax Compliance",
    description:
      "Elite outsourced accounting, bookkeeping & tax compliance for US, UK, AU, CA businesses.",
    images: [`${siteUrl}/og-image.png`],
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}/us`,
      "en-GB": `${siteUrl}/uk`,
      "en-AU": `${siteUrl}/au`,
      "en-CA": `${siteUrl}/ca`,
      "x-default": siteUrl,
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <head>
        {isProduction && gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="bg-white font-[family-name:var(--font-inter)] text-[#1a1a2e]">
        <CountryProvider>
          <ClientLayout>{children}</ClientLayout>
        </CountryProvider>
      </body>
    </html>
  );
}
