import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/store';
import { useChat } from '@/store/ChatContext';
import { useSocket } from '@/store/SocketContext';
import Message from './Message';
import TypingAnimation from './TypingAnimation';


const ChatBody = ({ toUser, user, chatList, sendingImages, setSelectedImages }) => {

    const [messages, setMessages] = useState([]);
    const { mySocket } = useSocket()
    const { addMessage } = useChat()

    useEffect(() => {
        setMessages(chatList);
    }, [chatList]);

    useEffect(() => {
        const unReadMsgs = messages.filter(i => (i.receiver_id === user.id && i.status !== "read"))
        if (unReadMsgs.length) {
            mySocket.emit('read-msg', { unReadMsgs, receiver_id: toUser.id })
            unReadMsgs.forEach(i => {
                addMessage({ ...i, status: "read" });
            })
        }
    }, [])

    useEffect(() => {
        const lastMsgId = chatList[chatList.length - 1]
        mySocket.emit('open-chat', { sender_id: user.id, receiver_id: toUser.id, type: "open", lastMsgId: lastMsgId.id })
        return () => {
            mySocket.emit('open-chat', { sender_id: user.id, receiver_id: toUser.id, type: "closed", lastMsgId: lastMsgId.id })
        }
    }, [toUser, chatList])

    return (
        <div className={`${sendingImages.length ? "h-[calc(100%-222px)] md:h-[calc(100%-285px)]" : "md:h-[calc(100%-185px)] h-[calc(100%-122px)]"} p-4 md:px-10`}>
            <div className='h-full flex flex-col justify-end'>
                <div className='flex flex-col-reverse overflow-y-auto scroll-smooth' style={{ scrollbarWidth: "none" }}>
                    <div>
                        {messages.map((message, index) => {
                            const isLastMessage = index === messages.length - 1 || messages[index + 1]?.sender_id !== message.sender_id;
                            const isFirstMessage = index === 0 || messages[index - 1]?.sender_id !== message.sender_id;
                            // console.log(message)
                            return (
                                <MessageItem key={index} message={message} user={user} toUser={toUser} isLastMessage={isLastMessage} isFirstMessage={isFirstMessage} setSelectedImages={setSelectedImages} />
                            )
                        })}
                        <TypingAnimation toUser={toUser} user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

let currentDate = null

const MessageItem = React.memo(({ message, user, toUser, isLastMessage, isFirstMessage, setSelectedImages }) => {
    const isCurrentUser = message.sender_id === user.id;
    const messageDate = new Date(parseInt(message.milisecondtime)).toDateString();
    const shouldPrintDate = currentDate !== messageDate;
    currentDate = messageDate
    return (
        <>
            {shouldPrintDate && (
                <div className="py-[30px] md:py-10 relative flex justify-center w-full ">
                    <p className="absolute top-1/2 z-[0] -translate-y-1/2 bg-white/30 h-[1px] w-full"></p>
                    <p className='text-center font-medium bg-primary z-[1] px-2 text-[14px] md:text-[18px] leading-[20px] text-white/50'>
                        {new Date(parseInt(message.milisecondtime)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            )}
            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} my-[2px]`}>
                <Message message={message} user={user} toUser={toUser} isFirstMessage={isFirstMessage} isLastMessage={isLastMessage} setSelectedImages={setSelectedImages} />
            </div>
        </>
    );
}, (prevProps, nextProps) => {
    return prevProps.message.id === nextProps.message.id && prevProps.message.status === nextProps.message.status;
});

export default ChatBody;

