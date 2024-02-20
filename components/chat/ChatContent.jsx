"use client"

import "./ChatContent.css";
import ChatSection from "./ChatSection";

const ChatContent = ({ selectedObj, profiles }) => {

  return (
    <div className="hidden md:flex md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col">
      {selectedObj
        ? <>
          <ChatSection selectedObj={selectedObj} profiles={profiles} />
        </>
        : <div className="flex justify-center items-center w-full h-full" data-aos="fade-left" data-aos-duration="800">
          <div className="text-[22px]">Please click on a profile to chat</div>
        </div>
      }
    </div>
  )
}

export default ChatContent