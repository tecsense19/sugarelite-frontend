"use client"

import Image from "next/image"
import ReportIcon from "/public/assets/chat_report_icon.svg"
import BlockIcon from "/public/assets/chat_block_icon.svg"
import { useEffect, useState } from "react"
import 'aos/dist/aos.css';
import Side from "./side"
import Main from "./Main"
import { io } from "socket.io-client"
import { client_notification, client_routes, socket_server } from "@/app/lib/helpers"
import { block_user_action } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import { notification } from "antd"
import { useStore } from "@/store/store"
import Aos from "aos"

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(socket_server);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};


const SearchProfileIndex = ({ queried_user, currentUser, pendingList }) => {

    const socket = useSocket()
    const accessList = queried_user.allow_privateImage_access_users
    const [privateAlbumState, setPrivateAlbumState] = useState(null)
    const navigate = useRouter()
    const [api, contextHolder] = notification.useNotification()

    const { state: { decisionState } } = useStore()


    useEffect(() => {
        const isAccessed = accessList.some((i) => i.user_id === currentUser.id)
        const isPending = pendingList.some((i) => i.sender_id === currentUser.id)
        if (isAccessed) {
            setPrivateAlbumState("accept")
        }
        if (isPending) {
            setPrivateAlbumState("pending")
        }
    }, [accessList, pendingList])

    useEffect(() => {
        if (decisionState.length) {
            decisionState.forEach((i) => {
                const { data, status } = i
                if (data.sender_id === currentUser.id && data.receiver_id === queried_user.id) {
                    if (status === "pending") {
                        setPrivateAlbumState("pending")
                    }
                    else if (status === "accept") {
                        setPrivateAlbumState("accept")
                    } else {
                        setPrivateAlbumState(null)
                    }
                }
            })
        }
    }, [decisionState])

    const blockHandler = async (type) => {
        if (type === "block") {
            const res = await block_user_action({ sender_id: currentUser.id, receiver_id: queried_user.id, is_blocked: 1 })
            if (res.success) {
                client_notification(api, "topRight", "success", res.message, 4)
                socket.emit("user-blocked", res.data)
                navigate.push(client_routes.profile)
            }
        }
    }

    useEffect(() => {
        Aos.init()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full relative">
            {contextHolder}
            <Side currentUser={currentUser} user={queried_user} privateAlbumState={privateAlbumState} socket={socket} />
            <Main currentUser={currentUser} user={queried_user} privateAlbumState={privateAlbumState} socket={socket} />

            {/* report and block functionality */}

            {/* 2xl size */}
            <div className="absolute hidden 2xl:block  2xl:w-[169px] 2xl:max-w-[169px] right-[2%] 2xl:right-[4%] top-[108px] ">
                <button className="w-full h-[38px] 2xl:h-[42px] bg-[#D97706] rounded-[5px] mb-2 2xl:mb-4 flex justify-start items-center px-[19px]" onClick={() => blockHandler("report")}>
                    <Image src={ReportIcon} alt="report" width={18} height={18} />
                    <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">RAPPORTER</span>
                </button>
                <button className="w-full h-[38px] 2xl:h-[42px] bg-danger rounded-[5px] flex justify-start items-center px-[19px]" onClick={() => blockHandler("block")}>
                    <Image src={BlockIcon} alt="block" width={18} height={18} />
                    <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">BLOCKER</span>
                </button>
            </div>

        </main>
    )
}

export default SearchProfileIndex