import { Inter } from "next/font/google";
import "./globals.css";

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/store";
import { SocketProvider } from "@/store/SocketContext";
import { ChatProvider } from "@/store/ChatContext";
import { cookies } from "next/headers";
import CookieIndex from "@/components/common/CookieConsent/CookieIndex";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SugarMake",
  description: "A dating app.",
};

export default async function RootLayout({ children }) {

  const cookieConsent = cookies().get("cookieConsent")?.value

  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
          <StoreProvider>
            <SocketProvider>
              <ChatProvider>
                {children}
                {
                  !cookieConsent && <CookieIndex />
                }
              </ChatProvider>
            </SocketProvider>
          </StoreProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
