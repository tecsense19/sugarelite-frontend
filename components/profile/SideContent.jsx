"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideContent = () => {

    const path = usePathname()

    return (
        <div className="xl:bg-primary-dark-3 xl:h-[calc(100vh-66px)] xl:fixed xl:w-[400px] text-white flex justify-start flex-col">
            <div className="md:hidden w-full px-[15px] mt-[12px] mb-[30px] flex justify-between items-center">
                <Link href={path === "/profile/edit" ? "/profile" : "/search"}><Image src={'/assets/arrow_left.svg'} alt="left" width={24} height={24} priority className="cursor-pointer" /></Link>
                <p className="text-[24px] font-semibold select-none">Profile</p>
                <Image src={'/assets/more_horizontal.svg'} alt="more" width={30} height={30} priority className="cursor-pointer" />
            </div>
            <div className="w-full flex justify-start items-center flex-col xl:items-start h-full md:pt-[96px] xl:pt-[30px] px-[15px] xl:px-[30px] overflow-y-auto">
                <div className="h-[140px] w-[140px] sm:h-[220px] sm:w-[220px] xl:h-[330px] xl:w-[340px] xl:rounded-[10px]">
                    <Image src={'/assets/profile_person.png'} width={1000} height={1000} alt="person" className="h-full w-full rounded-full xl:rounded-[10px] select-none pointer-events-none scale-up-tl" priority />
                </div>
                <div className="xl:self-start mt-[20px] xl:mt-[30px]">
                    <div className="flex flex-col text-center xl:text-left">
                        <div>
                            <span className="text-[30px] font-bold">Rajesh, 23</span>
                            <span className="text-[20px] font-semibold text-opacity-80 text-white ps-[20px]">LIVING IN</span>
                        </div>
                        <span className="text-[16px] font-semibold text-opacity-80 text-white mt-[11px]">Ask me, Del Valle</span>
                    </div>
                </div>
                <div className="w-full bg-[#626262] mt-[30px] rounded-[5px] sm:max-w-[75%]">
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