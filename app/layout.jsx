import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Index";

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sugar Elite",
  description: "A dating app.",
};

export default function RootLayout({ children }) {
  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </AntdRegistry>
    </html>
  );
}
