"use client"

import SwipeCard from "./SwipeCard";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import backIcon from "../../public/assets/back_discover_icon.svg";
import nextIcon from "../../public/assets/next_discover_icon.svg";
import favouriteIcon from "../../public/assets/favourite_discover_icon.svg";
import settingsIcon from "../../public/assets/settings_icon.svg";
import { useStore } from "@/store/store";
import chevron_left from "/public/assets/arrow_left.svg"
import { useRouter } from "next/navigation";
import { client_routes } from "@/app/lib/helpers";


const SwipePage = ({ allUsers, currentUser, filterHandler }) => {
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [profiles, setProfiles] = useState(allUsers.slice(allUsers.length - 10, allUsers.length))
  // const [profiles, setProfiles] = useState(tempProfiles)

  const { state: { userState }, dispatch } = useStore()

  useEffect(() => {
    setActiveIndex(profiles.length - 1)
    console.log(profiles)
  }, [])

  const navigate = useRouter()


  const messageHandler = () => {
    console.log(allUsers[activeIndex])
  }

  const swiped = (direction, profile) => {
    if (direction === "left") {
      console.log("left", profile)
    } else if (direction === "right") {
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
    setActiveIndex(activeIndex - 1)
    setProfiles(updatedProfiles)
  }
  const handleSwipe = (profile, direction, index) => {
    if (direction === 'right') {
      swiped(direction, profile)
      outOfFrame(profile, index)
    } else if (direction === 'left') {
      swiped(direction, profile)
      outOfFrame(profile, index)
    }
  };

  const onLeftClick = () => {
    console.log("Left CLick")
    if (currentPhotoNumber > 0) {
      setCurrentPhotoNumber(currentPhotoNumber - 1)
    } else if (currentPhotoNumber === 0) {
      setCurrentPhotoNumber(profiles[activeIndex].public_images.length - 1)
    }
  }

  const onRightClick = () => {
    console.log("Right CLick")
    if (currentPhotoNumber < (profiles[activeIndex].public_images.length - 1)) {
      setCurrentPhotoNumber(currentPhotoNumber + 1)
    } else if (currentPhotoNumber === (profiles[activeIndex].public_images.length - 1)) {
      setCurrentPhotoNumber(0)
    }
  }

  const handleResetProfiles = () => {
    setProfiles(allUsers)
    setActiveIndex(allUsers.length - 1)
    // setProfiles(tempProfiles)
    // setActiveIndex(tempProfiles.length - 1)
  }

  return (
    <div className="max-h-full h-full w-full md:w-[calc(100%-300px)] p-5 md:p-0 lg:w-[calc(100%-400px)] overflow-y-auto flex flex-col justify-start md:justify-end" style={{ scrollbarWidth: "none" }}>
      <div className="md:hidden flex justify-between items-center" data-aos="fade-down" data-aos-duration="800">
        <div className="flex justify-center items-center" onClick={() => navigate.push(client_routes.profile)}>
          <Image src={chevron_left} alt="" height={24} width={24} priority className="pointer-events-none" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-white text-[24px] font-semibold leading-[23px]">Discover</div>
          <div className="text-white/70 text-[14px] font-medium leading-[16px] mt-2">You looking</div>
        </div>
        <button className="h-[42px] w-[42px] flex justify-center items-center bg-secondary rounded-[5px]" onClick={filterHandler}>
          <Image src={settingsIcon} alt="" height={20} width={20} priority className="pointer-events-none" />
        </button>
      </div>
      <div className='w-full flex h-[calc(100%-88px)] md:h-[85%] items-center justify-center relative transition-opacity duration-[.1s] ease-in-out' data-aos="fade-up" data-aos-duration="800">
        <div className='relative items-center h-full w-full flex justify-center'>
          {profiles.length
            ? <div className="relative max-w-[500px] max-h-[800px] h-[calc(100dvh-224px)] w-[calc(100vw-60px)] flex items-start">
              {/* {profiles?.map((profile, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <SwipeCard profile={profile} profiles={profiles} i={idx} onSwipe={handleSwipe} onLeftClick={onLeftClick} onRightClick={onRightClick} activeIndex={activeIndex} currentPhotoNumber={currentPhotoNumber} />
                  </React.Fragment>
                )
              })} */}
              {
                profiles.map((profile, idx) => {
                  // console.log(profile)
                  return (
                    <React.Fragment key={idx}>
                      <SwipeCard profile={profile} i={idx} onSwipe={handleSwipe} onLeftClick={onLeftClick} onRightClick={onRightClick} activeIndex={activeIndex} currentPhotoNumber={currentPhotoNumber} />
                    </React.Fragment>
                  )
                })
              }
            </div>
            : <div className="flex flex-col items-center">
              <div className="text-white text-[18px] font-semibold">No profiles available !</div>
              <button className="mt-3 px-5 py-2 bg-secondary rounded-[5px] text-white" onClick={handleResetProfiles}>Reset</button>
            </div>
          }
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 md:hidden mx-[10px]">
        <button className="h-[46px] rounded-[5px] flex justify-center items-center text-white bg-primary-dark-4 text-[18px] font-medium leading-[20px]">
          Refers
        </button>
        <button className="h-[46px] rounded-[5px] flex justify-center items-center text-white bg-primary-dark-4 text-[18px] font-medium leading-[20px]" onClick={messageHandler}>
          Message
        </button>
      </div>
      <div className="h-[10%] md:flex items-start justify-center gap-x-5 hidden" data-aos="fade-up" data-aos-anchor="#anchor" data-aos-duration="800">
        {/* <button className="bg-white/80 h-10 px-[23px] text-primary font-semibold text-[20px] leading-[22px] rounded-[5px]"> Hide </button> */}

        <div className="font-semibold text-[20px] leading-[22px] flex items-center gap-x-[14px]">
          <div className="h-10 w-10 rounded-[5px] flex justify-center items-center border-[1.5px] border-white/80">
            <Image src={backIcon} alt="" width={24} height={24} className='pointer-events-none' priority unoptimized />
          </div>
          <div className="text-[20px] font-semibold leading-[22px] text-white/80">Nope</div>
        </div>
        <div className="font-semibold text-[20px] leading-[22px] flex items-center gap-x-[14px]">
          <div className="h-10 w-10 rounded-[5px] flex justify-center items-center border-[1.5px] border-white/80">
            <Image src={nextIcon} alt="" width={24} height={24} className='pointer-events-none' priority />
          </div>
          <div className="text-[20px] font-semibold leading-[22px] text-white/80">Like</div>
        </div>
        <div className="font-semibold text-[20px] leading-[22px] flex items-center gap-x-[14px]">
          <div className="h-10 w-10 rounded-[5px] flex justify-center items-center border-[1.5px] border-white/80">
            <Image src={favouriteIcon} alt="" width={24} height={24} className='pointer-events-none' priority />
          </div>
          <div className="text-[20px] font-semibold leading-[22px] text-white/80">Favourite</div>
        </div>
      </div>
    </div>
  )
}

export default SwipePage