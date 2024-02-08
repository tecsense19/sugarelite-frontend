"use client"

import { client_routes } from "@/app/lib/helpers"
import { usePathname } from "next/navigation"
import AuthHeader from "./AuthHeader"
import MainHeader from "./MainHeader"

const Header = () => {
  const pathname = usePathname()

  return (
    <>
      {(pathname === client_routes.login || pathname === client_routes.register)
        ? <AuthHeader />
        : <MainHeader />
      }
    </>
  )
}

export default Header