"use client"

import AuthLoader from "@/components/common/AuthLoader"
import Forgot_Component from "@/components/login/Forgot_Component"
import Login_component from "@/components/login/Login_component"
import { Suspense, useState } from "react"

const Login = () => {

  const [isForgotOpen, setIsForgotOpen] = useState(false)

  return (
    <>
      <Suspense fallback={<AuthLoader />}>
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