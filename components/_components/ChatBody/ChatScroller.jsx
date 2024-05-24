import Image from 'next/image'
import React from 'react'
import chatScrollBottom from "/public/assets/chat_scroll_bottom_icon.svg";

const ChatScroller = () => {
    return (
        <div className='absolute bottom-0 right-0'>
            <Image src={chatScrollBottom} alt="" height={22} width={22} priority className="select-none pointer-events-none" />
        </div>
    )
}

export default ChatScroller