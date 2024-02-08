"use client"

import { client_routes } from "@/app/lib/helpers"
import { useRouter } from "next/navigation"

const Home = () => {
  const router = useRouter()
  return (
    <>
      <button className="bg-gray rounded-md p-2" onClick={() => router.push(client_routes.login)}>Login</button>
      <button className="bg-gray rounded-md p-2" onClick={() => router.push(client_routes.register)}>Register</button>
    </>
  )
}

export default Home