import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Index";

import 'aos/dist/aos.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sugar Elite",
  description: "A dating app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
