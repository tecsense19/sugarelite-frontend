"use client"

import { aosInit } from '@/app/lib/helpers';
import 'aos/dist/aos.css';
import Image from 'next/image'
import React, { useEffect } from 'react'
import Buttons_Profile from './Buttons_Profile';
import Profile_Photos from '../commons/Profile_Photos'
import Profile_Styles from '../commons/Profile_Styles';
import more_horizontal from "../../../public/assets/more_horizontal.svg"
import PopOver from '../commons/PopOver';
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

            <div className='hidden lg:flex items-center  mt-[16px] mb-[40px] gap-[30px]  2xl:gap-[50px]'>
                {
                    params?.id &&
                    <Buttons_Profile />
                }
            </div>

            <Profile_Photos title={"Public Photos"} list={''} />
            <Divider />
            <Profile_Photos title={"Private Photos"} list={''} />
            <Divider />
            <Profile_Styles title={"Appearance"} list={profile.appearance} />
            <Divider />
            <Profile_Styles title={"Lifestyle"} list={profile.lifestyle} />

        </div>
    )
}

export default MainContent