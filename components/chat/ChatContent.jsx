"use client"

import "./ChatContent.css";
import ChatSection from "./ChatSection";

const ChatContent = ({ selectedObj, profiles }) => {

  return (
    <div className="w-[calc(100%-400px)] h-full flex flex-col">
      {selectedObj
        ? <>
          <ChatSection selectedObj={selectedObj} profiles={profiles} />
        </>
        : <div className="flex justify-center items-center w-full h-full">
          <div className="text-[22px]">Please click on a profile to chat</div>
        </div>
      }
    </div>
  )
}

export default ChatContent