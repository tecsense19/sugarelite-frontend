"use client"
import { useEffect, useState } from "react";
import "./ChatContent.css";
import ChatSection from "./ChatSection";

const ChatContent = ({ selectedObj, profiles, showMobileChatContent, setShowMobileChatContent, currentUser, messages, chatList, setSelectedObj }) => {

  const [chats, setChats] = useState(messages)
  const [isAllowed, setIsAllowed] = useState(true)

  useEffect(() => {
    setChats(messages)
  }, [messages])

  useEffect(() => {
    if (chats) {
      const myChats = chatList.filter((chat) => chat.sender_id === currentUser.id);
      const today = new Date().toLocaleDateString();
      const todayChats = myChats.filter((chat) => {
        const chatDate = new Date(chat.updated_at).toLocaleDateString();
        return chatDate === today;
      });
      if (currentUser.is_subscribe) {
        setIsAllowed(true);
      } else if (todayChats.length === 3) {
        setIsAllowed(false);
      }
    }
  }, [chats, currentUser.is_subscribe]);

  console.log(chats)

  return (
    <div className="flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col">
      {selectedObj
        ? <ChatSection selectedObj={selectedObj} setSelectedObj={setSelectedObj} profiles={profiles} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} currentUser={currentUser} chat={chats} isAllowed={isAllowed} />
        : <div className="flex justify-center items-center w-full h-full" data-aos="fade-left" data-aos-duration="800">
          <div className="text-[22px]">Please click on a profile to chat</div>
        </div>
      }
    </div>
  )
}

export default ChatContent