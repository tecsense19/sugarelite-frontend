"use client"

import { client_routes, socket_server } from "@/app/lib/helpers"
import { usePathname } from "next/navigation"
import AuthHeader from "./AuthHeader"
import MainHeader from "./MainHeader"
import { useEffect, useState } from "react"
import { useStore } from "@/store/store"
import { io } from "socket.io-client"

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(socket_server);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};


const Header = ({ decryptedUser, notifications, allUsers }) => {
  const pathname = usePathname()
  const socket = useSocket()

  const { state: { userState } } = useStore()

  const [user, setUser] = useState(userState ? userState : decryptedUser)

  useEffect(() => {
    setUser(userState ? userState : decryptedUser)
  }, [userState])

  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
  }, [])

  return (
    <>
      {(pathname === client_routes.search || pathname === client_routes.profile || pathname === client_routes.edit_profile || pathname.includes(client_routes.profile + "/") || pathname.includes("/loader") || pathname === client_routes.discover || pathname === client_routes.chat || pathname === client_routes.msg || pathname === client_routes.subscription)
        ? <MainHeader decryptedUser={user} notifications={notifications} allUsers={allUsers} socket={socket} />
        : <>
          {user
            ? <MainHeader decryptedUser={user} notifications={notifications} allUsers={allUsers} socket={socket} />
            : <AuthHeader />
          }
        </>
      }
    </>
  )
}

export default Header