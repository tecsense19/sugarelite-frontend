"use client"
import { aosInit, client_routes } from '@/app/lib/helpers'
import 'aos/dist/aos.css';
import React, { useEffect } from 'react'
import Profile_Photos from './commons/Profile_Photos';
import Profile_Styles from './commons/Profile_Styles';
import editImg from "/public/assets/edit.svg";
import Divider from './commons/Divider';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfileMainContent = () => {

    const navigate = useRouter()

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
            <Link href={client_routes.edit_profile} className="hidden absolute bg-secondary top-[96px] z-[1] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px]" data-aos='zoom-in'>
                <Image src={editImg} alt="edit" width={30} height={30} priority />
            </Link>
            <Profile_Photos title={"Public Photos"} />
            <Divider />
            <Profile_Photos title={"Private Photos"} />
            <Divider />
            <Profile_Styles title={"Appearance"} list={profile.appearance} />
            <Divider />
            <Profile_Styles title={"Lifestyle"} list={profile.lifestyle} />
        </div>
    )
}

export default ProfileMainContent