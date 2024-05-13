"use client"

import React, { useEffect, useState } from 'react';
import ChatSection from './ChatSection/ChatSection';
import { useChat } from '@/store/ChatContext';
import SideProfiles from './profiles/SideProfiles';
import { useStore } from '@/store/store';
import { read_message_action } from '@/app/lib/actions';
import { useSocket } from '@/store/SocketContext';

const ChatIndex = ({ allUsers, user, chatList }) => {

    const { state } = useChat()
    const { state: { readMsgsState, chatPartnerList }, dispatch } = useStore()
    const { mySocket } = useSocket()

    const [toUser, setToUser] = useState(null)
    const [messages, setMessages] = useState(chatList)
    const [unReadCount, setUnReadCount] = useState([])
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const [sendingImages, setSendingImages] = useState([])


    useEffect(() => {
        if (window.innerWidth <= 768 && toUser) {
            setShowMobileChatContent(true)
        }
    }, [toUser])

    useEffect(() => {
        console.log(chatPartnerList)
    }, [chatPartnerList])

    useEffect(() => {
        const newMessages = state.messages.filter(msg => !messages.some(existingMsg => existingMsg.id === msg.id));
        setMessages(prev => [...prev, ...newMessages])
    }, [state])

    useEffect(() => {
        if (messages.length) {
            let tempArr = []
            const myUnreadMsgs = messages.filter(i => (i.receiver_id === user.id && i.status !== "read"))
            myUnreadMsgs.forEach((i) => {
                const index = tempArr.findIndex(j => j.id === i.sender_id)
                if (index !== -1) {
                    tempArr[index].count += 1
                } else {
                    tempArr.push({ id: i.sender_id, count: 1 })
                }
            })
            setUnReadCount(tempArr)
        }
    }, [messages])

    useEffect(() => {
        if (toUser) {
            // mySocket.emit('startChat', { senderId: user.id, receiverId: toUser.id })
            setUnReadCount((prev) => {
                const updatedUnreadMsgs = [...prev];
                const existingIndex = updatedUnreadMsgs.filter(item => item.id !== toUser.id);
                return existingIndex
            })
            const msgs = chatList.filter(msg => msg.receiver_id === user.id && msg.status !== "read" && msg.status !== null)?.map(i => i.id)
            if (msgs.length && !readMsgsState.some(i => i === msgs[msgs.length - 1])) {
                read_message_action({ sender_id: toUser.id, receiver_id: user.id, status: "read", messageId: msgs.toString() })
                dispatch({ type: "Add_Read_Message", payload: msgs[msgs.length - 1] })
            }
        }
    }, [toUser])

    return (
        <>
            {/* web view */}
            <section className="font-bold hidden h-dvh pt-0 md:pt-[66px] text-white md:flex bg-primary overflow-hidden">
                <div className='w-full md:w-[350px] lg:w-[400px] bg-primary-dark-3 h-full py-[14px] md:py-[30px]'>
                    <SideProfiles messages={messages} user={user} allUsers={allUsers} setToUser={setToUser} unReadCount={unReadCount} setShowMobileChatContent={setShowMobileChatContent} />
                </div>
                <div className='flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col '>
                    {
                        toUser ?
                            <ChatSection setToUser={setToUser} toUser={toUser} chatList={messages} user={user} sendingImages={sendingImages} setSendingImages={setSendingImages} /> :
                            <div className='flex h-full w-full font-normal'>
                                <p className='m-auto'>Select user to chat</p>
                            </div>
                    }
                </div>
            </section>

            {/* Mobile view */}
            <div className="font-bold md:hidden w-full h-dvh pt-0 md:pt-[66px] text-white flex bg-primary overflow-hidden">
                <div className={`w-full bg-primary-dark-3 h-full py-[14px] md:py-[30px] transition-transform ease-linear duration-300 ${showMobileChatContent ? "-translate-x-full" : "translate-x-0"}`}>
                    <SideProfiles messages={messages} user={user} allUsers={allUsers} setToUser={setToUser} unReadCount={unReadCount} setShowMobileChatContent={setShowMobileChatContent} />
                </div>
                <div className={`flex min-w-[100vw] transition-transform ease-linear duration-300 h-full flex-col ${showMobileChatContent ? "-translate-x-full" : ""}`}>
                    {
                        toUser ?
                            <ChatSection setToUser={setToUser} toUser={toUser} chatList={messages} user={user} setShowMobileChatContent={setShowMobileChatContent} sendingImages={sendingImages} setSendingImages={setSendingImages} /> :
                            <div className='flex h-full w-full font-normal'>
                                <p className='m-auto'>Select user to chat</p>
                            </div>
                    }
                </div>
            </div>
        </>


    );
};

export default ChatIndex;
