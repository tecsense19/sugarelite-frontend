import { Inter } from "next/font/google";
import "./globals.css";

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/store";
import { SocketProvider } from "@/store/SocketContext";
import { ChatProvider } from "@/store/ChatContext";
import { StringProvider } from "@/store/LanguageContext";
import CookieConsent from "@/components/common/CookieConsent/CookieConsent";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elite Sugar",
  description: "A dating app.",
};

export default async function RootLayout({ children }) {

  const cookieConsent = cookies().get("cookieConsent")?.value

  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
          <StoreProvider>
            <StringProvider>
              <SocketProvider>
                <ChatProvider>
                  {children}
                  {
                    !cookieConsent && <CookieConsent />
                  }
                </ChatProvider>
              </SocketProvider>
            </StringProvider>
          </StoreProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
