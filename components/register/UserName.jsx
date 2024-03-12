"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import username from "/public/assets/username.svg"
import gmail from "/public/assets/gmail.svg"
import sugar_email from "/public/assets/sugar_email.svg"
import email from "/public/assets/email.svg"
import chevron_right from "/public/assets/chevron_right.svg"
import { checkuser_action } from '@/app/lib/actions'
import { Alert } from 'antd'

const UserName = ({ prevStepHandler, register, watch, setValue, setNextStep }) => {

    const [showUserAlreadyExistAlert, setShowUserAlreadyExistAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    let handleSubmitCalls = true

    const isValid = {
        username: watch("username"),
        email: watch("email")
    }

    const handleUsernameSubmit = async () => {
        if (handleSubmitCalls) {
            handleSubmitCalls = false
            setShowUserAlreadyExistAlert(false)
            let tempEmail = watch("email");
            const res = await checkuser_action(tempEmail);
            if (res.success === false) {
                setIsLoading(false)
                setAlertMessage(res.message);
                setShowUserAlreadyExistAlert(true);
            } else {
                handleSubmitCalls = true
                setIsLoading(false)
                setNextStep(3)
            }
        }
    }

    return (
        <>
            <div className="text-center flex flex-col items-center ">
                <div className="flex justify-center items-center rounded-full">
                    <Image src={sugar_email} alt="Card_email" width={135.67} height={126} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px]">What is your username & email?</p>
                <p className='text-white opacity-[50%] mt-3 text-[16px] max-w-[20rem] sm:max-w-full sm:mt-[6px]'>Lorem ipsum dolor sit amet</p>
            </div>
            <div className='mt-14 w-full sm:mt-[25px] '>
                <div className=' mb-3 flex h-[42px] items-center border border-white ps-[12px] sm:ps-[20px]  rounded-[5px]'>
                    <Image src={username} width={20} height={20} alt='username ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' />
                    <input
                        type="text"
                        {...register('username', { required: true })}
                        onChange={(e) => setValue("username", e.target.value)}
                        placeholder='Username'
                        className='w-full bg-transparent  placeholder:text-[rgba(255,255,255,0.5)]  text-[16px] text-white font-medium outline-none '
                        autoComplete='off'
                        required
                    />
                </div>
                <div className=' flex items-center h-[42px] border border-white ps-[12px] sm:ps-[20px] rounded-[5px]'>
                    <Image src={email} width={20} height={20} alt='email ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' />
                    <input
                        type="email"
                        {...register('email', { required: "Email needed" })}
                        onChange={(e) => { setShowUserAlreadyExistAlert(false); setValue("email", e.target.value) }}
                        placeholder='E-mail'
                        className='w-full placeholder:text-[rgba(255,255,255,0.5)]  bg-transparent text-[16px] text-white font-medium outline-none'
                        autoComplete='off'
                    />
                    {
                        isLoading && <div className='me-3'>
                            <span className='loader'></span>
                        </div>
                    }
                </div>
                {showUserAlreadyExistAlert
                    ? <Alert message={alertMessage} type="warning" showIcon className="!mt-0 !bg-transparent !text-white text-[16px] !border-0 !rounded-[5px]" />
                    : <></>
                }
            </div>
            <div className={`${showUserAlreadyExistAlert ? "mt-[18px]" : "mt-14"} w-full sm:grid grid-cols-2 gap-x-[37px] `}>
                <button className="sm:border-none bg-black w-full h-[42px] mb-3 rounded text-white transition-all duration-150 hover:scale-[1.02]" onClick={() => { prevStepHandler() }} type="button">
                    <div className="flex justify-center gap-[5px] font-medium text-[16px] leading-[normal]">
                        <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden opacity-70 " />
                        BACK
                    </div>
                </button>
                <button className={`w-full h-[42px] bg-white rounded relative text-primary-dark-5 ${(!isValid.email || isValid.username.length < 3 || !isValid.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) ? "" : "transition-all duration-150 hover:scale-[1.02]"}`}
                    onClick={() => { setIsLoading(true); handleUsernameSubmit() }}
                    type="button"
                    disabled={!isValid.email || isValid.username.length < 3 || !isValid.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)}>
                    <div className="flex justify-center gap-[5px] font-medium sm:ms-4 text-[16px] leading-[normal]">
                        NEXT
                        <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                    </div>
                </button>
            </div>

        </>
    )
}

export default UserName