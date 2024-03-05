import { ConfigProvider, Popover } from "antd";
import { useState } from "react";
import Image from "next/image";
import Img1 from "/public/assets/profile_img_1.png";
import starIcon from "../../public/assets/chat_option_star_icon.svg";
import reportIcon from "../../public/assets/chat_report_icon.svg";
import blockIcon from "../../public/assets/chat_block_icon.svg";
import optionsIcon from "../../public/assets/chat_options_icon.svg";
import arrowLeft from "../../public/assets/arrow_left.svg";

const ChatSectionHeader = ({ setDrawerOpen, selectedObj, setShowMobileChatContent, setShowMobileProfile }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptionsChange = (val) => {
    setShowOptions(val)
  }

  const onProfileClick = () => {
    setDrawerOpen(true)
    setShowMobileProfile(true)
  }

  return (
    <>
      <div className="w-full md:border-b-[1px] border-white/30 px-4 md:px-10 pt-4 pb-1 md:py-5 flex justify-between items-center">
        <button className="flex md:hidden items-center justify-center" onClick={() => setShowMobileChatContent(false)}>
          <Image src={arrowLeft} alt="" height={24} width={24} priority className="pointer-events-none" />
        </button>
        <div className="flex items-center">
          <button className="flex items-center 2xl:pointer-events-none" onClick={onProfileClick}>
            <Image src={Img1} alt="" height={60} width={60} priority className="hidden md:flex pointer-events-none rounded-full" />
            <Image src={Img1} alt="" height={40} width={40} priority className="md:hidden pointer-events-none rounded-full" />
            <div className="flex flex-col md:flex-row">
              <div className="text-[18px] md:text-[22px] capitalize font-medium md:font-semibold leading-[20px] ms-3 md:ms-6">{selectedObj.username}</div>
              <div className="mt-2 md:mt-0">
                {selectedObj.online
                  ? <div className="ms-[10px] flex items-center">
                    <div className="h-[6px] w-[6px] md:h-[9px] md:w-[9px] bg-[#3DC73A] rounded-full" />
                    <div className="ms-[8px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">Active</div>
                  </div>
                  : <>
                    {selectedObj.last_activity_at === "near"
                      ? <div className="ms-[10px] flex items-center">
                        <div className="h-[9px] w-[9px] bg-[#FEBF0F] rounded-full" />
                        <div className="ms-[8px] md:ms-[10px] text-white/50 text-[12px] md:text-[14px] font-medium leading-[12px] md:leading-[20px]">5 mins ago</div>
                      </div>
                      : <></>
                    }
                  </>
                }
              </div>
            </div>
          </button>
        </div>
        <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
          <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
            <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
              <button className="bg-secondary w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                <Image src={starIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                <div className="text-[14px] font-medium leading-[20px]">Favorites</div>
              </button>
              <button className="bg-primary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                <Image src={reportIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                <div className="text-[14px] font-medium leading-[20px]">Rapporter</div>
              </button>
              <button className="bg-primary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
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

export default ChatSectionHeader