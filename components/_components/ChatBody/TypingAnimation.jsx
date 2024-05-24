import React from 'react'
import "../typing.css"
import { useChat } from '@/store/ChatContext'
import Image from 'next/image'

const TypingAnimation = ({ user, toUser }) => {

    const { state: { typingUsers } } = useChat()

    // if (typingUsers.some(i => (i.receiver_id === user.id && toUser.id === i.sender_id))) {
    return (
        <div className={`${typingUsers.some(i => (i.receiver_id === user.id && toUser.id === i.sender_id)) ? "flex" : "hidden"} gap-x-2`}>

            {/* {toUser.avatar_url ? (
                <Image src={toUser.avatar_url} height={40} width={40} alt="avatar" className="h-[40px]  object-cover min-w-[40px] md:h-[50px] md:min-w-[50px] rounded-full" />
            ) : (
                <p className="uppercase flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:min-w-[50px] rounded-full bg-primary-dark text-[20px]">{toUser.username.charAt(0)}</p>
            )} */}

            <div className="chat-bubble flex items-center h-[40px] ps-2">
                <div className="typing flex">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        </div>
    )
    // }

}

export default TypingAnimation