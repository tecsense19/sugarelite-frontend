"use client"

import { useEffect, useState } from "react"
import Banner from "./Banner"
import Services from "./Services"
import { useStore } from "@/store/store"
import UserFriendly from "./UserFriendly"
import EasySearch from "./EasySearch"
import Image from "next/image"
import upArrowIcon from "../../public/assets/up_arrow.svg";
import UniqueProfile from "./UniqueProfile"
import HomeCounter from "./HomeCounter"
import Working from "./Working"
import Footer from "./Footer"

const Home = () => {
  const { state: { isOpenMobileNavbar } } = useStore();
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false)

  useEffect(() => {
    const AOS = require("aos")
    AOS.init()
    setShowScrollTopBtn(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
    const scrollEventListener = () => {
      if (window.scrollY > 300) {
        setShowScrollTopBtn(true)
      } else {
        setShowScrollTopBtn(false)
      }
    }
    window.addEventListener("scroll", () => {
      scrollEventListener()
    })
    return () => {
      window.removeEventListener("scroll", () => {
        scrollEventListener()
      })
    }
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <div className={`min-h-dvh md:pt-[80px] bg-primary text-white transition-all duration-150 ease-linear origin-top ${isOpenMobileNavbar ? "pt-[156px]" : "pt-[65px]"}`}>
        <Banner />
        <Services />
        <UserFriendly />
        <EasySearch />
        <UniqueProfile />
        <HomeCounter />
        <Working />
        <Footer />
      </div>
      {showScrollTopBtn &&
        <button className="fade-down fixed bottom-5 right-5 w-10 h-10 bg-secondary rounded-full flex justify-center items-center" onClick={handleScrollTop} data-aos="fade-up">
          <Image src={upArrowIcon} alt="" height={22} width={22} priority className="select-none pointer-events-none" />
        </button>
      }
    </>
  )
}

export default Home