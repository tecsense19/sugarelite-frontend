
import Link from "next/link"
import { client_routes } from "./lib/helpers"
import Header from "@/components/header/Header";
import Image from "next/image";
import logo from "/public/assets/Logo (1).svg"
import Logo from "/public/assets/sugarelite_full_logo.svg"
import arrowLeft from "/public/assets/chat_scroll_bottom_icon.svg"
import { get_user_action } from "./lib/actions"
import Footer from "@/components/common/Footer";

const NotFound = async () => {
  const user = await get_user_action()
  return (
    <>
      {
        user ?
          <header className="hidden md:flex h-[66px] bg-primary-dark text-white items-center justify-center top-0 fixed w-full z-[2]" >
            <div className="flex justify-between items-center w-full">
              <div className={`flex items-center ms-[72px]`}>
                <button >
                  <Image height={35} width={177} src={logo} alt="" className="pointer-events-none h-[35px] w-[177px]" priority />
                </button>
              </div>
              <div className="flex items-center me-[72px]">
                {
                  <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
                    {user[0]?.avatar_url
                      ? <Image height={40} width={40} src={user[0]?.avatar_url} alt="profile_pic" className="cursor-pointer rounded-full aspect-square object-cover" priority />
                      : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full capitalize">{user[0]?.username.charAt(0)}</div>
                    }
                  </Link>
                }
              </div>
            </div>
          </header>
          : <Header />
      }
      <div className={`text-white/90 text-center flex flex-col items-center justify-center md:pt-[80px] pt-[65px]`}>
        <Link href={client_routes.home} className="mb-10 mt-[50px] md:mt-[120px]">
          <Image src={Logo} alt="" height={136} width={188} priority className="pointer-events-none h-[136px] w-[188px]" />
        </Link>
        <div>
          <h1 className="next-error-h1 border-e border-white/30 inline-block me-5 pe-[23px] text-[24px] font-medium leading-[49px]">404</h1>
          <div className="inline-block">
            <h2 className="text-[14px] font-normal leading-[49px] m-0">This page could not be found</h2>
          </div>
        </div>
        <Link href={client_routes.home} className="rounded-[5px] px-3 py-1 mt-3 text-secondary flex items-center gap-x-1 mb-[50px] md:mb-[120px]">
          <Image src={arrowLeft} alt="" height={20} width={20} priority className="pointer-events-none rotate-90" />
          Back to home page
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default NotFound