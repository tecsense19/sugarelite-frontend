"use client"
import { Checkbox, ConfigProvider } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export default () => {

  const { register, setValue, handleSubmit, control, watch } = useForm()
  const [showPass, setShowPass] = useState(false)

  const showPasswordHandler = (handle) => {
    if (handle === "open") {
      setShowPass(true)
    } else {
      setShowPass(false)
    }
  }

  const loginHandler = (data) => {
    console.log(data)
  }

  return (
    <main className="flex bg-black h-dvh">
      <div className="h-full w-full relative">
        <div className="h-[calc(100%)] w-full absolute p-4 sm:flex items-center justify-center">
          <div className="text-white w-full h-full sm:h-[78%] sm:rounded-[5px] sm:w-[85%] md:w-[75%] sm:bg-primary sm:bg-opacity-[80%] flex justify-center items-center flex-col ">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image src={`/assets/login_logo.svg`} alt={"logo"} width={54} height={64} priority className="w-auto h-auto select-none pointer-events-none" />
              <Image src={`/assets/elite_logo.svg`} alt={"logo"} width={156} height={34} priority className="select-none pointer-events-none" />
            </div>
            <form className="w-full max-w-[30rem]" onSubmit={handleSubmit(loginHandler)}>
              <div className=" w-full mt-[97px]">
                <div className='flex items-center h-[42px] border border-[#535353] ps-[12px] sm:ps-[20px] rounded-[5px]'>
                  <Image src={'/assets/email.svg'} width={20} height={20} alt='email' className='me-[10px] w-[20px] h-[20px]' />
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    onChange={(e) => setValue("email", e.target.value)}
                    placeholder='Email id'
                    className='w-full placeholder:text-[rgba(255,255,255,0.5)] bg-transparent text-[16px] text-white text-opacity-[70%] font-medium outline-none'
                    autoComplete='off'
                  />
                </div>
                <div className=' flex h-[42px] items-center border border-[#535353] ps-[12px] mt-[12px] sm:ps-[20px] rounded-[5px]'>
                  <Image src={showPass ? '/assets/password.svg' : "/assets/lock.svg"} width={20} height={20} alt='password ' className='me-[10px] w-[20px] h-[20px]' />
                  <input
                    type={showPass ? "text" : "password"}
                    {...register('cpassword', { required: true })}
                    onChange={(e) => setValue("cpassword", e.target.value)}
                    placeholder='Password'
                    className='w-full bg-transparent text-[16px] placeholder:text-[rgba(255,255,255,0.5)] text-white text-opacity-[70%] outline-none ' autoComplete='new-password' />
                  {
                    showPass ?
                      <Image src={'/assets/eye_close.svg'} width={20} height={20} alt='password' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("close")} /> :
                      <Image src={'/assets/eye_open.svg'} width={20} height={20} alt='password' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("open")} />
                  }
                </div>
              </div>
              <div className="w-full flex justify-between text-[12px] text-opacity-50 text-white mt-[10px]">
                <div className="flex items-center gap-[5px]">
                  <Controller name="remember" defaultValue={false} control={control} render={() => (
                    <ConfigProvider theme={{ token: { colorPrimary: "#F16667", fontSize: 20 } }}>
                      <Checkbox className='h-4 w-4 flex justify-end' id="remember" onChange={(e) => setValue("remember", e.target.checked)} checked={watch("remember")} />
                    </ConfigProvider>
                  )} />
                  <label htmlFor="remember" className="select-none cursor-pointer">Remember me</label>
                </div>
                <span className="underline pb-1 cursor-pointer select-none">Forgotten Password</span>
              </div>
              <button className="rounded-[5px] bg-secondary w-full max-w-[30rem] h-[42px] mt-[50px] font-medium" type="submit">
                Log in
              </button>
            </form>
            <div className="mt-[50px] text-center">
              <p className="text-[14px] text-white text-opacity-50 mb-[10px]">Don’t have an account?</p>
              <Link href={"/register"} className="text-secondary font-semibold text-[16px]">Sign Up</Link>
            </div>
          </div>
        </div>
        <Image src={'/assets/Group 427318831.png'} width={1000} height={1000} alt="mob_bg" priority className="w-full block sm:hidden h-full object-cover object-top" />
        <Image src={'/assets/large_image.png'} width={1000} height={1000} alt="mob_bg" priority className="w-full h-full hidden sm:block object-cover select-none pointer-events-none" />
      </div>
    </main>
  )
}