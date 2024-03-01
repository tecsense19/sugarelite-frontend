"use client"
import { ConfigProvider, Popover } from 'antd'
import Image from 'next/image'
import ReportIcon from "/public/assets/chat_report_icon.svg"
import BlockIcon from "/public/assets/chat_block_icon.svg"
import ChatIcon from "../../../public/assets/message.svg"
import LogoutIcon from "../../../public/assets/logout.svg"
import EditIcon from "../../../public/assets/edit.svg"
import NotificationIcon from "../../../public/assets/Mask group (1).svg"
import React, { useEffect, useState } from 'react'
import "../../chat/ChatContent.css"
import { usePathname, useRouter } from 'next/navigation'
import { client_routes } from '@/app/lib/helpers'
import { destroyCookie } from "nookies"
import { logout_user } from '@/app/lib/actions'

const PopOver = ({ children }) => {
    const [showOptions, setShowOptions] = useState(false);

    const path = usePathname()
    const navigate = useRouter()

    const handleShowOptionsChange = (val) => {
        setShowOptions(val)
    }

    const warnHandler = (type) => {
        if (type === 'report') {
            console.log("Account reported")
        } else {
            console.log("Account blocked")
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
            }
        }
    }

    return (
        <>
            {
                (path !== client_routes.profile && path !== client_routes.edit_profile) ?
                    <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                        <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                            <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                                <button className="bg-[#D97706] w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={() => warnHandler("report")}>
                                    <Image src={ReportIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                    <div className="text-[14px] font-medium leading-[20px]">Rapporter</div>
                                </button>
                                <button className="bg-[#EF4444]  w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={() => warnHandler("block")}>
                                    <Image src={BlockIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                    <div className="text-[14px] font-medium leading-[20px]">Blocker</div>
                                </button>
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