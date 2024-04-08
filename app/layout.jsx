import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Index";
import { redirect } from "next/navigation"

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/store";
import { all_profiles_action, chat_list_action, decrypt_user } from "./lib/actions";
import { client_routes } from "./lib/helpers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sugar Elite",
  description: "A dating app.",
};

export default async function RootLayout({ children }) {

  const user = decrypt_user()
  const allUsers = await all_profiles_action()
  const chatList = await chat_list_action();

  const user_chats = chatList.data.filter(chat => chat.sender_id === user?.id || chat.receiver_id === user?.id);
  const chatId = Array.from(new Set(user_chats.map(chat => chat.sender_id !== user.id ? chat.sender_id : chat.receiver_id)));

  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
          <StoreProvider>
            <Header decryptedUser={user} allUsers={allUsers.success && allUsers.data} chatId={chatId} />
            {children}
          </StoreProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
