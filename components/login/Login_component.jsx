"use client"
import { notification } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import unLockImg from "/public/assets/password.svg"
import lockImg from "/public/assets/lock.svg";
import loginLogoImg from "/public/assets/login_logo.svg";
import eliteLogoImg from "/public/assets/elite_logo.svg";
import emailImg from "/public/assets/email.svg";
import eyeCloseImg from "/public/assets/eye_close.svg";
import eyeOpenImg from "/public/assets/eye_open.svg";
// import bgMobileImg from "/public/assets/Group 427318831.png";
// import bgDesktopImg from "/public/assets/large_image.png";
import { login_action } from "@/app/lib/actions"
import { client_notification, client_routes, socket_server } from "@/app/lib/helpers"
import CryptoJS from "crypto-js"
import { setCookie } from "nookies"
import { useRouter } from "next/navigation"
import { useStore } from "@/store/store"
import AuthLoader from "../common/AuthLoader"
// import { connectSocket } from "@/app/lib/socket"

// let socket;
const Login = ({ setIsForgotOpen, allStrings }) => {

    const { dispatch } = useStore()

    const { register, setValue, handleSubmit, control, watch, formState: { isValid } } = useForm()
    const [showPass, setShowPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showLoader, setSetLoader] = useState(false)

    const navigate = useRouter()

    const [api, contextHolder] = notification.useNotification();

    const showPasswordHandler = (handle) => {
        if (handle === "open") {
            setShowPass(true)
        } else {
            setShowPass(false)
        }
    }

    const validateMobileNumber = (number) => {
        // Regex pattern to match mobile numbers
        var regex = /^\+?[1-9]\d{1,14}$/;

        // Test if the number matches the regex pattern
        return regex.test(number);
    }


    const loginHandler = async (data) => {
        setIsLoading(true)
        let tempUserName = watch("email");
        let mobile_no = validateMobileNumber(tempUserName);
        let obj = {};
        if (mobile_no) {
            obj = {
                mobile_no: '+45' + tempUserName,
                password: watch("password")
            }
        } else {
            obj = {
                email: tempUserName,
                password: watch("password")
            }
        }
        const res = await login_action(obj)
        if (!res.success) {
            setIsLoading(false)
            client_notification(api, "topRight", "error", res.message, 2)
            return;
        }
        dispatch({ type: "Current_User", payload: res.data })
        const id = CryptoJS.AES.encrypt(JSON.stringify(res.data.id), "SecretKey").toString()
        setCookie(null, "user", id, { maxAge: 36000, secure: true, path: '/' })
        setIsLoading(false)
        // connectSocket(res.data.id)
        client_notification(api, "topRight", "success", res.message, 2)
        setSetLoader(true);
        navigate.push(client_routes.search)
        window.location.reload();
    }

    // const loadingHandler = () => {
    //     if (isValid) {
    //         setIsLoading(true)
    //     }
    // }

    return (
        <main className="flex h-dvh">
            {showLoader && <AuthLoader />}
            {contextHolder}
            <div className="h-full w-full relative bg-tinder sm:bg-none">
                <div className="h-full w-full absolute p-4 sm:flex items-center sm:items-start sm:pt-[150px] sm:pb-[50px] justify-center overflow-y-auto">
                    <div className="text-white w-full h-full sm:h-[78%] sm:rounded-[5px] sm:w-[85%] md:w-[75%] sm:min-h-[625px] sm:bg-gradient-to-l sm:from-tinder-1 sm:from-0% sm:to-tinder-2 sm:to-100% sm:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] lg:max-w-[762px] flex justify-center items-center flex-col">
                        <Link href={client_routes.home} className="flex flex-col justify-center items-center gap-4">
                            <Image src={loginLogoImg} alt={"logo"} width={54} height={64} priority className="w-auto h-auto select-none pointer-events-none" />
                            <Image src={eliteLogoImg} alt={"logo"} width={156} height={34} priority className="select-none pointer-events-none" />
                        </Link>
                        <form className="w-full max-w-[30rem]" onSubmit={handleSubmit(loginHandler)}>
                            <div className=" w-full mt-[97px]">
                                <div className='flex items-center h-[42px] border border-white ps-[12px] sm:ps-[20px] rounded-[5px]'>
                                    <Image src={emailImg} width={500} height={500} alt='email' className='me-[10px] w-[20px] h-[20px]' />
                                    <input
                                        type="text"
                                        {...register('email', { required: true })}
                                        onChange={(e) => setValue("email", e.target.value)}
                                        placeholder={`${allStrings["string_email"]} / ${allStrings["string_mobile_number"]}`}
                                        className='w-full placeholder:text-[rgba(255,255,255)] bg-transparent text-[16px] text-white font-medium outline-none'
                                        autoComplete='off' required
                                        autoFocus
                                    />
                                </div>
                                <div className=' flex h-[42px] items-center border border-white ps-[12px] mt-[12px] sm:ps-[20px] rounded-[5px]'>
                                    <Image src={unLockImg} width={20} height={20} alt='password ' className={`me-[10px] w-[20px] h-[20px] ${showPass ? "block" : "hidden"}`} />
                                    <Image src={lockImg} width={20} height={20} alt='password ' className={`me-[10px] w-[20px] h-[20px] ${showPass ? "hidden" : "block"}`} />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        {...register('password', { required: true, })}
                                        onChange={(e) => setValue("password", e.target.value)}
                                        placeholder={allStrings["string_password"]}
                                        className='w-full bg-transparent text-[16px] placeholder:text-[rgba(255,255,255)] text-white outline-none ' autoComplete='new-password' required />

                                    <Image src={eyeCloseImg} width={20} height={20} alt='password' className={`me-[14px] w-[20px] h-[20px] cursor-pointer ${showPass ? "block" : "hidden"}`} onClick={() => showPasswordHandler("close")} />
                                    <Image src={eyeOpenImg} width={20} height={20} alt='password' className={`me-[14px] w-[20px] h-[20px] cursor-pointer ${showPass ? "hidden" : "block"}`} onClick={() => showPasswordHandler("open")} />
                                </div>
                            </div>
                            <div className="w-full flex justify-between text-[12px] text-white mt-[10px]">
                                <span className="underline pb-1 cursor-pointer select-none font-normal transition-all duration-150 hover:text-white/80" onClick={() => setIsForgotOpen(true)}>
                                    {allStrings["string_forgotten_password"]}
                                </span>
                                <div className="flex items-center gap-[5px]">
                                    {/* <Controller name="remember" defaultValue={false} control={control} render={() => (
                                        <ConfigProvider theme={{ token: { colorPrimary: "#F16667", fontSize: 20 } }}>
                                            <Checkbox className='h-4 w-4 flex justify-end' id="remember" onChange={(e) => setValue("remember", e.target.checked)} checked={watch("remember")} />
                                        </ConfigProvider>
                                    )} />
                                    <label htmlFor="remember" className="select-none cursor-pointer font-normal">Remember me</label> */}
                                </div>
                            </div>
                            <button className={`rounded-[5px] bg-white w-full max-w-[30rem] h-[42px] mt-[50px] font-bold uppercase flex justify-center items-center text-[#263238] ${isLoading ? "pointer-events-none" : "transition-all duration-75 hover:scale-[1.01]"}`} type="submit">
                                {!isLoading ? allStrings["string_login"] :
                                    <div className="loader after:border-t-black after:border-b-black"></div>
                                }
                            </button>
                        </form>
                        <div className="mt-[50px] text-center">
                            <p className="text-[14px] text-white mb-[10px]">{allStrings["string_don’t_have_an_account?"]}</p>
                            <Link href={"/register"} className="text-white font-semibold text-[16px] transition-all duration-150 hover:text-white/70">
                                {allStrings["string_register_now"]}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <Image src={bgMobileImg} width={1000} height={1000} alt="mob_bg" priority className="w-full block sm:hidden h-full object-cover object-top" /> */}
                {/* <Image src={bgDesktopImg} unoptimized width={1000} height={1000} alt="mob_bg" priority className="w-full h-full hidden sm:block object-cover select-none pointer-events-none" /> */}
            </div>
        </main>
    )
}

export default Login