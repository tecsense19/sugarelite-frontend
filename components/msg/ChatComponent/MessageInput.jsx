import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import smileIcon from "/public/assets/smile_icon.svg";
import attachmentIcon from "/public/assets/attachment_icon.svg";
import closeIcon from "/public/assets/close.svg";
import sendIcon from "/public/assets/send_icon.svg";
import Image from 'next/image';
import { send_message_action } from '@/app/lib/actions';
import { client_notification, client_routes } from '@/app/lib/helpers';
import { notification } from 'antd';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Link from 'next/link';

const MessageInput = ({ socket, toUser, currentUser, isAllowed, editingMsg, setEditingMsg }) => {

    const emojiRef = useRef(null)
    const buttonRef = useRef(null);
    const { register, handleSubmit, reset, watch, setValue } = useForm()
    const [api, contextHolder] = notification.useNotification()
    const [isEmoji, setIsEmoji] = useState(false)
    const [isdisabled, setIsDisabled] = useState(false)

    const sendMessageHandler = async ({ message }) => {
        setIsEmoji(false)
        message = message.trim(' ')
        reset()
        if (message.length && currentUser && toUser && !editingMsg) {
            setIsDisabled(true)
            let obj = { sender_id: currentUser.id, receiver_id: toUser.id, message: message, type: "regular" }
            const res = await send_message_action(obj)
            if (res.success) {
                setIsDisabled(false)
                socket.emit("typing", { id: toUser.id, decision: false })
                socket.emit("send-message", { msg: res.message, user: currentUser })
            } else {
                client_notification(api, "topRight", "error", res?.message, 5)
            }
        }
        if (message.length && currentUser && toUser && editingMsg) {
            let obj = { sender_id: currentUser.id, receiver_id: toUser.id, message: message, type: "edited", id: editingMsg.id }
            const res = await send_message_action(obj)
            if (res.success) {
                setIsDisabled(false)
                setEditingMsg(null)
                socket.emit("send-message", { msg: res.message, user: currentUser })
            } else {
                client_notification(api, "topRight", "error", res?.message, 5)
            }
        }
    }

    useEffect(() => {
        if (!editingMsg) {
            if (watch('message')?.length >= 1) {
                socket.emit("typing", { receiver: toUser.id, sender: currentUser.id, decision: true })
            } else {
                socket.emit("typing", { receiver: toUser.id, sender: currentUser.id, decision: false })
            }
        }
    }, [watch("message")])

    const emojiSelector = (emoji) => {
        setValue('message', watch("message") + emoji.native);
    }

    useEffect(() => {
        if (editingMsg) {
            setValue('message', editingMsg.message)
        }
    }, [editingMsg])

    useEffect(() => {
        const emojiCloserHandler = (event) => {
            if (emojiRef.current && emojiRef.current.contains(event.target)) {
                return;
            }
            if (buttonRef.current && buttonRef.current.contains(event.target)) {
                if (isEmoji) {
                    setIsEmoji(!isEmoji);
                }
                return;
            }
            setIsEmoji(false);
        };
        window.addEventListener("click", emojiCloserHandler)

        return () => {
            window.removeEventListener("click", emojiCloserHandler)
        }
    }, [])

    return (
        <div className="w-full flex px-4 pb-[18px] md:px-10 md:pb-10 relative ">
            {contextHolder}
            {
                isAllowed ?
                    <div className="w-full h-12 md:h-[70px] rounded-[5px] bg-black flex items-center ps-3 md:ps-[30px] relative">
                        <button ref={buttonRef} onClick={() => setIsEmoji((prev) => !prev)}>
                            <Image src={smileIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                            <Image src={smileIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                        </button>
                        <form className=' w-full flex items-center' onSubmit={handleSubmit(sendMessageHandler)}>
                            <input type="text" {...register('message')} placeholder="Type a message..." className="mx-[10px] md:mx-[30px] bg-transparent border-0 !outline-none w-[calc(100%-102px)] md:w-[calc(100%-181px)] text-[16px] md:text-[18px] font-medium leading-[24px]" autoComplete="off" />
                            {
                                !editingMsg ? <div className='cursor-pointer'>
                                    <Image src={attachmentIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                                    <Image src={attachmentIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                                </div> : <>
                                    <div className='cursor-pointer' onClick={() => { setEditingMsg(null); reset() }}>
                                        <Image src={closeIcon} priority alt="closeIcon" height={28} width={28} className="hidden md:block pointer-events-none" />
                                        <Image src={closeIcon} priority alt="closeIcon" height={20} width={20} className="md:hidden pointer-events-none" />
                                    </div>
                                </>
                            }
                            <button type="submit" disabled={isdisabled} className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] bg-secondary flex justify-center items-center ms-3 md:ms-[30px] rounded-full" >
                                <Image src={sendIcon} priority alt="" height={18} width={18} className="hidden md:block pointer-events-none" />
                                <Image src={sendIcon} priority alt="" height={15.5} width={15.5} className="md:hidden pointer-events-none" />
                            </button>
                        </form>
                        <div ref={emojiRef} className={`emoji absolute hidden md:block bottom-[55px] left-4 origin-bottom ease-linear transition-transform duration-200 ${isEmoji ? "scale-y-1" : " scale-y-0"}`}>
                            <Picker data={data} onEmojiSelect={emojiSelector} theme={"dark"} previewPosition={"none"} searchPosition="none" perLine={10} />
                        </div>
                    </div>
                    :
                    <div className="w-full h-full pb-[18px] md:pb-10 my-auto">
                        <div className="w-full py-2 md:py-4 rounded-[5px] bg-black my-auto h-full text-center items-center px-3 md:px-[30px] text-[14px] md:text-[16px] text-white/80 justify-center">Chat limit exceeded for today! Upgrade to <Link href={client_routes.subscription} className="text-secondary inline">premium</Link> for unlimited chatting. 🚀</div>
                    </div>
            }
        </div>

    )
}

export default MessageInput