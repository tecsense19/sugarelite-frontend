
import React, { useEffect, useRef, useState } from 'react'
import chatScrollBottom from "/public/assets/chat_scroll_bottom_icon.svg";
import Image from 'next/image';
import { useStore } from '@/store/store';
import TypingAnimation from '../TypingAnimation/TypingAnimation';
import NewMessage from './NewMessage';
import { read_message_action } from '@/app/lib/actions';

const AllMessages = ({ chats, toUser, currentUser, socket, setEditingMsg, setShowMobileProfile, setDrawerOpen, sendingImages, setSelectedImages, lastUpdatedMsg, setLastUpdatedMsg, isTyping, unsendedMsgs }) => {

  const msgRef = useRef(null)

  const [isScroller, setIsScroller] = useState(false)
  const { state: { newMsgState, onlineUsers, chatPartnerList, toMessageState, readMsgsState }, dispatch } = useStore()

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

  useEffect(() => {
    scrollToBottom()
  }, [newMsgState])

  const scrollToBottom = () => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  };

  const scrollerHandler = () => {
    if (msgRef.current) {
      const position = -(msgRef.current.scrollTop)
      if (position >= 10) {
        setIsScroller(true)
      } else {
        setIsScroller(false)
      }
    }
  }

  useEffect(() => {
    const msgs = chats.filter(msg => msg.receiver_id === currentUser.id && msg.status !== "read")?.map(i => i.id)
    if (msgs.length && !readMsgsState.some(i => i === msgs[msgs.length - 1])) {
      read_message_action({ sender_id: toUser.id, receiver_id: currentUser.id, status: "read", messageId: msgs.toString() })
      dispatch({ type: "Add_Read_Message", payload: msgs[msgs.length - 1] })
    }
  }, [toUser])

  useEffect(() => {
    if (chats.length) {
      socket.emit("open-chat", { sender_id: currentUser.id, receiver_id: toUser.id, type: "opened", lastMsgId: chats[chats.length - 1].id });
    }
  }, [toUser])

  return (
    <div className={`${sendingImages.length ? "h-[calc(100%-222px)] md:h-[calc(100%-311px)]" : "md:h-[calc(100%-211px)] h-[calc(100%-122px)]"} flex flex-col justify-end`}>
      <div className="h-full w-full  p-4 md:py-5 md:px-10 overflow-hidden">
        <div className="relative w-full  h-full flex flex-col justify-end">
          <div ref={msgRef} className="flex flex-col-reverse overflow-y-auto scroll-smooth" onScroll={scrollerHandler} style={{ scrollbarWidth: "none" }}>
            <div>
              {chats && chats.map(i => {
                if (chatPartnerList.some(user => user.sender_id === toUser.id && i.id <= user.lastMsgId)) {
                  return { ...i, status: "read" }
                }
                else if (onlineUsers.some(id => id === toUser.id) && i.status === "sent" && chatPartnerList.some(user => user.sender_id === toUser.id && i.id <= user.lastMsgId)) {
                  return { ...i, status: "delivered" }
                } else {
                  return i
                }
              }).sort((a, b) => a.id - b.id).map((item, idx) => {
                const isLastMessage = idx === chats.length - 1 || chats[idx + 1]?.sender_id !== item.sender_id;
                const isFirstMessage = idx === 0 || chats[idx - 1]?.sender_id !== item.sender_id;
                // console.log(item)
                if (!item?.id) {
                  return <div className='text-center text-sm font-normal text-white/60 mb-10' key={idx} >You Started Chat With {toUser.username}</div>
                }
                return (
                  <div key={idx} className='flex flex-col'>
                    {
                      <div className={`py-[30px] md:py-10 relative flex justify-center w-full ${getChatDate(item.milisecondtime) ? "block" : "hidden"} `}>
                        <p className="absolute top-1/2 z-[0] -translate-y-1/2 bg-white/30 h-[1px] w-full"></p>
                        <p className="text-center font-medium bg-primary z-[1] px-2 text-[14px] md:text-[18px] leading-[20px] text-white/50">{currentDate}
                        </p>
                      </div>
                    }
                    <div className={`flex my-[2px] ${currentUser.id === item.sender_id ? "justify-end" : "justify-start"}`}>
                      <NewMessage user={currentUser} setShowMobileProfile={setShowMobileProfile} setDrawerOpen={setDrawerOpen} containerElement={msgRef} item={item} messages={chats} idx={idx} toUser={toUser} setEditingMsg={setEditingMsg} socket={socket} setSelectedImages={setSelectedImages} isLastMessage={isLastMessage} isFirstMessage={isFirstMessage} />
                    </div>
                  </div>
                )
              })}
              <div className={`mt-[30px] lg:mt-5 gap-2 md:gap-4 items-center ${isTyping.some(i => i.sender === toUser.id) ? "flex" : "hidden"}`} >
                {
                  toUser.avatar_url ? <Image src={toUser.avatar_url} height={30} width={30} alt="avatar" className="md:h-[40px] min-h-[30px] h-[30px] w-[30px] md:w-[40px] rounded-full" /> : <p className="h-[30px] w-[30px] md:h-[40px] md:w-[40px] bg-primary-dark-3 flex items-center justify-center rounded-full uppercase" data-aos='zoom-in'>{toUser.username.charAt(0)}</p>
                }
                <TypingAnimation />
              </div>
            </div>
          </div>
          {
            isScroller &&
            <button className="absolute right-0 bottom-1 bg-black rounded-full flex justify-center items-center h-10 w-10 z-20" onClick={scrollToBottom} data-aos='fade-up'>
              <Image src={chatScrollBottom} alt="" height={22} width={22} priority className="select-none pointer-events-none" />
            </button>
          }

        </div>
      </div>
    </div>
  )
}

AllMessages.displayName = "AllMessages"

export default React.memo(AllMessages)