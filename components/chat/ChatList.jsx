"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image";
import 'react-chat-elements/dist/main.css'
import { ChatItem } from 'react-chat-elements';
import "./ChatList.css";
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

export default ({ setSelectedObj }) => {
  const horizontalProfilesRef = useRef(null);
  const timeBefore30Mins = new Date().setMinutes(new Date().getMinutes() - 30);
  const [profiles, setProfiles] = useState([
    { id: 1, img_url: Img1, name: "Kinjal", time: timeBefore30Mins, online: true, last_activity: "", unread_count: 3, last_msg: "How are you john?" },
    { id: 2, img_url: Img2, name: "Belinda", time: timeBefore30Mins, online: true, last_activity: "", unread_count: 2, last_msg: "How are you john?" },
    { id: 3, img_url: Img3, name: "Jennifer", time: timeBefore30Mins, online: true, last_activity: "", unread_count: 4, last_msg: "Ok, by see you" },
    { id: 4, img_url: Img4, name: "Lucinda", time: timeBefore30Mins, online: false, last_activity: "", unread_count: 0, last_msg: "I will meet Jennifer" },
    { id: 5, img_url: Img5, name: "Madeline", time: timeBefore30Mins, online: false, last_activity: "", unread_count: 0, last_msg: "How are you ?" },
    { id: 6, img_url: Img6, name: "Reagan", time: timeBefore30Mins, online: false, last_activity: "near", unread_count: 0, last_msg: "sample text here" },
    { id: 7, img_url: Img7, name: "Catherine", time: timeBefore30Mins, online: false, last_activity: "near", unread_count: 0, last_msg: "sample text here" },
    { id: 8, img_url: Img8, name: "Priscilla", time: timeBefore30Mins, online: false, last_activity: "", unread_count: 0, last_msg: "I will meet Jennifer" },
    { id: 9, img_url: Img9, name: "Lucinda", time: timeBefore30Mins, online: false, last_activity: "", unread_count: 0, last_msg: "I will meet Jennifer" }
  ])
  const [showProfileScrollLeftBtn, setShowProfileScrollLeftBtn] = useState(false)
  const [showProfileScrollRightBtn, setShowProfileScrollRightBtn] = useState(false)

  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
    if (horizontalProfilesRef.current) {
      // console.log(.scrollLeft)
    }
    const handleScroll = () => {
      let leftScroll = horizontalProfilesRef.current.scrollLeft;
      let maxLeftScroll = horizontalProfilesRef.current.scrollWidth - horizontalProfilesRef.current.clientWidth;
      (leftScroll === 0) ? setShowProfileScrollLeftBtn(false) : setShowProfileScrollLeftBtn(true);
      (leftScroll === maxLeftScroll) ? setShowProfileScrollRightBtn(false) : setShowProfileScrollRightBtn(true);
    };
    handleScroll()

    const container = horizontalProfilesRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };

  }, [])

  const handleHorizontalScrollBtn = (val) => {
    if (horizontalProfilesRef.current) {
      horizontalProfilesRef.current.scrollBy({
        left: val,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className='w-[400px] bg-primary-dark-3 h-full py-[30px]' data-aos="fade-right" data-aos-duration="800">
      <div className="text-[26px] font-bold leading-[30px] px-[30px]">
        Favorites
      </div>
      <div className="relative flex items-center mt-5 px-[22px] mx-1">
        <button className={`absolute left-0 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollLeftBtn ? "flex" : "hidden"}`} onClick={() => handleHorizontalScrollBtn(-40)}>
          <Image src={chatArrowRight} alt="" height={1000} width={1000} className="h-full w-full pointer-events-none rotate-180" />
        </button>
        <div ref={horizontalProfilesRef} className={`flex gap-x-4 overflow-x-auto items-center ${showProfileScrollLeftBtn ? "ps-5" : "ps-0"} ${showProfileScrollRightBtn ? "pe-6" : "pe-0"}`} style={{ scrollbarWidth: "none" }}>
          {profiles?.map((item, idx) => {
            return (
              <button key={idx} className="flex items-center justify-center" onClick={() => setSelectedObj(item)}>
                <Image src={item.img_url} alt="" height={40} width={40} priority className="aspect-square min-h-10 min-w-10 object-cover rounded-full pointer-events-none" />
              </button>
            )
          })}
        </div>
        <button className={`absolute right-0 min-w-10 min-h-[52px] justify-center items-center ${showProfileScrollRightBtn ? "flex" : "hidden"}`} onClick={() => handleHorizontalScrollBtn(40)}>
          <Image src={chatArrowRight} alt="" height={1000} width={1000} className="h-full w-full pointer-events-none" />
        </button>
      </div>
      <div className="mt-[30px] px-[30px]">
        <div className="text-[26px] font-bold leading-[30px]">My Chat List</div>
      </div>
      <div className="flex flex-col mt-5 gap-y-4 overflow-y-auto h-[calc(100%-170px)] ps-[30px] me-3 pe-3 second-child">
        {profiles?.map((item, idx) => {
          return (
            <ChatItem
              onClick={() => setSelectedObj(item)}
              key={idx}
              className="rounded-[5px] overflow-hidden border-[1px] border-white/30"
              statusColor={item.online ? "#3DC73A" : (item.last_activity === "near" ? "#FEBF0F" : "")}
              avatar={item.img_url.src}
              alt=''
              title={item.name}
              subtitle={item.last_msg}
              date={item.time}
              unread={item.unread_count}
            />
          )
        })}
      </div>
    </div>
  )
}