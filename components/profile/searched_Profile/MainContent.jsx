"use client"

import 'aos/dist/aos.css';
import React, { useEffect } from 'react'
import Buttons_Profile from './Buttons_Profile';
import Profile_Photos from '../commons/Profile_Photos'
import Divider from '../commons/Divider';
import Aos from 'aos';

const MainContent = ({ user }) => {

    // const profile = {
    //     photos: [""],
    //     appearance: [
    //         {
    //             type: "sex",
    //             value: "Male",
    //         },
    //         {
    //             type: "ethnicity",
    //             value: "ask me"
    //         },
    //         {
    //             type: "body structure",
    //             value: "ask me"
    //         },
    //         {
    //             type: "piercings",
    //             value: "ask me"
    //         },
    //         {
    //             value: 'ask me',
    //             type: "height (cm.)"
    //         },
    //         {
    //             type: "civil status",
    //             value: "ask me"
    //         },
    //         {
    //             type: "hair color",
    //             value: "ask me"
    //         },
    //         {
    //             type: "tattos",
    //             value: "ask me"
    //         },
    //         {
    //             value: "ask me",
    //             type: "weight (kg.)"
    //         }
    //     ],
    //     lifestyle: [
    //         {
    //             type: "education",
    //             value: "ask me",
    //         },
    //         {
    //             type: "smoking habits",
    //             value: "ask me"
    //         },
    //         {
    //             type: "employment",
    //             value: "ask me"
    //         },
    //         {
    //             type: "drinking habits",
    //             value: "ask me"
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

    const images_filter = (type) => {
        if (user.get_all_profileimg.length) {
            const array = user.get_all_profileimg.filter(i => i.image_type === type)
            return array
        }
        return null
    }

    useEffect(() => {
        Aos.init()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]" >

            <div className='hidden lg:flex items-center mt-[16px] mb-[40px] gap-[30px]  2xl:gap-[50px]'>
                {
                    // params?.id &&
                    <Buttons_Profile user={user} />
                }
            </div>
            <Profile_Photos title={"Public Photos"} list={images_filter("public")} />
            <Divider />
            <Profile_Photos title={"Private Photos"} list={images_filter("private")} />
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