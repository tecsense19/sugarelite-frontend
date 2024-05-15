"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import arrow_left from "../../public/assets/arrow_left.svg"
import more_horizontal from "../../public/assets/more_horizontal.svg"
import Bars_Icon from "/public/assets/bars.svg"
import edit from "../../public/assets/edit.svg"
import premium from "../../public/assets/premium.svg"
import crown_yellow_icon from "../../public/assets/crown_yellow_icon.svg"
import PopOver from './commons/PopOver'
import { client_routes } from '@/app/lib/helpers'
import { useStore } from '@/store/store'
import lock_1 from "/public/assets/lock_1.svg"
import subscription_logo from "/public/assets/subscription_logo.svg"
import prohibition from "/public/assets/prohibition.svg"
import NotificationIcon from "/public/assets/bell_icon.svg"

const SideContent = ({ control, user, setAvatar, register, setProfileToggle }) => {

    const { state: { notifyBadgeState }, dispatch } = useStore()

    const path = usePathname()
    const [profilPic, setProfilePic] = useState("")

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const profileHandler = async (e) => {
        let obj = {}
        const { files } = e.target
        if (files[0]) {
            let file = await getBase64(files[0])
            obj.name = files[0].name
            obj.photo_url = file
        }
        setProfilePic(obj.photo_url)
        setAvatar(files[0])
    }

    const handleProfileTogglBtn = (name) => {
        setProfileToggle(name);
        setTimeout(() => {
            if (name === "photo") {
                let ele = document.getElementById("photoAccess");
                if (ele) {
                    ele.scrollIntoView({ behavior: "smooth", block: 'center' })
                }
            } else {
                let ele = document.getElementById("blockList");
                if (ele) {
                    ele.scrollIntoView({ behavior: "smooth", block: 'center' })
                }
            }
        }, 100)
    }

    return (
        <div className="lg:bg-primary-dark-3 lg:h-[calc(100vh-66px)] lg:fixed lg:w-[350px] 2xl:w-[400px] text-white flex justify-start flex-col" data-aos='fade-right'>
            <div className="md:hidden w-full px-[15px] mt-[12px] mb-[30px] flex justify-center items-center relative">
                <Link href={path === "/profile/edit" ? "/profile" : "/search"} className='absolute left-[15px]'>
                    <Image src={arrow_left} alt="left" width={24} height={24} priority className="cursor-pointer" />
                </Link>
                <p className="text-[24px] font-semibold select-none">Profile</p>
                {/* <PopOver>
                    <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
                </PopOver> */}
                <div className='flex gap-x-4 items-center absolute right-[15px]'>
                    <div className='relative'>
                        <Image src={NotificationIcon} alt="bell icon" width={20} height={20} priority className="cursor-pointer" onClick={() => dispatch({ type: "Open_Notification", payload: true })} />
                        {notifyBadgeState.notify &&
                            <p className="h-2 w-2 bg-secondary rounded-full absolute -top-1 -right-1 "></p>
                        }
                    </div>
                    <Image src={Bars_Icon} alt="more" width={24} height={24} priority className="cursor-pointer" onClick={() => dispatch({ type: "Show_Menu" })} />
                </div>
            </div>
            <div className="w-full flex justify-start items-center flex-col lg:items-start h-full md:pt-[96px] lg:pt-[30px] px-[15px] lg:px-[30px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="w-full aspect-square max-w-[200px] lg:max-w-full lg:rounded-[10px] flex justify-center items-center relative">
                    {!profilPic
                        ? <>
                            {user?.avatar_url
                                ? <Image src={user.avatar_url} width={1000} height={1000} alt="person" className={`h-full w-full rounded-full object-cover object-center lg:rounded-[10px] select-none pointer-events-none ${path === client_routes.edit_profile && "opacity-50"}`} priority />
                                : <div className={`bg-primary-dark-2 lg:bg-primary h-full w-full rounded-full object-cover object-top lg:rounded-[10px] capitalize select-none pointer-events-none flex justify-center items-center text-[50px] ${path === client_routes.edit_profile && "opacity-50"}`}>
                                    {user?.username.charAt(0)}
                                </div>
                            }
                        </>
                        : <>
                            <Image src={profilPic} width={1000} height={1000} alt="person" className={`h-full w-full rounded-full object-cover object-center lg:rounded-[10px] select-none pointer-events-none ${path === client_routes.edit_profile && "opacity-50"}`} priority />
                        </>
                    }
                    {

                        <div className='h-3 w-3 hidden lg:block lg:h-[14px] lg:w-[14px] bg-success absolute lg:right-[10px] lg:top-[10px] border border-white rounded-full'></div>
                    }

                    {/* Edit Profile option starts */}

                    {
                        path === client_routes.edit_profile &&
                        <div className='absolute h-full w-full'>
                            <Controller
                                name='profile'
                                control={control}
                                render={({ field }) => <>
                                    <label htmlFor="profile" className='flex flex-col justify-center items-center h-full  rounded-full cursor-pointer'>
                                        <Image src={edit} alt='edit' width={36} height={36} priority />
                                        <span className='font-medium text-[16px]'>Edit Profile</span>
                                    </label>
                                    <input type="file" {...field} onChange={profileHandler} id='profile' className='hidden' />
                                </>}
                            />
                        </div>
                    }

                    {/* Edit Profile option ends */}

                </div>
                <div className="lg:self-start mt-[20px] lg:mt-[30px] lg:w-full">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-full">
                        <div className='flex items-center lg:justify-between lg:w-full'>
                            <div className="text-[30px] font-bold leading-[30px] relative capitalize min-w-max">
                                {user && user.username.charAt(0).toUpperCase() + user.username.slice(1) + ", " + user.age}
                                <div className='h-3 w-3 lg:hidden bg-success absolute -top-[2px] -right-[15px] lg:right-[10px] border border-white rounded-full'></div>
                            </div>
                            <div className='flex items-center justify-between ms-4' style={{ width: "-webkit-fill-available" }}>
                                {user.is_identityverification === "approved"
                                    ? <Image src={premium} alt='edit' width={30} height={30} priority />
                                    : <></>
                                }
                                {user && (user.is_subscribe === 1 && user.is_subscription_stop === 0 && user.is_subscription_cancel === 0)
                                    ? <div className='flex items-center ms-2 lg:ms-5'>
                                        {/* <span className='text-[16px] font-semibold xs:block hidden'>Premium</span> */}
                                        <Image src={crown_yellow_icon} alt='edit' width={30} height={30} priority className='' />
                                    </div>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className='mt-[11px]'>
                            <span className="text-[20px] font-semibold text-opacity-80 text-white me-[14px] leading-[normal] uppercase">{user && user?.country},</span>
                            <span className="text-[16px] font-semibold text-opacity-80 text-white mt-[11px]">{user && user?.region}</span>
                        </div>
                    </div>
                </div>
                {
                    path === client_routes.profile &&
                    <div className="w-full bg-[#626262] mt-[30px] rounded-[5px] sm:max-w-[75%] lg:max-w-full lg:mb-[30px]" data-aos='zoom-in'>
                        <div className="p-4 text-[16px] font-light">
                            <p className='line-clamp-3'>{user.bio ? user.bio : "No Bio Added"}</p>
                        </div>
                        <div className="bg-primary-dark-3 lg:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
                            <p className="text-[18px] font-medium">Biography</p>
                        </div>
                    </div>
                }


                {
                    path === client_routes.edit_profile &&
                    <div className="w-full bg-[#626262] mt-[30px] rounded-[5px] sm:max-w-[75%] lg:max-w-full lg:mb-[30px]" data-aos='zoom-in'>
                        <div className=" text-[16px] font-light">
                            <textarea {...register("bio")} defaultValue={user.bio} id="bio" rows={5} placeholder='Enter Bio' className=' mx-[6px] mt-[6px] p-2 resize-none rounded-t-[5px] outline-none border bg-[#626262] border-primary-dark-4 w-[calc(100%-12px)] h-full'></textarea>
                        </div>
                        <div className="bg-primary-dark-3 lg:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
                            <p className="text-[18px] font-medium">Biography</p>
                        </div>
                    </div>
                }

                {
                    path === client_routes.profile &&
                    <div className='w-full flex flex-col gap-y-[10px] mt-[26px] lg:mt-0 sm:max-w-[75%] md:max-w-full'>
                        <button className='flex justify-center items-center gap-[10px] rounded-[5px] bg-primary-dark-4 w-full h-[42px] lg:h-[56px]' onClick={() => handleProfileTogglBtn("photo")}>
                            <Image src={lock_1} width={24} height={24} alt='message' className='inline-block h-[22px] lg:h-[24px]' />
                            <span className='text-[16px] xl:text-[18px] font-[600] leading-[18px] mt-[6px] tracking-wider uppercase'>photo access</span>
                        </button>
                        <button className='flex justify-center items-center gap-[10px] rounded-[5px] bg-danger w-full h-[42px] lg:h-[56px]' onClick={() => handleProfileTogglBtn("block")}>
                            <Image src={prohibition} width={18} height={18} alt='message' className='inline-block ' />
                            <span className='text-[16px] xl:text-[18px] font-[600] leading-[18px] mt-[4px] tracking-wider uppercase'>block list</span>
                        </button>
                        <Link href={client_routes.subscription} prefetch={true} className='flex justify-center items-center gap-[10.25px] rounded-[5px] bg-[#F4498F] w-full h-[42px] lg:h-[56px]'>
                            <Image src={subscription_logo} width={22.75} height={26} alt='message' className='inline-block mb-[6px]' />
                            <span className='text-[16px] xl:text-[18px] font-[600] leading-[18px] mt-[4px] tracking-wider uppercase'>Subscription</span>
                        </Link>
                    </div>
                }

            </div>
        </div>
    )
}

export default SideContent