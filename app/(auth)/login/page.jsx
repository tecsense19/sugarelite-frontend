"use client"

import Forgot_Component from "@/components/login/Forgot_Component"
import Login_component from "@/components/login/Login_component"
import { useState } from "react"

const Login = () => {

  const [isForgotOpen, setIsForgotOpen] = useState(false)

  return (
    <>
      {
        !isForgotOpen && <Login_component setIsForgotOpen={setIsForgotOpen} />
      }
      {
        isForgotOpen && <Forgot_Component setIsForgotOpen={setIsForgotOpen} />
      }
    </>
  )
}

export default Login