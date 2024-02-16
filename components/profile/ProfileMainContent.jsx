"use client"
import { aosInit } from '@/app/lib/helpers'
import 'aos/dist/aos.css';
import React, { useEffect } from 'react'
import Profile_Photos from './commons/Profile_Photos';
import Profile_Styles from './commons/Profile_Styles';

const ProfileMainContent = ({ params }) => {

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
            <Profile_Photos title={"Public Photos"} />
            <Profile_Photos title={"Private Photos"} />
            <Profile_Styles title={"Appearance"} list={profile.appearance} />
            <Profile_Styles title={"Lifestyle"} list={profile.lifestyle} />
        </div>
    )
}

export default ProfileMainContent