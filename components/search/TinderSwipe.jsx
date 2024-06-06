"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import chevron_left from "/public/assets/arrow_left.svg"
import settingsIcon from "/public/assets/settings_icon.svg";
import { useRouter } from 'next/navigation';
import { client_routes } from '@/app/lib/helpers';
import Buttons from '@/components/search/Buttons';
import SwiperComponent from './SwiperComponent';
import RequestsComponent from './RequestsComponent';
// import Butterflies from "/public/assets/butterfly.gif"
// import Like from "/public/assets/like.gif"
import { useStore } from '@/store/store';
// import { getSocket } from '@/app/lib/socket';
import { useSocket } from '@/store/SocketContext';

const TinderSwipe = ({ users, filterHandler, remainingList, currentUser, myRecievedRequests, allStrings }) => {

    const { state: { requestsState } } = useStore()
    const navigate = useRouter()
    const [toggle, setToggle] = useState(false)
    const [offSet, setOffSet] = useState(null)
    const [user, setUser] = useState([])
    // const socket = getSocket()
    const { mySocket } = useSocket();
    const socket = mySocket;

    useEffect(() => {
        const { sendedRequests, receivedRequests, acceptedRequests } = requestsState
        const allIds = [...sendedRequests, ...receivedRequests, ...acceptedRequests].map(i => i.id)
        setUser(users.filter(i => !allIds.includes(i.id)))
    }, [requestsState])

    return (
        <div className="h-full flex flex-col text-white items-center overflow-hidden">
            <div className="md:hidden flex justify-between items-center w-full px-4 pt-3 relative">
                <div className="flex justify-center cursor-pointer items-center " onClick={() => navigate.push(client_routes.profile)}>
                    {/* <Image src={chevron_left} alt="" height={24} width={24} priority className="pointer-events-none" /> */}
                    {currentUser?.avatar_url
                        ? <Image height={40} width={40} src={currentUser?.avatar_url} alt="profile_pic" className="rounded-full aspect-square object-cover pointer-events-none" priority />
                        : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full capitalize">{currentUser?.username.charAt(0)}</div>
                    }
                </div>
                <div className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2">
                    <div className="text-white text-[24px] font-semibold leading-[23px]">{allStrings["string_discover"]}</div>
                    <div className="text-white/70 text-[14px] font-medium leading-[16px] mt-2">{allStrings["string_you_looking"]}</div>
                </div>
                <button className="h-[42px] w-[42px] flex justify-center items-center bg-secondary rounded-[5px]" onClick={filterHandler}>
                    <Image src={settingsIcon} alt="" height={20} width={20} priority className="pointer-events-none" />
                </button>
            </div>
            <Buttons setToggle={setToggle} toggle={toggle} allStrings={allStrings} />
            <SwiperComponent users={user} toggle={toggle} offSet={offSet} setOffSet={setOffSet} currentUser={currentUser} remainingList={remainingList} socket={socket} allStrings={allStrings} />
            <RequestsComponent toggle={toggle} remainingList={remainingList} currentUser={currentUser} socket={socket} myRecievedRequests={users.filter(i => myRecievedRequests.some(j => i.id === j.sender_id))} allStrings={allStrings} />
        </div>
    );
};

export default TinderSwipe;
