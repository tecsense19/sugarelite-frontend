import UserComponent from "./UserComponent"
import { useEffect, useState } from "react"
import { useStore } from "@/store/store"

const ChatListItems = ({ setSelectedObj, setShowMobileChatContent, chatList, currentUser, socket, selectedObj }) => {

  const [list, setList] = useState(chatList)

  const [mySocket, setMysocket] = useState(socket)
  const [unReadCount, setUnReadCount] = useState(0)
  const [unReadUsers, setUnreadUsers] = useState([55])

  const { state: { toMessageState, chatsState }, dispatch } = useStore()

  useEffect(() => {
    setMysocket(socket)
  }, [socket])

  useEffect(() => {
    if (!mySocket) return;
    const receiveMessageHandler = (obj) => {
      if (obj.msg.receiver_id === currentUser.id) {
        dispatch({ type: "Update_Chats", payload: { obj: obj.msg, type: "socket", user: obj.user } });
        if (selectedObj?.id !== obj.msg.sender_id) {
          setUnReadCount((prev) => prev + 1);
          setUnreadUsers(prev => {
            if (prev.indexOf(obj.msg.sender_id) === -1) {
              return [...prev, obj.msg.sender_id];
            }
            return prev;
          })
        }
      }
    };

    mySocket.on("receive-message", receiveMessageHandler);

    return () => {
      mySocket.off("receive-message", receiveMessageHandler);
    };
  }, [mySocket, currentUser.id, dispatch, setUnReadCount]);

  useEffect(() => {
    if (toMessageState.length) {
      const temp = [...chatList];
      let existingUserIndex = -1;

      toMessageState.forEach(element => {
        const index = temp.findIndex(i => i.user.id === element.id);
        if (index === -1) {
          temp.unshift({ user: element, latestMsg: {} });
        } else {
          existingUserIndex = index;
        }
      });

      setList(temp);

      if (existingUserIndex !== -1) {
        setSelectedObj(temp[existingUserIndex].user);
      } else {
        setSelectedObj(temp[0].user)
      }
    }

  }, [toMessageState])


  useEffect(() => {
    const item = chatsState[chatsState.length - 1];
    if (item) {
      if (!item.obj) {
        const remainUsers = list.filter(i => i.user.id !== item.receiver_id);
        const update = {
          user: list.find(i => i.user.id === item.receiver_id)?.user || '',
          latestMsg: item
        };
        setList([update, ...remainUsers]);
      }
      else if (item.type === "socket") {
        const existingUserIndex = list.findIndex(i => i.user.id === item.obj.receiver_id);
        if (existingUserIndex !== -1) {
          const newList = [...list];
          newList[existingUserIndex].latestMsg = item.obj;
          const updatedUser = newList.splice(existingUserIndex, 1)[0];
          newList.unshift(updatedUser);
          setList(newList);
        } else {
          const remainUsers = list.filter(i => i.user.id !== item.obj.sender_id);
          const update = {
            user: item.user,
            latestMsg: item.obj
          };
          setList([update, ...remainUsers]);
        }
      }
    }
  }, [chatsState]);


  useEffect(() => {
    const arr = unReadUsers.filter((i) => i !== selectedObj.id)
    setUnreadUsers(arr)
    setUnReadCount(0)
  }, [selectedObj])



  return (
    <>
      <div className="mt-5 px-5 md:mt-[30px] md:px-[30px]">
        <div className="text-[20px] md:text-[26px] font-semibold md:font-bold leading-[30px]">My Chat List</div>
      </div>
      <div className="flex md:hidden flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100%-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 md:me-3 md:pe-3 second-child" style={{ scrollbarWidth: "none" }}>

        {
          list.map((item, inx) => {
            return (
              <UserComponent user={item.user} message={item.latestMsg} setSelectedObj={setSelectedObj} setShowMobileChatContent={setShowMobileChatContent} key={inx} unReadCount={unReadCount} unReadUsers={unReadUsers} />
            )
          })
        }
      </div>
      <div className="hidden md:flex flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100%-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 md:me-3 md:pe-3 md:second-child" style={{ scrollbarWidth: "none" }}>

        {
          list.map((item, inx) => {
            return (
              <UserComponent user={item.user} message={item.latestMsg} setSelectedObj={setSelectedObj} setShowMobileChatContent={setShowMobileChatContent} key={inx} unReadCount={unReadCount} unReadUsers={unReadUsers} />
            )
          }
          )
        }

      </div >
    </>
  )
}

export default ChatListItems