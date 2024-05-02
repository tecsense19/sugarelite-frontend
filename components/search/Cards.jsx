"use client"
import Image from "next/image";
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import premiumUserIcon from "../../public/assets/premium_user_icon.svg";
import { client_routes } from "@/app/lib/helpers";
import { useStore } from "@/store/store";
import Link from "next/link";
import chevron_down from "/public/assets/arrow_left.svg"
import settingsIcon from "/public/assets/settings_icon.svg";

const Cards = ({ allUsers, filterHandler, resetHandler }) => {

  const { state: { onlineUsers } } = useStore()
  return (
    <>
      <div className="md:hidden text-white p-4 flex justify-between items-center mb-2 ">
        <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={24} height={24} priority className='cursor-pointer ' onClick={resetHandler} />
        <span className="text-[24px] font-semibold leading-[22.8px]">Results</span>
        <button onClick={filterHandler}>
          <Image src={settingsIcon} alt='down_arrow' width={20} height={20} priority className='text-white ' />
        </button>
      </div>
      {
        allUsers.length ?
          <div className={`bg-primary max-h-full pb-20 md:pb-4 h-fit lg:w-[calc(100%-350px)] xl:w-[calc(100%-350px)] w-full p-4 lg:p-[40px] xl:p-[60px] 2xl:p-[70px] grid grid-cols-2 mb-[20px]  xl:grid-cols-3 2xl:grid-cols-4 gap-[16px] lg:gap-[30px] overflow-y-auto slide-in-bottom `} style={{ scrollbarWidth: "none" }} data-aos="fade-left">
            {allUsers.length &&
              allUsers?.map((item, idx) => {
                return (
                  <Link key={idx} href={`${client_routes.profile}/${item.id}`} prefetch={true} className="relative rounded-[5px] cursor-pointer lg:overflow-hidden xs:aspect-h-1 xs:aspect-w-1 md:aspect-square h-[182px] min-h-[12rem]   xs:h-auto  w-full flex justify-center items-center">
                    {item.avatar_url && item.avatar_url.includes("https://admin-sugarelite.tec-sense.co.in")
                      ? <Image src={item.avatar_url} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                      : <div className="w-full h-full flex items-center justify-center">
                        {(item.sugar_type === "EliteDaddy" || item.sugar_type === "EliteBoy")
                          ? <Image src={manPlaceolderImg} unoptimized alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                          : (item.sugar_type === "EliteMama" || item.sugar_type === "EliteBabe")
                            ? <Image src={womanPlaceolderImg} unoptimized alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                            : <Image src={placeholder} unoptimized alt="" width={1000} height={1000} className="pointer-events-none w-14 h-14 object-cover object-center rounded-[5px]" priority />
                        }
                      </div>
                    }
                    <div className="absolute w-full h-full bg-gradient-to-b to-black from-[53.12%] from-white/0 md:from-[45.69%] md:from-white/0 md:to-100% md:to-black/75   flex flex-col justify-between pt-[10px] pe-[10px] ps-4 pb-4 text-white rounded-[5px]">
                      <div className="flex justify-end">
                        {onlineUsers.some(i => i === item.id) && <div className="border-[1px] border-white h-[14px] w-[14px] rounded-full bg-success" />}
                      </div>
                      <div className="">
                        <div className="flex items-center">
                          <div className="text-[clamp(16px,2vw,22px)] lg:text-[clamp(19px,2vw,22px)] leading-[normal] lg:leading-[30px] font-bold">
                            <span className="hidden sm:inline capitalize">{item.username}</span><span className="sm:hidden inline capitalize">{item.username.split(' ')[0]}</span>,{(item.age)}
                          </div>
                          {item.is_subscribe === 1 && <Image src={premiumUserIcon} alt="" height={22} width={22} priority className="ms-2 pointer-events-none" />}
                        </div>
                        <div className="mt-1 md:mt-[2px] text-[clamp(12px,1.5vw,16px)]  lg:text-[clamp(14px,1.5vw,16px)] leading-[14px] font-semibold text-white/50">{item?.region}</div>
                      </div>
                    </div>
                  </Link>
                )
              })

            }
          </div> : <div className="text-white w-full h-full text-[25px] flex ">
            <div className="m-auto"> No profile matches</div>
          </div>
      }
    </>
  )
}

export default Cards