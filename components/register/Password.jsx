"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import pad_lock from "/public/assets/pad_lock.svg"
import sugar_password from "/public/assets/sugar_password.svg"
import password from "/public/assets/password.svg"
import valid_pass from "/public/assets/password_valid.svg"
import in_valid_pass from "/public/assets/password_cross.svg"
import lock from "/public/assets/lock.svg"
import eye_close from "/public/assets/eye_close.svg"
import eye_open from "/public/assets/eye_open.svg"
import chevron_right from "/public/assets/chevron_right.svg"
import chevron_right_white from "/public/assets/chevron_right_white.svg"
import { Popover } from 'antd'

const Password = ({ nextStepHandler, prevStepHandler, register, watch, setValue }) => {

    const [showCPass, setShowCPass] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showPopOver, setShowPopOver] = useState(false)
    const [isValidPass, setIsValidPass] = useState({
        sixChar: false,
        mixChar: false,
        numChar: false,
        spclChar: false,
        sqncChar: false
    })

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

    useEffect(() => {
        const validatePassword = (password) => {
            const regex = {
                sixChar: /.{6,}/,
                mixChar: /^(?=.*[a-z])(?=.*[A-Z])/,
                spclChar: /[!@#$%^&*]/,
                numChar: /\d/,
                sqncChar: /^(?!.*(.)\1{2})/
            };

            setIsValidPass({
                sixChar: regex.sixChar.test(password),
                mixChar: regex.mixChar.test(password),
                spclChar: regex.spclChar.test(password),
                numChar: regex.numChar.test(password),
                sqncChar: regex.sqncChar.test(password)
            });
        };

        validatePassword(watch("password"));

    }, [watch("password")])

    const content = (
        <div className='w-full'>
            <p className='font-semibold text-[17px]'>Password must contains</p>
            <div className='text-xs mt-[3px] me-1'>
                <div className='flex gap-x-2'>
                    <Image src={isValidPass.sixChar ? valid_pass : in_valid_pass} alt="pad_lock" width={14} height={14} className="pointer-events-none select-none" />
                    <p className={isValidPass.sixChar ? 'leading-[19px] text-green-600' : 'leading-[19px]'}>{'Minimum of 6 characters'}</p>
                </div>
                <div className='flex gap-x-2'>
                    <Image src={isValidPass.mixChar ? valid_pass : in_valid_pass} alt="pad_lock" width={14} height={14} className="pointer-events-none select-none" />
                    <p className={isValidPass.mixChar ? 'leading-[19px] text-green-600' : 'leading-[19px]'}>{'Include a mix of uppercase and lowercase letters'}</p>
                </div>
                <div className='flex gap-x-2'>
                    <Image src={isValidPass.numChar ? valid_pass : in_valid_pass} alt="pad_lock" width={14} height={14} className="pointer-events-none select-none" />
                    <p className={isValidPass.numChar ? 'leading-[19px] text-green-600' : 'leading-[19px]'}>{'Include at least one number (0-9)'}</p>
                </div>
                <div className='flex gap-x-2'>
                    <Image src={isValidPass.spclChar ? valid_pass : in_valid_pass} alt="pad_lock" width={14} height={14} className="pointer-events-none select-none" />
                    <p className={isValidPass.spclChar ? 'leading-[19px] text-green-600' : 'leading-[19px]'}>{'At least one special character (!@#$%^&*)'}</p>
                </div>
                <div className='flex gap-x-2'>
                    <Image src={isValidPass.sqncChar ? valid_pass : in_valid_pass} alt="pad_lock" width={14} height={14} className="pointer-events-none select-none" />
                    <p className={isValidPass.sqncChar ? 'leading-[19px] text-green-600' : 'leading-[19px]'}>{'Avoid repeating characters (e.g., "aaa")'}</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="flex justify-center items-center rounded-full">
                    <Image src={sugar_password} alt="pad_lock" width={120} height={126} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px]">What should your password be?</p>
                <p className='text-white mt-3 text-[16px] max-w-[20rem] sm:hidden'>Lorem ipsum dolor sit amet</p>
            </div>
            <div className='mt-14 w-full sm:mt-[25px]'>
                <Popover placement='bottomLeft' open={showPopOver} content={content}>
                    <div className='mb-3 flex h-[42px] items-center border border-white ps-[12px] sm:ps-[20px] rounded-[5px] relative'>
                        <Image src={password} width={20} height={20} alt='password ' className={`me-[10px] sm:me-[14px] w-[20px] h-[20px] ${showPass ? "block" : "hidden"}`} />
                        <Image src={lock} width={20} height={20} alt='password ' className={`me-[10px] sm:me-[14px] w-[20px] h-[20px] ${showPass ? "hidden" : "block"}`} />
                        <input
                            type={showPass ? "text" : "password"}
                            {...register('password', { required: true })}
                            onChange={(e) => setValue("password", e.target.value)}
                            onFocus={() => setShowPopOver(true)} // Show Popover when input is focused
                            onBlur={() => setShowPopOver(false)}
                            placeholder='Password'
                            className='w-full bg-transparent text-[16px] font-medium placeholder:text-[rgba(255,255,255)] text-white outline-none '
                            autoComplete='new-password' />

                        <Image src={eye_close} width={20} height={20} alt='password ' className={`me-[14px] w-[20px] h-[20px] cursor-pointer ${showPass ? "block" : "hidden"}`} onClick={() => showPasswordHandler("close", "password")} />
                        <Image src={eye_open} width={20} height={20} alt='password ' className={`me-[14px] w-[20px] h-[20px] cursor-pointer ${showPass ? "hidden" : "block"}`} onClick={() => showPasswordHandler("open", "password")} />

                    </div>
                </Popover>
                <div className=' flex h-[42px] items-center border border-white ps-[12px] sm:ps-[20px] rounded-[5px]'>
                    <Image src={password} width={20} height={20} alt='password ' className={`sm:me-[14px] me-[10px] w-[20px] h-[20px] ${showCPass ? "block" : "hidden"}`} />
                    <Image src={lock} width={20} height={20} alt='password ' className={`sm:me-[14px] me-[10px] w-[20px] h-[20px] ${showCPass ? "hidden" : "block"}`} />
                    <input
                        type={showCPass ? "text" : "password"}
                        {...register('cpassword', { required: true })}
                        onChange={(e) => setValue("cpassword", e.target.value)}
                        placeholder='Confirm Password'
                        className='w-full bg-transparent text-[16px] font-medium placeholder:text-[rgba(255,255,255)] text-white outline-none '
                        autoComplete='new-password' />

                    <Image src={eye_close} width={20} height={20} alt='password' className={`me-[14px] w-[20px] h-[20px] cursor-pointer ${showCPass ? "block" : "hidden"}`} onClick={() => showPasswordHandler("close", "cpass")} />
                    <Image src={eye_open} width={20} height={20} alt='password' className={`me-[14px] w-[20px] h-[20px] cursor-pointer ${showCPass ? "hidden" : "block"}`} onClick={() => showPasswordHandler("open", "cpass")} />
                </div>
            </div>
            <div className='mt-14 w-full sm:grid grid-cols-2 gap-x-[37px]'>
                <button className="bg-stone-600 w-full h-[42px] mb-3 rounded-[5px] text-white transition-all duration-150 hover:scale-[1.02]" onClick={prevStepHandler} type="button">
                    <div className="flex justify-center gap-[5px] font-bold text-[16px] leading-[normal]">
                        <Image src={chevron_right_white} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden " />
                        BACK
                    </div>
                </button>
                <button
                    className={`bg-white w-full h-[42px] rounded-[5px] relative text-[#263238] ${((isValid.passowrd !== isValid.cpassowrd) || !isValid.passowrd || isValid.passowrd.length < 6) ? "" : "transition-all duration-150 hover:scale-[1.02]"}`}
                    onClick={nextStepHandler} type="button"
                    disabled={(isValid.passowrd !== isValid.cpassowrd) || !isValidPass.mixChar || !isValidPass.numChar || !isValidPass.sixChar || !isValidPass.spclChar || !isValidPass.sqncChar}>
                    <div className="flex justify-center gap-[5px] font-bold text-[16px] leading-[normal] sm:ms-4 ">
                        NEXT
                        <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                    </div>
                </button>
            </div>
        </>
    )
}

export default Password