import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Index";

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/store";
import { all_profiles_action, decrypt_user, private_album_notification } from "./lib/actions";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sugar Elite",
  description: "A dating app.",
};

export default async function RootLayout({ children }) {

  const user = decrypt_user()
  const notifications = await private_album_notification({ user_id: user?.id })
  const allUsers = await all_profiles_action()

  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
          <StoreProvider>
            <Header decryptedUser={user} notifications={notifications.success && notifications.data} allUsers={allUsers.success && allUsers.data} />
            {children}
          </StoreProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
