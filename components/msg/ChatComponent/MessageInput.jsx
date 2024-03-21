import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import smileIcon from "/public/assets/smile_icon.svg";
import attachmentIcon from "/public/assets/attachment_icon.svg";
import sendIcon from "/public/assets/send_icon.svg";
import Image from 'next/image';
import { send_message_action } from '@/app/lib/actions';
import { client_notification } from '@/app/lib/helpers';
import { notification } from 'antd';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const MessageInput = ({ socket, toUser, currentUser }) => {

    const { register, handleSubmit, reset, watch, setValue } = useForm()
    const [api, contextHolder] = notification.useNotification()
    const [isEmoji, setIsEmoji] = useState(false)
    const [emoji, setEmoji] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const sendMessageHandler = async ({ message }) => {
        if (message.length && currentUser && toUser) {
            let obj = { sender_id: currentUser.id, receiver_id: toUser.id, message: message, type: "regular" }
            const res = await send_message_action(obj)
            if (res.success) {
                reset()
                socket.emit("typing", { id: toUser.id, decision: false })
                socket.emit("send-message", { msg: res.message, user: currentUser })
            } else {
                client_notification(api, "topRight", "error", res?.message, 5)
            }
        }
    }

    useEffect(() => {
        if (watch('message').length >= 1) {
            socket.emit("typing", { receiver: toUser.id, sender: currentUser.id, decision: true })
        } else {
            socket.emit("typing", { receiver: toUser.id, sender: currentUser.id, decision: false })
        }
    }, [watch("message")])

    const emojiSelector = (emoji) => {
        setValue('message', watch("message") + emoji.native);
    }

    const submitForm = (data) => {
        if (data.message && isClicked) {
            sendMessageHandler(data);
        }
    }

    return (
        <div className="w-full flex px-4 pb-[18px] md:px-10 md:pb-10 relative">
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)} className="w-full h-12 md:h-[70px] rounded-[5px] bg-black flex items-center px-3 md:px-[30px] relative">
                <button onClick={() => setIsEmoji((prev) => !prev)}>
                    <Image src={smileIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                    <Image src={smileIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                </button>
                <input type="text" {...register('message')} placeholder="Type a message..." className="mx-[10px] md:mx-[30px] bg-transparent border-0 !outline-none w-[calc(100%-102px)] md:w-[calc(100%-181px)] text-[16px] md:text-[18px] font-medium leading-[24px]" autoComplete="off" />
                <button>
                    <Image src={attachmentIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                    <Image src={attachmentIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                </button>
                <button type="submit" onClick={() => { setIsClicked(true); setIsEmoji(false) }} className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] bg-secondary flex justify-center items-center ms-3 md:ms-[30px] rounded-full" >
                    <Image src={sendIcon} priority alt="" height={18} width={18} className="hidden md:block pointer-events-none" />
                    <Image src={sendIcon} priority alt="" height={15.5} width={15.5} className="md:hidden pointer-events-none" />
                </button>
                <div className={`absolute hidden md:block bottom-[55px] left-4 origin-bottom ease-linear transition-transform duration-200 ${isEmoji ? "scale-y-1" : " scale-y-0"}`}>
                    <Picker data={data} onEmojiSelect={emojiSelector} theme={"dark"} previewPosition={"none"} searchPosition="none" perLine={10} />
                </div>
            </form>
            {/* <>
            <div className="w-full flex px-4 pb-[18px] md:px-10 md:pb-10">
                    <div className="w-full py-2 md:py-4 rounded-[5px] bg-black my-auto h-full text-center items-center px-3 md:px-[30px] text-[14px] md:text-[16px] text-white/80 justify-center">Chat limit exceeded for today! Upgrade to <Link href={client_routes.subscription} className="text-secondary inline">premium</Link> for unlimited chatting. 🚀</div>
                </div>
            </> */}
        </div>

    )
}

export default MessageInput