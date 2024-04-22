import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Index";
import { redirect } from "next/navigation"

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/store";
import { all_profiles_action, chat_list_action, decrypt_user, get_user_action } from "./lib/actions";
import { client_routes } from "./lib/helpers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elite Sugar",
  description: "A dating app.",
};

export default async function RootLayout({ children }) {

  // const user = decrypt_user()
  const user = await get_user_action()
  const allUsers = await all_profiles_action()
  const chatList = await chat_list_action();

  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
          <StoreProvider>
            <Header decryptedUser={user ? user[0] : null} allUsers={allUsers.success && allUsers.data} chatList={chatList} />
            {children}
          </StoreProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
