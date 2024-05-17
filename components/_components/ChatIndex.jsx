"use client"
import React, { useEffect, useState } from 'react'

import { useStore } from '@/store/store';
import { useChat } from '@/store/ChatContext';
import { read_message_action } from '@/app/lib/actions';
import ProfileSection from './Profiles/ProfileSection';
import ChatSection from './ChatBody/ChatSection';

const ChatIndex = ({ allUsers, chatList, user, supportChat }) => {

    const { state: { toMessageState, readMsgsState, chatPartnerList }, dispatch } = useStore()
    const { state } = useChat()

    const [messages, setMessages] = useState(chatList)
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const [sendingImages, setSendingImages] = useState([])

    useEffect(() => {
        const newMessages = state.messages.filter(msg => !messages.some(existingMsg => (existingMsg.id === msg.id)));
        if (newMessages.length) {
            setMessages(prev => [...prev, ...newMessages])
        }
        else {
            const updatedMessages = messages.map(msg => {
                const updatedMsg = state.messages.find(newMsg => newMsg.id === msg.id);
                return updatedMsg ? updatedMsg : msg;
            });
            setMessages(updatedMessages);
        }
    }, [state.messages])

    useEffect(() => {
        if (toMessageState !== "Admin") {
            const msgs = messages.filter(msg => msg.receiver_id === user.id && msg.status !== "read")?.map(i => i.id)
            if (msgs.length && !readMsgsState.some(i => i === msgs[msgs.length - 1])) {
                read_message_action({ sender_id: toMessageState.id, receiver_id: user.id, status: "read", messageId: msgs.toString() })
                dispatch({ type: "Add_Read_Message", payload: msgs[msgs.length - 1] })
            }
        }
    }, [toMessageState])

    useEffect(() => {
        dispatch({ type: "Add_Msg_Badge", payload: false })
    }, [])

    return (
        <>
            {/* Web View */}
            <section className='hidden h-dvh pt-0 md:pt-[66px] text-white md:flex bg-primary overflow-hidden'>
                <div className='w-full md:w-[350px] lg:w-[400px] bg-primary-dark-3 h-full py-[14px] md:py-[30px]'>
                    <ProfileSection messages={messages} allUsers={allUsers} user={user} setShowMobileChatContent={setShowMobileChatContent} supportChat={supportChat} />
                </div>
                <div className='flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col '>
                    <ChatSection toUser={toMessageState} user={user} messages={messages} setShowMobileChatContent={setShowMobileChatContent} supportChat={supportChat} setMessages={setMessages} sendingImages={sendingImages} setSendingImages={setSendingImages} />
                </div>
            </section>

            {/* Mobile View */}
            <section className='md:hidden w-full h-dvh pt-0 md:pt-[66px] text-white flex bg-primary overflow-hidden relative'>
                <div className={`w-full bg-primary-dark-3 h-full md:py-[30px] transition-transform ease-linear duration-300 absolute overflow-hidden
                ${showMobileChatContent ? "-translate-x-full" : "translate-x-0 "}`}>
                    <ProfileSection messages={messages} allUsers={allUsers} user={user} setShowMobileChatContent={setShowMobileChatContent} supportChat={supportChat} />
                </div>
                <div className={`flex w-full transition-transform ease-linear duration-300 absolute h-full flex-col ${showMobileChatContent ? "translate-x-0" : "translate-x-full"}`}>
                    <ChatSection toUser={toMessageState} user={user} messages={messages} setShowMobileChatContent={setShowMobileChatContent} supportChat={supportChat} setMessages={setMessages} sendingImages={sendingImages} setSendingImages={setSendingImages} />
                </div>
            </section>
        </>
    )
}

export default ChatIndex