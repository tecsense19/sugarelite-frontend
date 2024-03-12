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

const ProfileMainContent = ({ decryptedUser }) => {

    const { state: { userState } } = useStore()
    useEffect(() => {
        setUser(userState ? userState : decryptedUser)
    }, [userState])

    const [user, setUser] = useState(userState ? userState : decryptedUser)

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
                <Image src={editImg} alt="edit" width={30} height={30} priority className='pointer-events-none transition-all duration-150 group-hover:scale-110' />
            </Link>
            <Profile_Photos title={"Public Photos"} list={images_filter('public')} />
            <Divider />
            <Profile_Photos title={"Private Photos"} list={images_filter('private')} />
            <Divider />
            <Profile_Styles title={"Appearance"} list={profile.appearance} />
            <Divider />
            <Profile_Styles title={"Lifestyle"} list={profile.lifestyle} />
        </div>
    )
}

export default ProfileMainContent