"use client"
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import chevron_left from "/public/assets/arrow_left.svg"
import settingsIcon from "/public/assets/settings_icon.svg";
import { useRouter } from 'next/navigation';
import { client_routes } from '@/app/lib/helpers';
import Buttons from '@/components/search/Buttons';
import SwiperComponent from './SwiperComponent';
import RequestsComponent from './RequestsComponent';
import Butterflies from "/public/assets/butterfly.gif"
import Like from "/public/assets/like.gif"
import { useStore } from '@/store/store';

const TinderSwipe = ({ users, filterHandler, pendingList, currentUser }) => {

    const { state: { friendsList, blockedUsersState } } = useStore()
    const navigate = useRouter()
    const [toggle, setToggle] = useState(false)
    const [offSet, setOffSet] = useState(null)
    const [removalId, setRemovalId] = useState([])

    useEffect(() => {
        const pendingIds = pendingList.map(i => i.sender_id)
        const blockList = blockedUsersState.filter((i) => i.is_blocked === 1)
        const otherIDsSet = new Set();

        blockList.forEach(message => {
            if (message.sender_id !== currentUser.id) {
                otherIDsSet.add(message.sender_id);
            }
            if (message.receiver_id !== currentUser.id) {
                otherIDsSet.add(message.receiver_id);
            }
        });

        const otherIDs = Array.from(otherIDsSet);
        const ids = [...friendsList, ...pendingIds, ...otherIDs]
        setRemovalId(ids)
    }, [friendsList, pendingList, blockedUsersState])

    return (
        <div className="h-full flex flex-col text-white items-center overflow-hidden">
            <div className={`h-full w-full absolute pointer-events-none ${offSet === "right" ? "block" : "hidden"}`}>
                <Image className='h-full w-full object-cover pointer-events-none' src={Butterflies} width={1000} height={1000} alt='gif' />
            </div>
            <div className="md:hidden flex justify-between items-center w-full px-4 pt-3" data-aos="fade-down" data-aos-duration="800" data-aos-anchor="#example-anchor">
                <div className="flex justify-center items-center " onClick={() => navigate.push(client_routes.profile)}>
                    <Image src={chevron_left} alt="" height={24} width={24} priority className="pointer-events-none" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="text-white text-[24px] font-semibold leading-[23px]">Discover</div>
                    <div className="text-white/70 text-[14px] font-medium leading-[16px] mt-2">You looking</div>
                </div>
                <button className="h-[42px] w-[42px] flex justify-center items-center bg-secondary rounded-[5px]" onClick={filterHandler}>
                    <Image src={settingsIcon} alt="" height={20} width={20} priority className="pointer-events-none" />
                </button>
            </div>
            <Buttons setToggle={setToggle} toggle={toggle} />
            <SwiperComponent users={users.filter(user => !removalId.includes(user.id))} toggle={toggle} offSet={offSet} setOffSet={setOffSet} />
            <RequestsComponent toggle={toggle} pendingList={pendingList} />

        </div >
    );
};

export default TinderSwipe;
