import { ChatItem } from "react-chat-elements"

const ChatListItems = ({ profiles, setSelectedObj, showMobileChatContent, setShowMobileChatContent }) => {
  return (
    <>
      <div className="mt-5 px-5 md:mt-[30px] md:px-[30px]">
        <div className="text-[20px] md:text-[26px] font-semibold md:font-bold leading-[30px]">My Chat List</div>
      </div>
      <div className="flex md:hidden flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100%-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 md:me-3 md:pe-3 md:second-child" style={{ scrollbarWidth: "none" }}>
        {profiles?.map((item, idx) => {
          return (
            <ChatItem
              onClick={() => { setSelectedObj(item); setShowMobileChatContent(true) }}
              key={idx}
              className="rounded-[5px] overflow-hidden border-[1px] border-white/30"
              statusColor={item.online ? "#3DC73A" : (item.last_activity === "near" ? "#FEBF0F" : "")}
              avatar={item.img_url.src}
              alt=''
              title={item.name}
              subtitle={item.last_msg}
              date={item.time}
              unread={item.unread_count}
            />
          )
        })}
      </div>
      <div className="hidden md:flex flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100%-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 md:me-3 md:pe-3 md:second-child" style={{ scrollbarWidth: "none" }}>
        {profiles?.map((item, idx) => {
          return (
            <ChatItem
              onClick={() => setSelectedObj(item)}
              key={idx}
              className="rounded-[5px] overflow-hidden border-[1px] border-white/30"
              statusColor={item.online ? "#3DC73A" : (item.last_activity === "near" ? "#FEBF0F" : "")}
              avatar={item.img_url.src}
              alt=''
              title={item.name}
              subtitle={item.last_msg}
              date={item.time}
              unread={item.unread_count}
            />
          )
        })}
      </div>
    </>
  )
}

export default ChatListItems