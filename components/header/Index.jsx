"use client"

import { client_routes, socket_server } from "@/app/lib/helpers"
import { usePathname } from "next/navigation"
import AuthHeader from "./AuthHeader"
import MainHeader from "./MainHeader"
import { useEffect, useState } from "react"
import { useStore } from "@/store/store"
import { io } from "socket.io-client"

let socket;

const Header = ({ decryptedUser, allUsers, chatList, friendNotifications }) => {
  const pathname = usePathname()

  const { state: { userState, chatProfileState }, dispatch } = useStore()

  const [user, setUser] = useState(userState ? userState : decryptedUser)

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    setUser(userState ? userState : decryptedUser)
    if (userState) {
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  }, [userState])

  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
  }, [])

  useEffect(() => {
    if (userState) {
      const user_chats = chatList.data.filter(chat => chat.sender_id === userState?.id || chat.receiver_id === userState?.id);
      const chatId = Array.from(new Set(user_chats.map(chat => chat.sender_id !== userState.id ? chat.sender_id : chat.receiver_id)));
      if (chatId.length) {
        chatId.forEach(i => {
          dispatch({ type: "Add_Profile", payload: { id: i, milisecondtime: '' } })
        })
      }
    }
  }, [userState])

  return (
    <>
      {(pathname === client_routes.search || pathname === client_routes.profile || pathname === client_routes.edit_profile || pathname.includes(client_routes.profile + "/") || pathname.includes("/loader") || pathname === client_routes.discover || pathname === client_routes.chat || pathname === client_routes.msg || pathname === client_routes.subscription)
        ? <MainHeader decryptedUser={user} allUsers={allUsers} chatList={chatList.data.filter(chat => chat.sender_id === userState?.id || chat.receiver_id === userState?.id)} allFriendNotifications={friendNotifications} />
        : <>
          <div className={`${isUser ? "hidden" : ""}`}>
            <AuthHeader />
          </div>
          <div className={`${isUser ? "" : "hidden"}`}>
            <MainHeader decryptedUser={user} allUsers={allUsers} chatList={chatList.data.filter(chat => chat.sender_id === userState?.id || chat.receiver_id === userState?.id)} allFriendNotifications={friendNotifications} />
          </div>
        </>
      }
    </>
  )
}

export default Header