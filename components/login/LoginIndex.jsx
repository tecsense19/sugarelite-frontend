"use client"
import React, { useState } from 'react'
import Forgot_Component from "@/components/login/Forgot_Component"
import Login_component from "@/components/login/Login_component"

const LoginIndex = ({ allStrings }) => {
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  return (
    <>
      {
        !isForgotOpen && <Login_component setIsForgotOpen={setIsForgotOpen} allStrings={allStrings} />
      }
      {
        isForgotOpen && <Forgot_Component setIsForgotOpen={setIsForgotOpen} allStrings={allStrings} />
      }
    </>
  )
}

export default LoginIndex