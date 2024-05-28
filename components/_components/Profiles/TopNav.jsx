import { client_routes } from '@/app/lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import arrowLeft from "/public/assets/arrow_left.svg";
import NotificationIcon from "/public/assets/bell_icon.svg"
import Bars_Icon from "/public/assets/bars.svg"
import chatArrowRight from "/public/assets/chat_arrow_right.png";
import Stroke_Online from '/public/assets/online_stroke.svg'
import Logo from "/public/assets/fire_log.svg"
import { useStore } from '@/store/store';

const TopNav = ({ messages, user, allUsers, setShowMobileChatContent, allStrings }) => {

    const { dispatch, state: { onlineUsers } } = useStore()
    const horizontalProfilesRef = useRef(null);

    const [showProfileScrollLeftBtn, setShowProfileScrollLeftBtn] = useState(false)
    const [showProfileScrollRightBtn, setShowProfileScrollRightBtn] = useState(false)

    const handleHorizontalScrollBtn = (val) => {
        if (horizontalProfilesRef.current) {
            horizontalProfilesRef.current.scrollBy({
                left: val,
                behavior: 'smooth'
            });
        }
    }

    const handleScroll = () => {
        if (horizontalProfilesRef.current) {
            let leftScroll = horizontalProfilesRef.current.scrollLeft;
            let maxLeftScroll = horizontalProfilesRef.current.scrollWidth - horizontalProfilesRef.current.clientWidth;
            (leftScroll === 0) ? setShowProfileScrollLeftBtn(false) : setShowProfileScrollLeftBtn(true);
            (leftScroll === maxLeftScroll) ? setShowProfileScrollRightBtn(false) : setShowProfileScrollRightBtn(true);
        }
    };

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
    }, [messages])

    const sortUsersByLatestMessage = () => {
        const userMessages = {};
        messages.forEach(message => {
            const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
            if (!userMessages[otherUserId] || userMessages[otherUserId].milisecondtime < message.milisecondtime) {
                userMessages[otherUserId] = message;
            }
        });
        return Object.values(userMessages).sort((a, b) => b.milisecondtime - a.milisecondtime);
    };

    const renderTopUser = (latestMessage, inx) => {
        const otherUserId = latestMessage.sender_id === user.id ? latestMessage.receiver_id : latestMessage.sender_id;
        const foundUser = allUsers.find(user => user.id === otherUserId);

        return <button key={inx} className="flex items-center relative justify-center scroll-smooth"
            onClick={() => {
                setShowMobileChatContent(true);
                dispatch({ type: "Message_To", payload: foundUser })
            }}
        >
            {
                foundUser.avatar_url ?
                    <Image src={foundUser.avatar_url} alt="" height={40} width={40} priority className="aspect-square min-h-10 min-w-10 object-cover rounded-full pointer-events-none" />
                    : <p className="h-10 w-10 flex items-center justify-center bg-primary rounded-full text-[18px] uppercase">{foundUser.username.charAt(0)}</p>
            }
            {onlineUsers.some(i => i === foundUser.id) && <Image src={Stroke_Online} height={10} width={10} alt="avatar" className='absolute -top-[3px] right-1' />}
        </button>
    }

    const renderTopUsers = () => {
        const sortedUsers = sortUsersByLatestMessage();
        return sortedUsers.length ? sortedUsers.map(renderTopUser) : "";
    }

    return (
        <>
            <div className="md:hidden relative flex justify-between px-4 items-center mt-3">
                <Link href={client_routes.profile} prefetch className="flex justify-center items-center ">
                    <Image src={arrowLeft} alt="" height={24} width={24} className="pointer-events-none" />
                </Link>
                <div className="text-[24px] font-semibold leading-[22.8px]">{allStrings["string_messages"]}</div>
                <div className='flex gap-x-4'>
                    <div className='relative' onClick={() => dispatch({ type: "Open_Notification", payload: true })}>
                        <Image src={NotificationIcon} alt="bell icon" width={20} height={20} priority className="cursor-pointer pt-[2px]" />
                    </div>
                    <Image src={Bars_Icon} alt="more" width={24} height={24} priority className="cursor-pointer" onClick={() => dispatch({ type: "Show_Menu" })} />
                </div>
            </div>
            <div className="text-[20px] md:text-[26px] mb-[10px] md:mb-[20px] font-semibold md:font-bold leading-[30px] px-4 md:px-[30px] mt-5 md:mt-0">
                {allStrings["string_favorites"]}
            </div>
            <div className="relative flex items-center w-full px-4 md:px-[30px]">
                <button
                    className={`absolute left-2 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollLeftBtn ? "flex" : "hidden"}`}
                    onClick={() => handleHorizontalScrollBtn(-40)}>
                    <Image src={chatArrowRight} unoptimized alt="" height={1000} width={1000} priority className="h-full w-full pointer-events-none rotate-180" />
                </button>
                <div ref={horizontalProfilesRef}
                    className={`horizontal-profiles py-1 flex gap-x-4 overflow-x-auto items-center `}
                    style={{ scrollbarWidth: "none" }}>
                    <button className="flex h-10 min-w-10 bg-tinder rounded-full relative"
                        onClick={() => {
                            setShowMobileChatContent(true);
                            dispatch({ type: "Message_To", payload: "Admin" })
                        }}>
                        <Image src={Logo} alt="ELite_Logo" height={40} width={40} priority className="m-auto h-[26px] w-[22px] object-cover rounded-full pointer-events-none" />
                        <Image src={Stroke_Online} height={10} width={10} alt="avatar" className='absolute -top-[3px] right-1' />
                    </button>
                    {renderTopUsers()}
                </div>
                <button
                    className={`absolute right-0 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollRightBtn ? "flex" : "hidden"}`}
                    onClick={() => handleHorizontalScrollBtn(40)}>
                    <Image src={chatArrowRight} unoptimized alt="" height={1000} width={1000} priority className="h-full w-full pointer-events-none" />
                </button>
            </div>
        </>
    )
}

export default TopNav