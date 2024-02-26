"use client"

import { aosInit } from '@/app/lib/helpers';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react'
import Buttons_Profile from './Buttons_Profile';
import Profile_Photos from '../commons/Profile_Photos'
import Divider from '../commons/Divider';

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

            <div className='hidden lg:flex items-center mt-[16px] mb-[40px] gap-[30px]  2xl:gap-[50px]'>
                {
                    params?.id &&
                    <Buttons_Profile />
                }
            </div>
            <Profile_Photos title={"Public Photos"} list={''} />
            <Divider />
            <Profile_Photos title={"Private Photos"} list={''} />
            <Divider />

            <div className="mb-[40px]">
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in' data-aos-anchor-placement="bottom">Appearance</h1>
                <div className="mt-[25px] lg:ps-[15px] flex justify-between sm:justify-normal sm:gap-x-[30px] xl:gap-x-[70px] gap-y-5 sm:gap-y-[46px] w-full max-w-[1050px] flex-wrap ">
                    {
                        profile.appearance.map((style, inx) => {
                            return <div key={inx} className=' min-w-[150px] ' data-aos='zoom-in' data-aos-anchor-placement="bottom" >
                                <p className='font-medium  text-[13px] md:text-[16px] text-white text-opacity-50 uppercase mb-[7px]'>{style.type}</p>
                                <p className='font-medium text-[18px] md:text-[20px] text-white text-opacity-80'>{style.value}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <Divider />

            <div className="mb-[40px]">
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in' data-aos-anchor-placement="bottom">Lifestyle</h1>
                <div className="mt-[25px] lg:ps-[15px] flex justify-between sm:justify-normal sm:gap-x-[30px] xl:gap-x-[70px] gap-y-5 sm:gap-y-[46px] w-full max-w-[1050px] flex-wrap ">
                    {
                        profile.lifestyle.map((style, inx) => {
                            return <div key={inx} className=' min-w-[150px] ' data-aos='zoom-in' data-aos-anchor-placement="bottom" >
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