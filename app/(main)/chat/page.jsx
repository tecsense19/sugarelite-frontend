"use client"

import ChatContent from "@/components/chat/ChatContent"
import ChatList from "@/components/chat/ChatList"
import { useState } from "react"

const Chat = () => {
  const [selectedObj, setSelectedObj] = useState("");
  const [profiles, setProfiles] = useState([])

  return (
    <div className="font-bold h-dvh pt-0 md:pt-[66px] flex text-white">
      <ChatList setSelectedObj={setSelectedObj} setProfiles={setProfiles} profiles={profiles} />
      <ChatContent selectedObj={selectedObj} profiles={profiles} />
    </div>
  )
}

export default Chat