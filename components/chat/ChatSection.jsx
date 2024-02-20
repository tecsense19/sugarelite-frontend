import Image from "next/image";
import optionsIcon from "../../public/assets/chat_options_icon.svg";
import { ConfigProvider, Popover } from "antd";
import { useEffect, useState } from "react";
// import Img1 from "../../public/assets/profile_img_1.png";
import starIcon from "../../public/assets/chat_option_star_icon.svg";
import reportIcon from "../../public/assets/chat_report_icon.svg";
import blockIcon from "../../public/assets/chat_block_icon.svg";
import smileIcon from "../../public/assets/smile_icon.svg";
import attachmentIcon from "../../public/assets/attachment_icon.svg";
import sendIcon from "../../public/assets/send_icon.svg";

const ChatSection = ({ selectedObj, profiles }) => {
  // const timeBefore30Mins = new Date().setMinutes(new Date().getMinutes() - 30);
  // const selectedObj = { id: 1, img_url: Img1, name: "Kinjal", time: timeBefore30Mins, online: true, last_activity: "", unread_count: 3, last_msg: "How are you john?" };
  const [user, setUser] = useState("")
  const [showOptions, setShowOptions] = useState(false);
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setUser(profiles[0])
    const timeBefore2Mins = new Date(new Date().getTime() - (2 * 60000));
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true // This will display time in AM/PM format
    };
    const formattedTime = timeBefore2Mins.toLocaleTimeString([], { hour12: true });
    console.log(formattedTime)
    setMessages([
      { message: "Hello", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "Hii", from: profiles[1], to: profiles[0], time: formattedTime },
      { message: "How are you!", from: profiles[0], to: profiles[1], time: formattedTime },
      { message: "I am good! What about you.", from: profiles[1], to: profiles[0], time: formattedTime },
      { message: "I am also good.", from: profiles[0], to: profiles[1], time: formattedTime }
    ])
  }, [])

  const handleShowOptionsChange = (val) => {
    setShowOptions(val)
  }
  return (
    <>
      {user &&
        <>
          <div className="w-full border-b-[1px] border-white/30 px-10 py-5 flex justify-between items-center">
            <div className="flex items-center">
              <Image src={selectedObj.img_url.src} alt="" height={60} width={60} priority className="pointer-events-none rounded-full" />
              <div className="text-[22px] font-semibold leading-[20px] ms-6">{selectedObj.name}</div>
              {selectedObj.online
                ? <div className="ms-[10px] flex items-center">
                  <div className="h-[9px] w-[9px] bg-[#3DC73A] rounded-full" />
                  <div className="ms-[10px] text-white/50 text-[14px] font-medium leading-[20px]">Active</div>
                </div>
                : <>
                  {selectedObj.last_activity === "near"
                    ? <div className="ms-[10px] flex items-center">
                      <div className="h-[9px] w-[9px] bg-[#FEBF0F] rounded-full" />
                      <div className="ms-[10px] text-white/50 text-[14px] font-medium leading-[20px]">5 mins ago</div>
                    </div>
                    : <></>
                  }
                </>
              }
            </div>
            <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
              <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                <div className="text-white flex flex-col p-[10px] gap-y-[6px]">
                  <button className="bg-secondary w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                    <Image src={starIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                    <div className="text-[14px] font-medium leading-[20px]">Favorites</div>
                  </button>
                  <button className="bg-primary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                    <Image src={reportIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                    <div className="text-[14px] font-medium leading-[20px]">Rapporter</div>
                  </button>
                  <button className="bg-primary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                    <Image src={blockIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                    <div className="text-[14px] font-medium leading-[20px]">Blocker</div>
                  </button>
                </div>
              )}>
                <button className="h-[30px] w-[30px] flex items-center">
                  <Image src={optionsIcon} alt="" height={30} width={30} priority className="pointer-events-none rounded-full" />
                </button>
              </Popover>
            </ConfigProvider>
          </div>
          <div className="h-[calc(100%-101px)] flex flex-col justify-end">
            <div className="chat-container w-full h-full overflow-y-auto py-5 px-10 flex flex-col justify-end">
              {messages.map((item, idx) => {
                return (
                  <div key={idx} className={`flex my-[1px] ${user.id === item.from.id ? "justify-end" : "justify-start"}`}>
                    {user.id === item.from.id
                      ? <div className="flex items-end max-w-[70%]">
                        <div className="px-5 py-[10px] rounded-[15px] !rounded-br-[0px] bg-secondary flex flex-col items-start">
                          <div className="flex justify-start items-end">
                            <div> {item.from.name} </div>
                            <div> {item.time} </div>
                          </div>
                          <div className="break-words max-w-full">
                            {item.message}
                          </div>
                        </div>
                        <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="pointer-events-none rounded-full ms-5" />
                      </div>
                      : <div className="flex items-end max-w-[70%]">
                        <Image src={item.from.img_url.src} alt="" height={40} width={40} priority className="pointer-events-none rounded-full me-5" />
                        <div className="px-5 py-[10px] rounded-[15px] !rounded-bl-[0px] break-words max-w-[90%] bg-primary-dark-3">
                          <div className="flex justify-start items-end">
                            <div> {item.from.name} </div>
                            <div> {item.time} </div>
                          </div>
                          <div className="break-words max-w-full">
                            {item.message}
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                )
              })}
            </div>
            <div className="w-full flex px-10 pb-10">
              <div className="w-full h-[70px] rounded-[5px] bg-black flex items-center px-[30px]">
                <button>
                  <Image src={smileIcon} alt="" height={28} width={28} className="pointer-events-none" />
                </button>
                <input type="text" placeholder="Type a message..." className="mx-[30px] bg-transparent border-0 !outline-none w-[calc(100%-181px)]" />
                <button>
                  <Image src={attachmentIcon} alt="" height={28} width={28} className="pointer-events-none" />
                </button>
                <button className="h-[35px] w-[35px] bg-secondary flex justify-center items-center ms-[30px] rounded-full">
                  <Image src={sendIcon} alt="" height={18} width={18} className="pointer-events-none" />
                </button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default ChatSection