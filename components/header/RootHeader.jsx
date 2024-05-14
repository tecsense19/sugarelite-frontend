"use client"
import { client_routes, server_routes } from '@/app/lib/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import logo from "../../public/assets/Logo (1).svg"
import notificationIcon from "../../public/assets/Mask group (1).svg"
import messages from "../../public/assets/Mask group.svg"
import search from "../../public/assets/search.svg"
import { logout_user } from '@/app/lib/actions'
import { useStore } from '@/store/store'
import { connectSocket, disconnectSocket, getSocket } from '@/app/lib/socket'
import NotificationComaponent from '../common/Notifications/NotificationComaponent'
import SideDrawer from '../common/SideDrawer'
import { ConfigProvider, Popover } from 'antd'

const RootHeader = ({ user, allUsers, matchNotifications, albumNotifications, chatList }) => {

    useEffect(() => {
        let userId = user.id;
        if (userId) {
            connectSocket(userId);
        }
        return () => {
            disconnectSocket();
        }
    }, [])
    const { state: { notificationOpenState, notifyBadgeState, chatProfileState }, dispatch } = useStore();

    const socket = getSocket()
    const router = useRouter()
    const pathname = usePathname()

    const [showDropdown, setShowDropdown] = useState(false);

    const newMessageHandler = (obj) => {
        const finduser = chatProfileState.some(i => i.id === obj.sender_id)
        if (!finduser) {
            dispatch({ type: "Add_Profile", payload: { id: obj.sender_id, milisecondtime: obj.milisecondtime } })
        }
    }

    useEffect(() => {
        if (!socket) return

        const blockUserHandler = (obj) => {
            if (obj.sender_id === user.id || obj.receiver_id === user.id) {
                dispatch({ type: "Add_Blocked_User", payload: obj })
            }
        };

        const unblockUserHandler = (obj) => {
            if (obj.sender_id === user.id || obj.receiver_id === user.id) {
                dispatch({ type: "Add_Blocked_User", payload: obj })
            }
        };

        const albumAccessHandler = (obj) => {
            dispatch({ type: "Add_Decision_User", payload: obj })
            const { data, status } = obj
            if (user.id === data.receiver_id && status === "pending") {
                dispatch({ type: "Add_Album_Notification", payload: data })
            }
            if (!notificationOpenState && status === "pending" && data.receiver_id === user.id) {
                dispatch({ type: "Add_Notification_Badge", payload: true })
            }

        }

        const receiveMessageHandler = (obj) => {
            if (obj.receiver_id === user.id && (pathname !== client_routes.chat)) {
                dispatch({ type: "Add_Msg_Badge", payload: true })
                newMessageHandler(obj)
            }
        }

        const onlineUserHandler = (arr) => {
            const filtered = arr.filter(i => i !== user.id)
            dispatch({ type: "Update_Online_Users", payload: filtered })
        }

        const myChattingPartner = (obj) => {
            dispatch({ type: "Add_Partner", payload: obj })
        }

        const swipeHandler = (obj) => {
            if (obj.receiver_id === user.id && obj.is_friend === 0) {
                console.log("receiver", obj)
                dispatch({ type: "Add_Received_Request", payload: { id: obj.sender_id } })
                dispatch({ type: "Add_Friend_Request", payload: obj })
            }
            else if (obj.sender_id === user.id && obj.is_friend === 1) {
                console.log("receiver", obj)
                dispatch({ type: "Add_Friend_Request", payload: obj })
                dispatch({ type: "Add_Accepted_Request", payload: { id: obj.user_id } })
            } else if (obj.receiver_id === user.id && obj.is_friend === 2) {
                console.log("removed")
                dispatch({ type: "Remove_Friend_Request", payload: obj })
            }
        }

        socket.on("blocked-status", blockUserHandler);
        socket.on("unblocked-status", unblockUserHandler);
        socket.on("receive-message", receiveMessageHandler);
        socket.on("album-notification", albumAccessHandler);
        socket.on("onlineUsers", onlineUserHandler)
        socket.on("opened-chat-user", myChattingPartner)
        socket.on('swipe-notify', swipeHandler)

        return () => {
            if (socket) {
                socket.off("blocked-status", blockUserHandler);
                socket.off("unblocked-status", unblockUserHandler);
                socket.off("album-notification", albumAccessHandler)
                socket.off("receive-message", receiveMessageHandler);
                socket.off("onlineUsers", onlineUserHandler)
                socket.off('swipe-notify', swipeHandler)
            }
        };

    }, [user, socket, notificationOpenState, pathname])


    useEffect(() => {
        if (user.is_blocked_users.length) {
            user.is_blocked_users.forEach(i => {
                i = { ...i, is_blocked: 1 }
                dispatch({ type: "Add_Blocked_User", payload: i })
            })
        }
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
    }, [])

    useEffect(() => {
        if (chatList.data.length) {
            const user_chats = chatList.data.filter(chat => chat.sender_id === user?.id || chat.receiver_id === user?.id);
            const chatId = Array.from(new Set(user_chats.map(chat => chat.sender_id !== user.id ? chat.sender_id : chat.receiver_id)));
            if (chatId.length) {
                chatId.forEach(i => {
                    dispatch({ type: "Add_Profile", payload: { id: i, milisecondtime: '' } })
                })
            }
        }
    }, [user])

    const handleLogout = async () => {
        logout_user()
        dispatch({ type: "Logout" })
        disconnectSocket()
        await fetch(server_routes.logout, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.id })
        })
        router.push(client_routes.home)
        window.location.reload();
    }

    const handleShowDDChange = (val) => {
        setShowDropdown(val)
    }

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
                                    <p className="h-2 w-2 bg-secondary rounded-full absolute top-0 right-0 "></p>
                                }
                            </button>
                            <Link href={client_routes.chat} className="flex transition-all duration-150 hover:scale-110 relative">
                                <Image height={32} width={20} src={messages} alt="" className="" />
                                {notifyBadgeState.msg &&
                                    <p className="h-2 w-2 bg-secondary rounded-full absolute top-0 -right-1"></p>
                                }
                            </Link>
                            <Link href={client_routes.search} className="py-[7px] rounded-[5px] h-[32px] flex items-center transition-all duration-150 hover:scale-110">
                                <Image height={18} width={18} src={search} className="" alt="" priority />
                            </Link>
                        </div>
                        <button className="h-8 w-[78px] me-[35px] rounded-[5px] flex items-center justify-center bg-secondary text-[12px] font-semibold leading-[normal] transition-all duration-150 hover:scale-105" onClick={handleLogout}>
                            Logout
                        </button>
                        {/* <div className='relative inline-flex justify-center items-center'> */}
                        {/* {showDropdown
                                ? 
                                : <></>
                            } */}
                        <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "#000000" } }}>
                            <Popover placement="bottomRight" trigger="click" open={showDropdown} onOpenChange={handleShowDDChange} rootClassName='rootHeaderPopOver' content={(
                                <div className='p-2 right-0 bg-black w-max flex flex-col text-[15px]'>
                                    <Link className={`py-2 px-3 hover:bg-secondary text-white hover:text-white ${pathname === client_routes.profile ? "bg-secondary" : ""}`} href={client_routes.profile} onClick={() => setShowDropdown(false)}>Profile</Link>
                                    <hr className='m-0 border-gray-500' />
                                    <Link className={`py-2 px-3 hover:bg-secondary text-white hover:text-white ${pathname === client_routes.verifyIdentity ? "bg-secondary" : ""}`} href={client_routes.verifyIdentity} onClick={() => setShowDropdown(false)}>Identity Verification</Link>
                                    <hr className='m-0 border-gray-500' />
                                    <Link className={`py-2 px-3 hover:bg-secondary text-white hover:text-white ${pathname === client_routes.contactUs ? "bg-secondary" : ""}`} href={client_routes.contactUs} onClick={() => setShowDropdown(false)}>Contact us</Link>
                                </div>
                            )}>
                                <div className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105 cursor-pointer" >
                                    {user?.avatar_url
                                        ? <Image height={40} width={40} src={user?.avatar_url} alt="profile_pic" className="rounded-full aspect-square object-cover pointer-events-none" priority />
                                        : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full capitalize">{user?.username.charAt(0)}</div>
                                    }
                                </div>
                            </Popover>
                        </ConfigProvider>
                        {/* {
                                <div className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                                    {user?.avatar_url
                                        ? <Image height={40} width={40} src={user?.avatar_url} alt="profile_pic" className="rounded-full aspect-square object-cover pointer-events-none" priority />
                                        : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full capitalize">{user?.username.charAt(0)}</div>
                                    }
                                </div>
                            } */}
                        {/* </div> */}
                    </div>
                </div>
            </header>
            <NotificationComaponent open={notificationOpenState} allUsers={allUsers} socket={socket} user={user} />
            <SideDrawer user={user} />
        </>
    )
}

export default RootHeader