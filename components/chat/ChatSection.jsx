import Image from "next/image";
import { ConfigProvider, Drawer } from "antd";
import { useEffect, useRef, useState } from "react";
// import Img1 from "../../public/assets/profile_img_1.png";
import smileIcon from "../../public/assets/smile_icon.svg";
import attachmentIcon from "../../public/assets/attachment_icon.svg";
import sendIcon from "../../public/assets/send_icon.svg";
import chatScrollBottom from "../../public/assets/chat_scroll_bottom_icon.svg";
import ChatProfile from "./ChatProfile";
import Message from "./Message";
import ChatSectionHeader from "./ChatSectionHeader";
import { useForm } from "react-hook-form";
import { send_message_action } from "@/app/lib/actions";
import { io } from 'socket.io-client';
import { socket_server } from "@/app/lib/helpers";

let socket;


const ChatSection = ({ selectedObj, profiles, showMobileChatContent, setShowMobileChatContent, currentUser, chat }) => {

  const [user, setUser] = useState(currentUser)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);


  const msgContainerRef = useRef(null)

  const { register, handleSubmit, reset } = useForm()



  useEffect(() => {
    socket = io(socket_server)
    window.addEventListener("resize", closeAll)

    return () => {
      window.removeEventListener("resize", closeAll)
      if (socket) {
        socket.disconnect();
      }
    }
  }, [])

  const handleChatScrollBtn = () => {
    if (msgContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = msgContainerRef.current;
      if (scrollTop === 0) {
        setShowScrollToBottom(false)
      } else {
        setShowScrollToBottom(true)
      }
    }
  }

  const scrollMsgsToBottom = () => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }

  const closeAll = () => {
    if (setShowMobileChatContent) {
      setShowMobileChatContent(false);
    }
    setShowMobileProfile(false);
    setDrawerOpen(false)
  }

  const onDrawerClose = () => {
    setDrawerOpen(false)
  }

  const sendMessageHandler = async ({ message }) => {
    socket = io(socket_server)
    if (message.length && currentUser && selectedObj) {
      let obj = { sender_id: currentUser.id, receiver_id: selectedObj.id, message: message, type: "regular" }
      const res = await send_message_action(obj)
      if (res.success) {
        scrollMsgsToBottom()
        reset()
        socket.emit("send-message", res.message)
      } else {
        console.log(res.message)
      }
    }
  }

  let currentDate = null

  const getChatDate = (stamp) => {
    const currentTime = new Date()
    const c_date = currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : currentTime.getDate()
    const c_mon = (currentTime.getMonth() + 1) < 10 ? `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1
    const c_year = currentTime.getFullYear()

    const c_fulldate = c_date + "-" + c_mon + "-" + c_year

    const yesterday_fulldate = (currentTime.getDate() < 10 ? `0${currentTime.getDate() - 1}` : currentTime.getDate() - 1) + "-" + c_mon + "-" + c_year


    const time = new Date(parseInt(stamp))
    const date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
    const mon = (time.getMonth() + 1) < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
    const year = time.getFullYear()

    const fulldate = date + "-" + mon + "-" + year

    const isToday = fulldate === c_fulldate && "Today"
    const isYesterDay = fulldate === yesterday_fulldate && "Yesterday"

    if (isToday && (isToday !== currentDate)) {
      currentDate = isToday
      return isToday
    }

    if (isYesterDay && (isYesterDay !== currentDate)) {
      currentDate = isYesterDay
      return isYesterDay
    }

    if (!isToday && !isYesterDay) {
      const inputDateString = fulldate
      const parts = inputDateString.split("-");
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const monthName = monthNames[parseInt(month) - 1]
      const outputDateString = day + " " + monthName + ", " + year;

      if (outputDateString !== currentDate) {
        currentDate = outputDateString
        return outputDateString
      }
    }
  }

  return (
    <>
      {user &&
        <div className="flex h-full">
          {(showMobileProfile === false || window.innerWidth > 768) &&
            <div className="w-full 2xl:w-[calc(100%-400px)] flex flex-col h-full" data-aos='fade-up'>
              <ChatSectionHeader setDrawerOpen={setDrawerOpen} selectedObj={selectedObj} setShowMobileChatContent={setShowMobileChatContent} setShowMobileProfile={setShowMobileProfile} />
              <div className="h-[calc(100%-60px)] md:h-[calc(100%-101px)] flex flex-col justify-end ">
                <div className="h-full w-full  p-4 md:py-5 md:px-10 overflow-hidden">
                  <div className="relative w-full  h-full flex flex-col justify-end">
                    <div ref={msgContainerRef} onScroll={handleChatScrollBtn} className="flex flex-col-reverse overflow-y-auto scroll-smooth" style={{ scrollbarWidth: "none" }}>
                      <div>
                        {chat && chat.map((item, idx) => {
                          return (
                            <div key={idx}>
                              {
                                <div className={`py-[30px] md:py-10 relative flex justify-center w-full ${getChatDate(item.milisecondtime) ? "block" : "hidden"} `}>
                                  <p className="absolute top-1/2 -translate-y-1/2 bg-white/30 h-[1px] w-full"></p>
                                  <p className="text-center font-medium bg-primary z-10 px-2 text-[14px] md:text-[18px] leading-[20px] text-white/50">{currentDate}</p>
                                </div>
                              }
                              <div className={`flex my-[2px] ${user.id === item.sender_id ? "justify-end" : "justify-start"}`}>
                                <Message containerElement={msgContainerRef} user={currentUser} item={item} messages={chat} idx={idx} toUser={selectedObj} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    {showScrollToBottom &&
                      <button className="absolute right-0 bottom-0 bg-black rounded-full flex justify-center items-center h-10 w-10" onClick={scrollMsgsToBottom} data-aos='fade-up'>
                        <Image src={chatScrollBottom} alt="" height={22} width={22} priority className="select-none pointer-events-none" />
                      </button>
                    }
                  </div>
                </div>

                <div className="w-full flex px-4 pb-[18px] md:px-10 md:pb-10">
                  <form onSubmit={handleSubmit(sendMessageHandler)} className="w-full h-12 md:h-[70px] rounded-[5px] bg-black flex items-center px-3 md:px-[30px]">
                    <button>
                      <Image src={smileIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                      <Image src={smileIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                    </button>
                    <input type="text" {...register('message')} placeholder="Type a message..." className="mx-[10px] md:mx-[30px] bg-transparent border-0 !outline-none w-[calc(100%-102px)] md:w-[calc(100%-181px)] text-[16px] md:text-[18px] font-medium leading-[24px]" autoComplete="off" />
                    <button>
                      <Image src={attachmentIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                      <Image src={attachmentIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                    </button>
                    <button type="submit" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] bg-secondary flex justify-center items-center ms-3 md:ms-[30px] rounded-full" >
                      <Image src={sendIcon} priority alt="" height={18} width={18} className="hidden md:block pointer-events-none" />
                      <Image src={sendIcon} priority alt="" height={15.5} width={15.5} className="md:hidden pointer-events-none" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          }
          <div className="hidden 2xl:block w-[400px]" data-aos='fade-left'>
            <ChatProfile selectedObj={selectedObj} />
          </div>
          {showMobileChatContent
            ? <>
              {showMobileProfile ? <ChatProfile selectedObj={selectedObj} setShowMobileProfile={setShowMobileProfile} /> : <></>}
            </>
            : <ConfigProvider theme={{ token: { colorBgElevated: "#2d2d2d" } }}>
              <Drawer width={400} closable={false} onClose={onDrawerClose} open={drawerOpen} style={{ container: { width: "400px" } }} styles={{ body: { padding: "0px" } }}>
                <ChatProfile selectedObj={selectedObj} />
              </Drawer>
            </ConfigProvider>
          }
        </div>
      }
    </>
  )
}

export default ChatSection