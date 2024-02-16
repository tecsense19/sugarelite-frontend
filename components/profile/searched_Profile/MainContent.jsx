"use client"

import { aosInit } from '@/app/lib/helpers';
import 'aos/dist/aos.css';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Buttons_Profile from './Buttons_Profile';
import Profile_Photos from '../commons/Profile_Photos';

const MainContent = ({ params }) => {

    const profile = {
        photos: [""],
        appearance: [
            {
                type: "sex",
                value: "Male",
            },
            {
                type: "ethnicity",
                value: "ask me"
            },
            {
                type: "body structure",
                value: "ask me"
            },
            {
                type: "piercings",
                value: "ask me"
            },
            {
                value: 'ask me',
                type: "height (cm.)"
            },
            {
                type: "civil status",
                value: "ask me"
            },
            {
                type: "hair color",
                value: "ask me"
            },
            {
                type: "tattos",
                value: "ask me"
            },
            {
                value: "ask me",
                type: "weight (kg.)"
            }
        ],
        lifestyle: [
            {
                type: "education",
                value: "ask me",
            },
            {
                type: "smoking habits",
                value: "ask me"
            },
            {
                type: "employment",
                value: "ask me"
            },
            {
                type: "drinking habits",
                value: "ask me"
            }
        ]
    }

    useEffect(() => {
        aosInit()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]" >

            {/* searched profile content starts */}
            <div className='hidden lg:flex mt-[16px] mb-[40px] gap-[30px] xl:gap-[50px]'>
                {
                    params?.id &&
                    <Buttons_Profile />
                }
            </div>
            {/* searched profile content ends */}

            <Profile_Photos title={"Public Photos"} list={''} />
            <div className="border-white lg:border-b border-opacity-20 pt-[40px] lg:pb-[40px]">
                <h1 className="text-[24px] font-bold lg:text-[30px]" data-aos='zoom-in'>Private Photos</h1>
                <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[14px] mt-[20px]'>
                    {
                        Array.from({ length: 3 }).map((photo, index) => {
                            return <div className="aspect-square relative " key={index} data-aos='zoom-in'>
                                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none  rounded-[5px] object-contain object-center overflow-hidden" />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="border-white lg:border-b border-opacity-20 py-[40px]">
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in'>Appearance</h1>
                <div className="mt-[25px] grid gap-[20px] xl:gap-[30px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {
                        profile.appearance.map((style, inx) => {
                            return <div key={inx} className='aspect-auto' data-aos='zoom-in'>
                                <p className='font-medium  text-[13px] md:text-[16px] text-white text-opacity-50 uppercase mb-[7px]'>{style.type}</p>
                                <p className='font-medium text-[18px] md:text-[20px] text-white text-opacity-80'>{style.value}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="lg:pt-[40px] pb-[68px] ">
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in'>Lifestyle</h1>
                <div className="mt-[25px] grid gap-[20px] xl:gap-[30px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {
                        profile.lifestyle.map((style, inx) => {
                            return <div key={inx} className='aspect-auto' data-aos='zoom-in'>
                                <p className='font-medium  text-[13px] md:text-[16px] text-white text-opacity-50 uppercase mb-[7px]'>{style.type}</p>
                                <p className='font-medium text-[18px] md:text-[20px] text-white text-opacity-80'>{style.value}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MainContent