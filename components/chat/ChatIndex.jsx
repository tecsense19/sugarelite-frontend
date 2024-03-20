"use client"

import ChatContent from "@/components/chat/ChatContent"
import ChatList from "@/components/chat/ChatList"
import { useStore } from "@/store/store"
import { use, useEffect, useState } from "react"
import NoChatFound from "./NoChatFound"
import { client_notification, socket_server } from "@/app/lib/helpers"
import { io } from "socket.io-client"
import { notification } from "antd"


let socket;

const ChatIndex = ({ users, decryptedUser, chatList, tempList }) => {

    const { state: { userState } } = useStore()

    const [currentUser, setCurrentUser] = useState(userState ? userState : decryptedUser)

    useEffect(() => {
        setCurrentUser(userState ? userState : decryptedUser)
    }, [userState])

    const [profiles, setProfiles] = useState(users);
    const [selectedObj, setSelectedObj] = useState("");
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const [api, contextHolder] = notification.useNotification()

    const { state: { toMessageState } } = useStore()
    const [list, setList] = useState([])

    useEffect(() => {
        if (toMessageState.length) {
            const temp = [...list];
            toMessageState.forEach(element => {

                temp.unshift({ user: element, latestMsg: {} });

            });

            setList(temp);
            setSelectedObj(temp[0].user)
        }
    }, [toMessageState])

    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages(chatList.filter(
            message =>
                (message.sender_id === currentUser.id && message.receiver_id === selectedObj.id) ||
                (message.sender_id === selectedObj.id && message.receiver_id === currentUser.id)
        ))
    }, [selectedObj])

    useEffect(() => {
        socket = io(socket_server)

        socket.on("receive-message", async (data) => {
            if (data.sender_id === currentUser.id) {
                setMessages((pre) => [...pre, data]);
            }
            if ((data.receiver_id === currentUser.id)) {
                if (data.sender_id === selectedObj.id) {
                    setMessages((pre) => [...pre, data]);
                }
            }
        });

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [selectedObj])

    if ((profiles.length || list.length)) {
        return (
            <>
                {contextHolder}
                <div className="font-bold h-dvh pt-0 md:pt-[66px] text-white hidden md:flex">
                    <ChatList setSelectedObj={setSelectedObj} selectedObj={selectedObj} currentUser={currentUser} setProfiles={setProfiles} profiles={profiles} setShowMobileChatContent={setShowMobileChatContent} socket={socket} chatList={tempList.length ? tempList : list} />
                    <ChatContent selectedObj={selectedObj} setSelectedObj={setSelectedObj} profiles={profiles} currentUser={currentUser} messages={messages && messages} chatList={chatList} />
                </div>
                <div className="font-bold h-dvh pt-0 md:pt-[66px] text-white md:hidden flex">
                    {showMobileChatContent
                        ? <ChatContent selectedObj={selectedObj} profiles={profiles} currentUser={currentUser} messages={messages && messages} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} setSelectedObj={setSelectedObj} chatList={chatList} />
                        : <ChatList setSelectedObj={setSelectedObj} selectedObj={selectedObj} setProfiles={setProfiles} chatList={tempList.length ? tempList : list} profiles={profiles} showMobileChatContent={showMobileChatContent} socket={socket} setShowMobileChatContent={setShowMobileChatContent} currentUser={currentUser} />
                    }
                </div>
            </>
        )
    } else {
        return <NoChatFound />
    }
}

export default ChatIndex