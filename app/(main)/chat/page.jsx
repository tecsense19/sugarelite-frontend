"use client"

import ChatContent from "@/components/chat/ChatContent"
import ChatList from "@/components/chat/ChatList"
import { useState } from "react"

const Chat = () => {
  const [selectedObj, setSelectedObj] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [showMobileChatContent, setShowMobileChatContent] = useState(false);

  return (
    <>
      <div className="font-bold h-dvh pt-0 md:pt-[66px] text-white hidden md:flex">
        <ChatList setSelectedObj={setSelectedObj} setProfiles={setProfiles} profiles={profiles} setShowMobileChatContent={setShowMobileChatContent} />
        <ChatContent selectedObj={selectedObj} profiles={profiles} />
      </div>
      <div className="font-bold h-dvh pt-0 md:pt-[66px] text-white md:hidden flex">
        {showMobileChatContent
          ? <ChatContent selectedObj={selectedObj} profiles={profiles} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} />
          : <ChatList setSelectedObj={setSelectedObj} setProfiles={setProfiles} profiles={profiles} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} />
        }
      </div>
    </>
  )
}

export default Chat