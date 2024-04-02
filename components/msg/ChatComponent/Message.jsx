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
import NO_Pitcure from "/public/assets/no_image.svg"


const Msg = React.memo(({ msg, setSelectedImages }) => {
  if (msg.get_all_chat_with_image?.length) {
    return (
      <div className=' flex flex-col gap-2 w-full'>
        {/* <p className=''>{msg.text}</p> */}
        <div className={`overflow-hidden relative flex gap-1 flex-wrap cursor-pointer ${msg.get_all_chat_with_image.length === 2 ? "h-[6rem] w-[12rem]" : "w-[12rem] h-[12rem]"}`} onClick={() => setSelectedImages(msg.get_all_chat_with_image)}>
          {
            msg.get_all_chat_with_image.map((i, inx) => {
              return (
                <React.Fragment key={inx} >
                  <Image
                    width={1000} height={1000} src={i.chat_images} alt="phot"
                    className={` rounded-md bg-primary-dark-4 object-cover ${msg.get_all_chat_with_image.length === 1 ? "h-full w-full" : msg.get_all_chat_with_image.length === 2 ? "h-full w-[calc(6rem-2px)]" : "h-[calc(50%-2px)] w-[calc(6rem-2px)]"} `} />
                  {inx > 3 &&
                    <p className='absolute bottom-0 h-[calc(50%-2px)] text-white flex justify-center items-center w-[calc(50%-2px)] right-0 bg-primary-dark/40 rounded-md'>+ {msg.get_all_chat_with_image.length - 4}</p>
                  }
                  {
                    msg.get_all_chat_with_image.length === 3 &&
                    <div className='absolute bottom-0 h-[calc(50%-2px)] text-white text-sm font-light flex justify-center items-center w-[calc(50%-2px)] right-0  rounded-md'>
                      <Image src={NO_Pitcure} width={1000} height={1000} alt='no image' className='w-full h-full' />
                    </div>
                  }
                </React.Fragment>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return <p className='px-2 pb-1'>{msg?.text}</p>
  }
})

const Message = ({ user, item, messages, idx, containerElement, toUser, setEditingMsg, socket, setShowMobileProfile, setDrawerOpen, setSelectedImages }) => {

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
      socket.emit("delete-message", { sender_id: item.sender_id, receiver_id: item.receiver_id, type: "deleted", id: item.id })
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
  return (
    <>
      {
        user.id === item.sender_id
          ? <div className="flex items-end max-w-[85%] md:max-w-[75%] flex-col lg:flex-row message-container">
            {messages[idx - 1]
              ? <>
                {item.sender_id !== messages[idx - 1].sender_id
                  && <>
                    {
                      user.avatar_url ? <>
                        <Image src={user.avatar_url} alt="avatar" height={40} width={40} priority className="lg:hidden object-cover h-[40px] w-10 pointer-events-none rounded-full mb-[10px]" />
                      </> : <>
                        <p className='h-10 uppercase w-10 bg-primary-dark flex justify-center items-center lg:hidden pointer-events-none rounded-full mb-[10px]'>{user.username.charAt(0)}</p>
                      </>
                    }
                  </>
                }
              </> : <>
                {
                  user.avatar_url ? <>
                    <Image src={user.avatar_url} alt="" height={40} width={40} priority className="lg:hidden pointer-events-none  object-cover  w-10 h-10 rounded-full mb-[10px]" />
                  </> : <>
                    <p className='h-10 w-10 uppercase bg-primary-dark flex justify-center items-center lg:hidden pointer-events-none rounded-full mb-[10px]'>{user.username.charAt(0)}</p>
                  </>
                }
              </>
            }
            <div className="ps-[5px] pe-[5px] lg:pe-[5px] pb-[5px] pt-[10px] rounded-[12px] max-w-full lg:max-w-[calc(100%-70px)] rounded-tr-[0px] lg:rounded-tr-[15px] lg:rounded-br-[0px] bg-secondary flex flex-col items-start relative">
              <div className="flex justify-between items-center">
                <div className='flex justify-start items-end'>
                  <div className="text-[16px] font-medium leading-[20px] ps-2"> {user.username} </div>
                  <div className="ms-5 text-[14px] italic font-normal leading-[20px] text-white/70"> {getChatTime(item.milisecondtime)} </div>
                </div>
                {item.type === "deleted" ? <div className="h-[20px] w-[20px] flex justify-center items-center ms-6 lg:-translate-y-1 pointer-events-none"></div> :
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

                      <button className="h-[20px] w-[20px] flex justify-center items-center ms-6 lg:-translate-y-1">
                        <Image src={optionsIcon} alt="" height={20} width={20} priority className="pointer-events-none" />
                      </button>
                    </Popover>
                  </ConfigProvider>
                }
              </div>
              <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80">
                {
                  item.type === "deleted" ? <p className='px-2 pb-1'>You deleted this message.</p> : <Msg msg={item} setSelectedImages={setSelectedImages} />
                }
              </div>
              {
                item.type === "edited" && <div className='absolute -left-[35px] top-2'>
                  <Image src={penIcon} alt="" height={20} width={20} priority className="opacity-50 pointer-events-none" />
                </div>
              }
            </div>
            {messages[idx + 1]
              ? <>
                {item.sender_id !== messages[idx + 1].sender_id
                  ?
                  <>
                    {
                      user.avatar_url ? <>
                        <Image src={user.avatar_url} alt="" height={50} width={50} priority className="hidden lg:block  object-cover  h-[50px] w-[50px] pointer-events-none rounded-full ms-5" />
                      </> : <>
                        <p className='h-[50px] uppercase w-[50px] bg-primary-dark text-[24px] justify-center items-center hidden lg:flex pointer-events-none rounded-full ms-5'>{user.username.charAt(0)}</p>
                      </>
                    }
                  </>
                  : <div className="hidden lg:block w-[70px]"></div>
                }
              </>
              : <>
                {
                  user.avatar_url ? <>
                    <Image src={user.avatar_url} alt="" height={50} width={50} priority className="hidden h-[50px] w-[50px] object-cover lg:block pointer-events-none rounded-full ms-5" />
                  </> : <>
                    <p className='h-[50px] w-[50px] bg-primary-dark text-[24px] uppercase justify-center items-center hidden lg:flex pointer-events-none rounded-full ms-5'>{user.username.charAt(0)}</p>
                  </>
                }
              </>
            }
          </div>
          :
          <div className="flex items-start lg:items-end max-w-[85%] md:max-w-[75%] flex-col lg:flex-row ">
            {messages[idx - 1]
              ? <>
                {item.sender_id !== messages[idx - 1].sender_id
                  &&
                  <div className='cursor-pointer' onClick={onProfileClick}>
                    {
                      toUser.avatar_url ? <>
                        <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="lg:hidden h-[40px] object-cover  pointer-events-none rounded-full mb-[10px]" />
                      </> : <p className="lg:hidden pointer-events-none rounded-full mb-[10px] flex justify-center uppercase items-center bg-primary-dark-3 h-10 w-10">{toUser.username.charAt(0)}</p>
                    }
                  </div>
                }
              </>
              : <div className='cursor-pointer' onClick={onProfileClick}>
                {
                  toUser.avatar_url ? <>
                    <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="lg:hidden object-cover h-[40px] pointer-events-none rounded-full mb-[10px]" />
                  </> : <p className="lg:hidden pointer-events-none rounded-full mb-[10px] uppercase flex justify-center items-center bg-primary-dark-3 h-10 w-10">{toUser.username.charAt(0)}</p>
                }
              </div>
            }

            {messages[idx + 1]
              ? <>
                {item.sender_id !== messages[idx + 1].sender_id
                  ? <div className='cursor-pointer' onClick={onProfileClick}>
                    {
                      toUser.avatar_url ? <>
                        <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="hidden h-[40px] object-cover lg:block pointer-events-none rounded-full me-5" />
                      </> : <p className="hidden lg:flex pointer-events-none rounded-full me-5 uppercase justify-center items-center h-10 w-10 bg-primary-dark-3">{toUser.username.charAt(0)}</p>
                    }
                  </div>
                  : <div className="hidden lg:block w-[60px]"></div>
                }
              </>
              : <div className='cursor-pointer' onClick={onProfileClick}>
                {
                  toUser.avatar_url ? <>
                    <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="hidden lg:block object-cover  h-10 pointer-events-none rounded-full me-5" />
                  </> : <p className="hidden lg:flex pointer-events-none rounded-full uppercase me-5 justify-center items-center h-10 w-10 bg-primary-dark-3">{toUser.username.charAt(0)}</p>
                }
              </div>
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
      }
    </>
  )
}

Message.displayName = 'Message';

export default React.memo(Message)