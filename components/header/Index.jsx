"use client"

import { client_routes } from "@/app/lib/helpers"
import { usePathname } from "next/navigation"
import AuthHeader from "./AuthHeader"
import MainHeader from "./MainHeader"
import { useEffect, useState } from "react"
import { useStore } from "@/store/store"

const Header = ({ decryptedUser }) => {
  const pathname = usePathname()

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
      {(pathname === client_routes.search || pathname === client_routes.profile || pathname === client_routes.edit_profile || pathname.includes(client_routes.profile + "/") || pathname === client_routes.discover || pathname === client_routes.chat)
        ? <MainHeader user={user} />
        : <AuthHeader />
      }
    </>
  )
}

export default Header