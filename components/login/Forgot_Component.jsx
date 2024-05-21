"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import loginLogoImg from "/public/assets/login_logo.svg";
import eliteLogoImg from "/public/assets/elite_logo.svg";
// import bgMobileImg from "/public/assets/Group 427318831.png";
import bgDesktopImg from "/public/assets/large_image.png";
import emailImg from "/public/assets/email.svg";
import { useForm } from 'react-hook-form';
// import Forgot_lock from "/public/assets/locker_2.gif"
import Forgot_lock from "/public/assets/forgot.gif"
import { forgot_password_action } from '@/app/lib/actions';
import { notification } from 'antd';
import { client_notification } from '@/app/lib/helpers';

const Forgot_Component = ({ setIsForgotOpen }) => {
    const [api, contextHolder] = notification.useNotification();
    const { register, setValue, handleSubmit, control, watch, formState: { isValid } } = useForm()
    const [isLoading, setIsLoading] = useState(false)


    const forgotHandler = async (data) => {
        const res = await forgot_password_action(data)
        if (res.success) {
            setIsLoading(false)
            client_notification(api, "topRight", "success", res.message, 5)
        } else {
            setIsLoading(false)
            client_notification(api, "topRight", "error", res.message, 5)
        }
    }

    const loadingHandler = () => {
        if (isValid) {
            setIsLoading(true)
        }
    }


    return (
        <main className="flex h-dvh">
            {contextHolder}
            <div className="h-full w-full relative bg-tinder">
                <div className="h-full w-full absolute p-4 sm:flex items-center sm:items-start sm:pt-[150px] sm:pb-[50px] justify-center overflow-y-auto">
                    <div className="text-white w-full h-full sm:h-[78%] sm:rounded-[5px] sm:w-[85%] md:w-[75%] sm:min-h-[625px] sm:bg-gradient-to-l sm:from-tinder-1 sm:from-0% sm:to-tinder-2 sm:to-100% sm:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] lg:max-w-[762px] flex justify-center items-center flex-col">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <Image src={loginLogoImg} alt={"logo"} width={54} height={64} priority className="w-auto h-auto select-none pointer-events-none" />
                            <Image src={eliteLogoImg} alt={"logo"} width={156} height={34} priority className="select-none pointer-events-none" />
                        </div>
                        <div className='flex items-center justify-center ms-5 relative min-[330px]:w-[20rem] mt-9 '>
                            <Image src={Forgot_lock} unoptimized alt={"logo"} width={80} height={80} priority
                                className="select-none pointer-events-none absolute -left-5 hidden min-[330px]:block"
                            />
                            <p className='text-[20px] text-white'>Forgot Your Password?</p>
                        </div>
                        <form className="w-full max-w-[30rem]" onSubmit={handleSubmit(forgotHandler)}>
                            <div className=" w-full mt-[50px]">
                                <div className='flex items-center h-[42px] border border-white ps-[12px] sm:ps-[20px] rounded-[5px]'>
                                    <Image src={emailImg} width={20} height={20} alt='email' className='me-[10px] w-[20px] h-[20px]' />
                                    <input
                                        type="email"
                                        {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                        onChange={(e) => { setValue("email", e.target.value) }}
                                        placeholder='Email id'
                                        className='w-full placeholder:text-[rgba(255,255,255)] bg-transparent text-[16px] text-white font-medium outline-none'
                                        autoComplete='off' required
                                    />
                                </div>

                            </div>

                            <button className={`rounded-[5px] uppercase bg-white text-[#263238] w-full max-w-[30rem] h-[42px] mt-[50px] font-bold flex justify-center items-center ${isLoading ? "pointer-events-none" : "transition-all duration-75 hover:scale-[1.01]"}`} type="submit" onClick={loadingHandler} >
                                {!isLoading ? "Recover Password" :
                                    <div className="loader after:border-t-black after:border-b-black"></div>
                                }
                            </button>
                        </form>
                        <div className="mt-[50px] text-center">
                            <p className="text-[14px] text-white mb-[10px]">If you know Password? Back to</p>
                            <button onClick={() => setIsForgotOpen(false)} className="text-white font-semibold text-[16px] transition-all duration-150 hover:text-white/70">Log In</button>
                        </div>
                    </div>
                </div>
                {/* <Image src={bgMobileImg} width={1000} height={1000} alt="mob_bg" priority className="w-full block sm:hidden h-full object-cover object-top" /> */}
                <Image src={bgDesktopImg} unoptimized width={1000} height={1000} alt="mob_bg" priority className="w-full h-full hidden sm:block object-cover select-none pointer-events-none" />
            </div>
        </main>
    )
}

export default Forgot_Component