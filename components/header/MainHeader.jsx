"use client"
import { client_routes, server_routes, socket_server } from "@/app/lib/helpers"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import logo from "../../public/assets/Logo (1).svg"
import notification from "../../public/assets/Mask group (1).svg"
import messages from "../../public/assets/Mask group.svg"
import search from "../../public/assets/search.svg"
import { useStore } from "@/store/store"
import { logout_user } from "@/app/lib/actions"
import Link from "next/link"
import Notification from "../common/Notification"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(socket_server);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};



const MainHeader = ({ decryptedUser, notifications, allUsers }) => {

  const pathname = usePathname()
  const router = useRouter()
  const socket = useSocket()

  const { state: { userState, notificationOpenState }, dispatch } = useStore()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [user, setUser] = useState(userState ? userState : decryptedUser)

  useEffect(() => {
    setUser(userState ? userState : decryptedUser)
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
        dispatch({ type: "Remove_Blocked_User", payload: obj })
      }
    };

    const albumAccessHandler = (obj) => {
      dispatch({ type: "Add_Decision_User", payload: obj })
    }

    socket.on("blocked-status", blockUserHandler);
    socket.on("unblocked-status", unblockUserHandler);
    socket.on("album-notification", albumAccessHandler)

    return () => {
      if (socket) {
        socket.off("blocked-status", blockUserHandler);
        socket.off("album-notification", albumAccessHandler)
        socket.disconnect()
      }
    };
  }, [user, socket])


  const handleLogout = () => {
    logout_user()
    router.push(client_routes.home)
    dispatch({ type: "Current_User", payload: "" })
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
      {/* <header className="sm:hidden flex">
        Main Mobile Navbar
      </header> */}

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
              <button className="transition-all duration-150 hover:scale-110" onClick={() => setIsDrawerOpen(isDrawerOpen ? false : true)}>
                <Image height={20} width={20} src={notification} alt="" />
              </button>
              <Link href={client_routes.chat} className="flex transition-all duration-150 hover:scale-110">
                <Image height={20} width={20} src={messages} alt="" className="" />
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
                  ? <Image height={40} width={40} src={user?.avatar_url} alt="profile_pic" className="cursor-pointer rounded-full aspect-square" priority onClick={() => router.push(client_routes.profile)} />
                  : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full">{user?.username.charAt(0)}</div>
                }
              </Link>
            }
          </div>
        </div>
      </header>
      {
        user && <Notification open={isDrawerOpen || notificationOpenState} setOpen={setIsDrawerOpen} notifications={notifications} user={user} allUsers={allUsers} socket={socket} />
      }
    </>
  )
}

export default MainHeader