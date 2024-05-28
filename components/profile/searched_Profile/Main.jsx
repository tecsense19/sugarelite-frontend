"use client"

import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react'
import Profile_Photos from '../commons/Profile_Photos'
import Divider from '../commons/Divider';
import Aos from 'aos';
import Buttons from './Buttons';


const Main = ({ user, currentUser, privateAlbumState, socket, isModalOpen, setIsModalOpen, allStrings }) => {

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
            <div className='hidden lg:flex items-center mt-[16px] mb-[40px] gap-[20px]'>
                {
                    <Buttons user={user} currentUser={currentUser} privateAlbumState={privateAlbumState} socket={socket} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} allStrings={allStrings} />
                }
            </div>
            <Profile_Photos title={allStrings["string_public_photos"]} list={images_filter("public")} allStrings={allStrings} />
            <Divider />
            {
                privateAlbumState === "accept" &&
                <>
                    <Profile_Photos title={allStrings["string_private_photos"]} list={images_filter("private")} allStrings={allStrings} />
                    <Divider />
                </>
            }

            <div className="mb-[40px]">
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in' data-aos-anchor-placement="bottom">{allStrings["string_appearance"]}</h1>
                <div className="mt-[25px] lg:ps-[15px] flex justify-between sm:justify-normal sm:gap-x-[30px] xl:gap-x-[70px] gap-y-5 sm:gap-y-[46px] w-full max-w-[1050px] flex-wrap ">
                    {
                        profile.appearance.map((style, inx) => {
                            return <div key={inx} className=' min-w-[150px] ' data-aos='zoom-in' data-aos-anchor-placement="bottom" >
                                <p className='font-medium  text-[13px] md:text-[16px] text-white text-opacity-50 uppercase mb-[7px]'>{style.type}</p>
                                <p className='font-medium text-[18px] md:text-[20px] text-white text-opacity-80'>{style.value ? (style.value === allStrings["string_ask_me"] ? "NA" : style.value) : "NA"}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <Divider />

            <div className="mb-[40px]">
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in' data-aos-anchor-placement="bottom">{allStrings["string_lifestyle"]}</h1>
                <div className="mt-[25px] lg:ps-[15px] flex justify-between sm:justify-normal sm:gap-x-[30px] xl:gap-x-[70px] gap-y-5 sm:gap-y-[46px] w-full max-w-[1050px] flex-wrap ">
                    {
                        profile.lifestyle.map((style, inx) => {
                            return <div key={inx} className=' min-w-[150px] ' data-aos='zoom-in' data-aos-anchor-placement="bottom" >
                                <p className='font-medium  text-[13px] md:text-[16px] text-white text-opacity-50 uppercase mb-[7px]'>{style.type}</p>
                                <p className='font-medium text-[18px] md:text-[20px] text-white text-opacity-80'>{style.value ? (style.value === allStrings["string_ask_me"] ? "NA" : style.value) : "NA"}</p>
                            </div>
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Main