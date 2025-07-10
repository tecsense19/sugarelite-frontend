"use client"
import { client_routes, server_routes } from '@/app/lib/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import logo from "../../public/assets/Logo (1).svg"
import notificationIcon from "../../public/assets/Mask group (1).svg"
import messagesIcon from "../../public/assets/Mask group.svg"
import search from "../../public/assets/search.svg"
import { logout_user, post_support_msg, read_message_action } from '@/app/lib/actions'
import { useStore } from '@/store/store'
// import { connectSocket, disconnectSocket } from '@/app/lib/socket'
import NotificationComaponent from '../common/Notifications/NotificationComaponent'
import SideDrawer from '../common/SideDrawer'
import { ConfigProvider, Popover } from 'antd'
import { io } from 'socket.io-client'
import { useSocket } from '@/store/SocketContext'
import { useChat } from '@/store/ChatContext'
import { connectSocket } from '@/app/lib/socket'

// const socket = io("https://socket.sugarmake.dk");
const socket = io("https://sugarelite-socket-server.onrender.com");
// const socket = io("http://103.211.218.172:3001");

const RootHeader = ({ user, allUsers, matchNotifications, albumNotifications, chatList, supportChat, allStrings }) => {
    // const socket = io("http://103.211.218.172:3001");

    const { setSocket } = useSocket();
    const { addAllMessages, addMessage, addTypingUser, removerTypingUser, editMessage, addUnReadCount, updateUnReadCount, state: { unReadCount, messages } } = useChat()
    const { state: { notificationOpenState, notifyBadgeState, chatProfileState, toMessageState, onlineUsers }, dispatch } = useStore();

    const [unReadMsg, setUnReadMsgs] = useState(0)

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
        if (user) {
            socket.emit("join", user.id);
            setSocket(socket);
            connectSocket(socket)
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

            // const albumAccessHandler = (obj) => {
            //     dispatch({ type: "Add_Decision_User", payload: obj })
            //     const { data, status } = obj
            //     if (user.id === data.receiver_id && status === "pending") {
            //         dispatch({ type: "Add_Album_Notification", payload: data })
            //     }
            //     if (!notificationOpenState && status === "pending" && data.receiver_id === user.id) {
            //         dispatch({ type: "Add_Notification_Badge", payload: true })
            //     }

            // }

            const onlineUserHandler = (arr) => {
                console.log(arr);
                // const filtered = arr.filter(i => i !== user.id)
                // dispatch({ type: "Update_Online_Users", payload: filtered })
                dispatch({ type: "Update_Online_Users", payload: arr })
            }

            const myChattingPartner = (obj) => {
                dispatch({ type: "Add_Partner", payload: obj })
            }

            // const swipeHandler = (obj) => {
            //     if (obj.receiver_id === user.id && obj.is_friend === 0) {
            //         dispatch({ type: "Add_Received_Request", payload: { id: obj.sender_id } })
            //         dispatch({ type: "Add_Friend_Request", payload: obj })
            //     }
            //     else if (obj.sender_id === user.id && obj.is_friend === 1) {
            //         dispatch({ type: "Add_Friend_Request", payload: obj })
            //         dispatch({ type: "Add_Accepted_Request", payload: { id: obj.user_id } })
            //     } else if (obj.receiver_id === user.id && obj.is_friend === 2) {
            //         dispatch({ type: "Remove_Friend_Request", payload: obj })
            //     }
            // }

            const showAnimationHandler = (obj) => {
                if (obj.receiver_id === user.id) {
                    if (obj.decision) {
                        addTypingUser(obj)
                    } else {
                        removerTypingUser(obj)
                    }
                }
            }

            socket.on("blocked-status", blockUserHandler);
            socket.on("unblocked-status", unblockUserHandler);
            // socket.on("receive-message", receiveMessageHandler);
            // socket.on("album-notification", albumAccessHandler);
            socket.on("onlineUsers", onlineUserHandler)
            socket.on("opened-chat-user", myChattingPartner)
            // socket.on('swipe-notify', swipeHandler)
            socket.on("show-animation", showAnimationHandler);
        }

        return () => {
            const filtered = onlineUsers.filter(i => i !== user.id);
            dispatch({ type: "Update_Online_Users", payload: filtered });
            socket.close()
            socket.off("onlineUsers")
        }
    }, [])

    useEffect(() => {
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

        const swipeHandler = (obj) => {
            if (obj.receiver_id === user.id && obj.is_friend === 0) {
                if (!notificationOpenState) {
                    dispatch({ type: "Add_Notification_Badge", payload: true })
                }
                dispatch({ type: "Add_Received_Request", payload: { id: obj.sender_id } })
                dispatch({ type: "Add_Friend_Request", payload: obj })
            }
            else if (obj.sender_id === user.id && obj.is_friend === 1) {
                if (!notificationOpenState) {
                    dispatch({ type: "Add_Notification_Badge", payload: true })
                }
                dispatch({ type: "Add_Friend_Request", payload: obj })
                dispatch({ type: "Add_Accepted_Request", payload: { id: obj.user_id } })
            } else if (obj.receiver_id === user.id && obj.is_friend === 2) {
                dispatch({ type: "Remove_Friend_Request", payload: obj })
            }
        }

        socket.on("album-notification", albumAccessHandler);
        socket.on('swipe-notify', swipeHandler)
        return () => {
            socket.off("album-notification")
            socket.off('swipe-notify', swipeHandler)
        }
    }, [notificationOpenState])

    useEffect(() => {
        const receiveMessageHandler = (obj) => {
            if (obj.receiver_id === user.id && !obj.seenType) {
                if (obj.type === "deleted" || obj.type === "edited") {
                    // addMessage(obj)
                    editMessage(obj)
                } else {
                    newMessageHandler(obj)
                    addMessage(obj)
                    if (pathname !== client_routes.chat) {
                        dispatch({ type: "Add_Msg_Badge", payload: true })
                    }
                    if (toMessageState.id !== obj.sender_id && obj?.type === "regular" && obj.status !== "new") {
                        if (unReadCount.some(i => i.id === obj.sender_id)) {
                            updateUnReadCount(obj.sender_id)
                        } else {
                            addUnReadCount({ id: obj.sender_id, count: 1 })
                        }
                    }
                }
            }
            if (obj.seenType) {
                editMessage(obj)
            }
        }

        socket.on("receive-message", receiveMessageHandler)

        return () => {
            socket.off("receive-message", receiveMessageHandler)
        }
    }, [toMessageState, unReadCount, pathname])

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

    const postSupportMsg = async (id) => {
        const res = await post_support_msg({ user_id: user.id, type_id: id })
        if (res.success) {
            dispatch({ type: "Add_Support_Message", payload: res.data })
        }
    }

    const checkDate = (date) => {
        let date1 = new Date(date);
        let date2 = new Date();
        return date1.getDate() === date2.getDate();
    }

    const checkEndingDate = (date) => {
        let date1 = new Date(date);
        let date2 = new Date();
        let difference = date1 - date2;
        let daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
        if (daysLeft >= 0 && daysLeft < 5) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (!supportChat.length) {
            postSupportMsg(1);
        }
        if (supportChat.length) {
            let messagesId = [];
            let trigger7 = true;
            supportChat.forEach((obj) => {
                if (obj.get_support.id !== 7) {
                    messagesId.push(obj.get_support.id)
                } else if (obj.get_support.id === 7) {
                    trigger7 = false;
                }
            })
            // console.log(messagesId)
            let userIsSubscribed = (user.is_subscribe === 1 && user.is_subscription_stop === 0 && user.is_subscription_cancel === 0);
            if (trigger7 && !userIsSubscribed && user.is_friends?.length) {
                // console.log(7);
                postSupportMsg(7);
            }
            if (!checkDate(supportChat[supportChat.length - 1].created_at)) {
                for (let i = 2; i < 7; i++) {
                    if ((i === 2) && (messagesId.includes(2) === false)) {
                        if (!user.avatar_url) {
                            // console.log(2);
                            postSupportMsg(2);
                            break;
                        }
                    } else if ((i === 3) && (messagesId.includes(3) === false)) {
                        if (!user.bio) {
                            // console.log(3);
                            postSupportMsg(3);
                            break;
                        }
                    } else if ((i === 4) && (messagesId.includes(4) === false)) {
                        if ((user.is_subscribe === 0) || (user.is_subscribe === 1 && user.is_subscription_stop === 1) || (user.is_subscribe === 1 && user.is_subscription_cancel === 1)) {
                            // console.log(4);
                            postSupportMsg(4);
                            break;
                        }
                    } else if ((i === 5) && (messagesId.includes(5) === false)) {
                        if (userIsSubscribed) {
                            // console.log(5);
                            postSupportMsg(5);
                            break;
                        }
                    } else if ((i === 6) && (messagesId.includes(6) === false)) {
                        if (userIsSubscribed) {
                            if (checkEndingDate(user.subscription_end_date)) {
                                // console.log(6);
                                postSupportMsg(6);
                                break;
                            }
                        }
                    }
                }
            }
        }
        // if(supportChat.length) {
        //     if((supportChat[supportChat.length-1].support_id < 2) && (checkDate(supportChat[supportChat.length - 1].created_at) !== true) && (!user.avatar_url)) {
        //         postSupportMsg(2);
        //     } else if((checkDate(supportChat[supportChat.length - 1].created_at) !== true) && (!user.bio)) {
        //         postSupportMsg(3);
        //     }
        // }
    }, [])

    const handleLogout = async () => {
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
        router.push(client_routes.home)
        window.location.reload();
    }

    const handleShowDDChange = (val) => {
        setShowDropdown(val)
    }

    useEffect(() => {
        if (chatList.length && chatList.filter(msg => msg.receiver_id === user.id)?.length) {
            const myUnreadMsgs = chatList.filter(msg => (msg.receiver_id === user.id && msg.status === "sent"))
            if (myUnreadMsgs.length) {
                myUnreadMsgs.forEach(i => {
                    socket.emit("send-message", { ...i, status: "delivered", seenType: true })
                })
                const senderId = Array.from(new Set(myUnreadMsgs.map(i => i.sender_id)))
                senderId.forEach(id => {
                    const msgId = myUnreadMsgs.filter((i) => i.sender_id === id)?.map(j => j.id).toString()
                    read_message_action({ sender_id: id, receiver_id: user.id, status: "delivered", messageId: msgId })
                })
            }
        }
    }, [])

    useEffect(() => {
        addAllMessages(chatList)
        // const myFrnds = user.is_friends
        // if (myFrnds.length) {
        //     myFrnds.forEach(i => {
        //         const stamp = new Date(i.time)
        //         const timeStamp = Date.parse(stamp)
        //         addMessage({ sender_id: user.id, receiver_id: i.user_id, text: "Its a match", type: "regular", milisecondtime: timeStamp, created_at: stamp, updated_at: stamp, status: "new", deleted_at: null, get_all_chat_with_image: "" })
        //     })
        // }
    }, [])

    useEffect(() => {
        const tempArr = []
        const unReadMsgs = chatList.filter(i => (i.receiver_id === user.id && i.status !== "read"))
        unReadMsgs.forEach((i) => {
            const index = tempArr.findIndex(j => j.id === i.sender_id)
            if (index !== -1) {
                tempArr[index].count += 1
            } else {
                tempArr.push({ id: i.sender_id, count: 1 })
            }
        })
        if (tempArr.length) {
            tempArr.forEach(i => {
                addUnReadCount(i)
            })
            dispatch({ type: "Add_Msg_Badge", payload: true })
        }
    }, [])

    useEffect(() => {
        // const unRead = messages.filter(i => (i.receiver_id === user.id && i.status !== "read"))
        if (unReadCount.length) {
            const unReadMsgIds = unReadCount.map(obj => obj.id);
            const unRead = messages.filter(i => (i.receiver_id === user.id && i.status !== "read" && unReadMsgIds.includes(i.sender_id)))
            // console.log("unReadCount ::", unReadCount)
            const senderId = Array.from(new Set(unRead.map(i => i.sender_id)))
            setUnReadMsgs(senderId.length)
        } else {
            setUnReadMsgs(0)
        }
    }, [messages, unReadCount])

    useEffect(() => {
        if (chatList.length) {
            const chatId = Array.from(new Set(chatList.map(chat => chat.sender_id !== user.id ? chat.sender_id : chat.receiver_id)));
            if (chatId.length) {
                chatId.forEach(i => {
                    dispatch({ type: "Add_Profile", payload: { id: i, milisecondtime: '' } })
                })
            }
        }
    }, [])

    // useEffect(() => {
    //     dispatch({ type: "Message_To", payload: "Admin" })
    // }, [pathname])

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
                                    <p className="h-2 w-2 bg-secondary bounce rounded-full absolute top-0 right-0 "></p>
                                }
                            </button>
                            <Link href={client_routes.chat} className="flex transition-all duration-150 hover:scale-110 relative">
                                <Image height={32} width={20} src={messagesIcon} alt="" className="" />
                                {/* {notifyBadgeState.msg &&
                                    <p className="h-2 w-2 bg-secondary bounce rounded-full absolute top-0 -right-1"></p>
                                } */}
                                {
                                    unReadMsg ? <div className='absolute h-4 w-4 pt-[1px] border-[1px] bg-white animate-ping flex justify-center items-center text-[11px] font-medium rounded-full left-[10px] -top-[2px]'>
                                    </div> : ""
                                }
                                {
                                    unReadMsg ? <div className='absolute h-4 w-4 pt-[1px] border-[1px] border-white bg-secondary flex justify-center items-center text-[11px] font-medium rounded-full left-[10px] -top-[2px]'>
                                        {unReadMsg}
                                    </div> : ""
                                }
                            </Link>
                            <Link href={client_routes.search} className="py-[7px] rounded-[5px] h-[32px] flex items-center transition-all duration-150 hover:scale-110">
                                <Image height={18} width={18} src={search} className="" alt="" priority />
                            </Link>
                        </div>
                        <button className="h-8 w-[78px] me-[35px] rounded-[5px] flex items-center justify-center bg-secondary text-[12px] font-semibold leading-[normal] transition-all duration-150 hover:scale-105" onClick={handleLogout}>
                            {allStrings["string_logout"]}
                        </button>
                        {/* <div className='relative inline-flex justify-center items-center'> */}
                        {/* {showDropdown
                                ?
                                : <></>
                            } */}
                        <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "#000000" } }}>
                            <Popover placement="bottomRight" trigger="click" open={showDropdown} onOpenChange={handleShowDDChange} rootClassName='rootHeaderPopOver' content={(
                                <div className='p-2 right-0 bg-black w-max flex flex-col text-[15px]'>
                                    <Link className={`py-2 px-3 hover:bg-secondary text-white hover:text-white ${pathname === client_routes.profile ? "bg-secondary" : ""}`} href={client_routes.profile} onClick={() => setShowDropdown(false)}>
                                        {allStrings["string_profile"]}
                                    </Link>
                                    <hr className='m-0 border-gray-500' />
                                    <Link className={`py-2 px-3 hover:bg-secondary text-white hover:text-white ${pathname === client_routes.verifyIdentity ? "bg-secondary" : ""}`} href={client_routes.verifyIdentity} onClick={() => setShowDropdown(false)}>{allStrings["string_identity_verification"]}</Link>
                                    <hr className='m-0 border-gray-500' />
                                    <Link className={`py-2 px-3 hover:bg-secondary text-white hover:text-white ${pathname === client_routes.contactUs ? "bg-secondary" : ""}`} href={client_routes.contactUs} onClick={() => setShowDropdown(false)}>{allStrings["string_contact_us"]}</Link>
                                    <hr className='m-0 border-gray-500' />
                                    <Link className={`py-2 px-3 hover:bg-secondary text-white hover:text-white ${pathname === client_routes.subscription ? "bg-secondary" : ""}`} href={client_routes.subscription} onClick={() => setShowDropdown(false)}>{allStrings["string_subscription"]}</Link>
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
            <NotificationComaponent open={notificationOpenState} allUsers={allUsers} socket={socket} user={user} allStrings={allStrings} />
            <SideDrawer user={user} allStrings={allStrings} />
        </>
    )
}

export default RootHeader