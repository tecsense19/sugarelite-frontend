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

const MessageInput = ({ socket, toUser, currentUser, todayMsgs, editingMsg, setEditingMsg, sendingImages, setSendingImages }) => {

    const emojiRef = useRef(null)
    const buttonRef = useRef(null);
    const { register, handleSubmit, reset, watch, setValue } = useForm()
    const [api, contextHolder] = notification.useNotification()
    const [isEmoji, setIsEmoji] = useState(false)
    const [isdisabled, setIsDisabled] = useState(false)
    const { state: { onlineUsers, chatPartnerList } } = useStore()

    const isUserOnline = (id) => {
        const isOnline = onlineUsers.some(i => i === id)
        if (!isOnline) {
            return "sent"
        } else if (chatPartnerList.some(i => i.sender_id === id && i.type === "opened")) {
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
        sendingImages.forEach((image, index) => {
            if (image.file) {
                formdata.append(`chat_images[]`, image.file);
            }
        });
        if (editingMsg) {
            const data = editingMsg?.images.filter(i => !sendingImages.some(j => i.id === j.id)).map(z => z.id).toString()
            formdata.append("remove_chatimages", data)
        }
        return formdata
    }



    const sendMessageHandler = async ({ message, photo }) => {
        setIsEmoji(false)
        message = message?.trim(' ')
        if ((message?.length || sendingImages.length) && currentUser && toUser && !editingMsg) {
            reset()
            setIsDisabled(true)
            let obj = getFormData({ sender_id: currentUser.id, receiver_id: toUser.id, message: message, type: "regular" })
            const res = await send_message_action(obj)
            if (res.success) {
                setIsDisabled(false)
                socket.emit("typing", { id: toUser.id, decision: false })
                socket.emit("send-message", res.message)
            } else {
                client_notification(api, "topRight", "error", res?.message, 5)
            }
            setSendingImages([])
        }
        if ((message?.length || sendingImages.length) && currentUser && toUser && editingMsg) {
            reset()
            let obj = getFormData({ sender_id: currentUser.id, receiver_id: toUser.id, message: message, type: "edited", id: editingMsg.id })
            const res = await send_message_action(obj)
            if (res.success) {
                setIsDisabled(false)
                setEditingMsg(null)
                socket.emit("send-message", res.message)
            } else {
                client_notification(api, "topRight", "error", res?.message, 5)
            }
            setSendingImages([])
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
            setSendingImages(editingMsg.images)
        } else {
            reset()
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

    const Attachment = (() => {

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
            <>
                <input type="file" {...register("photo")} id='photo' className='hidden' accept="image/x-png,image/gif,image/jpeg" onChange={photoHandler} />
                <label className='cursor-pointer' htmlFor='photo'>
                    <Image src={attachmentIcon} priority alt="attachmentIcon" height={28} width={28} className="hidden md:block pointer-events-none" />
                    <Image src={attachmentIcon} priority alt="attachmentIcon" height={20} width={20} className="md:hidden pointer-events-none" />
                </label>
            </>
        )
    })

    return (
        <>

            <div className="w-full flex flex-col px-4 pb-[18px] md:px-10 md:pb-10 relative ">
                {contextHolder}
                <div className={`h-[100px] rounded-t-[5px] bg-black w-full flex items-center px-2 gap-2 ${sendingImages.length ? "flex" : "hidden"}`}>
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
                {
                    (currentUser.is_subscribe || todayMsgs < 3) ?
                        <div className={`w-full h-12 md:h-[70px] bg-black flex items-center ps-3 md:ps-[30px] relative ${sendingImages.length ? "border-t border-primary rounded-b-[5px]" : " rounded-[5px]"}`}>
                            <button ref={buttonRef} onClick={() => setIsEmoji((prev) => !prev)}>
                                <Image src={smileIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                                <Image src={smileIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                            </button>
                            <form className='w-full flex items-center' onSubmit={handleSubmit(sendMessageHandler)}>
                                <input type="text" {...register('message')} placeholder="Type a message..." className="mx-[10px] md:mx-[30px] bg-transparent border-0 !outline-none w-[calc(100%-102px)] md:w-[calc(100%-181px)] text-[16px] md:text-[18px] font-medium leading-[24px]" autoComplete="off" />
                                {
                                    !editingMsg ? <Attachment /> : <>
                                        <div className='cursor-pointer' onClick={() => { setEditingMsg(null); setSendingImages([]); reset() }}>
                                            <Image src={closeIcon} priority alt="closeIcon" height={28} width={28} className="hidden md:block pointer-events-none" />
                                            <Image src={closeIcon} priority alt="closeIcon" height={20} width={20} className="md:hidden pointer-events-none" />
                                        </div>
                                    </>
                                }
                                <button type="submit" disabled={isdisabled} className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] bg-secondary flex justify-center items-center ms-3 md:ms-[30px] rounded-full" >
                                    <Image src={sendIcon} priority alt="sendIcon" height={18} width={18} className="hidden md:block pointer-events-none" />
                                    <Image src={sendIcon} priority alt="sendIcon" height={15.5} width={15.5} className="md:hidden pointer-events-none" />
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
        </>

    )
}

MessageInput.displayName = 'MessageInput';

export default React.memo(MessageInput)