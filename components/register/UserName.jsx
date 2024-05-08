"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import username from "/public/assets/username.svg"
import gmail from "/public/assets/gmail.svg"
import sugar_email from "/public/assets/sugar_email.svg"
import email from "/public/assets/email.svg"
import chevron_right from "/public/assets/chevron_right.svg"
import { checkuser_action } from '@/app/lib/actions'
import { Alert } from 'antd'
import username_email_white from "/public/assets/username_email_white.svg"
import username_email_black from "/public/assets/username_email_black.svg"
import username_telephone_white from "/public/assets/username_telephone_white.svg"
import username_telephone_black from "/public/assets/username_telephone_black.svg"
import GetCountries from './GetCountries'

const UserName = ({ prevStepHandler, register, watch, setValue, setNextStep }) => {

    const [showUserAlreadyExistAlert, setShowUserAlreadyExistAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isEmail, setIsEmail] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [otpArr, setOtpArr] = useState(['', '', '', '', '', '']);

    let handleSubmitCalls = true

    const isValid = {
        username: watch("username"),
        email: watch("email"),
        phone: watch("phone")
    }

    const handleUsernameSubmit = async () => {
        setIsLoading(true);
        setShowOTP(true);
        // if (handleSubmitCalls) {
        //     handleSubmitCalls = false
        //     setShowUserAlreadyExistAlert(false)
        //     let tempEmail = watch("email");
        //     const res = await checkuser_action(tempEmail);
        //     if (res.success === false) {
        //         setIsLoading(false)
        //         setAlertMessage(res.message);
        //         setShowUserAlreadyExistAlert(true);
        //     } else {
        //         handleSubmitCalls = true
        //         setIsLoading(false)
        //         setNextStep(3)
        //     }
        // }
        setIsLoading(false);
    }

    const getAnotherEleWidth = () => {
        // let phoneNumberEle = document.getElementById("phoneNumberEle")
        // let emailEle = document.getElementById("emailEle")
        let width = isEmail ? 104.05 : 55.52
        return width
    }

    const handleOtpChange = (index, event) => {
        const value = event.target.value;
        if (isNaN(value)) {
            // Ensure only numeric values are entered
            return;
        }
        const newOtp = [...otpArr];
        newOtp[index] = value;
        setOtpArr(newOtp);
        // Focus on the next input box
        if (index < otpArr.length - 1 && value !== '') {
            document.getElementById(`otpInput${index + 1}`).focus();
        }
    };

    const handleOtpKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otpArr[index] === '') {
            // Move focus to the previous input box upon backspace
            document.getElementById(`otpInput${index - 1}`).focus();
        }
    }

    return (
        <>
            <div className="text-center flex flex-col items-center ">
                <div className="flex justify-center items-center rounded-full">
                    <Image src={sugar_email} alt="Card_email" width={135.67} height={126} className="pointer-events-none select-none" />
                </div>
                {showOTP
                    ? <>
                        <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px] mt-3">
                            Enter Your OTP
                        </p>
                    </>
                    : <>
                        <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px]">
                            What is your username & email?
                        </p>
                        <p className='text-white mt-3 text-[16px] max-w-[20rem] sm:max-w-full sm:mt-[6px]'>Lorem ipsum dolor sit amet</p>
                    </>
                }
            </div>
            {showOTP
                ? <>
                    <div className='flex justify-between w-[250px] otpContainer my-[20px]'>
                        {otpArr.map((digit, index) => (
                            <input key={index} id={`otpInput${index}`} className='border-0 p-2 mx-1 text-center' type="tel" maxLength="1" value={digit} onChange={(e) => handleOtpChange(index, e)} onKeyDown={(e) => handleOtpKeyDown(index, e)} placeholder='X' />
                        ))}
                    </div>
                    <p className="text-2xl sm:text-[20px] font-medium max-w-[15rem] mb-8 sm:max-w-full border-b leading-[normal]">
                        Resend OTP
                    </p>
                    <div className={`mt-[18px] w-full sm:grid grid-cols-2 gap-x-[37px]`}>
                        <button className="sm:border-none bg-black w-full h-[42px] mb-3 rounded text-white transition-all duration-150 hover:scale-[1.02]" type="button" onClick={() => setShowOTP(false)}>
                            <div className="flex justify-center gap-[5px] font-medium text-[16px] leading-[normal]">
                                <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden" />
                                BACK
                            </div>
                        </button>
                        <button className={`w-full h-[42px] bg-white rounded relative text-[#263238]`}
                            type="button">
                            <div className="flex justify-center gap-[5px] font-bold sm:ms-4 text-[16px] leading-[normal]">
                                VERIFY OTP
                            </div>
                        </button>
                    </div>
                </>
                : <>
                    <div className='mt-14 w-full sm:mt-[25px]'>
                        <div className=' mb-3 flex h-[42px] items-center border border-white ps-[12px] sm:ps-[20px] rounded-[5px]'>
                            <Image src={username} width={20} height={20} alt='username ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' />
                            <input
                                type="text"
                                {...register('username', { required: true })}
                                onChange={(e) => setValue("username", e.target.value)}
                                placeholder='Username'
                                className='w-full bg-transparent  placeholder:text-[rgba(255,255,255)]  text-[16px] text-white font-medium outline-none '
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className='flex justify-center items-center my-6'>
                            <div className='flex items-center relative ps-[20px] pe-[30px] py-[9px] gap-x-8 bg-white rounded-[30px] overflow-hidden'>
                                <span className={`z-[1] cursor-pointer flex justify-center items-center gap-x-1 transition-all duration-200 text-[13px] font-medium leading-[13px] ${isEmail ? "text-black" : "text-white"}`} onClick={() => setIsEmail(false)}>
                                    <Image src={isEmail ? username_telephone_black : username_telephone_white} alt='' height={14} width={14} />
                                    Phone Number
                                </span>
                                <div id='isEmailSelected' className={`bg-black absolute rounded-[20px] z-0 h-[100%] transition-all duration-200 ${isEmail ? `translate-x-[calc(100%+12px)]` : "translate-x-[-22px]"}`} style={{ width: `calc(100% - 32px - ${getAnotherEleWidth()}px - ${isEmail ? "0px" : "10px"})` }}></div>
                                <span className={`z-[1] cursor-pointer flex justify-center items-center gap-x-2 transition-all duration-200 text-[13px] font-medium leading-[13px] ${!isEmail ? "text-black" : "text-white"}`} onClick={() => setIsEmail(true)}>
                                    <Image src={isEmail ? username_email_white : username_email_black} alt='' height={13} width={13} />
                                    E-mail
                                </span>
                            </div>
                        </div>
                        {/* <div className=' flex items-center h-[42px] border border-white ps-[12px] sm:ps-[20px] rounded-[5px]'>
                            <Image src={email} width={20} height={20} alt='email ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' />
                            {isEmail
                                ? <input
                                    type="email"
                                    {...register('email', { required: "Email needed" })}
                                    onChange={(e) => { setShowUserAlreadyExistAlert(false); setValue("email", e.target.value) }}
                                    placeholder='Enter Your Email Address'
                                    className='w-full placeholder:text-[rgba(255,255,255)]  bg-transparent text-[16px] text-white font-medium outline-none'
                                    autoComplete='off'
                                />
                                :
                                <input
                                    type="tel"
                                    {...register('phone', { required: "Email needed" })}
                                    onChange={(e) => { setShowUserAlreadyExistAlert(false); setValue("phone", e.target.value.replace(/\D/g, "").slice(0, 12)) }}
                                    placeholder='Enter Your Phone Number'
                                    className='w-full placeholder:text-[rgba(255,255,255)] bg-transparent text-[16px] text-white font-medium outline-none'
                                    autoComplete='off'
                                />
                            }
                            {
                                isLoading && <div className='me-3'>
                                    <span className='loader'></span>
                                </div>
                            }
                        </div> */}
                        {isEmail
                            ?
                            <div className=' flex items-center h-[42px] border border-white ps-[12px] sm:ps-[20px] rounded-[5px]'>
                                <Image src={email} width={20} height={20} alt='email ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' />
                                <input
                                    type="email"
                                    {...register('email', { required: "Email needed" })}
                                    onChange={(e) => { setShowUserAlreadyExistAlert(false); setValue("email", e.target.value) }}
                                    placeholder='Enter Your Email Address'
                                    className='w-full placeholder:text-[rgba(255,255,255)]  bg-transparent text-[16px] text-white font-medium outline-none'
                                    autoComplete='off'
                                />
                                {
                                    isLoading && <div className='me-3'>
                                        <span className='loader'></span>
                                    </div>
                                }
                            </div> : <div className='flex items-center h-[42px] gap-x-2 '>
                                {/* <Image src={username_telephone_white} width={20} height={20} alt='phone ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' /> */}
                                <GetCountries />
                                <input
                                    type="tel"
                                    {...register('phone', { required: "Email needed" })}
                                    onChange={(e) => { setShowUserAlreadyExistAlert(false); setValue("phone", e.target.value.replace(/\D/g, "").slice(0, 12)) }}
                                    placeholder='Enter Your Phone Number'
                                    className='basis-4/5 border h-full rounded-[5px] border-white placeholder:text-[rgba(255,255,255)] bg-transparent text-[16px] text-white font-medium outline-none'
                                    autoComplete='off'
                                />
                            </div>
                        }
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
                        <button className={`w-full h-[42px] bg-white rounded relative text-primary-dark-5 ${isEmail ? ((!isValid.email || isValid.username.length < 3 || !isValid.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) ? "" : "transition-all duration-150 hover:scale-[1.02]") : ((!isValid.phone || isValid.username.length < 3) ? "" : "transition-all duration-150 hover:scale-[1.02]")}`}
                            onClick={() => { handleUsernameSubmit() }}
                            type="button"
                            disabled={isEmail ? (!isValid.email || isValid.username.length < 3 || !isValid.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) : (!isValid.phone || isValid.username.length < 3)}>
                            <div className="flex justify-center gap-[5px] font-medium sm:ms-4 text-[16px] leading-[normal] text-[#263238]">
                                NEXT
                                <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                            </div>
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default UserName