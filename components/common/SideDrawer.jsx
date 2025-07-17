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
// import { disconnectSocket } from '@/app/lib/socket';
import { logout_user } from '@/app/lib/actions';
import { useState } from 'react';

const SideDrawer = ({ user, allStrings }) => {

    const { state: { sideMenu }, dispatch } = useStore()

    const router = useRouter()
    const path = usePathname()

    const navs = [
        {
            name: allStrings["string_profile"],
            icon: EditIcon,
            path: client_routes.profile
        },
        {
            name: allStrings["string_edit_profile"],
            icon: EditIcon,
            path: client_routes.edit_profile
        },
        {
            name: allStrings["string_chat"],
            icon: ChatIcon,
            path: client_routes.chat
        },
        {
            name: allStrings["string_search"],
            icon: searchIcon,
            path: client_routes.search
        },
        {
            name: allStrings["string_identity_verification"],
            icon: searchIcon,
            path: client_routes.verifyIdentity
        },
        {
            name: allStrings["string_contact_us"],
            icon: searchIcon,
            path: client_routes.contactUs
        },

    ]

    const logoutHandler = async () => {
        logout_user()
        dispatch({ type: "Logout" })
        // disconnectSocket()
        await fetch(server_routes.logout, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.id })
        })
        router.push(client_routes.home);
        window.location.reload();
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
                        <div className=''>
                            <div className='w-full h-[66px] bg-black px-4 flex items-center justify-between'>
                                <button onClick={() => router.push(client_routes.home)}>
                                    <Image height={22} width={102} src={logo} alt="" className="pointer-events-none h-[30px] w-[150px]" priority />
                                </button>
                                <button onClick={() => dispatch({ type: "Close_Menu" })}>
                                    <Image height={30} width={30} src={Close} alt="" className="pointer-events-none" priority />
                                </button>
                            </div>
                            <div className='pt-4 w-full'>
                                {
                                    navs.map((i, inx) => {
                                        return <div className='px-4 w-full' key={inx}>
                                            <button onClick={() => { router.push(i.path); dispatch({ type: "Close_Menu" }); }} className={`py-3 px-4 ${i.path === path && "bg-secondary border-none"} border-b border-primary-dark-4 w-full text-left h-full capitalize text-[18px] md:text-[20px] tracking-wide font-[550]`}>{i.name}</button>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className='w-full p-4 text-[16px] font-medium'>
                            <button className='bg-primary-dark-5 p-2 rounded-[5px] tracking-[0.075em] w-full h-full uppercase font-semibold' onClick={logoutHandler}>
                                {allStrings["string_logout"]}
                            </button>
                        </div>
                    </div>
                </Drawer>
            </ConfigProvider>
        </div>
    )
}

export default SideDrawer