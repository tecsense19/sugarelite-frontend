"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import SearchedProfile from './searched_Profile/Buttons_Profile'
import arrow_left from "../../public/assets/arrow_left.svg"
import more_horizontal from "../../public/assets/more_horizontal.svg"
import profile_person from "../../public/assets/profile_person.png"
import edit from "../../public/assets/edit.svg"
import premium from "../../public/assets/premium.svg"
import PopOver from './commons/PopOver'
import { client_routes } from '@/app/lib/helpers'
import { useStore } from '@/store/store'

const SideContent = ({ control, decryptedUser, setAvatar, register }) => {

    const { state: { userState } } = useStore()

    const [user, setUser] = useState(userState ? userState : decryptedUser)

    useEffect(() => {
        setUser(userState ? userState : decryptedUser)
    }, [userState])

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

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();

        if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
            age--;
        }

        return age;
    };


    return (
        <div className="lg:bg-primary-dark-3 lg:h-[calc(100vh-66px)] lg:fixed lg:w-[350px] 2xl:w-[400px] text-white flex justify-start flex-col" data-aos='fade-right'>
            <div className="md:hidden w-full px-[15px] mt-[12px] mb-[30px] flex justify-between items-center">
                <Link href={path === "/profile/edit" ? "/profile" : "/search"}><Image src={arrow_left} alt="left" width={24} height={24} priority className="cursor-pointer" /></Link>
                <p className="text-[24px] font-semibold select-none">Profile</p>
                <PopOver>
                    <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
                </PopOver>
            </div>
            <div className="w-full flex justify-start items-center flex-col lg:items-start h-full md:pt-[96px] lg:pt-[30px] px-[15px] lg:px-[30px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="w-full aspect-square max-w-[200px] lg:max-w-full lg:rounded-[10px] flex justify-center items-center relative">
                    {!profilPic
                        ? <>
                            {user?.avatar_url
                                ? <Image src={user.avatar_url} width={1000} height={1000} alt="person" className={`h-full w-full rounded-full object-cover object-top lg:rounded-[10px] select-none pointer-events-none ${path === client_routes.edit_profile && "opacity-50"}`} priority />
                                : <div className={`bg-primary-dark-2 lg:bg-primary h-full w-full rounded-full object-cover object-top lg:rounded-[10px] select-none pointer-events-none flex justify-center items-center text-[50px] ${path === client_routes.edit_profile && "opacity-50"}`}>
                                    {user?.username.charAt(0)}
                                </div>
                            }
                        </>
                        : <>
                            <Image src={profilPic} width={1000} height={1000} alt="person" className={`h-full w-full rounded-full object-cover object-top lg:rounded-[10px] select-none pointer-events-none ${path === client_routes.edit_profile && "opacity-50"}`} priority />
                        </>
                    }
                    {
                        user && user?.online &&
                        <div className='h-3 w-3 hidden lg:block lg:h-[14px] lg:w-[14px] bg-[#1DD719] absolute lg:right-[10px] lg:top-[10px] border border-white rounded-full'></div>
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

                    {/* Edit Profile content ends */}

                </div>
                <div className="lg:self-start mt-[20px] lg:mt-[30px]">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left" data-aos='zoom-in'>
                        <div className='flex items-center gap-6'>
                            <div className="text-[30px] font-bold leading-[30px] relative">
                                {user && user.username.charAt(0).toUpperCase() + user.username.slice(1) + ", " + user.age}
                                {
                                    user && user?.online &&
                                    <div className='h-3 w-3 lg:hidden bg-[#1DD719] absolute -top-[2px] -right-[15px] lg:right-[10px] border border-white rounded-full'></div>
                                }
                            </div>
                            {user && user?.premium &&
                                <div className='flex items-center'>
                                    <Image src={premium} alt='edit' width={30} height={30} priority />
                                    <span className='text-[16px] font-semibold ms-2'>Premium</span>
                                </div>
                            }

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
                            {decryptedUser.bio ? decryptedUser.bio : "No Bio Added"}
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
                            <textarea {...register("bio")} id="bio" rows={5} placeholder='Enter Bio' className=' mx-[6px] mt-[6px] p-2 resize-none rounded-t-[5px] outline-none border bg-[#626262] border-primary-dark-4 w-[calc(100%-12px)] h-full'></textarea>
                        </div>
                        <div className="bg-primary-dark-3 lg:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
                            <p className="text-[18px] font-medium">Biography</p>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default SideContent