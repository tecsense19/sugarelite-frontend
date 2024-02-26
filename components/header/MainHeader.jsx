import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import logo from "../../public/assets/Logo (1).svg"
import notification from "../../public/assets/Mask group (1).svg"
import messages from "../../public/assets/Mask group.svg"
import search from "../../public/assets/search.svg"
import profile_icon from "../../public/assets/Profile-icon.svg"

const MainHeader = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <>
      {/* Mobile View */}
      {/* <header className="sm:hidden flex">
        Main Mobile Navbar
      </header> */}

      {/* Web View */}
      <header className="hidden md:flex h-[66px] bg-primary-dark text-white items-center justify-center top-0 fixed w-full z-[2]" data-aos="fade-down" data-aos-duration="500">
        <div className="flex justify-between items-center w-full">
          <div className={`flex items-center ${pathname === client_routes.search ? "ms-[110px]" : "ms-[32px]"}`}>
            <button onClick={() => router.push(client_routes.home)}>
              <Image height={35} width={177} src={logo} alt="" className="pointer-events-none h-[35px] w-[177px]" priority />
            </button>
          </div>
          <div className="flex items-center me-[72px]">
            <button>
              <Image height={20} width={20} src={notification} alt="" />
            </button>
            <button onClick={() => router.push(client_routes.chat)}>
              <Image height={20} width={20} src={messages} alt="" className="ms-[15px]" />
            </button>
            <label className="bg-primary px-3 py-[7px] rounded-[5px] h-[32px] w-[193px] mx-[30px] flex items-center">
              <Image height={18} width={18} src={search} className="mr-3" alt="" priority />
              <input type="text" placeholder="Search" className="w-full bg-transparent outline-none border-0 text-[12px] font-light" style={{ lineHeight: "normal" }} />
            </label>
            <Image height={40} width={40} src={profile_icon} alt="profile_pic" className="cursor-pointer" priority onClick={() => router.push(client_routes.profile)} />
          </div>
        </div>
      </header>
    </>
  )
}

export default MainHeader