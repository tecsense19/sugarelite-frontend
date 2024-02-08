"use client"

import { useEffect } from "react"
import Banner from "./Banner"
import Services from "./Services"

const Home = () => {
  useEffect(() => {
    const AOS = require("aos")
    AOS.init()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return (
    <>
      <div className="min-h-dvh pt-[80px] bg-primary text-white pb-10">
        <Banner />
        <Services />
      </div>
    </>
  )
}

export default Home