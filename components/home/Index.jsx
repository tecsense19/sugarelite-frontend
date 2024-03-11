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
import Footer from "../common/Footer"

const Home = () => {
  const { state } = useStore();
  const { firstState: { isOpenMobileNavbar } } = state;
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false)

  useEffect(() => {
    const AOS = require("aos")
    AOS.init()
    setShowScrollTopBtn(false)
    handleScrollTop()
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <>
      <div className={`min-h-dvh w-full overflow-hidden md:pt-[80px] bg-primary text-white transition-all duration-150 ease-linear origin-top flex flex-col ${isOpenMobileNavbar ? "pt-[156px]" : "pt-[65px]"}`}>
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
        <button className="fade-down fixed bottom-5 right-5 w-10 h-10 bg-secondary rounded-full flex justify-center items-center group" onClick={handleScrollTop} data-aos="fade-up">
          <Image src={upArrowIcon} alt="" height={22} width={22} priority className="select-none pointer-events-none transition-all ease-linear duration-75 group-hover:scale-110" />
        </button>
      }
    </>
  )
}

export default Home
