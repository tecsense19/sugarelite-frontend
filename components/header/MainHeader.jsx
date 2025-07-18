"use client"
import { client_notification, client_routes, server_routes, socket_server } from "@/app/lib/helpers"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
// import logo from "../../public/assets/Logo (1).svg"
import logo from "../../public/assets/main-site-logo.svg"
import notificationIcon from "../../public/assets/Mask group (1).svg"
import messages from "../../public/assets/Mask group.svg"
import search from "../../public/assets/search.svg"
import { useStore } from "@/store/store"
import { friend_request_notifications, logout_user, private_album_notification, read_message_action, search_profile_action } from "@/app/lib/actions"
import Link from "next/link"
import Notification from "../common/Notification"
import { useEffect, useState } from "react"
import { disconnectSocket } from "@/app/lib/socket"
import SideDrawer from "../common/SideDrawer"
// import { notification } from "antd"
import NotificationComaponent from "../common/Notifications/NotificationComaponent"
import { useSocket } from "@/store/SocketContext"

const MainHeader = ({ decryptedUser, allUsers, chatList, allFriendNotifications }) => {
  const { state: { userState, notificationOpenState, notifyBadgeState, toMessageState, chatProfileState, onlineUsers }, dispatch } = useStore()
  const pathname = usePathname()
  const router = useRouter()
  // const socket = getSocket()
  const { mySocket } = useSocket();
  const socket = mySocket;

  const [user, setUser] = useState(userState ? userState : decryptedUser)

  useEffect(() => {
    setUser(userState ? userState : decryptedUser)
  }, [userState])

  useEffect(() => {
    // console.log(allFriendNotifications)
    if (userState) {
      const mySendedRequests = allFriendNotifications.filter(i => (i.sender_id === userState.id && !i.message))
      const myRecievedRequests = allFriendNotifications.filter(i => (i.receiver_id === userState.id && !i.message))
      const myAcceptedRequests = allFriendNotifications.filter(i => ((i.user_id === userState.id || i.sender_id === userState.id) && i.message))
      if (mySendedRequests.length) {
        mySendedRequests.forEach(i => {
          dispatch({ type: "Add_Sended_Request", payload: { id: i.receiver_id } })
        })
      }

      if (myRecievedRequests.length) {
        myRecievedRequests.forEach(i => {
          dispatch({ type: "Add_Received_Request", payload: { id: i.sender_id } })
        })
      }

      if (myAcceptedRequests.length) {
        myAcceptedRequests.forEach(i => {
          dispatch({ type: "Add_Accepted_Request", payload: { id: i.user_id === userState.id ? i.sender_id : i.user_id } })
        })
      }
    }
  }, [userState])

  async function fetchNotifications() {
    const tempNotifications = await private_album_notification({ user_id: userState?.id })
    const tempFriendRequests = await friend_request_notifications(userState.id)
    if (tempNotifications.success && tempFriendRequests) {
      // setFriendNotifications(tempFriendRequests.data)
      tempNotifications.data.forEach(i => {
        dispatch({ type: "Add_Album_Notification", payload: i })
      })
      tempFriendRequests.data.forEach(i => {
        dispatch({ type: "Add_Friend_Request", payload: i })
      })
    }
  }

  useEffect(() => {
    if (userState) {
      fetchNotifications()
    }
  }, [userState])

  const newMessageHandler = (obj) => {
    const finduser = chatProfileState.some(i => i.id === obj.sender_id)
    if (!finduser) {
      dispatch({ type: "Add_Profile", payload: { id: obj.sender_id, milisecondtime: obj.milisecondtime } })
    }
  }

  useEffect(() => {
    if (userState) {
      fetchNotifications()
    }
  }, [userState])

  useEffect(() => {
    if (userState) {
      const blockList = allUsers.find(i => i.id === userState.id)?.is_blocked_users
      if (blockList?.length) {
        blockList.forEach(i => {
          i = { ...i, is_blocked: 1 }
          dispatch({ type: "Add_Blocked_User", payload: i })
        })
      }
      const friendsList = allUsers.find(i => i.id === userState.id)?.is_friends
      if (friendsList.length) {
        friendsList.forEach(i => {
          const payload = i.user_id
          dispatch({ type: "Add_Friend", payload: payload })
        })
      }
    }
  }, [userState])

  useEffect(() => {
    if (chatList?.length && userState) {
      const myReceivedMsgs = chatList.filter(msg => msg.receiver_id === userState.id)
      if (myReceivedMsgs.length) {
        const senderId = Array.from(new Set(myReceivedMsgs.filter(msg => msg.status === "sent")?.map(i => i.sender_id)))
        if (senderId.length) {
          senderId.forEach(id => {
            const msgs = myReceivedMsgs.filter((i) => i.sender_id === id)?.map(j => j.id).toString()
            read_message_action({ sender_id: id, receiver_id: userState.id, status: "delivered", messageId: msgs })
          })
        }
      }
    }
  }, [userState])

  useEffect(() => {
    if (!socket) return

    const blockUserHandler = (obj) => {
      if (obj.sender_id === user.id || obj.receiver_id === user.id) {
        dispatch({ type: "Add_Blocked_User", payload: obj })
      }
    };

    const unblockUserHandler = (obj) => {
      if (obj.sender_id === user.id || obj.receiver_id === user.id) {
        dispatch({ type: "Add_Blocked_User", payload: obj })
      }
    };

    const albumAccessHandler = (obj) => {
      dispatch({ type: "Add_Decision_User", payload: obj })
      const { data, status } = obj
      if (userState.id === data.receiver_id && status === "pending") {
        dispatch({ type: "Add_Album_Notification", payload: data })
      }
      if (!notificationOpenState && status === "pending" && data.receiver_id === decryptedUser.id) {
        dispatch({ type: "Add_Notification_Badge", payload: true })
      }

    }

    const receiveMessageHandler = (obj) => {
      if (obj.receiver_id === user.id && (pathname !== client_routes.chat)) {
        dispatch({ type: "Add_Msg_Badge", payload: true })
        newMessageHandler(obj)
      }
    }

    const onlineUserHandler = (arr) => {
      const filtered = arr.filter(i => i !== user.id)
      dispatch({ type: "Update_Online_Users", payload: filtered })
    }

    const myChattingPartner = (obj) => {
      dispatch({ type: "Add_Partner", payload: obj })
    }

    const swipeHandler = (obj) => {
      if (obj.receiver_id === userState.id && obj.is_friend === 0) {
        console.log("receiver", obj)
        dispatch({ type: "Add_Received_Request", payload: { id: obj.sender_id } })
        dispatch({ type: "Add_Friend_Request", payload: obj })
      }
      else if (obj.receiver_id === userState.id && obj.is_friend === 1) {
        console.log("receiver", obj)
        dispatch({ type: "Add_Friend_Request", payload: obj })
        dispatch({ type: "Add_Accepted_Request", payload: { id: obj.user_id } })
      } else if (obj.receiver_id === userState.id && obj.is_friend === 2) {
        console.log("removed")

      }
    }

    socket.on("blocked-status", blockUserHandler);
    socket.on("unblocked-status", unblockUserHandler);
    socket.on("receive-message", receiveMessageHandler);
    socket.on("album-notification", albumAccessHandler);
    socket.on("onlineUsers", onlineUserHandler)
    socket.on("opened-chat-user", myChattingPartner)
    socket.on('swipe-notify', swipeHandler)

    return () => {
      if (socket) {
        socket.off("blocked-status", blockUserHandler);
        socket.off("unblocked-status", unblockUserHandler);
        socket.off("album-notification", albumAccessHandler)
        socket.off("receive-message", receiveMessageHandler);
        socket.off("onlineUsers", onlineUserHandler)
        socket.off('swipe-notify', swipeHandler)
      }
    };

  }, [user, socket, notificationOpenState, pathname])

  const handleLogout = () => {
    logout_user()
    router.push(client_routes.home)
    dispatch({ type: "Logout" })

    disconnectSocket()
    fetch(server_routes.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id })
    })
  }


  return (
    <>
      {/* {/ Mobile View /} */}
      {pathname === client_routes.home &&
        <header className="sm:hidden flex items-center justify-between fixed top-0 left-0 right-0 bg-black h-[66px] z-[2] px-4">
          <button onClick={() => router.push(client_routes.profile)}>
            <Image height={22} width={102} src={logo} alt="" className="pointer-events-none h-[30px] w-[150px]" priority />
          </button>
          <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
            {user?.avatar_url
              ? <Image height={34} width={34} src={user?.avatar_url} alt="profile_pic" className="cursor-pointer rounded-full aspect-square" priority onClick={() => router.push(client_routes.profile)} />
              : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full uppercase text-white">{user?.username.charAt(0)}</div>
            }
          </Link>
        </header>
      }

      {/* {/ Web View /} */}
      <header className="hidden md:flex h-[66px] bg-primary-dark text-white items-center justify-center top-0 fixed w-full z-[2]" data-aos="fade-down" data-aos-duration="500">
        <div className="flex justify-between items-center w-full">
          <div className={`flex items-center ${pathname === client_routes.search ? "ms-[110px]" : "ms-[32px]"}`}>
            <button onClick={() => router.push(client_routes.profile)}>
              <Image height={35} width={177} src={logo} alt="" className="pointer-events-none h-[35px] w-[177px]" priority />
            </button>
          </div>
          <div className="flex items-center me-[72px]">
            <div className="flex flex-row gap-x-[30px] me-[35px]">
              <button className="transition-all duration-150 hover:scale-110 relative" onClick={() => notificationOpenState ? dispatch({ type: "Close_Notification", payload: false }) : dispatch({ type: "Open_Notification", payload: true })}>
                <Image height={20} width={20} src={notificationIcon} alt="" />
                {notifyBadgeState.notify &&
                  <p className="h-2 w-2 bg-secondary animate-bounce rounded-full absolute top-0 right-0 "></p>
                }
              </button>
              <Link href={client_routes.chat} className="flex transition-all duration-150 hover:scale-110 relative">
                <Image height={32} width={20} src={messages} alt="" className="" />
                {notifyBadgeState.msg &&
                  <p className="h-2 w-2 bg-secondary animate-bounce rounded-full absolute top-0 -right-1"></p>
                }
              </Link>
              <Link href={client_routes.search} className="py-[7px] rounded-[5px] h-[32px] flex items-center transition-all duration-150 hover:scale-110">
                <Image height={18} width={18} src={search} className="" alt="" priority />
              </Link>
            </div>
            <button className="h-8 w-[78px] me-[35px] rounded-[5px] flex items-center justify-center bg-secondary text-[12px] font-semibold leading-[normal] transition-all duration-150 hover:scale-105" onClick={handleLogout}>
              Logout
            </button>
            {
              <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
                {user?.avatar_url
                  ? <Image height={40} width={40} src={user?.avatar_url} alt="profile_pic" className="cursor-pointer rounded-full aspect-square object-cover" priority onClick={() => router.push(client_routes.profile)} />
                  : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full capitalize">{user?.username.charAt(0)}</div>
                }
              </Link>
            }
          </div>
        </div>
      </header>
      {/* {
        user && <Notification open={notificationOpenState} notifications={notifications} user={user} allUsers={allUsers} socket={socket} friendNotifications={friendNotifications} />
      } */}
      {
        user && <NotificationComaponent open={notificationOpenState} allUsers={allUsers} socket={socket} />
      }
      <SideDrawer />
    </>
  )
}

export default MainHeader