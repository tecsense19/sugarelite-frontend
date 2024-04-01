"use client"
import { ConfigProvider, Popover, notification } from 'antd'
import Image from 'next/image'
import ReportIcon from "/public/assets/chat_report_icon.svg"
import BlockIcon from "/public/assets/chat_block_icon.svg"
import ChatIcon from "../../../public/assets/message.svg"
import LogoutIcon from "../../../public/assets/logout.svg"
import EditIcon from "../../../public/assets/edit.svg"
import searchIcon from "/public/assets/search.svg"
import NotificationIcon from "../../../public/assets/Mask group (1).svg"
import React, { useEffect, useState } from 'react'
// import "../../chat/ChatContent.css"
import { usePathname, useRouter } from 'next/navigation'
import { client_notification, client_routes, server_routes } from '@/app/lib/helpers'
import { block_user_action, logout_user } from '@/app/lib/actions'
import { useStore } from '@/store/store'

const PopOver = ({ children, user, socket }) => {
    const [showOptions, setShowOptions] = useState(false);
    const { state: { userState, notificationOpenState }, dispatch } = useStore()
    const path = usePathname()
    const navigate = useRouter()
    const [api, contextHolder] = notification.useNotification()
    const [isLoading, setisLoading] = useState({ report: false, block: false })

    const handleShowOptionsChange = (val) => {
        setShowOptions(val)
    }

    const blockHandler = async (type) => {
        if (type === "block") {
            const res = await block_user_action({ sender_id: userState?.id, receiver_id: user.id, is_blocked: 1 })
            if (res.success) {
                client_notification(api, 'topRight', "success", res.message, 4)
                navigate.push(client_routes.search)
                socket.emit("user-blocked", res.data)
            }
            setisLoading(prevState => ({ ...prevState, block: false }))
        } else {

        }
    }

    const navs = [
        {
            name: "Chat",
            icon: ChatIcon,
            path: client_routes.chat
        },
        {
            name: "Notifications",
            icon: NotificationIcon,
            path: ""
        },
        {
            name: "Search",
            icon: searchIcon,
            path: client_routes.search
        },
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
            name: "Logout",
            icon: LogoutIcon,
            path: null
        }
    ]

    useEffect(() => {
        window.addEventListener("resize", (() => setShowOptions(false)))
        return window.removeEventListener("resize", (() => setShowOptions(false)))
    }, [])

    const navigateHandler = (nav) => {
        if (nav.path) {
            navigate.push(nav.path)
        } else {
            if (nav.name === "Logout") {
                logout_user()
                navigate.push(client_routes.home)
                dispatch({ type: "Current_User", payload: "" })
                fetch(server_routes.logout, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: userState.id })
                })
            } else {
                if (notificationOpenState) {
                    dispatch({ type: "Close_Notification", payload: false })
                } else {
                    dispatch({ type: "Open_Notification", payload: true })
                }
            }
        }
    }

    return (
        <>
            {contextHolder}
            {
                (path !== client_routes.profile && path !== client_routes.edit_profile && path !== client_routes.chat) ?
                    <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                        <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                            <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                                <button className="bg-[#D97706] w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={() => blockHandler("report")}>
                                    <Image src={ReportIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                    <div className="text-[14px] font-medium leading-[20px]">Rapporter</div>
                                </button>
                                {!isLoading.block ?
                                    <button className="bg-[#EF4444]  w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm"
                                        onClick={() => { blockHandler("block"); setisLoading(prevState => ({ ...prevState, block: true })) }}>
                                        <Image src={BlockIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                        <div className="text-[14px] font-medium leading-[20px]">Blocker</div>
                                    </button> :
                                    <div className="bg-[#EF4444]  w-[125px] h-[32px] flex justify-center items-center gap-x-[10px] rounded-sm">
                                        <span className='loader after:border-[12px] '></span>
                                    </div>
                                }
                            </div>
                        )}>
                            {children}
                        </Popover>
                    </ConfigProvider> :
                    <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                        <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                            <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                                {

                                    navs.map((nav, inx) => (
                                        <button key={inx} className={`bg-primary hover:border-0 hover:bg-secondary hover:text-white text-white/70 border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm ${nav.path === path && "bg-secondary border-none text-white/100"}`} onClick={() => navigateHandler(nav)}>
                                            <Image src={nav.icon} alt="" height={14} width={14} priority className="ms-2 pointer-events-none" />
                                            <div className="text-[14px] font-medium leading-[20px]">{nav.name}</div>
                                        </button>
                                    ))
                                }
                            </div>
                        )}>
                            {children}
                        </Popover>
                    </ConfigProvider>
            }
        </>
    )
}

export default PopOver