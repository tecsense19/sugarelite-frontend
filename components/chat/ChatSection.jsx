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

const ChatSection = ({ selectedObj, profiles, showMobileChatContent, setShowMobileChatContent }) => {
  // const timeBefore30Mins = new Date().setMinutes(new Date().getMinutes() - 30);
  // const selectedObj = { id: 1, img_url: Img1, name: "Kinjal", time: timeBefore30Mins, online: true, last_activity: "", unread_count: 3, last_msg: "How are you john?" };
  const [user, setUser] = useState("")
  const [messages, setMessages] = useState([])
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const msgContainerRef = useRef(null)

  useEffect(() => {
    setUser(profiles[0])
    const timeBefore2Mins = new Date(new Date().getTime() - (2 * 60000));
    const formattedTime = timeBefore2Mins.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setMessages([
      { message: "Hello", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "Hii", from: profiles[1], to: profiles[0], time: formattedTime },
      { message: "Hii", from: profiles[1], to: profiles[0], time: formattedTime },
      { message: "How are you!", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am good! What about you.", from: profiles[1], to: profiles[0], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime },
    ])
    scrollMsgsToBottom()
    setTimeout(() => {
      let container = msgContainerRef.current
      container.addEventListener("scroll", handleChatScrollBtn)
    })
    window.addEventListener("resize", closeAll)
    return () => {
      window.removeEventListener("resize", closeAll)
      setTimeout(() => {
        let container = msgContainerRef.current;
        if (container) {
          container.removeEventListener("scroll", handleChatScrollBtn)
        }
      })
    }
  }, [])


  const handleChatScrollBtn = () => {
    const objDiv = msgContainerRef.current;
    const maxScroll = objDiv.scrollHeight - objDiv.clientHeight;
    if (objDiv.scrollTop < (maxScroll - 100)) {
      setShowScrollToBottom(true)
    } else {
      setShowScrollToBottom(false)
    }
  }

  const scrollMsgsToBottom = () => {
    setTimeout(() => {
      if (msgContainerRef.current) {
        const objDiv = msgContainerRef.current;
        const maxScroll = objDiv.scrollHeight - objDiv.clientHeight;
        if (objDiv) {
          objDiv.scrollTop = maxScroll;
        }
        setShowScrollToBottom(false);
      }
    })
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
  return (
    <>
      {user &&
        <div className="flex h-full">
          {(showMobileProfile === false || window.innerWidth > 768) &&
            <div className="w-full 2xl:w-[calc(100%-400px)] flex flex-col h-full" data-aos='fade-up'>
              <ChatSectionHeader setDrawerOpen={setDrawerOpen} selectedObj={selectedObj} setShowMobileChatContent={setShowMobileChatContent} setShowMobileProfile={setShowMobileProfile} />
              <div className="h-[calc(100%-60px)] md:h-[calc(100%-101px)] flex flex-col justify-end">
                <div className="relative w-full h-full overflow-y-hidden p-4 md:py-5 md:px-10 flex flex-col justify-end">
                  <div ref={msgContainerRef} className="relative w-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                    {messages.map((item, idx) => {
                      return (
                        <div key={idx} className={`flex my-[2px] ${user.id === item.from.id ? "justify-end" : "justify-start"}`}>
                          <Message containerElement={msgContainerRef} user={user} item={item} messages={messages} idx={idx} />
                        </div>
                      )
                    })}
                  </div>
                  {showScrollToBottom &&
                    <button className="absolute right-4 bottom-4 md:right-10 md:bottom-5 bg-black rounded-full flex justify-center items-center h-10 w-10" onClick={scrollMsgsToBottom} data-aos="fade-up">
                      <Image src={chatScrollBottom} alt="" height={22} width={22} priority className="select-none pointer-events-none" />
                    </button>
                  }
                </div>
                <div className="w-full flex px-4 pb-[18px] md:px-10 md:pb-10">
                  <div className="w-full h-12 md:h-[70px] rounded-[5px] bg-black flex items-center px-3 md:px-[30px]">
                    <button>
                      <Image src={smileIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                      <Image src={smileIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                    </button>
                    <input type="text" placeholder="Type a message..." className="mx-[10px] md:mx-[30px] bg-transparent border-0 !outline-none w-[calc(100%-102px)] md:w-[calc(100%-181px)] text-[16px] md:text-[18px] font-medium leading-[24px]" />
                    <button>
                      <Image src={attachmentIcon} priority alt="" height={28} width={28} className="hidden md:block pointer-events-none" />
                      <Image src={attachmentIcon} priority alt="" height={20} width={20} className="md:hidden pointer-events-none" />
                    </button>
                    <button className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] bg-secondary flex justify-center items-center ms-3 md:ms-[30px] rounded-full">
                      <Image src={sendIcon} priority alt="" height={18} width={18} className="hidden md:block pointer-events-none" />
                      <Image src={sendIcon} priority alt="" height={15.5} width={15.5} className="md:hidden pointer-events-none" />
                    </button>
                  </div>
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