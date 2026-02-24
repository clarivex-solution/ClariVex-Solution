import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
      <body className="bg-white font-[family-name:var(--font-inter)] text-[#1a1a2e]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
