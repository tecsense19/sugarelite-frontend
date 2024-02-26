"use client"

import { client_routes } from "@/app/lib/helpers"
import { usePathname } from "next/navigation"
import AuthHeader from "./AuthHeader"
import MainHeader from "./MainHeader"
import { useEffect } from "react"

const Header = () => {
  const pathname = usePathname()

  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
  }, [])

  return (
    <>
      {/* {(pathname === client_routes.login || pathname === client_routes.register || pathname === client_routes.home)
        ? <AuthHeader />
        : <> */}
      {(pathname === client_routes.search || pathname === client_routes.profile || pathname === client_routes.edit_profile || pathname.includes(client_routes.profile + "/") || pathname === client_routes.discover || pathname === client_routes.chat)
        ? <MainHeader />
        : <AuthHeader />
      }
      {/* </>
      } */}
    </>
  )
}

export default Header