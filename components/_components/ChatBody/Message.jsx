import React, { useEffect, useState } from 'react'
import optionsIcon from "/public/assets/chat_options_icon.svg";
import { ConfigProvider, Popover, Tooltip } from 'antd';
import deleteIcon from "/public/assets/delete.svg";
import editIcon from "/public/assets/edit.svg";
import penIcon from "/public/assets/pen.svg";
import double_tick from "/public/assets/double_tick.svg";
import double_tick_2 from "/public/assets/double_tick_2.svg";
import read_tick from "/public/assets/read_tick.svg";
import single_tick from "/public/assets/single_tick.svg";
import single_tick_2 from "/public/assets/single_tick_2.svg";
import shadow_bg_chat from "/public/assets/shadow_bg_chat.svg";
import Prohibition from "/public/assets/prohibition.svg"
import Image from 'next/image';
import Msg from './Msg';
import { send_message_action } from '@/app/lib/actions';
import ReadTickRender from './ReadTickRender';
import { useSocket } from '@/store/SocketContext';
import { useChat } from '@/store/ChatContext';

const formatTime = (timestamp) => {
  const time = new Date(timestamp);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Message = ({ message, user, toUser, isLastMessage, isFirstMessage, setSelectedImages, setEditingMsg, allStrings }) => {

  const { mySocket } = useSocket()
  const { addMessage, editMessage } = useChat()

  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowOptionsChange = (val) => {
    setShowOptions(val)
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
    let obj = getFormData({ sender_id: message.sender_id, receiver_id: message.receiver_id, type: "deleted", id: message.id })
    const res = await send_message_action(obj)
    if (res.success) {
      mySocket.emit("send-message", { sender_id: message.sender_id, receiver_id: message.receiver_id, type: "deleted", id: message.id, updated_at: message.updated_at, milisecondtime: message.milisecondtime, status: message.status })
      // addMessage({ sender_id: message.sender_id, receiver_id: message.receiver_id, type: "deleted", id: message.id, updated_at: message.updated_at, milisecondtime: message.milisecondtime })
      editMessage({ sender_id: message.sender_id, receiver_id: message.receiver_id, type: "deleted", id: message.id, updated_at: message.updated_at, milisecondtime: message.milisecondtime, status: message.statu })
    }
    setShowOptions(false)
    setIsLoading(false)
  }

  const msgEditHandler = () => {
    setShowOptions(false)
    setEditingMsg({ message: message.text, id: message.id, images: message.get_all_chat_with_image })
  }

  if (message.sender_id === user.id) {
    return (
      <div className='flex flex-col lg:flex-row  max-w-[85%]'>
        <div className={`p-2  max-w-full bg-primary-dark-3 relative min-w-[5rem] ${isFirstMessage ? "rounded-tr-[12px] rounded-bl-[12px] rounded-tl-[12px]" : isLastMessage ? "rounded-br-[12px] rounded-bl-[12px] rounded-tl-[12px]" : "rounded-e-none rounded-[12px]"} `}>
          {(message.type !== "deleted" && message.status !== "pending")
            ? <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
              <Popover placement="topRight" trigger="click" rootClassName='message-container' open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                  {!isLoading ?
                    <button className="bg-primary hover:bg-secondary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={msgDeleteHandler}>
                      <Image src={deleteIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                      <div className="text-[14px] font-medium leading-[20px]">{allStrings["string_delete"]}</div>
                    </button> : <div className="bg-secondary  border-[1px] border-white/30 w-[125px] h-[32px] flex justify-center items-center gap-x-[10px] rounded-sm" onClick={msgDeleteHandler}>
                      <span className='loader after:border-[10px] '></span>
                    </div>
                  }
                  {(user.is_subscribe === 1 && user.is_subscription_stop === 0 && user.is_subscription_cancel === 0)
                    ? <button className="bg-primary hover:bg-secondary border-[1px] border-white/30 h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={msgEditHandler}>
                      <Image src={editIcon} alt="" height={15} width={15} priority className="ms-5 pointer-events-none" />
                      <div className="text-[14px] font-medium leading-[20px]">{allStrings["string_edit"]}</div>
                    </button>
                    : <Tooltip placement="bottom" title={"Please have subscription to edit."} arrow={true}>
                      <button className="bg-primary hover:bg-secondary border-[1px] border-white/30 h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                        <Image src={editIcon} alt="" height={15} width={15} priority className="ms-5 pointer-events-none" />
                        <div className="text-[14px] font-medium leading-[20px]">{allStrings["string_edit"]}</div>
                      </button>
                    </Tooltip>
                  }
                </div>
              )}>
                <button className={`h-full w-[30px] flex justify-center items-start absolute -left-8 top-0 lg:top-1 lg:-translate-y-1   `}>
                  <Image src={optionsIcon} alt="options" height={20} width={20} priority className={`pointer-events-none flex`} />
                </button>
              </Popover>
            </ConfigProvider>
            : <></>
          }
          <div className=" break-words w-full max-w-full text-[16px] font-normal leading-[22px] text-white/80 ">
            {
              message.type === "deleted"
                ? <p className='px-2 py-1 text-[15px] flex gap-x-1'>
                  <Image src={Prohibition} alt="deleted-icon" height={13} width={13} priority className="opacity-70 pointer-events-none" />
                  {allStrings["string_you_deleted_this_message"]}
                  <span className={`h-[10px] w-[80px] ${message.type === "deleted" ? "hidden" : "inline-block"} `}></span>
                </p>
                : <Msg msg={message} setSelectedImages={setSelectedImages} />
            }
          </div>
          {message.type === "edited" && <div className='absolute -left-[25px] bottom-1'>
            <Image src={penIcon} alt="edit-icon" height={16} width={16} priority className="opacity-50 pointer-events-none" />
          </div>
          }
          {
            (!message?.get_all_chat_with_image?.length || message.text)
              ? <span className={`text-white/50 font-normal text-end text-[12px] items-center mt-1 min-w-[5rem] gap-x-1 justify-end ${message.type === "deleted" ? "hidden" : "flex"}  absolute bottom-[7px] right-[9px]`}>
                {formatTime(parseInt(message.milisecondtime))}
                <ReadTickRender isImage={false} message={message} user={user} />
              </span>
              : <div className={`w-[95%] absolute bottom-2 pt-[6px] px-1 h-8 rounded-b-md linear-bg ${message.type === "deleted" ? "hidden" : "flex"} gap-x-1 justify-end pointer-events-none items-center`}>
                <span className='text-[12px] font-normal text-white/50'>{formatTime(parseInt(message.milisecondtime))}</span>
                <ReadTickRender isImage={false} message={message} user={user} />
              </div>
          }
        </div>
      </div>
    )
  }
  return (
    <div className={`bg-[#626262] flex flex-col lg:flex-row lg:items-end max-w-[75%]  ${isFirstMessage ? "rounded-tr-[12px] rounded-br-[12px] rounded-tl-[12px]" : isLastMessage ? "rounded-bl-[12px] rounded-tr-[12px] rounded-br-[12px]" : " rounded-e-[12px]"}`}>
      <div className={`px-[7px] pt-2 pb-[7px] break-words relative flex items-end`}>
        <div className=" break-words text-[16px] font-normal leading-[22px] text-white/80 ">
          {
            message.type === "deleted" ?
              <p className='pe-2 ps-1 py-1 flex gap-x-1 select-text'>
                <Image src={Prohibition} alt="deleted-icon" height={13} width={13} priority className="opacity-70 pointer-events-none" />
                {allStrings["string_message_deleted"]}
              </p>
              : <Msg msg={message} setSelectedImages={setSelectedImages} />
          }
        </div>
        {
          message.type === "edited" && <div className='absolute -right-[25px] bottom-1'>
            <Image src={penIcon} alt="edit-icon" height={16} width={16} priority className="opacity-50 pointer-events-none" />
          </div>
        }
        {
          (!message?.get_all_chat_with_image?.length || message.text)
            ? <span className={`text-white/50 font-normal text-end text-[12px] items-center mt-1 min-w-[5rem] gap-x-1 justify-end ${message.type === "deleted" ? "hidden" : "flex"}  absolute bottom-[7px] right-[9px]`}>
              {formatTime(parseInt(message.milisecondtime))}
            </span>
            : <div className={`w-[95%] absolute bottom-[6px] pt-[6px] px-1 h-8 rounded-b-md linear-bg ${message.type === "deleted" ? "hidden" : "flex"} gap-x-1 justify-end pointer-events-none items-center`}>
              <span className='text-[12px] font-normal text-white/50'>{formatTime(parseInt(message.milisecondtime))}</span>
            </div>
        }
      </div>
    </div>
  )

}

export default Message