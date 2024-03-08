import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Index";

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/store";
import { decrypt_user } from "./lib/actions";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sugar Elite",
  description: "A dating app.",
};

export default function RootLayout({ children }) {

  const user = decrypt_user()

  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
          <StoreProvider>
            <Header user={user} />
            {children}
          </StoreProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
