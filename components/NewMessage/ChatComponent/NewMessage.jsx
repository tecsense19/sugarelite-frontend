"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import optionsIcon from "/public/assets/chat_options_icon.svg";
import { ConfigProvider, Popover } from 'antd';
import deleteIcon from "/public/assets/delete.svg";
import editIcon from "/public/assets/edit.svg";
import penIcon from "/public/assets/pen.svg";
import double_tick from "/public/assets/double_tick.svg";
import double_tick_2 from "/public/assets/double_tick_2.svg";
import read_tick from "/public/assets/read_tick.svg";
import single_tick from "/public/assets/single_tick.svg";
import single_tick_2 from "/public/assets/single_tick_2.svg";
import shadow_bg_chat from "/public/assets/shadow_bg_chat.svg";
import { send_message_action } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { client_routes } from '@/app/lib/helpers';
import Msg from './Msg';


const NewMessage = ({ user, item, idx, containerElement, toUser, setEditingMsg, socket, setShowMobileProfile, setDrawerOpen, setSelectedImages, isLastMessage, isFirstMessage }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showIcon, setShowIcon] = useState("")

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

  const popupHandler = () => {
    setShowIcon(idx)
  }
  const popupRemoveHandler = () => {
    setShowIcon('')
    setShowOptions(false)
  }

  if (item.sender_id === user.id) {
    return (
      <div className='flex flex-col lg:flex-row  max-w-[85%]'>
        <div
          className={`p-2  max-w-full bg-primary-dark-3 relative min-w-[5rem]  ${isFirstMessage ? "rounded-tr-[12px] rounded-bl-[12px] rounded-tl-[12px]" : isLastMessage ? "rounded-br-[12px] rounded-bl-[12px] rounded-tl-[12px]" : "rounded-e-none rounded-[12px]"} `}
          onMouseEnter={popupHandler}
          onMouseLeave={popupRemoveHandler}
        >
          {
            item.type !== "deleted" &&
            <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
              <Popover placement="topRight" trigger="click" rootClassName='message-container' open={showOptions} onOpenChange={handleShowOptionsChange} content={(
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

                <button className={`h-full w-[30px] flex justify-center items-start absolute -left-8 top-0 lg:top-1 lg:-translate-y-1   `}>
                  <Image src={optionsIcon} alt="options" height={20} width={20} priority className={`pointer-events-none ${idx === showIcon ? "flex" : "hidden"}`} />
                </button>
              </Popover>
            </ConfigProvider>
          }
          <div className=" break-words w-full max-w-full text-[16px] font-normal leading-[22px] text-white/80 ">
            {
              item.type === "deleted" ? <p className='p-2 text-[15px]'> You deleted this message <span className={`h-[10px] w-[80px] ${item.type === "deleted" ? "hidden" : "inline-block"} `}></span></p> : <Msg msg={item} setSelectedImages={setSelectedImages} />
            }
          </div>
          {
            item.type === "edited" && <div className='absolute -left-[25px] bottom-1'>
              <Image src={penIcon} alt="edit-icon" height={16} width={16} priority className="opacity-50 pointer-events-none" />
            </div>
          }
          {

            !item?.get_all_chat_with_image?.length ?
              <span className={`text-white/50 font-normal text-end text-[12px] mt-1 min-w-[5rem] gap-x-1 justify-end ${item.type === "deleted" ? "hidden" : "flex"}  absolute bottom-[7px] right-[9px]`}>
                {getChatTime(item.milisecondtime)}
                {
                  item?.status === "read" ?
                    <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none`} /> :
                    item?.status === "delivered" ?
                      <Image src={double_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " /> :
                      <Image src={single_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " />
                }
              </span>
              :
              <div className={`absolute bottom-[10px] right-[6px] text-white font-normal text-end text-[12px] mt-1 min-w-[6rem] me-1 gap-x-1 justify-end ${item.type === "deleted" ? "hidden" : "flex"} `}>
                <div className='absolute w-[225px]  -right-0 bottom-0'>
                  <Image src={shadow_bg_chat} alt="edit-icon" height={220} width={224} priority className="pointer-events-none h-full w-full" />
                </div>
                <span className='absolute right-[22px] -bottom-[2px]'>{getChatTime(item.milisecondtime)}</span>
                {
                  item?.status === "read" ?
                    <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none absolute bottom-0`} /> :
                    item?.status === "delivered" ?
                      <Image src={double_tick_2} alt="edit-icon" height={14} width={18} priority className="pointer-events-none absolute bottom-0" /> :
                      <Image src={single_tick_2} alt="edit-icon" height={14} width={18} priority className="pointer-events-none absolute bottom-0" />
                }
              </div>
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col lg:flex-row lg:items-end max-w-[88%] '>
        <div className={`px-[7px] pt-2 pb-[7px] ${isFirstMessage ? "rounded-tr-[12px] rounded-br-[12px] rounded-tl-[12px]" : isLastMessage ? "rounded-bl-[12px] rounded-tr-[12px] rounded-br-[12px]" : " rounded-e-[12px]"} break-words bg-[#626262] relative  flex items-end`}>
          <div className=" break-words text-[16px] font-normal leading-[22px] text-white/80 ">
            {
              item.type === "deleted" ? <p className='p-2'> Message deleted</p> : <Msg msg={item} setSelectedImages={setSelectedImages} />
            }
          </div>
          {
            item.type === "edited" && <div className='absolute -right-[25px] bottom-1'>
              <Image src={penIcon} alt="edit-icon" height={16} width={16} priority className="opacity-50 pointer-events-none" />
            </div>
          }
          {
            item?.get_all_chat_with_image?.length ?
              <div className={`absolute text-white w-[94%]  font-normal text-end text-[12px] mt-1 min-w-[4rem] gap-x-1 justify-end ${item.type === "deleted" ? "hidden" : "flex"}`}>
                <div className='absolute w-[225px]  -right-1 bottom-0'>
                  <Image src={shadow_bg_chat} alt="edit-icon" height={220} width={224} priority className="pointer-events-none h-full w-full" />
                </div>
                <span className='absolute me-1 bottom-[2px]'>{getChatTime(item.milisecondtime)}</span>
              </div>
              :
              <span className={`text-white/50 font-normal text-end text-[12px] mt-1 min-w-[4rem] absolute right-[10px] bottom-[7px] ${item.type === "deleted" ? "hidden" : ""}`}>
                {getChatTime(item.milisecondtime)}
              </span>
          }
        </div>
      </div>
    )
  }
}

export default NewMessage