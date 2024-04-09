"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import optionsIcon from "/public/assets/chat_options_icon.svg";
import { ConfigProvider, Popover } from 'antd';
import deleteIcon from "/public/assets/delete.svg";
import editIcon from "/public/assets/edit.svg";
import penIcon from "/public/assets/pen.svg";
import { send_message_action } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { client_routes } from '@/app/lib/helpers';
import Msg from './Msg';


const NewMessage = ({ user, item, idx, containerElement, toUser, setEditingMsg, socket, setShowMobileProfile, setDrawerOpen, setSelectedImages, isLastMessage, isFirstMessage }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleShowOptionsChange = (val) => {
        setShowOptions(val)
    }
    const navigate = useRouter()

    useEffect(() => {
        const closeOptions = () => {
            handleShowOptionsChange(false)
        }
        if (containerElement.current) {
            containerElement.current.addEventListener("scroll", () => closeOptions())
        }
        return () => {
            if (containerElement.current) {
                containerElement.current.removeEventListener("scroll", () => closeOptions())
            }
        }
    }, [])

    const getChatTime = (stamp) => {

        const time = new Date(parseInt(stamp));
        const hrs = time.getHours();
        const mins = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();

        let period = 'AM';
        let formattedHrs = hrs;


        if (hrs === 12) {
            period = 'PM';
        }
        else if (hrs === 0) {
            formattedHrs = 12;
            period = 'AM';
        }
        else if (hrs > 12) {
            period = 'PM';
            formattedHrs = hrs - 12;
        }

        const formattedTime = `${formattedHrs < 10 ? `0${formattedHrs}` : formattedHrs}:${mins} ${period}`;

        return formattedTime;
    }

    const getFormData = ({ sender_id, receiver_id, type, id }) => {
        let formdata = new FormData
        formdata.append("sender_id", sender_id)
        formdata.append("receiver_id", receiver_id)
        formdata.append("id", id)
        formdata.append("type", type)
        return formdata
    }

    const msgDeleteHandler = async () => {
        setIsLoading(true)
        setEditingMsg(null)
        let obj = getFormData({ sender_id: item.sender_id, receiver_id: item.receiver_id, type: "deleted", id: item.id })
        const res = await send_message_action(obj)
        if (res.success) {
            socket.emit("send-message", { sender_id: item.sender_id, receiver_id: item.receiver_id, type: "deleted", id: item.id, updated_at: item.updated_at, milisecondtime: item.milisecondtime })
        }
        setShowOptions(false)
        setIsLoading(false)
    }

    const msgEditHandler = () => {
        setShowOptions(false)
        setEditingMsg({ message: item.text, id: item.id, images: item.get_all_chat_with_image })
    }

    const onProfileClick = () => {
        if (window.innerWidth < 1537) {
            setDrawerOpen(true)
            setShowMobileProfile(true)
        } else {
            navigate.push(`${client_routes.profile}/${toUser.id}`)
        }
    }

    if (item.sender_id === user.id) {
        return (
            <div className='flex flex-col lg:flex-row items-end gap-x-5 max-w-[85%]'>
                {
                    isFirstMessage &&
                    <div className='cursor-pointer lg:hidden' onClick={onProfileClick}>
                        {
                            user.avatar_url ? <>
                                <Image src={user.avatar_url} alt="" height={40} width={40} priority className="lg:hidden h-[40px] object-cover  pointer-events-none rounded-full mb-[10px]" />
                            </> : <p className="lg:hidden pointer-events-none rounded-full mb-[10px] flex justify-center uppercase items-center bg-primary-dark-3 h-10 w-10">{user.username.charAt(0)}</p>
                        }
                    </div>
                }
                <div className=" px-[5px] pb-[5px] pt-[10px] rounded-[12px] max-w-full lg:max-w-[calc(100%-70px)] rounded-tr-[0px] lg:rounded-tr-[15px] lg:rounded-br-[0px] bg-secondary flex flex-col items-start relative">
                    <div className="flex justify-between gap-4 items-center w-full">
                        <div className="text-[16px] font-medium leading-[20px] ps-2"> {user.username} </div>
                        <div className=" text-[14px] italic font-normal leading-[20px] me-3 text-white/70"> {getChatTime(item.milisecondtime)} </div>

                        {
                            item.type !== "deleted" &&
                            <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                                <Popover placement="leftBottom" trigger="click" rootClassName='message-container' open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                                    <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                                        {!isLoading ?
                                            <button className="bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={msgDeleteHandler}>
                                                <Image src={deleteIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                                <div className="text-[14px] font-medium leading-[20px]">Delete</div>
                                            </button> : <div className="bg-secondary  border-[1px] border-white/30 w-[125px] h-[32px] flex justify-center items-center gap-x-[10px] rounded-sm" onClick={msgDeleteHandler}>
                                                <span className='loader after:border-[10px] '></span>
                                            </div>
                                        }
                                        <button className="bg-primary hover:bg-secondary border-[1px] border-white/30 h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={msgEditHandler}>
                                            <Image src={editIcon} alt="" height={15} width={15} priority className="ms-5 pointer-events-none" />
                                            <div className="text-[14px] font-medium leading-[20px]">Edit</div>
                                        </button>
                                    </div>
                                )}>

                                    <button className="h-[20px] w-[20px] flex justify-center items-center  lg:-translate-y-1">
                                        <Image src={optionsIcon} alt="" height={20} width={20} priority className="pointer-events-none" />
                                    </button>
                                </Popover>
                            </ConfigProvider>
                        }
                    </div>
                    <div className="mt-[10px] break-words w-full max-w-full  text-[16px] font-normal leading-[20px] text-white/80">
                        {
                            item.type === "deleted" ? <p className='px-2 pb-1'>You deleted this message.</p> : <Msg msg={item} setSelectedImages={setSelectedImages} />
                        }
                    </div>
                    {
                        item.type === "edited" && <div className='absolute -left-[35px] top-2'>
                            <Image src={penIcon} alt="edit-icon" height={20} width={20} priority className="opacity-50 pointer-events-none" />
                        </div>
                    }
                </div>
                {
                    isLastMessage ?
                        <div className=' hidden lg:block '>
                            {
                                user.avatar_url ? <>
                                    <Image src={user.avatar_url} alt="" height={50} width={50} priority className=" object-cover  h-[50px] w-[50px] pointer-events-none rounded-full " />
                                </> : <>
                                    <p className='h-[50px] uppercase w-[50px] bg-primary-dark text-[24px] justify-center items-center hidden lg:flex pointer-events-none rounded-full '>{user.username.charAt(0)}</p>
                                </>
                            }
                        </div> : <div className='h-[50px] w-[50px] hidden lg:flex '></div>
                }

            </div>
        )
    } else {
        return (
            <div className='flex flex-col lg:flex-row lg:items-end gap-x-5 '>
                {
                    isFirstMessage &&
                    <div className='cursor-pointer lg:hidden' onClick={onProfileClick}>
                        {
                            toUser.avatar_url ? <>
                                <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="lg:hidden h-[40px] object-cover  pointer-events-none rounded-full mb-[10px]" />
                            </> : <p className="lg:hidden pointer-events-none rounded-full mb-[10px] flex justify-center uppercase items-center bg-primary-dark-3 h-10 w-10">{toUser.username.charAt(0)}</p>
                        }
                    </div>
                }
                {isLastMessage ?
                    <div className='cursor-pointer hidden lg:block' onClick={onProfileClick}>
                        {
                            toUser.avatar_url ? <>
                                <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="hidden lg:block object-cover  h-10 pointer-events-none rounded-full " />
                            </> : <p className="hidden lg:flex pointer-events-none rounded-full uppercase  justify-center items-center h-10 w-10 bg-primary-dark-3">{toUser.username.charAt(0)}</p>
                        }
                    </div> : <div className='h-10 w-10 hidden lg:flex'></div>
                }
                <div className="px-[7px] pt-2 pb-[7px] max-w-full lg:max-w-[calc(100%-60px)] rounded-[12px] rounded-tl-[0px] lg:rounded-tl-[15px] lg:rounded-bl-[0px] break-words bg-primary-dark-3 relative">
                    <div className="flex px-2 justify-between items-center ">
                        <div className="text-[16px] font-medium leading-[20px] capitalize"> {toUser.username} </div>
                        <div className="ms-5 text-[14px] italic font-normal leading-[20px] text-white/70"> {getChatTime(item.milisecondtime)} </div>
                    </div>
                    {item.type === "deleted" ?
                        <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80 px-2 p-1">
                            This message was deleted.
                        </div> :
                        <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80">
                            <Msg msg={item} setSelectedImages={setSelectedImages} />
                        </div>
                    }
                    {
                        item.type === "edited" && <div className='absolute -right-[33px] top-2'>
                            <Image src={penIcon} alt="" height={18} width={18} priority className="opacity-50 pointer-events-none" />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default NewMessage