import Image from 'next/image'
import React from 'react'
import emailImg from "/public/assets/email.svg";
import eyeCloseImg from "/public/assets/eye_close.svg";
import eyeOpenImg from "/public/assets/eye_open.svg";
import unLockImg from "/public/assets/password.svg"
import lockImg from "/public/assets/lock.svg";

const Login_Component = ({ register }) => {
    return (
        <>
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
                <span className="underline pb-1 cursor-pointer select-none">Forgotten Password</span>
            </div>
        </>
    )
}

export default Login_Component