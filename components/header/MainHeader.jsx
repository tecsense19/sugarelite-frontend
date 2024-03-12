"use client"
import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import logo from "../../public/assets/Logo (1).svg"
import notification from "../../public/assets/Mask group (1).svg"
import messages from "../../public/assets/Mask group.svg"
import search from "../../public/assets/search.svg"
import profile_icon from "../../public/assets/Profile-icon.svg"
import { useStore } from "@/store/store"
import { logout_user } from "@/app/lib/actions"
import Link from "next/link"

const MainHeader = ({ user }) => {
  const pathname = usePathname()
  const router = useRouter()

  const { state: { userState }, dispatch } = useStore()

  const handleLogout = () => {
    logout_user()
    dispatch({ type: "Current_User", payload: "" })
    router.push(client_routes.home)
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
              <button className="transition-all duration-150 hover:scale-110">
                <Image height={20} width={20} src={notification} alt="" />
              </button>
              <Link href={client_routes.chat} className="flex transition-all duration-150 hover:scale-110">
                <Image height={20} width={20} src={messages} alt="" className="" />
              </Link>
              {/* <label className="bg-primary px-3 py-[7px] rounded-[5px] h-[32px] w-[193px] mx-[30px] flex items-center">
                <Image height={18} width={18} src={search} className="mr-3" alt="" priority />
                <input type="text" placeholder="Search" className="w-full bg-transparent outline-none border-0 text-[12px] font-light" style={{ lineHeight: "normal" }} />
              </label> */}
              <Link href={client_routes.search} className="py-[7px] rounded-[5px] h-[32px] flex items-center transition-all duration-150 hover:scale-110">
                <Image height={18} width={18} src={search} className="" alt="" priority />
                {/* {/ <input type="text" placeholder="Search" className="w-full bg-transparent outline-none border-0 text-[12px] font-light" style={{ lineHeight: "normal" }} /> /} */}
              </Link>
            </div>
            <button className="h-8 w-[78px] me-[35px] rounded-[5px] flex items-center justify-center bg-secondary text-[12px] font-semibold leading-[normal] transition-all duration-150 hover:scale-105" onClick={handleLogout}>
              Logout
            </button>
            {
              (userState?.user)
                ? <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
                  {userState?.user.avatar_url
                    ? <Image height={40} width={40} src={userState?.user.avatar_url} alt="profile_pic" className="cursor-pointer" priority onClick={() => router.push(client_routes.profile)} />
                    : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full">{userState?.user.username.charAt(0)}</div>
                  }
                </Link>
                : <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
                  {user?.avatar_url
                    ? <Image height={40} width={40} src={user?.avatar_url} alt="profile_pic" className="cursor-pointer rounded-full" priority onClick={() => router.push(client_routes.profile)} />
                    : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full">{user?.username.charAt(0)}</div>
                  }
                </Link>
            }
          </div>
        </div>
      </header>
    </>
  )
}

export default MainHeader