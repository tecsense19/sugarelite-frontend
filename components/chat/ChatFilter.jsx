"use client"

import { useRef, useState } from "react"
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
import Img13 from "../../public/assets/swipe_img_1.png";
import Img14 from "../../public/assets/swipe_img_2.png";
import chatArrowRight from "../../public/assets/chat_arrow_right.png";

const ChatFilter = () => {
  const horizontalProfilesRef = useRef(null);
  const [profiles, setProfiles] = useState([
    { id: 1, img_url: Img1, name: "Kinjal" },
    { id: 2, img_url: Img2, name: "Belinda" },
    { id: 3, img_url: Img3, name: "Jennifer" },
    { id: 4, img_url: Img4, name: "Lucinda" },
    { id: 5, img_url: Img5, name: "Madeline" },
    { id: 6, img_url: Img6, name: "Reagan" },
    { id: 7, img_url: Img7, name: "Catherine" },
    { id: 8, img_url: Img8, name: "Priscilla" },
    { id: 9, img_url: Img9, name: "Lucinda" }
  ])

  const handleHorizontalScrollBtn = (val) => {
    if (horizontalProfilesRef.current) {
      horizontalProfilesRef.current.scrollBy({
        left: val,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className='w-[400px] bg-primary-dark-3 h-full p-[30px]'>
      <div className="text-[26px] font-bold leading-[30px]">
        Favorites
      </div>
      <div className="relative flex items-center mt-5">
        <button className="absolute left-0 min-w-10 min-h-[52px] flex justify-center items-center rotate-180" onClick={() => handleHorizontalScrollBtn(-40)}>
          <Image src={chatArrowRight} alt="" height={1000} width={1000} className="h-full w-full pointer-events-none" />
        </button>
        <div ref={horizontalProfilesRef} className='flex gap-x-4 overflow-x-auto items-center ps-5 pe-6' style={{ scrollbarWidth: "none" }}>
          {profiles?.map((item, idx) => {
            return (
              <div key={idx} className="flex items-center justify-center">
                <Image src={item.img_url} alt="" height={40} width={40} priority className="aspect-square min-h-10 min-w-10 object-cover rounded-full pointer-events-none" />
              </div>
            )
          })}
        </div>
        <button className="absolute right-0 min-w-10 min-h-[52px] flex justify-center items-center" onClick={() => handleHorizontalScrollBtn(40)}>
          <Image src={chatArrowRight} alt="" height={1000} width={1000} className="h-full w-full pointer-events-none" />
        </button>
      </div>
    </div>
  )
}

export default ChatFilter