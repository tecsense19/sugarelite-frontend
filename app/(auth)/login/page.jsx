"use client"

import Loader from "@/components/common/Loader"
import Forgot_Component from "@/components/login/Forgot_Component"
import Login_component from "@/components/login/Login_component"
import { Suspense, useState } from "react"

const Login = () => {

  const [isForgotOpen, setIsForgotOpen] = useState(false)

  return (
    <>
      <Suspense fallback={<Loader />}>
        {
          !isForgotOpen && <Login_component setIsForgotOpen={setIsForgotOpen} />
        }
        {
          isForgotOpen && <Forgot_Component setIsForgotOpen={setIsForgotOpen} />
        }
      </Suspense>
    </>
  )
}

export default Login