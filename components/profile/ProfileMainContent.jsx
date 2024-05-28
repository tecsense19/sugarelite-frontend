"use client"
import { client_routes } from '@/app/lib/helpers'
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react'
import Profile_Photos from './commons/Profile_Photos';
import Profile_Styles from './commons/Profile_Styles';
import editImg from "/public/assets/edit.svg";
import Divider from './commons/Divider';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import { useStore } from '@/store/store';

const ProfileMainContent = ({ user, allStrings }) => {

    const profile = {
        appearance: [
            { type: allStrings["string_sex"], value: user?.sex || allStrings["string_ask_me"] },
            { type: allStrings["string_ethnicity"], value: user?.ethnicity || allStrings["string_ask_me"] },
            { type: allStrings["string_body_structure"], value: user?.body_structure || allStrings["string_ask_me"] },
            { type: allStrings["string_piercings"], value: user?.piercings || allStrings["string_ask_me"] },
            { type: allStrings["string_height_(cm.)"], value: user?.height || allStrings["string_ask_me"] },
            { type: allStrings["string_civil_status"], value: user?.civil_status || allStrings["string_ask_me"] },
            { type: allStrings["string_hair_color"], value: user?.hair_color || allStrings["string_ask_me"] },
            { type: allStrings["string_tattoos"], value: user?.tattoos || allStrings["string_ask_me"] },
            { type: allStrings["string_weight_(kg.)"], value: user?.weight || allStrings["string_ask_me"] }
        ],
        lifestyle: [
            { type: allStrings["string_education"], value: user?.education || allStrings["string_ask_me"] },
            { type: allStrings["string_smoking_habits"], value: user?.smoking || allStrings["string_ask_me"] },
            { type: allStrings["string_employment"], value: user?.employment || allStrings["string_ask_me"] },
            { type: allStrings["string_drinking_habits"], value: user?.drinks || allStrings["string_ask_me"] }
        ]
    };

    const images_filter = (type) => {
        if (user?.get_all_profileimg?.length) {
            const array = user.get_all_profileimg.filter(i => i.image_type === type)
            return array
        }
        return null
    }

    useEffect(() => {
        AOS.init()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]" >
            <Link href={client_routes.edit_profile} className="hidden absolute bg-secondary top-[96px] z-[1] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px] group" data-aos='zoom-in'>
                <Image src={editImg} alt="edit" width={25} height={25} priority className='pointer-events-none transition-all duration-150 group-hover:scale-110' />
            </Link>
            <Profile_Photos title={allStrings["string_public_photos"]} list={images_filter('public')} allStrings={allStrings} />
            <Divider />
            <Profile_Photos title={allStrings["string_private_photos"]} list={images_filter('private')} allStrings={allStrings} />
            <Divider />
            <Profile_Styles title={allStrings["string_appearance"]} list={profile.appearance} allStrings={allStrings} />
            <Divider />
            <Profile_Styles title={allStrings["string_lifestyle"]} list={profile.lifestyle} allStrings={allStrings} />
        </div>
    )
}

export default ProfileMainContent