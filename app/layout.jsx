import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/header/Index";
// import { redirect } from "next/navigation"

import 'aos/dist/aos.css';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/store";
import { SocketProvider } from "@/store/SocketContext";
import { ChatProvider } from "@/store/ChatContext";
import { StringProvider } from "@/store/LanguageContext";
// import { all_friend_Notifications, all_profiles_action, chat_list_action, decrypt_user, get_user_action } from "./lib/actions";
// import { client_routes } from "./lib/helpers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elite Sugar",
  description: "A dating app.",
};

export default async function RootLayout({ children }) {

  // const user = await get_user_action()
  // const allUsers = await all_profiles_action()
  // const chatList = await chat_list_action();
  // await fetch("http://localhost:3000/api/socket");

  return (
    <html className="overflow-x-hidden" lang="en">
      <AntdRegistry>
        <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
          <StoreProvider>
            <StringProvider>
              <SocketProvider>
                <ChatProvider>
                  {/* <Header decryptedUser={user ? user[0] : null} allUsers={allUsers.success && allUsers.data} chatList={chatList} /> */}
                  {children}
                </ChatProvider>
              </SocketProvider>
            </StringProvider>
          </StoreProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}


// export default async function RootLayout({ children }) {
//   try {
//     const userPromise = get_user_action();
//     const allUsersPromise = all_profiles_action();
//     const chatListPromise = chat_list_action();
//     const allFriendNotifications = all_friend_Notifications()

//     const [user, allUsers, chatList, friendNotifications] = await Promise.all([userPromise, allUsersPromise, chatListPromise, allFriendNotifications]);


//     return (
//       <html className="overflow-x-hidden" lang="en">
//         <AntdRegistry>
//           <body className={inter.className + " select-none bg-primary overflow-hidden"} suppressHydrationWarning={true}>
//             <StoreProvider>
//               {/* <Header decryptedUser={user ? user[0] : null} allUsers={allUsers?.success && allUsers.data} chatList={chatList} friendNotifications={friendNotifications.data} /> */}
//               {children}
//             </StoreProvider>
//           </body>
//         </AntdRegistry>
//       </html>
//     );
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Render an error message or handle the error in another appropriate way
//     return <html>
//       <body className="bg-primary">
//         <div>Error fetching data. Please try again later.</div>
//       </body>
//     </html>;
//   }
// }
