import { CountryProvider } from "@/components/CountryProvider";
import ClientLayout from "@/components/ClientLayout";
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
    template: '%s | ClariVex Solutions',
    default: 'ClariVex Solutions - Outsourced Accounting for US, UK, AU & CA',
  },
  description: 'Elite outsourced accounting and finance operations for US, UK, AU, and CA businesses.',
  metadataBase: new URL('https://clarivex.net'),
  alternates: {
    canonical: 'https://clarivex.net',
    languages: {
      'en-US': 'https://clarivex.net/us',
      'en-GB': 'https://clarivex.net/uk',
      'en-AU': 'https://clarivex.net/au',
      'en-CA': 'https://clarivex.net/ca',
      'x-default': 'https://clarivex.net',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="bg-white font-[family-name:var(--font-inter)] text-[#1a1a2e]">
        <CountryProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </CountryProvider>
      </body>
    </html>
  );
}
