"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Controller } from 'react-hook-form'
import SearchedProfile from './searched_Profile/Buttons_Profile'
import arrow_left from "../../public/assets/arrow_left.svg"
import more_horizontal from "../../public/assets/more_horizontal.svg"
import profile_person from "../../public/assets/profile_person.png"
import edit from "../../public/assets/edit.svg"
import premium from "../../public/assets/premium.svg"

const SideContent = ({ control, params }) => {

    const path = usePathname()

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
        console.log(obj)
    }

    return (
        <div className="lg:bg-primary-dark-3 lg:h-[calc(100vh-66px)] lg:fixed lg:w-[350px] 2xl:w-[400px] text-white flex justify-start flex-col" data-aos='fade-right'>
            <div className="md:hidden w-full px-[15px] mt-[12px] mb-[30px] flex justify-between items-center">
                <Link href={path === "/profile/edit" ? "/profile" : "/search"}><Image src={arrow_left} alt="left" width={24} height={24} priority className="cursor-pointer" /></Link>
                <p className="text-[24px] font-semibold select-none">Profile</p>
                <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
            </div>
            <div className="w-full flex justify-start items-center flex-col lg:items-start h-full md:pt-[96px] lg:pt-[30px] px-[15px] lg:px-[30px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="w-full aspect-square max-w-[200px] lg:max-w-full lg:rounded-[10px] flex justify-center items-center relative">
                    <Image src={profile_person} width={1000} height={1000} alt="person" className={`h-full w-full rounded-full lg:rounded-[10px] select-none pointer-events-none ${path === "/profile/edit" && "opacity-50"}`} priority />
                    <div className='h-3 w-3 lg:h-[14px] lg:w-[14px] bg-[#1DD719] absolute top-[220px] right-[75px] lg:right-[10px] lg:top-[10px] border border-white rounded-full'></div>

                    {/* Edit Profile option starts */}

                    {
                        path === "/profile/edit" &&
                        <div className='absolute h-full w-full'>
                            <Controller
                                name='profile'
                                control={control}
                                render={({ field }) => <>
                                    <label htmlFor="profile" className='flex flex-col justify-center items-center h-full cursor-pointer'>
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
                    <div className="flex flex-col text-center lg:text-left" data-aos='zoom-in'>
                        <div className='flex items-center '>
                            <span className="text-[30px] font-bold me-[20px]">Rajesh, 23</span>
                            <Image src={premium} alt='edit' width={30} height={30} priority />
                            <span className='text-[16px] font-semibold ms-2'>Premium</span>
                        </div>
                        <div className='mt-[11px]'>
                            <span className="text-[20px] font-semibold text-opacity-80 text-white me-[14px]">LIVING IN</span>
                            <span className="text-[16px] font-semibold text-opacity-80 text-white mt-[11px]">Ask me, Del Valle</span>
                        </div>
                    </div>
                </div>

                {/* searched profile content starts  */}
                {/* 
                <div className='mt-[30px] mb-[10px] w-full sm:max-w-[75%] lg:hidden flex justify-center md:flex-row flex-col gap-3'>
                    {
                        params?.id &&
                        <SearchedProfile />
                    }
                </div> */}

                {/* searched profile content ends  */}

                <div className="w-full bg-[#626262] mt-[30px] rounded-[5px] sm:max-w-[75%] lg:max-w-full lg:mb-[30px]" data-aos='zoom-in'>
                    <div className="p-4 text-[16px] font-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, cumque quas. Sint reiciendis commodi libero, sequi ipsam nam sed iusto odio perferendis voluptates eveniet ducimus nostrum quidem est. Voluptatum, voluptatibus?
                    </div>
                    <div className="bg-primary-dark-3 xl:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
                        <p className="text-[18px] font-medium">Biography</p>
                        <p className="text-[12px] font-medium text-white text-opacity-80">No Cinema</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideContent