"use client"

import Image from "next/image";
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import premiumUserIcon from "../../public/assets/premium_user_icon.svg";
import { useRouter } from "next/navigation";
import { client_routes } from "@/app/lib/helpers";
import { useStore } from "@/store/store";
import Link from "next/link";

const Cards = ({ allUsers }) => {

  const { state: { allUsersState } } = useStore()
  const navigate = useRouter()

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();

    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <>
      <div className={`bg-primary max-h-full h-fit lg:w-[calc(100%-350px)] xl:w-[calc(100%-350px)] w-full p-4 lg:p-[40px] xl:p-[60px] 2xl:p-[70px] grid grid-cols-2 mb-[20px]  xl:grid-cols-3 2xl:grid-cols-4 gap-[16px] lg:gap-[30px] md:overflow-y-auto slide-in-bottom ${allUsersState && allUsersState.length === 0 ? "hidden" : ""}`} style={{ scrollbarWidth: "none" }} data-aos="fade-left">
        {
          allUsersState
            ? <> {
              allUsersState &&
              allUsersState?.map((item, idx) => {

                return (
                  <Link key={idx} href={`${client_routes.profile}/${item.id}`} prefetch={true} className="relative rounded-[5px] cursor-pointer lg:overflow-hidden xs:aspect-h-1 xs:aspect-w-1 md:aspect-square h-[182px] min-h-[12rem] xs:h-auto  w-full flex justify-center items-center">
                    {item.avatar_url && item.avatar_url.includes("https://admin-sugarelite.tec-sense.co.in")
                      ? <Image src={item.avatar_url} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                      : <div className="w-full h-full flex items-center justify-center">
                        {(item.sugar_type === "EliteDaddy" || item.sugar_type === "EliteBoy")
                          ? <Image src={manPlaceolderImg} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                          : (item.sugar_type === "EliteMama" || item.sugar_type === "EliteBabe")
                            ? <Image src={womanPlaceolderImg} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                            : <Image src={placeholder} alt="" width={1000} height={1000} className="pointer-events-none w-14 h-14 object-cover object-center rounded-[5px] " priority />
                        }
                      </div>
                    }

                    <div className="absolute w-full h-full bg-gradient-to-b to-black from-[53.12%] from-white/0 md:from-[45.69%] md:from-white/0 md:to-100% md:to-black/75   flex flex-col justify-between pt-[10px] pe-[10px] ps-4 pb-4 text-white rounded-[5px]">
                      <div className="flex justify-end">
                        {item.online === 1 && <div className="border-[1px] border-white h-[14px] w-[14px] rounded-full bg-success" />}
                      </div>
                      <div className="">
                        <div className="flex items-center">
                          <div className="text-[clamp(16px,2vw,22px)] lg:text-[clamp(19px,2vw,22px)] leading-[normal] lg:leading-[30px] font-bold">
                            <span className="hidden sm:inline">{item.username}</span><span className="sm:hidden inline">{item.username.split(' ')[0]}</span>,{item.age}
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
            </>
            : <>
              {allUsers &&
                allUsers?.map((item, idx) => {
                  return (
                    <Link key={idx} href={`${client_routes.profile}/${item.id}`} prefetch={true} className="relative rounded-[5px] cursor-pointer lg:overflow-hidden xs:aspect-h-1 xs:aspect-w-1 md:aspect-square h-[182px] min-h-[12rem]   xs:h-auto  w-full flex justify-center items-center">
                      {item.avatar_url && item.avatar_url.includes("https://admin-sugarelite.tec-sense.co.in")
                        ? <Image src={item.avatar_url} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                        : <div className="w-full h-full flex items-center justify-center">
                          {(item.sugar_type === "EliteDaddy" || item.sugar_type === "EliteBoy")
                            ? <Image src={manPlaceolderImg} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                            : (item.sugar_type === "EliteMama" || item.sugar_type === "EliteBabe")
                              ? <Image src={womanPlaceolderImg} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                              : <Image src={placeholder} alt="" width={1000} height={1000} className="pointer-events-none w-14 h-14 object-cover object-center rounded-[5px]" priority />
                          }
                        </div>
                      }
                      <div className="absolute w-full h-full bg-gradient-to-b to-black from-[53.12%] from-white/0 md:from-[45.69%] md:from-white/0 md:to-100% md:to-black/75   flex flex-col justify-between pt-[10px] pe-[10px] ps-4 pb-4 text-white rounded-[5px]">
                        <div className="flex justify-end">
                          {item.online === 1 && <div className="border-[1px] border-white h-[14px] w-[14px] rounded-full bg-success" />}
                        </div>
                        <div className="">
                          <div className="flex items-center">
                            <div className="text-[clamp(16px,2vw,22px)] lg:text-[clamp(19px,2vw,22px)] leading-[normal] lg:leading-[30px] font-bold">
                              <span className="hidden sm:inline">{item.username}</span><span className="sm:hidden inline">{item.username.split(' ')[0]}</span>,{(item.age)}
                            </div>
                            {item.is_subscribe === 1 && <Image src={premiumUserIcon} alt="" height={22} width={22} priority className="ms-2 pointer-events-none" />}
                          </div>
                          <div className="mt-1 md:mt-[2px] text-[clamp(12px,1.5vw,16px)]  lg:text-[clamp(14px,1.5vw,16px)] leading-[14px] font-semibold text-white/50">{item?.region}</div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </>
        }
      </div>
      {allUsersState
        ? <>
          {allUsersState.length === 0 &&
            <div className="text-white text-[25px] flex items-center justify-center lg:w-[calc(100%-350px)] xl:w-[calc(100%-350px)] w-full h-full">
              No users found!
            </div>
          }
        </>
        : <>
          {!allUsers || allUsers.length === 0 &&
            <div className="text-white text-[25px] flex items-center justify-center lg:w-[calc(100%-350px)] xl:w-[calc(100%-350px)] w-full h-full">
              No users found!
            </div>
          }
        </>
      }
    </>
  )
}

export default Cards