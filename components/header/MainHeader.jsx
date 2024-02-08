import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

const MainHeader = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <>
      {/* Mobile View */}
      <header className="sm:hidden flex">
        Main Mobile Navbar
      </header>

      {/* Web View */}
      <header className="hidden sm:flex h-[66px] bg-primary-dark text-white items-center justify-center top-0 fixed w-full z-[2]">
        <div className="flex justify-between items-center w-full">
          {pathname === client_routes.search
            ? <div className="flex items-center ms-[110px]">
              <button onClick={() => router.push(client_routes.home)}>
                <Image height={35} width={177} src={"/assets/logo (1).svg"} alt="" className="pointer-events-none h-auto w-auto" priority />
              </button>
            </div>
            : <div className="flex items-center ms-[32px]">
              <button onClick={() => router.push(client_routes.home)}>
                <Image height={35} width={177} src={"/assets/logo (1).svg"} alt="" className="pointer-events-none h-auto w-auto" priority />
              </button>
            </div>
          }
          <div className="flex items-center me-[72px]">
            <button>
              <Image height={20} width={20} src={"/assets/Mask group (1).svg"} alt="" />
            </button>
            <button>
              <Image height={20} width={20} src={"/assets/Mask group.svg"} alt="" className="ms-[15px]" />
            </button>
            <label className="bg-primary px-3 py-[7px] rounded-[5px] h-[32px] w-[193px] mx-[30px] flex items-center">
              <Image height={18} width={18} src={"/assets/search.svg"} className="mr-3" alt="" priority />
              <input type="text" placeholder="Search" className="w-full bg-transparent outline-none border-0 text-[12px] font-light" style={{ lineHeight: "normal" }} />
            </label>
            <Image height={40} width={40} className="pointer-events-none" src={"/assets/Profile-icon.svg"} alt="" priority />
          </div>
        </div>
      </header>
    </>
  )
}

export default MainHeader