"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image";
import 'react-chat-elements/dist/main.css'
import "./ChatList.css";
import chatArrowRight from "../../public/assets/chat_arrow_right.png";
import arrowLeft from "../../public/assets/arrow_left.svg";
import ChatListItems from "./ChatListItems";
import { useRouter } from "next/navigation";
import { client_routes } from "@/app/lib/helpers";
import PopOver from "../profile/commons/PopOver";
import more_horizontal from "/public/assets/more_horizontal.svg"

const ChatList = ({ setSelectedObj, showMobileChatContent, setShowMobileChatContent, chatList, currentUser, socket, selectedObj }) => {

  const navigate = useRouter()

  const horizontalProfilesRef = useRef(null);
  const [showProfileScrollLeftBtn, setShowProfileScrollLeftBtn] = useState(false)
  const [showProfileScrollRightBtn, setShowProfileScrollRightBtn] = useState(false)


  useEffect(() => {
    const AOS = require("aos");
    AOS.init();

    const container = horizontalProfilesRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };

  }, [])

  useEffect(() => {
    handleScroll()
  }, [chatList])

  const handleScroll = () => {
    if (horizontalProfilesRef.current) {
      let leftScroll = horizontalProfilesRef.current.scrollLeft;
      let maxLeftScroll = horizontalProfilesRef.current.scrollWidth - horizontalProfilesRef.current.clientWidth;
      (leftScroll === 0) ? setShowProfileScrollLeftBtn(false) : setShowProfileScrollLeftBtn(true);
      (leftScroll === maxLeftScroll) ? setShowProfileScrollRightBtn(false) : setShowProfileScrollRightBtn(true);
    }
  };

  const handleHorizontalScrollBtn = (val) => {
    if (horizontalProfilesRef.current) {
      horizontalProfilesRef.current.scrollBy({
        left: val,
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
      <div className='w-full md:w-[350px] lg:w-[400px] bg-primary-dark-3 h-full py-[14px] md:py-[30px]' data-aos="fade-right" data-aos-duration="800">
        {chatList && chatList.length
          ? <>
            <div className="md:hidden relative flex justify-between px-4 items-center">
              <button className="flex justify-center items-center " onClick={() => { navigate.push(client_routes.profile); setSelectedObj("") }}>
                <Image src={arrowLeft} alt="" height={24} width={24} className="pointer-events-none" />
              </button>
              <div className="text-[24px] font-semibold leading-[22.8px]">Messages</div>
              <PopOver>
                <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
              </PopOver>
            </div>
            <div className="text-[20px] md:text-[26px] font-semibold md:font-bold leading-[30px] px-4 md:px-[30px] mt-5 md:mt-0">
              Favorites
            </div>
            <div className="relative flex items-center mt-[10px] md:mt-5 px-4 md:px-[22px] mx-1">
              <button className={`absolute left-0 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollLeftBtn ? "flex" : "hidden"}`} onClick={() => handleHorizontalScrollBtn(-40)}>
                <Image src={chatArrowRight} alt="" height={1000} width={1000} priority className="h-full w-full pointer-events-none rotate-180" />
              </button>
              <div ref={horizontalProfilesRef} className={`horizontal-profiles flex gap-x-4 overflow-x-auto items-center ${showProfileScrollLeftBtn ? "ps-5" : "ps-0"} ${showProfileScrollRightBtn ? "pe-6" : "pe-0"}`} style={{ scrollbarWidth: "none" }}>
                {chatList?.map((item, idx) => {
                  return (
                    <button key={idx} className="flex items-center justify-center scroll-smooth" onClick={() => {
                      setSelectedObj(item.user);
                      if (window.innerWidth < 768) {
                        setShowMobileChatContent(true);
                      }
                    }}>
                      {
                        item.user.avatar_url ?
                          <Image src={item.user.avatar_url} alt="" height={40} width={40} priority className="aspect-square min-h-10 min-w-10 object-cover rounded-full pointer-events-none" />
                          : <p className="h-10 w-10 flex items-center justify-center bg-primary rounded-full text-[18px] uppercase">{item.user.username.charAt(0)}</p>
                      }
                    </button>
                  )
                })}
              </div>
              <button className={`absolute right-0 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollRightBtn ? "flex" : "hidden"}`} onClick={() => handleHorizontalScrollBtn(40)}>
                <Image src={chatArrowRight} alt="" height={1000} width={1000} priority className="h-full w-full pointer-events-none" />
              </button>
            </div>
            <ChatListItems selectedObj={selectedObj} setSelectedObj={setSelectedObj} socket={socket} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} chatList={chatList} currentUser={currentUser} />
          </>
          :
          <div className="flex h-full justify-center w-full items-center">No Chats Found!</div>
        }
      </div>
    </>
  )
}

export default ChatList