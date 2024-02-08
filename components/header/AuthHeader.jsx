import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"

const AuthHeader = () => {
  const router = useRouter()
  return (
    <>
      {/* Mobile View */}
      {/* <header className="sm:hidden flex">
        Auth Mobile Navbar
      </header> */}

      {/* Web View */}
      <header className="hidden sm:flex h-[80px] bg-black text-white items-center justify-center top-0 fixed w-full z-[2]">
        <div className="w-9/12 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => router.push(client_routes.home)}>
              <Image height={37} width={188} className="pointer-events-none" src={"/assets/logo.svg"} alt="" priority />
            </button>
          </div>
          <div className="flex items-center">
            <Image height={40} width={40} className="pointer-events-none" src={"/assets/Profile-icon.svg"} alt="" priority />
          </div>
        </div>
      </header>
    </>
  )
}

export default AuthHeader