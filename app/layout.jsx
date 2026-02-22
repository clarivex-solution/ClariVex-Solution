import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | ClariVex Solutions",
    default: "ClariVex Solutions | Outsourced Accounting & Finance Operations",
  },
  description:
    "Your outsourced accounting and finance operations partner for US, UK, AU, and CA businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-[#1E293B] antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
