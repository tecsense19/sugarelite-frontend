"use client"
import { aosInit } from '@/app/lib/helpers'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ProfileMainContent = () => {

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
        <div className="w-full xl:ml-[400px] text-white mt-[40px] px-[15px] xl:mt-[30px] xl:px-[50px]" >
            <div className="border-white xl:border-b border-opacity-20 xl:pb-[40px]">
                <h1 className="text-[24px] font-bold xl:text-[30px]">Photos</h1>
                <div className="mt-[20px] xl:mt-[25px] flex gap-[14px] md:gap-[14px] flex-wrap">
                    {
                        Array.from({ length: 10 }).map((item, index) => (
                            <div className="h-auto w-[calc(100%/3-14px)] sm:w-[calc(100%/4-14px)] md:w-[calc(100%/5-14px)] lg:w-[calc(100%/7-14px)]" key={index}>
                                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" data-aos='zoom-in' />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="border-white xl:border-b border-opacity-20 py-[40px]">
                <h1 className="text-[24px] font-bold xl:text-[30px] select-none" data-aos="fade-right">Appearance</h1>
                <div className="mt-[25px] flex gap-[20px] xl:gap-[30px] flex-wrap">
                    {
                        profile.appearance.map((style, inx) => {
                            return <div key={inx} className='w-[calc(100%/2-20px)] sm:w-[calc(100%/3-20px)] md:w-[calc(100%/4-30px)] xl:max-w-[327px] ' data-aos='zoom-in'>
                                <p className='font-medium  text-[13px] md:text-[16px] text-white text-opacity-50 uppercase mb-[7px]'>{style.type}</p>
                                <p className='font-medium text-[18px] md:text-[20px] text-white text-opacity-80'>{style.value}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="xl:pt-[40px] pb-[68px] ">
                <h1 className="text-[24px] font-bold xl:text-[30px] select-none" data-aos="fade-right">Lifestyle</h1>
                <div className="mt-[25px] flex gap-[20px] xl:gap-[30px] flex-wrap">
                    {
                        profile.lifestyle.map((style, inx) => {
                            return <div key={inx} className='w-[calc(100%/2-20px)] sm:w-[calc(100%/3-20px)] md:w-[calc(100%/4-30px)] xl:max-w-[327px]' data-aos="zoom-in">
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

export default ProfileMainContent