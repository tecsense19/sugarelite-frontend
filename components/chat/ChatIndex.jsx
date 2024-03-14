"use client"

import ChatContent from "@/components/chat/ChatContent"
import ChatList from "@/components/chat/ChatList"
import { useStore } from "@/store/store"
import { useEffect, useState } from "react"

const ChatIndex = ({ users, decryptedUser, chatList }) => {

    const { state: { userState } } = useStore()

    const [currentUser, setCurrentUser] = useState(userState ? userState : decryptedUser)

    useEffect(() => {
        setCurrentUser(userState ? userState : decryptedUser)
    }, [userState])

    const [profiles, setProfiles] = useState(users);
    const [selectedObj, setSelectedObj] = useState("");
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const { state: { toMessageState } } = useStore()

    useEffect(() => {
        if (toMessageState.length) {
            const list = [...profiles]
            toMessageState.forEach(element => {
                const array = list.filter((i) => i.id === element.id)
                if (!array.length) {
                    list.unshift(element)
                }
            });
            setProfiles(list)
            setSelectedObj(list[0])
        }
    }, [toMessageState])

    const messages = chatList.filter(
        message =>
            (message.sender_id === currentUser.id && message.receiver_id === selectedObj.id) ||
            (message.sender_id === selectedObj.id && message.receiver_id === currentUser.id)
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