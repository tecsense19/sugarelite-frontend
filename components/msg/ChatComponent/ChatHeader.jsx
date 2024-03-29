import { ConfigProvider, Popover } from "antd";
import { useState } from "react";
import Image from "next/image";
import reportIcon from "/public/assets/chat_report_icon.svg";
import blockIcon from "/public/assets/chat_block_icon.svg";
import optionsIcon from "/public/assets/chat_options_icon.svg";
import arrowLeft from "/public/assets/arrow_left.svg";
import { useRouter } from "next/navigation";
import { client_routes } from "@/app/lib/helpers";

const ChatHeader = ({ setDrawerOpen, toUser, setShowMobileChatContent, setShowMobileProfile, setToUser }) => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useRouter()

    const handleShowOptionsChange = (val) => {
        setShowOptions(val)
    }

    const onProfileClick = () => {
        if (window.innerWidth < 1537) {
            setDrawerOpen(true)
            setShowMobileProfile(true)
        } else {
            navigate.push(`${client_routes.profile}/${toUser.id}`)
        }
    }

    return (
        <>
            <div className="w-full  md:border-b-[1px] border-white/30 px-4 md:px-10 pt-4 pb-1 md:py-5 flex justify-between items-center">
                <button className="flex md:hidden items-center justify-center" onClick={() => { setShowMobileChatContent(false); setToUser('') }}>
                    <Image src={arrowLeft} alt="" height={24} width={24} priority className="pointer-events-none" />
                </button>
                <div className="flex items-center">
                    <button className="flex items-center" onClick={onProfileClick}>
                        {
                            toUser.avatar_url ?
                                <Image src={toUser.avatar_url} alt="" height={60} width={60} priority className="hidden min-h-[60px] h-[60px] min-w-[60px] md:flex pointer-events-none rounded-full object-cover" />
                                : <p className="h-[60px] uppercase w-[60px] hidden md:flex items-center justify-center bg-primary-dark rounded-full text-[24px] ">{toUser.username.charAt(0)}</p>
                        }

                        {
                            toUser.avatar_url ?
                                <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="md:hidden object-cover min-h-[40px] h-[40px] pointer-events-none rounded-full" />
                                : <p className="h-10 uppercase w-10 md:hidden flex items-center justify-center bg-primary-dark rounded-full text-[22px] ">{toUser.username.charAt(0)}</p>
                        }


                        <div className="flex flex-col md:flex-row justify-center items-center ">
                            <div className="text-[18px] md:text-[22px] capitalize font-medium md:font-semibold leading-[20px] ms-3 md:ms-6">{toUser.username}</div>
                            <div className="">
                                {
                                    toUser.online === 1 && <div className="ms-[10px] flex items-center mt-2 md:mt-0">
                                        <div className="h-[6px] w-[6px] md:h-[9px] md:w-[9px] bg-[#3DC73A] rounded-full" />
                                        <div className="ms-[8px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">Active</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </button>
                </div>
                <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                    <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                        <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                            {/* <button className="bg-secondary w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                                <Image src={starIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                <div className="text-[14px] font-medium leading-[20px]">Favorites</div>
                            </button> */}
                            <button className="bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                                <Image src={reportIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                <div className="text-[14px] font-medium leading-[20px]">Rapporter</div>
                            </button>
                            <button className="bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
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