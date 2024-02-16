"use client"

import Image from "next/image";
import "./ChatContent.css";
import optionsIcon from "../../public/assets/chat_options_icon.svg";
import { ConfigProvider, Popover } from "antd";
import { useState } from "react";
import Img1 from "../../public/assets/profile_img_1.png";
import starIcon from "../../public/assets/chat_option_star_icon.svg";
import reportIcon from "../../public/assets/chat_report_icon.svg";
import blockIcon from "../../public/assets/chat_block_icon.svg";

export default ({ selectedObj }) => {
  // const timeBefore30Mins = new Date().setMinutes(new Date().getMinutes() - 30);
  // const selectedObj = { id: 1, img_url: Img1, name: "Kinjal", time: timeBefore30Mins, online: true, last_activity: "", unread_count: 3, last_msg: "How are you john?" };
  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptionsChange = (val) => {
    setShowOptions(val)
  }

  return (
    <div className="w-[calc(100%-400px)] h-full flex flex-col">
      {selectedObj
        ? <>
          <div className="w-full border-b-[1px] border-white/30 px-10 py-5 flex justify-between items-center">
            <div className="flex items-center">
              <Image src={selectedObj.img_url.src} alt="" height={60} width={60} priority className="pointer-events-none rounded-full" />
              <div className="text-[22px] font-semibold leading-[20px] ms-6">{selectedObj.name}</div>
              {selectedObj.online
                ? <div className="ms-[10px] flex items-center">
                  <div className="h-[9px] w-[9px] bg-[#3DC73A] rounded-full" />
                  <div className="ms-[10px] text-white/50 text-[14px] font-medium leading-[20px]">Active</div>
                </div>
                : <>
                  {selectedObj.last_activity === "near"
                    ? <div className="ms-[10px] flex items-center">
                      <div className="h-[9px] w-[9px] bg-[#FEBF0F] rounded-full" />
                      <div className="ms-[10px] text-white/50 text-[14px] font-medium leading-[20px]">5 mins ago</div>
                    </div>
                    : <></>
                  }
                </>
              }
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
                  <Image src={optionsIcon} alt="" height={30} width={30} priority className="pointer-events-none rounded-full" />
                </button>
              </Popover>
            </ConfigProvider>
          </div>
        </>
        : <div className="flex justify-center items-center w-full h-full">
          <div className="text-[22px]">Please click on a profile to chat</div>
        </div>
      }
    </div>
  )
}