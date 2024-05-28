import { ConfigProvider, Popover, notification } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import reportIcon from "/public/assets/chat_report_icon.svg";
import blockIcon from "/public/assets/prohibition.svg";
import optionsIcon from "/public/assets/chat_options_icon.svg";
import arrowLeft from "/public/assets/arrow_left.svg";
import Logo from "/public/assets/fire_log.svg"
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { client_notification, client_routes } from "@/app/lib/helpers";
import ReportModal from "@/components/profile/searched_Profile/ReportModal";
import { block_user_action } from "@/app/lib/actions";
import { useSocket } from "@/store/SocketContext";

const ChatHeader = ({ setShowMobileChatContent, setShowMobileProfile, toUser, currentUser, setDrawerOpen, allStrings }) => {

    const { dispatch, state: { onlineUsers, blockedUsersState } } = useStore()
    const { mySocket } = useSocket()

    const [showBlockLoader, setShowBlockLoader] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    const onProfileClick = () => {
        if (window.innerWidth < 1537) {
            setDrawerOpen(true)
            setShowMobileProfile(true)
        } else {
            navigate.push(`${client_routes.profile}/${toUser.id}`)
        }
    }

    const blockHandler = async () => {
        setShowBlockLoader(true)
        const res = await block_user_action({ sender_id: currentUser?.id, receiver_id: toUser.id, is_blocked: 1 })
        if (res.success) {
            client_notification(api, 'topRight', "success", res.message, 4)
            mySocket.emit("user-blocked", res.data)
        }
        setShowBlockLoader(false)
    }

    const handleShowOptionsChange = (val) => {
        setShowOptions(val)
    }

    return (
        <>
            {contextHolder}
            <div className="w-full md:border-b-[1px] border-white/30 px-4 md:px-10 pt-4 pb-1 md:py-5 flex justify-between items-center">
                {
                    toUser !== "Admin" ?
                        <>
                            <button className="flex md:hidden items-center justify-center"
                                onClick={() => {
                                    setShowMobileChatContent(false);
                                    dispatch({ type: "Message_To", payload: "Admin" });
                                }}>
                                <Image src={arrowLeft} alt="" height={24} width={24} priority className="pointer-events-none" />
                            </button>
                            <div className="flex items-center">
                                <button className="flex items-center" onClick={onProfileClick}>
                                    {
                                        toUser.avatar_url ?
                                            <Image src={toUser.avatar_url} alt="" height={60} width={60} priority className="hidden bg-primary-dark min-h-[60px] h-[60px] min-w-[60px] md:flex pointer-events-none rounded-full object-cover" />
                                            : <p className="h-[60px] uppercase w-[60px] hidden md:flex items-center justify-center bg-primary-dark rounded-full text-[24px] ">{toUser.username.charAt(0)}</p>
                                    }

                                    {
                                        toUser.avatar_url ?
                                            <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="md:hidden bg-primary-dark object-cover min-h-[40px] h-[40px] pointer-events-none rounded-full" />
                                            : <p className="h-10 uppercase w-10 md:hidden flex items-center justify-center bg-primary-dark rounded-full text-[22px] ">{toUser.username.charAt(0)}</p>
                                    }
                                    <div className="flex flex-col md:flex-row justify-center items-center ">
                                        <div className="text-[18px] md:text-[22px] capitalize font-medium md:font-semibold leading-[20px] ms-3 md:ms-6">{toUser.username}</div>
                                        <div className="">
                                            {
                                                onlineUsers.some(i => i === toUser.id) && <div className="ms-[10px] flex items-center mt-2 md:mt-0">
                                                    <div className="h-[6px] w-[6px] md:h-[9px] md:w-[9px] bg-[#3DC73A] rounded-full" />
                                                    <div className="ms-[8px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">
                                                        {allStrings["string_active"]}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </button>
                            </div>
                            {
                                !blockedUsersState.some(i => (i.sender_id === toUser.id || i.receiver_id === toUser.id) && i.is_blocked === 1) ?
                                    <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                                        <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                                            <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                                                <button onClick={() => setModalOpen(true)} className="bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                                                    <Image src={reportIcon} alt="" height={14} width={14} priority className="ms-5 " />
                                                    <div className="text-[14px] font-medium leading-[20px]">
                                                        {allStrings["string_report"]}
                                                    </div>
                                                </button>
                                                <button onClick={blockHandler} className={`bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex items-center gap-x-[10px] rounded-sm ${showBlockLoader ? "justify-center pointer-events-none" : "justify-start"}`} >
                                                    {showBlockLoader
                                                        ? <div className="loader after:border-[10px]"></div>
                                                        : <>
                                                            <Image src={blockIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                                            <div className="text-[14px] font-medium leading-[20px]">{allStrings["string_block"]}</div>
                                                        </>
                                                    }
                                                </button>
                                            </div>
                                        )}>
                                            <button className="h-[30px] w-[30px] flex items-center">
                                                <Image src={optionsIcon} alt="" height={30} width={30} priority className="pointer-events-none" />
                                            </button>
                                        </Popover>
                                    </ConfigProvider> : <div></div>
                            }
                            <ReportModal isModalOpen={modalOpen} setIsModalOpen={setModalOpen} toUser={toUser} currentUser={currentUser} allStrings={allStrings} />
                        </> :
                        <>
                            <button className="flex md:hidden items-center justify-center"
                                onClick={() => {
                                    setShowMobileChatContent(false);
                                    dispatch({ type: "Message_To", payload: "Admin" });
                                }}>
                                <Image src={arrowLeft} alt="" height={24} width={24} priority className="pointer-events-none" />
                            </button>
                            <div className="flex items-center">
                                <button className="flex items-center" >
                                    <div className="bg-tinder rounded-full h-[40px] flex min-w-[40px] md:h-[60px] md:min-w-[60px]">
                                        <Image src={Logo} alt="" height={40} width={40} priority className="m-auto object-cover w-[23.5px] h-[27px] md:w-[34px] md:h-[40px] pointer-events-none rounded-full" />
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-center items-center ">
                                        <div className="text-[18px] md:text-[22px] capitalize font-medium md:font-semibold leading-[20px] ms-3 md:ms-6">
                                            {allStrings["string_team_elite"]}
                                        </div>
                                        <div className="">
                                            <div className="ms-[10px] flex items-center mt-2 md:mt-0">
                                                <div className="h-[6px] w-[6px] md:h-[9px] md:w-[9px] bg-[#3DC73A] rounded-full" />
                                                <div className="ms-[8px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">{allStrings["string_active"]}</div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div></div>
                        </>
                }
            </div>
        </>
    )
}

export default ChatHeader