"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import arrowLeft from "/public/assets/arrow_left.svg";
import more_horizontal from "/public/assets/more_horizontal.svg"
import PopOver from '@/components/profile/commons/PopOver';
import Stroke_Online from '/public/assets/online_stroke.svg'
import { useRouter } from 'next/navigation';
import { client_routes } from '@/app/lib/helpers';
import chatArrowRight from "/public/assets/chat_arrow_right.png";
import { useStore } from '@/store/store';
import NotificationIcon from "/public/assets/bell_icon.svg"
import Bars_Icon from "/public/assets/bars.svg"

const TopNav = ({ profileList }) => {

    const navigate = useRouter()
    const { dispatch, state: { notifyBadgeState, onlineUsers } } = useStore()
    const horizontalProfilesRef = useRef(null);
    const [showProfileScrollLeftBtn, setShowProfileScrollLeftBtn] = useState(false)
    const [showProfileScrollRightBtn, setShowProfileScrollRightBtn] = useState(false)


    useEffect(() => {
        const container = horizontalProfilesRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        window.addEventListener('resize', handleScroll);

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('resize', handleScroll);
        };

    }, [])

    useEffect(() => {
        handleScroll()
    }, [profileList])

    const handleScroll = () => {
        if (horizontalProfilesRef.current) {
            let leftScroll = horizontalProfilesRef.current.scrollLeft;
            let maxLeftScroll = horizontalProfilesRef.current.scrollWidth - horizontalProfilesRef.current.clientWidth;
            (leftScroll === 0) ? setShowProfileScrollLeftBtn(false) : setShowProfileScrollLeftBtn(true);
            (leftScroll === maxLeftScroll) ? setShowProfileScrollRightBtn(false) : setShowProfileScrollRightBtn(true);
        }
    };

    const handleHorizontalScrollBtn = (val) => {
        if (horizontalProfilesRef.current) {
            horizontalProfilesRef.current.scrollBy({
                left: val,
                behavior: 'smooth'
            });
        }
    }


    return (
        <>
            <div className="md:hidden relative flex justify-between px-4 items-center">
                <button className="flex justify-center items-center " onClick={() => { navigate.push(client_routes.profile); }}>
                    <Image src={arrowLeft} alt="" height={24} width={24} className="pointer-events-none" />
                </button>
                <div className="text-[24px] font-semibold leading-[22.8px]">Messages</div>
                <div className='flex gap-x-4'>
                    <div className='relative'>
                        <Image src={NotificationIcon} alt="bell icon" width={20} height={20} priority className="cursor-pointer pt-[2px]" onClick={() => dispatch({ type: "Open_Notification", payload: true })} />
                        {notifyBadgeState.notify &&
                            <p className="h-2 w-2 bg-secondary bounce rounded-full absolute -top-1 -right-1"></p>
                        }
                    </div>
                    <Image src={Bars_Icon} alt="more" width={24} height={24} priority className="cursor-pointer" onClick={() => dispatch({ type: "Show_Menu" })} />
                </div>
            </div>
            <div className="text-[20px] md:text-[26px] font-semibold md:font-bold leading-[30px] px-4 md:px-[30px] mt-5 md:mt-0">
                Favorites
            </div>
            <div className="relative flex items-center mt-[10px] md:mt-5 px-4 md:px-[22px] mx-1">
                <button className={`absolute left-0 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollLeftBtn ? "flex" : "hidden"}`} onClick={() => handleHorizontalScrollBtn(-40)}>
                    <Image src={chatArrowRight} unoptimized alt="" height={1000} width={1000} priority className="h-full w-full pointer-events-none rotate-180" />
                </button>
                <div ref={horizontalProfilesRef} className={`horizontal-profiles py-1 flex gap-x-4 overflow-x-auto items-center ${showProfileScrollLeftBtn ? "ps-5" : "ps-0"} ${showProfileScrollRightBtn ? "pe-6" : "pe-0"}`} style={{ scrollbarWidth: "none" }}>
                    {profileList?.map((item, idx) => {
                        return (
                            <button key={idx} className="flex items-center relative justify-center scroll-smooth" onClick={() => { dispatch({ type: "Message_To", payload: item.profile }) }}>
                                {
                                    item.profile.avatar_url ?
                                        <Image src={item.profile.avatar_url} alt="" height={40} width={40} priority className="aspect-square min-h-10 min-w-10 object-cover rounded-full pointer-events-none" />
                                        : <p className="h-10 w-10 flex items-center justify-center bg-primary rounded-full text-[18px] uppercase">{item.profile.username.charAt(0)}</p>
                                }
                                {onlineUsers.some(i => i === item.profile.id) && <Image src={Stroke_Online} height={10} width={10} alt="avatar" className='absolute -top-[3px] right-1' />}
                            </button>
                        )
                    })}

                </div>
                <button className={`absolute right-0 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollRightBtn ? "flex" : "hidden"}`} onClick={() => handleHorizontalScrollBtn(40)}>
                    <Image src={chatArrowRight} unoptimized alt="" height={1000} width={1000} priority className="h-full w-full pointer-events-none" />
                </button>
            </div>
        </>
    )
}

export default TopNav