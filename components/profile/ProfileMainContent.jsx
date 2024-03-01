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

const ProfileMainContent = ({ user }) => {

    // const profile = {
    //     appearance: [
    //         {
    //             type: "sex",
    //             value: user.sex ? user.sex : "ask me",
    //         },
    //         {
    //             type: "ethnicity",
    //             value: user.ethnicity ? user.ethnicity : "ask me"
    //         },
    //         {
    //             type: "body structure",
    //             value: user.body_structure ? user.body_structure : "ask me"
    //         },
    //         {
    //             type: "piercings",
    //             value: user.piercings ? user.piercings : "ask me"
    //         },
    //         {
    //             type: "height (cm.)",
    //             value: user.height ? user.height : "ask me"
    //         },
    //         {
    //             type: "civil status",
    //             value: user.civil_status ? user.civil_status : "ask me"
    //         },
    //         {
    //             type: "hair color",
    //             value: user.hair_color ? user.hair_color : "ask me"
    //         },
    //         {
    //             type: "tattoos",
    //             value: user.tattoos ? user.tattoos : "ask me"
    //         },
    //         {
    //             type: "weight (kg.)",
    //             value: user.weight ? user.weight : "ask me"
    //         }
    //     ],
    //     lifestyle: [
    //         {
    //             type: "education",
    //             value: user.education ? user.education : "ask me"
    //         },
    //         {
    //             type: "smoking habits",
    //             value: user.smoking ? user.smoking : "ask me"
    //         },
    //         {
    //             type: "employment",
    //             value: user.employment ? user.employment : "ask me"
    //         },
    //         {
    //             type: "drinking habits",
    //             value: user.drinks ? user.drinks : "ask me"
    //         }
    //     ]
    // }

    const profile = {
        appearance: [
            { type: "sex", value: user?.sex || "ask me" },
            { type: "ethnicity", value: user?.ethnicity || "ask me" },
            { type: "body structure", value: user?.body_structure || "ask me" },
            { type: "piercings", value: user?.piercings || "ask me" },
            { type: "height (cm.)", value: user?.height || "ask me" },
            { type: "civil status", value: user?.civil_status || "ask me" },
            { type: "hair color", value: user?.hair_color || "ask me" },
            { type: "tattoos", value: user?.tattoos || "ask me" },
            { type: "weight (kg.)", value: user?.weight || "ask me" }
        ],
        lifestyle: [
            { type: "education", value: user?.education || "ask me" },
            { type: "smoking habits", value: user?.smoking || "ask me" },
            { type: "employment", value: user?.employment || "ask me" },
            { type: "drinking habits", value: user?.drinks || "ask me" }
        ]
    };

    useEffect(() => {
        aosInit()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]" >
            <Link href={client_routes.edit_profile} className="hidden absolute bg-secondary top-[96px] z-[1] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px]" data-aos='zoom-in'>
                <Image src={editImg} alt="edit" width={30} height={30} priority />
            </Link>
            <Profile_Photos title={"Public Photos"} list={user?.public_images} />
            <Divider />
            <Profile_Photos title={"Private Photos"} list={user?.total_private_images} />
            <Divider />
            <Profile_Styles title={"Appearance"} list={profile.appearance} />
            <Divider />
            <Profile_Styles title={"Lifestyle"} list={profile.lifestyle} />
        </div>
    )
}

export default ProfileMainContent