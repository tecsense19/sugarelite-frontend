import { ConfigProvider, Popover, notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import reportIcon from "/public/assets/chat_report_icon.svg";
import blockIcon from "/public/assets/chat_block_icon.svg";
import optionsIcon from "/public/assets/chat_options_icon.svg";
import arrowLeft from "/public/assets/arrow_left.svg";
import { useRouter } from "next/navigation";
import { client_routes } from "@/app/lib/helpers";
import { block_user_action } from "@/app/lib/actions";
import UserAvatar from "./UserAvatar";
import { useChat } from "@/store/ChatContext";
import { useSocket } from "@/store/SocketContext";

const ChatHeader = ({ setDrawerOpen, toUser, setShowMobileChatContent, setShowMobileProfile, currentUser, setToUser }) => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const [api, contextHolder] = notification.useNotification()
    const { state: { onlineUsers } } = useChat();
    const { mySocket } = useSocket()

    const handleShowOptionsChange = (val) => {
        setShowOptions(val)
    }

    useEffect(() => {
        console.log(onlineUsers)
    }, [onlineUsers])

    const onProfileClick = () => {
        if (window.innerWidth < 1537) {
            setDrawerOpen(true)
            setShowMobileProfile(true)
        } else {
            navigate.push(`${client_routes.profile}/${toUser.id}`)
        }
    }

    const blockHandler = async () => {
        const res = await block_user_action({ sender_id: currentUser?.id, receiver_id: toUser.id, is_blocked: 1 })
        if (res.success) {
            mySocket.emit("user-blocked", res.data)
        }
    }

    const lastSeenStatus = (lastActivity) => {
        if (onlineUsers.some(i => (i.userId === toUser.id && i.status === "online"))) {
            return (
                <div className="flex items-center md:mt-0">
                    <div className="h-[6px] w-[6px] md:h-[9px] md:w-[9px] bg-[#3DC73A] rounded-full" />
                    <div className="ms-[8px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">Active</div>
                </div>
            )
        } else {
            const activityTime = Date.parse(lastActivity);
            const currentTime = new Date();
            const timeDifference = currentTime - activityTime;
            console.log(lastActivity)
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));
            if (minutesDifference < 60) {
                return <div className=" flex items-center">
                    <div className="ms-[2px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">
                        {`last activity at ${minutesDifference} min ago`}
                    </div>
                </div>
            }
            return <div className=" flex items-center">
                <div className="ms-[2px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">Offline</div>
            </div>
        }
    }

    return (
        <>
            {contextHolder}
            <div className="w-full  md:border-b-[1px] border-white/30 px-4 md:px-10 pt-4 pb-1 md:py-5 flex justify-between items-center">
                <button className="flex md:hidden items-center justify-center" onClick={() => {
                    setShowMobileChatContent(false);
                    mySocket.emit('endChat', { senderId: currentUser.id, receiverId: toUser.id })
                }}>
                    <Image src={arrowLeft} alt="" height={24} width={24} priority className="pointer-events-none" />
                </button>
                <div className="flex items-center">
                    <button className="flex items-center" onClick={onProfileClick}>

                        <UserAvatar avatarUrl={toUser.avatar_url} username={toUser.username} />

                        <div className="flex flex-col justify-center items-start ">
                            <div className="text-[18px] md:text-[22px] capitalize font-medium md:font-semibold leading-[20px] ms-3 md:ms-6">{toUser.username}</div>
                            <div className="mt-2 ms-3 md:ms-3 ">
                                {
                                    (!onlineUsers.length || onlineUsers.some(i => (i.userId !== toUser.id))) ?
                                        <div className=" flex items-center">
                                            <div className="ms-[2px] md:ms-[13px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">Offline</div>
                                        </div> : <>
                                            {lastSeenStatus(onlineUsers.find(i => (i.userId === toUser.id))?.lastActivity)}
                                        </>

                                }
                            </div>
                        </div>
                    </button>
                </div>
                <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                    <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                        <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                            <button onClick={() => setModalOpen(true)} className="bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                                <Image src={reportIcon} alt="" height={14} width={14} priority className="ms-5 " />
                                <div className="text-[14px] font-medium leading-[20px]">Rapporter</div>
                            </button>
                            <button onClick={blockHandler} className="bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" >
                                <Image src={blockIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                <div className="text-[14px] font-medium leading-[20px]">Blocker</div>
                            </button>
                        </div>
                    )}>
                        <button className="h-[30px] w-[30px] flex items-center">
                            <Image src={optionsIcon} alt="" height={30} width={30} priority className="pointer-events-none" />
                        </button>
                    </Popover>
                </ConfigProvider>
            </div>
        </>
    )
}




export default ChatHeader