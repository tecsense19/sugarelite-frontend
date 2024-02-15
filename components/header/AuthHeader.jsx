import { client_routes } from "@/app/lib/helpers"
import { useStore } from "@/store/store";
import { Divider } from "antd";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";

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
      {/* Mobile View */}
      {pathname === client_routes.home &&
        <header className="md:hidden top-0 fixed w-full z-[2]" data-aos="fade-down" data-aos-duration="500">
          <div className="flex bg-black text-white items-center justify-center px-4">
            <div className="w-full sm:w-11/12 xl:w-9/12">
              <div className="flex justify-between items-center h-[65px]">
                <div className="flex items-center">
                  <button onClick={() => router.push(client_routes.home)}>
                    <Image src={"/assets/Logo (2).svg"} alt="" height={22} width={102} className="pointer-events-none select-none aspect-auto" priority />
                  </button>
                </div>
                <div className="flex items-center">
                  <button className="outline-none relative w-6 h-6 flex justify-center items-center" onClick={handleOpenChange}>
                    <Image height={24} width={24} className={`pointer-events-none select-none absolute transition-transform duration-150 ease-linear ${open ? "scale-y-100" : "scale-y-0"}`} src={"/assets/close.svg"} alt="" priority />
                    <Image height={24} width={24} className={`pointer-events-none select-none absolute transition-transform duration-150 ease-linear ${open ? "scale-y-0" : "scale-y-100"}`} src={"/assets/align-right.svg"} alt="" priority />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="mobile-navbar" className={`w-full border-t border-t-[rgba(255,255,255,0.4)] flex justify-center transition-transform duration-150 ease-linear origin-top bg-black ${open ? "scale-y-100" : "scale-y-0"}`}>
            <div className="text-white/70 w-11/12 xl:w-9/12 p-3">
              <button className="w-full text-start text-[17px] font-[450] tracking-wide">Login</button>
              <Divider className="border-t-0" style={{ margin: "7px 0px 7px 0px", backgroundColor: "rgba(255,255,255,0.3)" }} />
              <button className="w-full text-start text-[17px] font-[450] tracking-wide">Register Now</button>
            </div>
          </div>
        </header>

      }

      {/* Web View */}
      <header className="hidden md:flex h-[80px] bg-black text-white items-center justify-center top-0 fixed w-full z-[2]" data-aos="fade-down" data-aos-duration="500">
        <div className="w-11/12 xl:w-9/12 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => router.push(client_routes.home)}>
              <Image height={37} width={188} className="pointer-events-none select-none" src={"/assets/logo.svg"} alt="" priority />
            </button>
          </div>
          <div className="flex items-center">
            <button className="px-[35px] h-[42px] text-center bg-secondary rounded-[5px] text-[18px] font-[450] tracking-[-0.18] me-4" onClick={() => router.push(client_routes.register)}>
              Register Now
            </button>
            <button className="px-[35px] h-[42px] text-center bg-neutral border border-white/30 rounded-[5px] text-[18px] font-[450] tracking-[-0.18]" onClick={() => router.push(client_routes.login)}>
              Login
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default AuthHeader