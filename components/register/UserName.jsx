"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import username from "/public/assets/username.svg"
import gmail from "/public/assets/gmail.svg"
import sugar_email from "/public/assets/sugar_email.svg"
import email from "/public/assets/email.svg"
import chevron_right from "/public/assets/chevron_right.svg"
import chevron_right_white from "/public/assets/chevron_right_white.svg"
import { all_profiles_action, checkuser_action, send_otp_action, verify_otp_action } from '@/app/lib/actions'
import { Alert, notification } from 'antd'
import username_email_white from "/public/assets/email.svg"
import username_email_black from "/public/assets/username_email_black.svg"
import username_telephone_white from "/public/assets/username_telephone_white.svg"
import username_telephone_black from "/public/assets/username_telephone_black.svg"
import GetCountries from './GetCountries'
import { specificCountries } from '@/app/lib/allCountries'
import { client_notification } from '@/app/lib/helpers'


const UserName = ({ prevStepHandler, register, watch, setValue, setNextStep, allStrings, allUsersProfile, setAllUsersProfile, isEmail, setIsEmail }) => {

    const [showUserAlreadyExistAlert, setShowUserAlreadyExistAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    // const [isEmail, setIsEmail] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [otpArr, setOtpArr] = useState(['', '', '', '', '', '']);
    const [countries, setCountries] = useState(specificCountries);
    const [selectedCountry, setSelectedCountry] = useState(specificCountries[0]);
    const [showCountryCode, setShowCountryCode] = useState(false);
    const [otpId, setOtpId] = useState("")
    const [api, contextHolder] = notification.useNotification();

    let handleSubmitCalls = true

    const isValid = {
        username: watch("username"),
        email: watch("email"),
        phone: watch("phone")
    }

    const handleUsernameSubmit = async () => {
        setIsLoading(true);
        let obj = {};
        if (isEmail) {
            obj = {
                email: watch("email")
            }
        } else {
            // let countryCode = selectedCountry.code.split("+")[1]
            obj = {
                mobile_no: selectedCountry.code + watch("phone")
            }
        }
        let allProfiles;
        if (allUsersProfile.length) {
            allProfiles = allUsersProfile;
        } else {
            allProfiles = await all_profiles_action();
            setAllUsersProfile(allProfiles);
        }
        if (allProfiles && allProfiles.success) {
            allProfiles = allProfiles.data;
            let isExist;
            if (isEmail) {
                isExist = allProfiles.some((i) => i.email === obj.email);
                console.log(isExist);
            } else {
                isExist = allProfiles.some((i) => i.mobile_no === obj.mobile_no);
                console.log(isExist);
            }
            // if (isEmail) { // Temporary added because of smtp error from backend
            //     setShowOTP(true);
            // } else {
            if (!isExist) {
                let res = await send_otp_action(obj);
                if (res.success) {
                    setOtpId(res.data.id);
                    setValue("user_id", res.data.id)
                    setShowOTP(true);
                } else {
                    if (res.message) {
                        setAlertMessage(res.message);
                    } else {
                        if (res.error) {
                            setAlertMessage(res.error);
                        }
                    }
                    setShowUserAlreadyExistAlert(true);
                }
            } else {
                setAlertMessage(allStrings["string_user_already_exist!"]);
                setShowUserAlreadyExistAlert(true);
            }
            // }
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
        } else {
            client_notification(api, "topRight", "error", "Fetch failed! Try again.", 3)
        }
        setIsLoading(false);
    }

    const getAnotherEleWidth = () => {
        // let phoneNumberEle = document.getElementById("phoneNumberEle")
        // let emailEle = document.getElementById("emailEle")
        let width = isEmail ? 100.05 : 55.52
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

    const getNextBtnClasses = () => {
        let classes = ""
        if (isLoading) {
            classes = ""
        } else {
            classes = isEmail
                ? ((!isValid.email || isValid.username.length < 3 || !isValid.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
                    ? ""
                    : "transition-all duration-150 hover:scale-[1.02]")
                : ((isValid.phone?.length < 8 || isValid.username.length < 3)
                    ? ""
                    : "transition-all duration-150 hover:scale-[1.02]")
        }
        return classes;
    }

    const getNextBtnDisablity = () => {
        let flag = isEmail
            ? (!isValid.email || isValid.username.length < 3 || !isValid.email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
            : (isValid.phone?.length < 8 || isValid.username.length < 3)
        return flag;
    }

    const handleVerifyOTP = async () => {
        let tempOtp = otpArr.join("")
        if (tempOtp.length === 6) {
            setIsLoading(true);
            let obj = {
                id: otpId,
                otp: tempOtp
            }
            // if (isEmail) { // Temporary added because of smtp error from backend
            //     if (tempOtp === "654321") {
            //         setNextStep(3);
            //     } else {
            //         client_notification(api, "topRight", "error", "OTP Incorrect", 3)
            //         setOtpArr(["", "", "", "", "", ""])
            //     }
            // } else {
            let res = await verify_otp_action(obj);
            if (res.success) {
                setNextStep(3);
                if (isEmail) {

                } else {
                    // let countryCode = selectedCountry.code.split("+")[1];
                    setValue("mobile_no", selectedCountry.code + watch("phone"));
                }
                setValue("otp", tempOtp);
            } else {
                client_notification(api, "topRight", "error", res.error, 3);
                setOtpArr(["", "", "", "", "", ""])
            }
            // }
            setIsLoading(false);
        }
    }

    const handleResetOTP = async () => {
        setIsLoading(true);
        let obj = {};
        if (isEmail) {
            obj = {
                email: watch("email")
            }
        } else {
            obj = {
                mobile_no: selectedCountry.code + watch("phone")
            }
        }
        // if (isEmail) {  // Temporary added because of smtp error from backend
        //     setShowOTP(true);
        // } else {
        let res = await send_otp_action(obj);
        if (res.success) {
            setOtpId(res.data.id);
            setValue("user_id", res.data.id)
            setShowOTP(true);
        } else {
            setAlertMessage(res.message);
            setShowUserAlreadyExistAlert(true);
        }
        // }
        setIsLoading(false);
    }

    return (
        <>
            {contextHolder}
            <div className="text-center flex flex-col items-center ">
                <div className="flex justify-center items-center rounded-full">
                    <Image src={sugar_email} alt="Card_email" width={135.67} height={126} className="pointer-events-none select-none" />
                </div>
                {showOTP
                    ? <>
                        <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px] mt-3">
                            {allStrings["string_enter_your_otp"]}
                        </p>
                    </>
                    : <>
                        <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px]">
                            {allStrings["string_what_is_your_username_&_email?"]}
                        </p>
                        <p className='text-white mt-3 text-[16px] max-w-[20rem] sm:max-w-full sm:mt-[6px]'>{allStrings["string_username_&_email_description"]}</p>
                    </>
                }
            </div>
            {showOTP
                ? <>
                    <div className='flex justify-between w-[300px] otpContainer my-[20px]'>
                        {otpArr.map((digit, index) => (
                            <input key={index} id={`otpInput${index}`} className={`border-0 p-2 text-center ${(index === 0) ? "me-1" : ((index === otpArr.length - 1) ? "ms-1" : "mx-1")}`} type="tel" maxLength="1" value={digit} onChange={(e) => handleOtpChange(index, e)} onKeyDown={(e) => handleOtpKeyDown(index, e)} autoComplete='off' autoFocus={index === 0} />
                        ))}
                    </div>
                    <p className={`text-2xl sm:text-[20px] text-white font-medium max-w-[15rem] mb-8 sm:max-w-full border-b-[2px] leading-[normal] cursor-pointer ${isLoading ? "pointer-events-none" : ""}`} onClick={handleResetOTP}>
                        {allStrings["string_resend_otp"]}
                    </p>
                    <div className={`mt-[30px] w-full sm:grid grid-cols-2 gap-x-[37px]`}>
                        <button className={`sm:border-none bg-stone-600 w-full h-[42px] mb-3 rounded text-white transition-all duration-150 hover:scale-[1.02] ${isLoading ? "pointer-events-none" : ""}`} type="button" onClick={() => setShowOTP(false)}>
                            <div className="flex justify-center gap-[5px] font-medium text-[16px] leading-[normal]">
                                <Image src={chevron_right_white} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden" />
                                {allStrings["string_back"]}
                            </div>
                        </button>
                        {isLoading
                            ? <div className={`w-full h-[42px] bg-white rounded relative text-[#263238] flex items-center justify-center ${isLoading ? "pointer-events-none" : ""}`}>
                                <span className='loader after:border-t-[#263238] after:border-b-[#263238]'></span>
                            </div>
                            : <button className={`w-full h-[42px] bg-white rounded relative text-[#263238] ${isLoading ? "pointer-events-none" : ""}`} type="button" onClick={handleVerifyOTP}>
                                <div className="flex justify-center gap-[5px] font-bold sm:ms-4 text-[16px] leading-[normal]">
                                    {allStrings["string_verify_otp"]}
                                </div>
                            </button>
                        }
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
                                placeholder={allStrings["string_username"]}
                                className='w-full bg-transparent  placeholder:text-[rgba(255,255,255)]  text-[16px] text-white font-medium outline-none '
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className='flex justify-center items-center my-6'>
                            <div className='flex items-center relative ps-[20px] pe-[30px] py-[9px] gap-x-8 bg-white rounded-[30px] '>
                                <span className={`z-[1] cursor-pointer flex justify-center items-center gap-x-1 transition-all duration-200 text-[13px] font-medium leading-[13px] ${isEmail ? "text-black" : "text-white"}`} onClick={() => { setIsEmail(false); setValue("email", "") }}>
                                    <Image src={username_telephone_black} alt='' height={14} width={14} className={`${isEmail ? "" : "hidden"}`} />
                                    <Image src={username_telephone_white} alt='' height={14} width={14} className={`${isEmail ? "hidden" : ""}`} />
                                    <span>{allStrings["string_mobile_number"]}</span>
                                </span>
                                <div id='isEmailSelected' className={`bg-black absolute rounded-[20px] z-0 h-[100%] transition-all duration-200 ${isEmail ? `translate-x-[calc(100%+11px)]` : "translate-x-[-22px]"}`} style={{ width: `calc(100% - 32px - ${getAnotherEleWidth()}px - ${isEmail ? "0px" : "10px"})` }}></div>
                                <span className={`z-[1] cursor-pointer flex justify-center items-center gap-x-2 transition-all duration-200 text-[13px] font-medium leading-[13px] ${!isEmail ? "text-black" : "text-white"}`} onClick={() => { setIsEmail(true); setValue("phone", "") }}>
                                    <Image src={username_email_white} alt='' height={13} width={13} className={`${isEmail ? "" : "hidden"}`} />
                                    <Image src={username_email_black} alt='' height={13} width={13} className={`${isEmail ? "hidden" : ""}`} />
                                    <span>{allStrings["string_email"]}</span>
                                </span>
                            </div>
                        </div>
                        <div className={`items-center h-[42px] border border-white ps-[12px] sm:ps-[20px] rounded-[5px] ${isEmail ? "flex" : "hidden"}`}>
                            <Image src={email} width={20} height={20} alt='email ' className='me-[10px] sm:me-[14px] w-[20px] h-[20px]' />
                            <input
                                type="email"
                                {...register('email', { required: "Email needed" })}
                                onChange={(e) => { setShowUserAlreadyExistAlert(false); setValue("email", e.target.value) }}
                                placeholder={allStrings["string_email"]}
                                className='w-full placeholder:text-[rgba(255,255,255)]  bg-transparent text-[16px] text-white font-medium outline-none'
                                autoComplete='off'
                            />
                            {
                                isLoading && <div className='me-3'>
                                    <span className='loader'></span>
                                </div>
                            }
                        </div>
                        <div className={`items-center h-[42px] gap-x-3 ${isEmail ? "hidden" : "flex"}`}>
                            <GetCountries countries={countries} setCountries={setCountries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} showCountryCode={showCountryCode} setShowCountryCode={setShowCountryCode} />
                            <input
                                type="tel"
                                {...register('phone', { required: "Phone number needed" })}
                                onChange={(e) => { setShowUserAlreadyExistAlert(false); setValue("phone", e.target.value.replace(/\D/g, "").slice(0, 12)) }}
                                placeholder={allStrings["string_mobile_number"]}
                                className='basis-[70.83%] border h-full rounded-[5px] border-white placeholder:text-[rgba(255,255,255)] bg-transparent text-[16px] text-white font-medium outline-none px-2'
                                autoComplete='off'
                            />
                        </div>
                        {showUserAlreadyExistAlert
                            ? <Alert message={alertMessage} type="warning" showIcon className="!mt-0 !bg-transparent !text-white text-[16px] !border-0 !rounded-[5px]" />
                            : <></>
                        }
                    </div>
                    <div className={`${showUserAlreadyExistAlert ? "mt-[18px]" : "mt-14"} w-full sm:grid grid-cols-2 gap-x-[37px] `}>
                        <button className="sm:border-none bg-stone-600 w-full h-[42px] mb-3 rounded text-white transition-all duration-150 hover:scale-[1.02]" onClick={() => { prevStepHandler() }} type="button" disabled={isLoading ? isLoading : false}>
                            <div className="flex justify-center gap-[5px] font-bold text-[16px] leading-[normal]">
                                <Image src={chevron_right_white} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden" />
                                {allStrings["string_back"]}
                            </div>
                        </button>
                        <button className={`w-full h-[42px] bg-white rounded relative text-[#263238] ${getNextBtnClasses()}`}
                            onClick={() => { handleUsernameSubmit() }}
                            type="button"
                            disabled={isLoading ? isLoading : getNextBtnDisablity()}>
                            <div className="flex justify-center gap-[5px] font-bold sm:ms-4 text-[16px] leading-[normal] text-[#263238]">
                                {allStrings["string_next"]}
                                <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto" />
                            </div>
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default UserName