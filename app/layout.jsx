import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    default: "ClariVex Solutions",
  },
  description:
    "Elite outsourced accounting and finance operations for US, UK, AU, and CA businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="bg-[#0d0f14] font-[family-name:var(--font-inter)] text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
