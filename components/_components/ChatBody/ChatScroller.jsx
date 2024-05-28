import Image from 'next/image'
import React, { useEffect } from 'react'
import chatScrollBottom from "/public/assets/chat_scroll_bottom_icon.svg";

const ChatScroller = ({ isScroller, msgRef }) => {

    const scrollToBottom = () => {
        if (msgRef.current) {
            msgRef.current.scrollTop = msgRef.current.scrollHeight;
        }
    };

    return (
        <div className={`absolute right-0 cursor-pointer transition-all duration-200 origin-bottom ease-linear ${isScroller ? "bottom-0" : "-bottom-16"} bg-black rounded-full flex justify-center items-center h-10 w-10`} onClick={scrollToBottom}>
            <Image src={chatScrollBottom} alt="" height={22} width={22} priority className="select-none pointer-events-none" />
        </div>
    )
}

export default ChatScroller