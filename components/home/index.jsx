"use client"

import { useEffect } from "react"
import Banner from "./Banner"
import Services from "./Services"
import { useStore } from "@/store/store"
import UserFriendly from "./UserFriendly"

const Home = () => {
  const { state: { isOpenMobileNavbar } } = useStore();

  useEffect(() => {
    const AOS = require("aos")
    AOS.init()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return (
    <>
      <div className={`min-h-dvh md:pt-[80px] bg-primary text-white pb-10 transition-all duration-150 ease-linear origin-top ${isOpenMobileNavbar ? "pt-[156px]" : "pt-[65px]"}`}>
        <Banner />
        <Services />
        <UserFriendly />
      </div>
    </>
  )
}

export default Home