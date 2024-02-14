"use client"

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
import SwipeCard from "./SwipeCard";
import React, { useState } from "react";

const SwipePage = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, imgUrl: Img1, is_active: true, name: "Inga Green", age: 37, is_premium: false, desc: "Obcaecati cumque et" },
    { id: 2, imgUrl: Img2, is_active: false, name: "Inga Green", age: 22, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 3, imgUrl: Img3, is_active: false, name: "Inga Green", age: 29, is_premium: false, desc: "Obcaecati cumque et" },
    { id: 4, imgUrl: Img4, is_active: true, name: "Inga Green", age: 24, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 5, imgUrl: Img5, is_active: false, name: "Inga Green", age: 32, is_premium: false, desc: "Obcaecati cumque et" },
    { id: 6, imgUrl: Img6, is_active: false, name: "Inga Green", age: 29, is_premium: false, desc: "Obcaecati cumque et" },
    { id: 7, imgUrl: Img7, is_active: true, name: "Inga Green", age: 28, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 8, imgUrl: Img8, is_active: false, name: "Inga Green", age: 30, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 9, imgUrl: Img9, is_active: true, name: "Inga Green", age: 37, is_premium: false, desc: "Obcaecati cumque et" },
    { id: 10, imgUrl: Img10, is_active: false, name: "Inga Green", age: 37, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 11, imgUrl: Img11, is_active: true, name: "Inga Green", age: 37, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 12, imgUrl: Img12, is_active: false, name: "Inga Green", age: 37, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 13, imgUrl: Img13, is_active: true, name: "Inga Green", age: 24, is_premium: true, desc: "Obcaecati cumque et" },
    { id: 14, imgUrl: Img14, is_active: true, name: "Inga Green", age: 24, is_premium: true, desc: "Obcaecati cumque et" },
  ])

  const swiped = (direction, profile) => {
    if (direction === "left") {
      // toast.warn("Swiped Left")
      console.log("left", profile)
    } else if (direction === "right") {
      // toast.success("Swiped Right")
      console.log("right", profile)
    }
  }
  const outOfFrame = (profile, index) => {
    let updatedProfiles = profiles.filter((chr) => {
      if (chr.id === profile.id) {
        return false
      } else {
        return true
      }
    })
    setProfiles(updatedProfiles)
  }
  const handleSwipe = (profile, direction, index) => {
    if (direction === 'right') {
      // Handle right swipe
      swiped(direction, profile)
      outOfFrame(profile, index)
    } else if (direction === 'left') {
      // Handle left swipe
      swiped(direction, profile)
      outOfFrame(profile, index)
    }
  };

  return (
    <div className="bg-primary max-h-full h-full w-[calc(100%-400px)] p-[40px] xl:[60px] 2xl:p-[70px] overflow-y-auto" style={{ scrollbarWidth: "none" }} data-aos="fade-left">
      <div className='w-full flex h-full items-center justify-center relative transition-opacity duration-[.1s] ease-in-out'>
        <div className='relative items-center h-[80vh] md:h-full md:w-full flex justify-center'>
          <div className="relative md:max-h-[550px] h-[70vh] w-[90vw] max-w-[330px] flex items-start">
            {profiles?.map((profile, idx) => {
              return (
                <React.Fragment key={idx}>
                  <SwipeCard profile={profile} profiles={profiles} i={idx} onSwipe={handleSwipe} />
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}

export default SwipePage