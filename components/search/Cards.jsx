"use client"

import Image from "next/image";
import Img1 from "../../public/assets/profile_img_1.png";
import Img2 from "../../public/assets/profile_img_2.png";
import Img3 from "../../public/assets/profile_img_3.png";
import Img4 from "../../public/assets/profile_img_4.png";
import Img5 from "../../public/assets/profile_img_5.png";
import Img6 from "../../public/assets/profile_img_6.png";
import Img7 from "../../public/assets/profile_img_7.png";
import Img8 from "../../public/assets/profile_img_8.png";
import Img9 from "../../public/assets/profile_img_9.png";
import Img10 from "../../public/assets/profile_img_10.png";
import Img11 from "../../public/assets/profile_img_11.png";
import Img12 from "../../public/assets/profile_img_12.png";
import premiumUserIcon from "../../public/assets/premium_user_icon.svg";
import { useRouter } from "next/navigation";

const Cards = ({ allUsers }) => {

  const navigate = useRouter()

  // const profiles = [
  //   { id: 1, img: Img1, is_active: true, name: "Inga Green", age: 37, is_premium: false, desc: "Obcaecati cumque et" },
  //   { id: 2, img: Img2, is_active: false, name: "Inga Green", age: 22, is_premium: true, desc: "Obcaecati cumque et" },
  //   { id: 3, img: Img3, is_active: false, name: "Inga Green", age: 29, is_premium: false, desc: "Obcaecati cumque et" },
  //   { id: 4, img: Img4, is_active: true, name: "Inga Green", age: 24, is_premium: true, desc: "Obcaecati cumque et" },
  //   { id: 5, img: Img5, is_active: false, name: "Inga Green", age: 32, is_premium: false, desc: "Obcaecati cumque et" },
  //   { id: 6, img: Img6, is_active: false, name: "Inga Green", age: 29, is_premium: false, desc: "Obcaecati cumque et" },
  //   { id: 7, img: Img7, is_active: true, name: "Inga Green", age: 28, is_premium: true, desc: "Obcaecati cumque et" },
  //   { id: 8, img: Img8, is_active: false, name: "Inga Green", age: 30, is_premium: true, desc: "Obcaecati cumque et" },
  //   { id: 9, img: Img9, is_active: true, name: "Inga Green", age: 37, is_premium: false, desc: "Obcaecati cumque et" },
  //   { id: 10, img: Img10, is_active: false, name: "Inga Green", age: 37, is_premium: true, desc: "Obcaecati cumque et" },
  //   { id: 11, img: Img11, is_active: true, name: "Inga Green", age: 37, is_premium: true, desc: "Obcaecati cumque et" },
  //   { id: 12, img: Img12, is_active: false, name: "Inga Green", age: 37, is_premium: true, desc: "Obcaecati cumque et" },
  // ]

  return (
    <div className="bg-primary max-h-full h-fit lg:w-[calc(100%-350px)] xl:w-[calc(100%-350px)] w-full p-4 lg:p-[40px] xl:p-[60px] 2xl:p-[70px] grid grid-cols-2 mb-[20px]   xl:grid-cols-3 2xl:grid-cols-4 gap-[16px] lg:gap-[30px] md:overflow-y-auto slide-in-bottom" style={{ scrollbarWidth: "none" }} data-aos="fade-left">
      {
        allUsers &&
        allUsers?.map((item, idx) => {
          return (
            <div key={idx} onClick={() => navigate.push(`/profile/${item.id}`)} className="relative rounded-[5px] cursor-pointer lg:overflow-hidden xs:aspect-h-1 xs:aspect-w-1 md:aspect-square h-[182px] xs:h-auto  w-full flex justify-center items-center">
              <Image src={item.avatar_url && item.avatar_url.includes("https://admin-sugarelite.tec-sense.co.in/storage") ? item.avatar_url : Img1} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
              {/* {item.avatar_url ?
                <Image src={item.avatar_url.includes("https://admin-sugarelite.tec-sense.co.in/storage") && item.avatar_url} alt="" width={1000} height={1000} className="pointer-events-none w-full h-full object-cover object-center rounded-[5px]" priority />
                :
                <p className="h-[20rem] w-full">Name</p>
              } */}

              <div className="absolute w-full h-full bg-gradient-to-b to-black from-[53.12%] from-white/0 md:from-[45.69%] md:from-white/0 md:to-100% md:to-black/75   flex flex-col justify-between pt-[10px] pe-[10px] ps-4 pb-4 text-white rounded-[5px]">
                <div className="flex justify-end">
                  {item.online && <div className="border-[1px] border-white h-[14px] w-[14px] rounded-full bg-[#1DD719]" />}
                </div>
                <div className="">
                  <div className="flex items-center">
                    <div className="text-[clamp(16px,2vw,22px)] lg:text-[clamp(19px,2vw,22px)] leading-[normal] lg:leading-[30px] font-bold">
                      <span className="hidden sm:inline">{item.username}</span><span className="sm:hidden inline">{item.username.split(' ')[0]}</span>,{item.age}
                    </div>
                    {item.premium && <Image src={premiumUserIcon} alt="" height={22} width={22} priority className="ms-2 pointer-events-none" />}
                  </div>
                  <div className="mt-1 md:mt-[2px] text-[clamp(12px,1.5vw,16px)]  lg:text-[clamp(14px,1.5vw,16px)] leading-[14px] font-semibold text-white/50">{item?.region}</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Cards