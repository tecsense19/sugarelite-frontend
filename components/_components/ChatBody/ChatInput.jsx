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
import cross from "/public/assets/cross.svg"
import { useStore } from '@/store/store';
import { useSocket } from '@/store/SocketContext';
import { useChat } from '@/store/ChatContext';

const ChatInput = ({ toUser, user, todayMsgs, editingMsg, setEditingMsg, sendingImages, setSendingImages, setMessages }) => {

    const emojiRef = useRef(null)
    const buttonRef = useRef(null);
    const { register, handleSubmit, reset, watch, setValue } = useForm()
    const [api, contextHolder] = notification.useNotification()
    const [isEmoji, setIsEmoji] = useState(false)
    const [isdisabled, setIsDisabled] = useState(false)
    const { state: { onlineUsers, chatPartnerList } } = useStore()
    const { mySocket } = useSocket()
    const { addMessage, editMessage, deleteMessage } = useChat()

    const isUserOnline = (id) => {
        const isOnline = onlineUsers.some(i => i === id)
        if (!isOnline) {
            return "sent"
        } else if (chatPartnerList?.some(i => i.senderId === id && i.type === "open")) {
            return "read"
        }
        else {
            return "delivered"
        }
    }

    const getFormData = ({ sender_id, receiver_id, message, type, id }) => {
        let formdata = new FormData
        formdata.append("sender_id", sender_id)
        formdata.append("receiver_id", receiver_id)
        formdata.append("message", message)
        formdata.append("id", id)
        formdata.append("type", type)
        formdata.append("status", isUserOnline(receiver_id))
        return formdata
    }

    const generateRandomId = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        return `${randomNumber}${randomLetter}`;
    };

    const sendPendingMessage = (randomId, message) => {
        const msg = { id: randomId, sender_id: user.id, receiver_id: toUser.id, text: message, type: "regular", milisecondtime: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), status: "pending", deleted_at: null, get_all_chat_with_image: sendingImages }
        addMessage(msg)
        reset({ message: '' })
    }

    useEffect(() => {
        console.log(sendingImages)
    }, [sendingImages])

    const sendeMsgHandler = async ({ message }) => {
        message = message?.trim(' ')
        if (message.length) {
            const randomId = generateRandomId()
            await sendPendingMessage(randomId, message)
            let obj = getFormData({ sender_id: user.id, receiver_id: toUser.id, message: message, type: "regular" })
            const res = await send_message_action(obj)
            // addMessage(res.message)
            if (res.success) {
                setMessages(prev => prev.filter(i => i.id !== randomId))
                editMessage({ ...res.message, pid: randomId })
                deleteMessage(randomId)
                mySocket.emit("send-message", res.message)
            }
        }
    }

    const emojiSelector = (emoji) => {
        setValue('message', watch("message") + emoji.native);
    }

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

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const photoHandler = async (e) => {
        let obj = {}
        const { files } = e.target

        if (files[0]) {
            let file = await getBase64(files[0])
            obj.name = files[0].name
            let alreadyUploaded = false;
            for (let item of sendingImages) {
                if (item.name === obj.name) {
                    alreadyUploaded = true;
                    break;
                }
            }
            if (!alreadyUploaded) {
                obj.photo_url = file
                obj.file = files[0]
                setSendingImages((prev) => [...prev, obj])
            }
        }
    }


    return (
        <div className="w-full flex flex-col px-4 pb-[18px] md:px-10 md:pb-10 relative ">
            {contextHolder}
            <div className={`h-[100px] rounded-t-[5px] bg-black w-full flex items-center px-2 gap-2 ${sendingImages.length ? "flex" : "hidden"}`}>
                {console.log(sendingImages.length)}
                {
                    sendingImages.map((i, inx) => {
                        return <div key={inx} className='border-primary-dark-5 border border-dashed rounded-[5px] relative'>
                            <Image src={i?.photo_url ? i?.photo_url : i.chat_images} alt='photo' width={1000} height={1000} className='object-contain h-20 w-20 min-w-20 min-h-20' />
                            <div className='absolute bg-secondary h-[14px] w-[14px] flex justify-center -top-[6px] -right-2 rounded-full cursor-pointer'
                                onClick={() => setSendingImages(prev => prev.filter(j => (j.name !== i.name || j.id !== i.id)))}>
                                <Image src={cross} alt='photo' width={7} height={7} className='' />
                            </div>
                        </div>
                    })
                }
            </div>
            <div className={`w-full h-12 md:h-[70px] bg-black flex items-center ps-3 md:ps-[30px] relative ${sendingImages.length ? "border-t border-primary rounded-b-[5px]" : " rounded-[5px]"}`}>
                <button ref={buttonRef} onClick={() => setIsEmoji((prev) => !prev)} className='hidden md:flex'>
                    <Image src={smileIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                    <Image src={smileIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                </button>
                <form className='w-full flex items-center' onSubmit={handleSubmit(sendeMsgHandler)}>
                    <input type="text" {...register('message')} placeholder="Type a message..." className="mx-[10px] md:mx-[30px] bg-transparent border-0 !outline-none w-[calc(100%-102px)] md:w-[calc(100%-181px)] text-[16px] md:text-[18px] font-medium leading-[24px]" autoComplete="off" />
                    {
                        !editingMsg ?
                            <>
                                <input type="file" {...register("photo")} id='photo' className='hidden' accept="image/x-png,image/gif,image/jpeg" onChange={photoHandler} />
                                <label className='cursor-pointer' htmlFor='photo'>
                                    <Image src={attachmentIcon} priority alt="attachmentIcon" height={28} width={28} className="hidden md:block pointer-events-none" />
                                    <Image src={attachmentIcon} priority alt="attachmentIcon" height={20} width={20} className="md:hidden pointer-events-none" />
                                </label>
                            </>
                            : <>
                                <div className='cursor-pointer' onClick={() => { setEditingMsg(null); setSendingImages([]); reset() }}>
                                    <Image src={closeIcon} priority alt="closeIcon" height={28} width={28} className="hidden md:block pointer-events-none" />
                                    <Image src={closeIcon} priority alt="closeIcon" height={20} width={20} className="md:hidden pointer-events-none" />
                                </div>
                            </>
                    }
                    <button type="submit" disabled={isdisabled} className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] bg-secondary flex justify-center items-center ms-3 md:ms-[30px] rounded-full" >
                        <Image src={sendIcon} priority alt="sendIcon" height={16} width={16} className="hidden md:block pointer-events-none h-[16px] w-[16px] me-1 mt-[2px]" />
                        <Image src={sendIcon} priority alt="sendIcon" height={15.5} width={15.5} className="md:hidden pointer-events-none" />
                    </button>
                </form>
                <div ref={emojiRef} className={`emoji absolute hidden md:block bottom-[55px] left-4 origin-bottom ease-linear transition-transform duration-200 ${isEmoji ? "scale-y-1" : " scale-y-0"}`}>
                    <Picker data={data} onEmojiSelect={emojiSelector} theme={"dark"} previewPosition={"none"} searchPosition="none" perLine={10} />
                </div>
            </div>

        </div>
    )
}

export default ChatInput