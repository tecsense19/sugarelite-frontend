import Image from 'next/image';
import { useEffect, useState } from 'react';
import optionsIcon from "/public/assets/chat_options_icon.svg";
import { ConfigProvider, Popover } from 'antd';
import deleteIcon from "/public/assets/delete.svg";
import editIcon from "/public/assets/edit.svg";
import penIcon from "/public/assets/pen.svg";
import { send_message_action } from '@/app/lib/actions';

const Message = ({ user, item, messages, idx, containerElement, toUser, setEditingMsg, socket }) => {

  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptionsChange = (val) => {
    setShowOptions(val)
  }


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

  const msgDeleteHandler = async () => {
    let obj = { sender_id: item.sender_id, receiver_id: item.receiver_id, type: "deleted", id: item.id }
    const res = await send_message_action(obj)
    if (res.success) {
      socket.emit("delete-message", obj)
    }
  }

  const msgEditHandler = () => {
    setEditingMsg({ message: item.text, id: item.id })
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
                        <Image src={user.avatar_url} alt="avatar" height={40} width={40} priority className="lg:hidden h-[40px] w-10 pointer-events-none rounded-full mb-[10px]" />
                      </> : <>
                        <p className='h-10 uppercase w-10 bg-primary-dark flex justify-center items-center lg:hidden pointer-events-none rounded-full mb-[10px]'>{user.username.charAt(0)}</p>
                      </>
                    }
                  </>
                }
              </> : <>
                {
                  user.avatar_url ? <>
                    <Image src={user.avatar_url} alt="" height={40} width={40} priority className="lg:hidden pointer-events-none w-10 h-10 rounded-full mb-[10px]" />
                  </> : <>
                    <p className='h-10 w-10 uppercase bg-primary-dark flex justify-center items-center lg:hidden pointer-events-none rounded-full mb-[10px]'>{user.username.charAt(0)}</p>
                  </>
                }
              </>
            }
            <div className="ps-5 pe-[5px] lg:pe-[6px] py-[10px] rounded-[15px] max-w-full lg:max-w-[calc(100%-60px)] rounded-tr-[0px] lg:rounded-tr-[15px] lg:rounded-br-[0px] bg-secondary flex flex-col items-start relative">
              <div className="flex justify-between items-center">
                <div className='flex justify-start items-end'>
                  <div className="text-[18px] md:text-[20px] font-medium leading-[20px]"> {user.username} </div>
                  <div className="ms-5 text-[16px] italic font-normal leading-[20px] text-white/70"> {getChatTime(item.milisecondtime)} </div>
                </div>
                <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                  <Popover placement="leftBottom" trigger="click" rootClassName='message-container' open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                    <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                      <button className="bg-secondary w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={msgDeleteHandler}>
                        <Image src={deleteIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                        <div className="text-[14px] font-medium leading-[20px]">Delete</div>
                      </button>
                      <button className="bg-primary border-[1px] border-white/30 h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm" onClick={msgEditHandler}>
                        <Image src={editIcon} alt="" height={15} width={15} priority className="ms-5 pointer-events-none" />
                        <div className="text-[14px] font-medium leading-[20px]">Edit</div>
                      </button>
                    </div>
                  )}>
                    {item.type === "deleted" ? <div className="h-[20px] w-[20px] flex justify-center items-center ms-6 lg:-translate-y-1 pointer-events-none"></div> :
                      <button className="h-[20px] w-[20px] flex justify-center items-center ms-6 lg:-translate-y-1">
                        <Image src={optionsIcon} alt="" height={20} width={20} priority className="pointer-events-none" />
                      </button>
                    }
                  </Popover>
                </ConfigProvider>
              </div>
              <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80">
                {item.type === "deleted" ? <span className='pe-2'>You deleted this message.</span> : item?.text}
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
                        <Image src={user.avatar_url} alt="" height={50} width={50} priority className="hidden lg:block h-[50px] w-[50px] pointer-events-none rounded-full ms-5" />
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
                    <Image src={user.avatar_url} alt="" height={50} width={50} priority className="hidden h-[50px] w-[50px] lg:block pointer-events-none rounded-full ms-5" />
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
                  <>
                    {
                      toUser.avatar_url ? <>
                        <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="lg:hidden h-[40px] pointer-events-none rounded-full mb-[10px]" />
                      </> : <p className="lg:hidden pointer-events-none rounded-full mb-[10px] flex justify-center uppercase items-center bg-primary-dark-3 h-10 w-10">{toUser.username.charAt(0)}</p>
                    }
                  </>
                }
              </>
              : <>
                {
                  toUser.avatar_url ? <>
                    <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="lg:hidden h-[40px] pointer-events-none rounded-full mb-[10px]" />
                  </> : <p className="lg:hidden pointer-events-none rounded-full mb-[10px] uppercase flex justify-center items-center bg-primary-dark-3 h-10 w-10">{toUser.username.charAt(0)}</p>
                }
              </>
            }

            {messages[idx + 1]
              ? <>
                {item.sender_id !== messages[idx + 1].sender_id
                  ? <>
                    {
                      toUser.avatar_url ? <>
                        <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="hidden h-[40px] lg:block pointer-events-none rounded-full me-5" />
                      </> : <p className="hidden lg:flex pointer-events-none rounded-full me-5 uppercase justify-center items-center h-10 w-10 bg-primary-dark-3">{toUser.username.charAt(0)}</p>
                    }
                  </>
                  : <div className="hidden lg:block w-[60px]"></div>
                }
              </>
              : <>
                {
                  toUser.avatar_url ? <>
                    <Image src={toUser.avatar_url} alt="" height={40} width={40} priority className="hidden lg:block h-10 pointer-events-none rounded-full me-5" />
                  </> : <p className="hidden lg:flex pointer-events-none rounded-full uppercase me-5 justify-center items-center h-10 w-10 bg-primary-dark-3">{toUser.username.charAt(0)}</p>
                }
              </>
            }

            <div className="ps-3 pe-5 md:px-5 py-[10px] max-w-full lg:max-w-[calc(100%-60px)] rounded-[15px] rounded-tl-[0px] lg:rounded-tl-[15px] lg:rounded-bl-[0px] break-words bg-primary-dark-3 relative">
              <div className="flex justify-start items-end">
                <div className="text-[18px] md:text-[20px] font-medium leading-[20px]"> {toUser.username} </div>
                <div className="ms-5 text-[16px] italic font-normal leading-[20px] text-white/70"> {getChatTime(item.milisecondtime)} </div>
              </div>
              {item.type === "deleted" ?
                <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80">
                  This message was deleted.
                </div> :
                <div className="mt-[10px] break-words max-w-full text-[16px] font-normal leading-[20px] text-white/80">
                  {item?.text}
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

export default Message