"use client"

import ChatContent from "@/components/chat/ChatContent"
import ChatList from "@/components/chat/ChatList"
import { useState } from "react"

const Chat = () => {
  const [selectedObj, setSelectedObj] = useState("");

  return (
    <div className="font-bold h-dvh pt-0 md:pt-[66px] flex text-white">
      <ChatList setSelectedObj={setSelectedObj} />
      <ChatContent selectedObj={selectedObj} />
    </div>
  )
}

export default Chat