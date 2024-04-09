"use client"
import { client_routes, server_routes } from '@/app/lib/helpers';
import { useStore } from '@/store/store';
import { ConfigProvider, Drawer, } from 'antd';
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation';
import logo from "/public/assets/Logo (1).svg"
import Close from "/public/assets/close.svg"
import ChatIcon from "/public/assets/message.svg"
import LogoutIcon from "/public/assets/logout.svg"
import EditIcon from "/public/assets/edit.svg"
import searchIcon from "/public/assets/search.svg"
import NotificationIcon from "/public/assets/Mask group (1).svg"
import { disconnectSocket } from '@/app/lib/socket';
import { logout_user } from '@/app/lib/actions';
import { useState } from 'react';

const SideDrawer = () => {

    const { state: { sideMenu, userState }, dispatch } = useStore()

    const router = useRouter()
    const path = usePathname()

    const navs = [
        {
            name: "Profile",
            icon: EditIcon,
            path: client_routes.profile
        },
        {
            name: "Edit Profile",
            icon: EditIcon,
            path: client_routes.edit_profile
        },
        {
            name: "Chat",
            icon: ChatIcon,
            path: client_routes.chat
        },
        {
            name: "Search",
            icon: searchIcon,
            path: client_routes.search
        },

    ]

    const logoutHandler = () => {
        logout_user()
        dispatch({ type: "Logout" })
        disconnectSocket()
        router.push(client_routes.home)
        fetch(server_routes.logout, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userState.id })
        })
    }

    return (
        <div className='side_drawer'>
            <ConfigProvider
                theme={{
                    components: {

                    },
                    token: {
                        colorBgElevated: "#1F1F1F",
                        paddingLG: "0",
                    },
                }}
            >
                <Drawer open={sideMenu} className='!text-white' closeIcon={false}>
                    <div className='flex justify-between flex-col h-full w-full'>
                        <div>
                            <div className='w-full h-[66px] bg-black px-4 flex items-center justify-between'>
                                <button onClick={() => router.push(client_routes.profile)}>
                                    <Image height={22} width={102} src={logo} alt="" className="pointer-events-none h-[30px] w-[150px]" priority />
                                </button>
                                <button onClick={() => dispatch({ type: "Close_Menu" })}>
                                    <Image height={30} width={30} src={Close} alt="" className="pointer-events-none" priority />
                                </button>
                            </div>
                            <div className='text-[18px] pt-4 w-full  font-medium'>
                                {
                                    navs.map((i, inx) => {
                                        return <div className='px-4  w-full' key={inx}>
                                            <button onClick={() => { router.push(i.path); dispatch({ type: "Close_Menu" }); }} className={` py-3  px-2 ${i.path === path && "bg-secondary border-none"} border-b border-primary-dark-4 tracking-normal w-full text-left h-full capitalize`}>{i.name}</button>
                                        </div>
                                    })
                                }
                                {/* <div className='px-4  w-full'>
                                    <button className=' py-3  px-2 bg-secondary border-primary-dark-4 tracking-normal w-full text-left h-full capitalize'>Profile</button>
                                </div>
                                <div className='px-4 w-full'>
                                    <button className=' py-3  px-2 border-b border-primary-dark-4 tracking-normal w-full text-left h-full capitalize'>Edit Profile</button>
                                </div>
                                <div className='px-4 w-full'>
                                    <button className=' py-3 px-2 border-b border-primary-dark-4 tracking-normal w-full text-left h-full capitalize'>Chat</button>
                                </div>
                                <div className='px-4 w-full'>
                                    <button className=' py-3 px-2 border-b border-primary-dark-4 tracking-normal w-full text-left h-full capitalize'>Search</button>
                                </div> */}

                            </div>
                        </div>
                        <div className='w-full p-4 text-[18px] font-medium'>
                            <button className='bg-primary-dark-5 p-2 rounded-[5px] tracking-[0.075em] w-full h-full uppercase' onClick={logoutHandler}>Logout</button>
                        </div>
                    </div>
                </Drawer>
            </ConfigProvider>
        </div>
    )
}

export default SideDrawer