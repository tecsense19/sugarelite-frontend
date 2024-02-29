"use client"
import { Checkbox, ConfigProvider, notification } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import unLockImg from "/public/assets/password.svg"
import lockImg from "/public/assets/lock.svg";
import loginLogoImg from "/public/assets/login_logo.svg";
import eliteLogoImg from "/public/assets/elite_logo.svg";
import emailImg from "/public/assets/email.svg";
import eyeCloseImg from "/public/assets/eye_close.svg";
import eyeOpenImg from "/public/assets/eye_open.svg";
import bgMobileImg from "/public/assets/Group 427318831.png";
import bgDesktopImg from "/public/assets/large_image.png";
import { login_action } from "@/app/lib/actions"
import { client_notification, client_routes } from "@/app/lib/helpers"
import CryptoJS from "crypto-js"
import { setCookie } from "nookies"
import { useRouter } from "next/navigation"

const Login = ({ setIsForgotOpen }) => {

    const { register, setValue, handleSubmit, control, watch, formState: { isValid } } = useForm()
    const [showPass, setShowPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useRouter()

    const [api, contextHolder] = notification.useNotification();

    const showPasswordHandler = (handle) => {
        if (handle === "open") {
            setShowPass(true)
        } else {
            setShowPass(false)
        }
    }

    const loginHandler = async (data) => {
        const res = await login_action(data)
        if (!res.success) {
            setIsLoading(false)
            client_notification(api, "topRight", "error", res.message, 2)
            return;
        }
        setIsLoading(false)
        client_notification(api, "topRight", "success", res.message, 2)
        const token = CryptoJS.AES.encrypt(JSON.stringify(res.data), "SecretKey").toString()
        setCookie(null, "user", token, { maxAge: 3600, secure: true, })
        navigate.push(client_routes.profile)
    }

    const loadingHandler = () => {
        if (isValid) {
            setIsLoading(true)
        }
    }



    return (
        <main className="flex h-dvh">
            {contextHolder}
            <div className="h-full w-full relative">
                <div className="h-full w-full absolute p-4 sm:flex items-center sm:items-start sm:pt-[150px] sm:pb-[50px] justify-center overflow-y-auto">
                    <div className="text-white w-full h-full sm:h-[78%] sm:rounded-[5px] sm:w-[85%] md:w-[75%] sm:min-h-[625px] sm:bg-primary/80 sm:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] lg:max-w-[762px] flex justify-center items-center flex-col ">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <Image src={loginLogoImg} alt={"logo"} width={54} height={64} priority className="w-auto h-auto select-none pointer-events-none" />
                            <Image src={eliteLogoImg} alt={"logo"} width={156} height={34} priority className="select-none pointer-events-none" />
                        </div>
                        <form className="w-full max-w-[30rem]" onSubmit={handleSubmit(loginHandler)}>
                            <div className=" w-full mt-[97px]">
                                <div className='flex items-center h-[42px] border border-[#535353] ps-[12px] sm:ps-[20px] rounded-[5px]'>
                                    <Image src={emailImg} width={20} height={20} alt='email' className='me-[10px] w-[20px] h-[20px]' />
                                    <input
                                        type="email"
                                        {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                        onChange={(e) => setValue("email", e.target.value)}
                                        placeholder='Email id'
                                        className='w-full placeholder:text-[rgba(255,255,255,0.5)] bg-transparent text-[16px] text-white text-opacity-[70%] font-medium outline-none'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className=' flex h-[42px] items-center border border-[#535353] ps-[12px] mt-[12px] sm:ps-[20px] rounded-[5px]'>
                                    <Image src={showPass ? unLockImg : lockImg} width={20} height={20} alt='password ' className='me-[10px] w-[20px] h-[20px]' />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        {...register('password', { required: true, })}
                                        onChange={(e) => setValue("password", e.target.value)}
                                        placeholder='Password'
                                        className='w-full bg-transparent text-[16px] placeholder:text-[rgba(255,255,255,0.5)] text-white text-opacity-[70%] outline-none ' autoComplete='new-password' />
                                    {
                                        showPass ?
                                            <Image src={eyeCloseImg} width={20} height={20} alt='password' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("close")} /> :
                                            <Image src={eyeOpenImg} width={20} height={20} alt='password' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("open")} />
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
                                <span className="underline pb-1 cursor-pointer select-none" onClick={() => setIsForgotOpen(true)}>Forgotten Password</span>
                            </div>
                            <button className="rounded-[5px] bg-secondary w-full max-w-[30rem] h-[42px] mt-[50px] font-medium flex justify-center items-center" type="submit" onClick={loadingHandler}>
                                {!isLoading ? "Log in" :
                                    <div className="loader"></div>
                                }
                            </button>
                        </form>
                        <div className="mt-[50px] text-center">
                            <p className="text-[14px] text-white text-opacity-50 mb-[10px]">Don’t have an account?</p>
                            <Link href={"/register"} className="text-secondary font-semibold text-[16px]">Sign Up</Link>
                        </div>
                    </div>
                </div>
                <Image src={bgMobileImg} width={1000} height={1000} alt="mob_bg" priority className="w-full block sm:hidden h-full object-cover object-top" />
                <Image src={bgDesktopImg} width={1000} height={1000} alt="mob_bg" priority className="w-full h-full hidden sm:block object-cover select-none pointer-events-none" />
            </div>
        </main>
    )
}

export default Login