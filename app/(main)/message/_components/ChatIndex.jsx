"use client"
import React, { useEffect, useState } from 'react'
import ProfileSection from './Profiles/ProfileSection';
import ChatSection from './ChatBody/ChatSection';
import { useStore } from '@/store/store';

const ChatIndex = ({ allUsers, chatList, user, supportChat }) => {

    const { state: { toMessageState } } = useStore()

    const [messages, setMessages] = useState(chatList)
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);

    useEffect(() => {
        console.log(toMessageState)
    }, [toMessageState])

    return (
        <>
            {/* Web View */}
            <section className='hidden h-dvh pt-0 md:pt-[66px] text-white md:flex bg-primary overflow-hidden'>
                <div className='w-full md:w-[350px] lg:w-[400px] bg-primary-dark-3 h-full py-[14px] md:py-[30px]'>
                    <ProfileSection messages={messages} allUsers={allUsers} user={user} setShowMobileChatContent={setShowMobileChatContent} supportChat={supportChat} />
                </div>
                <div className='flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col '>
                    <ChatSection />
                </div>
            </section>

            {/* Mobile View */}
            <section className='md:hidden w-full h-dvh pt-0 md:pt-[66px] text-white flex bg-primary overflow-hidden relative'>
                <div className={`w-full bg-primary-dark-3 h-full md:py-[30px] transition-transform ease-linear duration-300 absolute overflow-hidden
                ${showMobileChatContent ? "-translate-x-full" : "translate-x-0 "}`}>
                    <ProfileSection messages={messages} allUsers={allUsers} user={user} setShowMobileChatContent={setShowMobileChatContent} supportChat={supportChat} />
                </div>
                <div className={`flex w-full transition-transform ease-linear duration-300 absolute h-full flex-col ${showMobileChatContent ? "translate-x-0" : "translate-x-full"}`}>
                    <ChatSection />
                </div>
            </section>
        </>
    )
}

export default ChatIndex