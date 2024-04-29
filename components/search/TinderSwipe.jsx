"use client"
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import chevron_left from "/public/assets/arrow_left.svg"
import settingsIcon from "/public/assets/settings_icon.svg";
import { useRouter } from 'next/navigation';
import { client_routes } from '@/app/lib/helpers';
import Buttons from '@/components/search/Buttons';
import SwiperComponent from './SwiperComponent';

const TinderSwipe = ({ users, filterHandler }) => {

    const navigate = useRouter()

    return (
        <div className="h-full pb-5 flex justify-between flex-col text-white items-center overflow-hidden ">
            <div className="md:hidden flex justify-between items-center w-full px-4 pt-3" data-aos="fade-down" data-aos-duration="800">
                <div className="flex justify-center items-center" onClick={() => navigate.push(client_routes.profile)}>
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
            <SwiperComponent users={users} />
            <Buttons />
        </div>
    );
};

const getPlaceholder = (sugarType) => {
    if (sugarType === "EliteDaddy" || sugarType === "EliteBoy") {
        return manPlaceolderImg;
    } else if (sugarType === "EliteMama" || sugarType === "EliteBabe") {
        return womanPlaceolderImg;
    } else {
        return placeholder;
    }
};


export default TinderSwipe;
