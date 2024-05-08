"use client"
import { client_routes, server_routes } from '@/app/lib/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import logo from "../../public/assets/Logo (1).svg"
import notificationIcon from "../../public/assets/Mask group (1).svg"
import messages from "../../public/assets/Mask group.svg"
import search from "../../public/assets/search.svg"
import { logout_user } from '@/app/lib/actions'
import { useStore } from '@/store/store'
import { disconnectSocket, getSocket } from '@/app/lib/socket'
import NotificationComaponent from '../common/Notifications/NotificationComaponent'
import SideDrawer from '../common/SideDrawer'

const RootHeader = ({ user, allUsers, matchNotifications, albumNotifications }) => {
    const socket = getSocket()

    const { state: { notificationOpenState, notifyBadgeState }, dispatch } = useStore()

    const router = useRouter()

    const handleLogout = () => {
        logout_user()
        router.push(client_routes.home)
        dispatch({ type: "Logout" })
        disconnectSocket()
        fetch(server_routes.logout, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.id })
        })
    }

    useEffect(() => {
        if (albumNotifications.length) {
            albumNotifications.forEach(i => {
                dispatch({ type: "Add_Album_Notification", payload: i })
            })
        }
        if (matchNotifications.length) {
            matchNotifications.forEach(i => {
                dispatch({ type: "Add_Friend_Request", payload: i })
            })
        }
        if (user.is_blocked_users.length) {
            user.is_blocked_users.forEach(i => {
                i = { ...i, is_blocked: 1 }
                dispatch({ type: "Add_Blocked_User", payload: i })
            })
        }
    }, [])

    return (
        <>
            <header className="hidden md:flex h-[66px] bg-primary-dark text-white items-center justify-center top-0 fixed w-full z-[2]">
                <div className="flex justify-between items-center w-full">
                    <div className={`flex items-center ms-[72px]`}>
                        <button onClick={() => { router.push(client_routes.home); router.refresh() }}>
                            <Image height={35} width={177} src={logo} alt="" className="pointer-events-none h-[35px] w-[177px]" priority />
                        </button>
                    </div>
                    <div className="flex items-center me-[72px]">
                        <div className="flex flex-row gap-x-[30px] me-[35px]">
                            <button className="transition-all duration-150 hover:scale-110 relative" onClick={() => notificationOpenState ? dispatch({ type: "Close_Notification", payload: false }) : dispatch({ type: "Open_Notification", payload: true })}>
                                <Image height={20} width={20} src={notificationIcon} alt="" />
                                {notifyBadgeState.notify &&
                                    <p className="h-2 w-2 bg-secondary animate-bounce rounded-full absolute top-0 right-0 "></p>
                                }
                            </button>
                            <Link href={client_routes.chat} className="flex transition-all duration-150 hover:scale-110 relative">
                                <Image height={32} width={20} src={messages} alt="" className="" />
                                {notifyBadgeState.msg &&
                                    <p className="h-2 w-2 bg-secondary animate-bounce rounded-full absolute top-0 -right-1"></p>
                                }
                            </Link>
                            <Link href={client_routes.search} className="py-[7px] rounded-[5px] h-[32px] flex items-center transition-all duration-150 hover:scale-110">
                                <Image height={18} width={18} src={search} className="" alt="" priority />
                            </Link>
                        </div>
                        <button className="h-8 w-[78px] me-[35px] rounded-[5px] flex items-center justify-center bg-secondary text-[12px] font-semibold leading-[normal] transition-all duration-150 hover:scale-105" onClick={handleLogout}>
                            Logout
                        </button>
                        {
                            <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
                                {user?.avatar_url
                                    ? <Image height={40} width={40} src={user?.avatar_url} alt="profile_pic" className="cursor-pointer rounded-full aspect-square object-cover" priority onClick={() => router.push(client_routes.profile)} />
                                    : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full capitalize">{user?.username.charAt(0)}</div>
                                }
                            </Link>
                        }
                    </div>
                </div>
            </header>
            <NotificationComaponent open={notificationOpenState} allUsers={allUsers} socket={socket} />
            <SideDrawer />
        </>
    )
}

export default RootHeader