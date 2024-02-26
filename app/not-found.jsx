import Link from "next/link"
import { client_routes } from "./lib/helpers"
import Image from "next/image"
import Logo from "/public/assets/sugarelite_full_logo.svg"
import arrowLeft from "/public/assets/chat_scroll_bottom_icon.svg"

const NotFound = () => {
  return (
    <div className="h-dvh text-white/90 text-center flex flex-col items-center justify-center">
      <Link href={client_routes.home} className="mb-10">
        <Image src={Logo} alt="" height={136} width={188} priority className="pointer-events-none h-[136px] w-[188px]" />
      </Link>
      <div>
        <h1 className="next-error-h1 border-e border-white/30 inline-block me-5 pe-[23px] text-[24px] font-medium leading-[49px]">404</h1>
        <div className="inline-block">
          <h2 className="text-[14px] font-normal leading-[49px] m-0">This page could not be found</h2>
        </div>
      </div>
      <Link href={client_routes.home} className="rounded-[5px] px-3 py-1 mt-3 text-secondary flex items-center gap-x-1">
        <Image src={arrowLeft} alt="" height={20} width={20} priority className="pointer-events-none rotate-90" />
        Back to home page
      </Link>
    </div>
  )
}

export default NotFound