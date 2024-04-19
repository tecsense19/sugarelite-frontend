"use client"
import React, { useState } from 'react'
import chevron_left from "/public/assets/arrow_left.svg"
import settingsIcon from "../../public/assets/settings_icon.svg";
import { client_routes } from '@/app/lib/helpers';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CardSwiper from './CardSwiper';
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import closeIcon from "/public/assets/cross_icon.svg";
import heartIcon from "/public/assets/heart_swipe_icon.svg";

const Tinder = ({ users }) => {

    const [user, setUsers] = useState(users)

    const handleSwipe = (d, profile) => {
        if (d === "left" || d === "right") {
            console.log(d)
            setUsers(users.filter(i => i.id !== profile.id))
        }
    };



    return (
        <>
            <div className="h-dvh flex flex-col justify-center items-center overflow-hidden relative">
                <div className="h-[calc(100dvh-25%)] w-full z-20">
                    {
                        user.map((item, inx) => {
                            return <CardSwiper
                                key={inx}
                                onSwipe={(d) => handleSwipe(d, item)}
                                className={` h-[75%] w-[90%] absolute translate-x-[-50%] left-1/2 cursor-grab rounded-md`}
                                detectingSize={80}
                                likeBtn={
                                    <></>
                                }
                                contents={
                                    <div className="h-full w-full rounded-md relative">
                                        {
                                            item.avatar_url ?
                                                <img src={item.avatar_url} alt="" className="object-cover h-full w-full rounded-md" /> :
                                                <>
                                                    {(item.sugar_type === "EliteDaddy" || item.sugar_type === "EliteBoy")
                                                        ? <Image src={manPlaceolderImg} alt={item.username} width={1000} height={1000} className="h-full w-full rounded-xl object-contain object-center pointer-events-none bg-primary-dark-5 py-14" priority />
                                                        : (item.sugar_type === "EliteMama" || item.sugar_type === "EliteBabe")
                                                            ? <Image src={womanPlaceolderImg} alt={item.username} width={1000} height={1000} className="h-full w-full rounded-xl object-contain object-center pointer-events-none bg-primary-dark-5 py-14" priority />
                                                            : <Image src={placeholder} alt={item.username} width={1000} height={1000} className="h-full w-full rounded-xl object-contain object-center pointer-events-none bg-primary-dark-5 py-14" priority />
                                                    }
                                                </>
                                        }
                                        <p className='absolute top-0 text-center w-full text-white'>{item.username}</p>
                                        {/* <div className='flex flex-col gap-y-[13.2px]  absolute bottom-4 right-4'>
                                            <button className='flex justify-center items-center cursor-pointer h-[52.3px] w-[52.3px] bg-white/50 rounded-full' onClick={() => setSwipeD("left")}>
                                                <Image src={closeIcon} alt="" height={22} width={22} priority className="pointer-events-none" />
                                            </button>
                                            <button className='flex justify-center items-center cursor-pointer h-[52.3px] w-[52.3px] bg-secondary rounded-full' onClick={() => setSwipeD("right")}>
                                                <Image src={heartIcon} alt="" height={24} width={22} priority className="pointer-events-none h-[24px] w-[22px] aspect-auto" />
                                            </button>
                                        </div> */}
                                    </div>
                                }
                            />
                        })
                    }
                </div>
                <div className='flex w-[90%] gap-x-4 text-white absolute bottom-[20px]'>
                    <button className='h-[46px] w-1/2 rounded-[5px] flex justify-center items-center text-white bg-primary-dark-4 text-[18px] font-medium leading-[20px]'>Refer</button>
                    <button className='h-[46px] w-1/2 rounded-[5px] flex justify-center items-center text-white bg-primary-dark-4 text-[18px] font-medium leading-[20px]'>Message</button>
                </div>
            </div>
        </>
    )
}

export default Tinder