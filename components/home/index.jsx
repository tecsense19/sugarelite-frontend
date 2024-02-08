"use client"

import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Banner from "./Banner"
import Services from "./Services"

const Home = () => {
  const router = useRouter()
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