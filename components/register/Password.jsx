"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import pad_lock from "../../public/assets/pad_lock.svg"
import password from "../../public/assets/password.svg"
import lock from "../../public/assets/lock.svg"
import eye_close from "../../public/assets/eye_close.svg"
import eye_open from "../../public/assets/eye_open.svg"
import chevron_right from "../../public/assets/chevron_right.svg"

const Password = ({ nextStepHandler, prevStepHandler, register, watch, setValue }) => {

    const [showCPass, setShowCPass] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const isValid = {
        passowrd: watch("password"),
        cpassowrd: watch("cpassword"),
    }

    const showPasswordHandler = (handle, type) => {
        if (type === "cpass") {
            if (handle === "open") {
                setShowCPass(true)
            } else {
                setShowCPass(false)
            }
        } else {
            if (handle === "open") {
                setShowPass(true)
            } else {
                setShowPass(false)
            }
        }
    }
    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={pad_lock} alt="pad_lock" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px]">What should your password be?</p>
                <p className='text-white opacity-[50%] mt-3 text-[16px] max-w-[20rem] sm:hidden'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className='mt-14 w-full sm:mt-[25px]'>
                <div className=' mb-3 flex h-[42px] items-center border border-[#535353] ps-[12px] sm:ps-[20px] rounded-[5px]'>
                    <Image src={showPass ? password : lock} width={20} height={20} alt='password ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' />
                    <input
                        type={showPass ? "text" : "password"}
                        {...register('password', { required: true })}
                        onChange={(e) => setValue("password", e.target.value)}
                        placeholder='Password'
                        className='w-full bg-transparent text-[16px] placeholder:text-[rgba(255,255,255,0.5)] text-white text-opacity-[50%] outline-none '
                        autoComplete='new-password' />
                    {
                        showPass ?
                            <Image src={eye_close} width={20} height={20} alt='password ' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("close", "password")} /> :
                            <Image src={eye_open} width={20} height={20} alt='password ' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("open", "password")} />
                    }
                </div>
                <div className=' flex h-[42px] items-center border border-[#535353] ps-[12px] sm:ps-[20px] rounded-[5px]'>
                    <Image src={showCPass ? password : lock} width={20} height={20} alt='password ' className='sm:me-[14px] me-[10px] w-[20px] h-[20px]' />
                    <input
                        type={showCPass ? "text" : "password"}
                        {...register('cpassword', { required: true })}
                        onChange={(e) => setValue("cpassword", e.target.value)}
                        placeholder='Confirm Password'
                        className='w-full bg-transparent text-[16px] placeholder:text-[rgba(255,255,255,0.5)] text-white text-opacity-[50%] outline-none '
                        autoComplete='new-password' />
                    {
                        showCPass ?
                            <Image src={eye_close} width={20} height={20} alt='password ' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("close", "cpass")} /> :
                            <Image src={eye_open} width={20} height={20} alt='password ' className='me-[14px]  w-[20px] h-[20px] cursor-pointer' onClick={() => showPasswordHandler("open", "cpass")} />
                    }
                </div>
            </div>
            <div className='mt-14 w-full sm:grid grid-cols-2 gap-x-[37px]'>
                <button className="border sm:border-none border-[#535353] sm:bg-black w-full h-[42px] mb-3 rounded text-white text-opacity-[70%]" onClick={prevStepHandler} type="button">
                    <div className="flex justify-center gap-[5px] font-bold">
                        <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden opacity-70 " />
                        BACK
                    </div>
                </button>
                <button className="bg-secondary w-full h-[42px] rounded border border-[#53535350] relative text-white text-opacity-[70%]" onClick={nextStepHandler} type="button" disabled={(isValid.passowrd !== isValid.cpassowrd) || !isValid.passowrd}>
                    <div className="flex justify-center gap-[5px] font-bold sm:ms-4 ">
                        NEXT
                        <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                    </div>
                </button>
            </div>
        </>
    )
}

export default Password