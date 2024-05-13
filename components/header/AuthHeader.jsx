import { client_routes } from "@/app/lib/helpers"
import { useStore } from "@/store/store";
import { Divider } from "antd";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";
import logo2 from "../../public/assets/Logo (2).svg"
import logo from "../../public/assets/Logo (1).svg"
import close from "../../public/assets/close.svg"
import align_right from "../../public/assets/align-right.svg"
import Link from "next/link";

const AuthHeader = () => {
  const { dispatch } = useStore();

  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
    dispatch({ type: !open })
  };

  return (
    <>
      {/* {/ Mobile View /} */}
      {(pathname !== client_routes.login && pathname !== client_routes.register) &&
        <header className="md:hidden top-0 fixed w-full z-[2]" data-aos="fade-down" data-aos-duration="500">
          <div className="flex bg-black text-white items-center justify-center">
            <div className="w-full sm:w-11/12 xl:w-9/12 px-4">
              <div className="flex justify-between items-center h-[65px]">
                <div className="flex items-center">
                  <button onClick={() => router.push(client_routes.home)}>
                    <Image src={logo2} alt="" height={22} width={102} className="pointer-events-none select-none h-[22px] w-[102px]" priority />
                  </button>
                </div>
                <div className="flex items-center gap-x-[8.6px]">
                  <Link prefetch={true} href={client_routes.register} className="w-[78.5px] h-[31px] flex justify-center items-center bg-secondary text-white text-[12px] font-medium leading-[normal] tracking-[-0.11px] rounded-[2.5px]">Register</Link>
                  <Link prefetch={true} href={client_routes.login} className="w-[57px] h-[31px] flex justify-center items-center bg-neutral border border-white/30 text-white text-[12px] font-medium leading-[normal] tracking-[-0.11px] rounded-[2.5px]">Login</Link>
                  {/* <button className="outline-none relative w-6 h-6 flex justify-center items-center" onClick={handleOpenChange}>
                    <Image height={24} width={24} className={`pointer-events-none select-none absolute transition-transform duration-150 ease-linear ${open ? "scale-y-100" : "scale-y-0"}`} src={close} alt="" priority />
                    <Image height={24} width={24} className={`pointer-events-none select-none absolute transition-transform duration-150 ease-linear ${open ? "scale-y-0" : "scale-y-100"}`} src={align_right} alt="" priority />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div id="mobile-navbar" className={`w-full border-t border-t-[rgba(255,255,255,0.4)] flex justify-center transition-transform duration-150 ease-linear origin-top bg-black ${open ? "scale-y-100" : "scale-y-0"}`}>
            <div className="text-white/70 w-11/12 xl:w-9/12 p-3">
              <button className="w-full text-start text-[17px] font-[450] tracking-wide" onClick={() => router.push(client_routes.login)}>Login</button>
              <Divider className="border-t-0" style={{ margin: "7px 0px 7px 0px", backgroundColor: "rgba(255,255,255,0.3)" }} />
              <button className="w-full text-start text-[17px] font-[450] tracking-wide" onClick={() => router.push(client_routes.register)}>Register Now</button>
            </div>
          </div>
        </header>
      }

      {/* {/ Web View /} */}
      <header className="hidden md:flex h-[80px] bg-black text-white items-center justify-center top-0 fixed w-full z-[2]" data-aos="fade-down" data-aos-duration="500">
        <div className="w-11/12 xl:w-9/12 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => router.push(client_routes.home)}>
              <Image height={37} width={188} className="pointer-events-none select-none" src={logo} alt="" priority />
            </button>
          </div>
          <div className="flex items-center">
            <Link prefetch={true} href={client_routes.register} className="px-[35px] h-[42px] text-center bg-secondary rounded-[5px] text-[18px] font-[450] tracking-[-0.18] me-4 transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center">
              Register Now
            </Link>
            <Link prefetch={true} href={client_routes.login} className="px-[35px] h-[42px] text-center bg-neutral border border-white/30 rounded-[5px] text-[18px] font-[450] tracking-[-0.18] transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center">
              Login
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default AuthHeader