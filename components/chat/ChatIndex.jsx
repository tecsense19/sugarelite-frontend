"use client"

import ChatContent from "@/components/chat/ChatContent"
import ChatList from "@/components/chat/ChatList"
import { useState } from "react"

const ChatIndex = ({ users, currentUser, chatList }) => {

    const [selectedObj, setSelectedObj] = useState("");
    const [profiles, setProfiles] = useState(users);
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);

    const messages = chatList.filter(
        message =>
            (message.message_from === currentUser.id && message.message_to === selectedObj.id) ||
            (message.message_from === selectedObj.id && message.message_to === currentUser.id)
    );

    return (
        <>
            <div className="font-bold h-dvh pt-0 md:pt-[66px] text-white hidden md:flex">
                <ChatList setSelectedObj={setSelectedObj} setProfiles={setProfiles} profiles={profiles} setShowMobileChatContent={setShowMobileChatContent} messages={messages && messages} />
                <ChatContent selectedObj={selectedObj} profiles={profiles} currentUser={currentUser} messages={messages && messages} />
            </div>
            <div className="font-bold h-dvh pt-0 md:pt-[66px] text-white md:hidden flex">
                {showMobileChatContent
                    ? <ChatContent selectedObj={selectedObj} profiles={profiles} currentUser={currentUser} messages={messages && messages} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} />
                    : <ChatList setSelectedObj={setSelectedObj} setProfiles={setProfiles} messages={messages && messages} profiles={profiles} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} />
                }
            </div>
        </>
    )
}

export default ChatIndex