"use client"

import { client_routes, socket_server } from "@/app/lib/helpers"
import { usePathname } from "next/navigation"
import AuthHeader from "./AuthHeader"
import MainHeader from "./MainHeader"
import { useEffect, useState } from "react"
import { useStore } from "@/store/store"



const Header = ({ decryptedUser, allUsers }) => {
  const pathname = usePathname()

  const { state: { userState } } = useStore()

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

  return (
    <>
      {(pathname === client_routes.search || pathname === client_routes.profile || pathname === client_routes.edit_profile || pathname.includes(client_routes.profile + "/") || pathname.includes("/loader") || pathname === client_routes.discover || pathname === client_routes.chat || pathname === client_routes.msg || pathname === client_routes.subscription)
        ? <MainHeader decryptedUser={user} allUsers={allUsers} />
        : <>
          <div className={`${isUser ? "hidden" : ""}`}>
            <AuthHeader />
          </div>
          <div className={`${isUser ? "" : "hidden"}`}>
            <MainHeader decryptedUser={user} allUsers={allUsers} />
          </div>
        </>
      }
    </>
  )
}

export default Header