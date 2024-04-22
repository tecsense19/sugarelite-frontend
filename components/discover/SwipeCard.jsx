"use client"

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Img2 from "/public/assets/profile_img_3.png";
import premiumUserIcon from "/public/assets/premium_user_icon.svg";
import closeIcon from "/public/assets/cross_icon.svg";
import starIcon from "/public/assets/star_icon.svg";
import heartIcon from "/public/assets/heart_swipe_icon.svg";
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import { useStore } from '@/store/store';

const SwipeCard = ({ profile, onSwipe, i, profiles, onLeftClick, onRightClick, activeIndex, currentPhotoNumber }) => {
  const cardRef = useRef(null);
  let dragCardValues = {}

  const { state: { onlineUsers } } = useStore()

  useEffect(() => {
    if (cardRef.current) {
      const Hammer = require("hammerjs")
      const hammer = new Hammer(cardRef.current);
      cardRef.current.style.zIndex = i;

      if (i === activeIndex) {
        hammer.on('pan', (event) => {
          cardRef.current.classList.add('moving');
        });

        hammer.on('pan', (event) => {
          if (event.deltaX === 0) return;
          if (event.center.x === 0 && event.center.y === 0) return;

          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;

          cardRef.current.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        });

        cardRef.current.addEventListener("touchend", (event) => {
          if (event) {
            if (cardRef.current) {
              cardRef.current.style.transform = ''
            }
          }
        })

        hammer.on('panend', (event) => {
          cardRef.current.classList.remove('moving');
          const moveOutWidth = document.body.clientWidth;
          const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

          if (keep) {
            cardRef.current.style.transform = ''
            event.target.style.transform = '';
          } else {
            cardRef.current.style.transform = `translate(${moveOutWidth * 2}px, -100px) rotate(-30deg)`
            const direction = event.deltaX > 0 ? 'right' : 'left';
            onSwipe(profile, direction, i);
          }
        });
      }

      return () => {
        hammer.destroy();
        if (cardRef.current) {
          cardRef.current.removeEventListener("touchend", (event) => {
            if (event) {
              if (cardRef.current) {
                cardRef.current.style.transform = ''
              }
            }
          })
        }
      };
    }
  }, [onSwipe, cardRef.current]);

  const onCardDragStart = (e) => {
    dragCardValues = { clientX: e.clientX, clientY: e.clientY };
  }

  const onCardDragEnd = (e, fn) => {
    if (dragCardValues.clientX === e.clientX && dragCardValues.clientY === e.clientY) {
      let coords = { clientX: e.clientX, clientY: e.clientY };
      if (fn) {
        fn();
      } else {
        handleImageChange(coords);
      }
    }
  }
  const handleImageChange = (coords) => {
    let btn = document.getElementById("imageChangeCard_" + i);
    let rect = btn.getBoundingClientRect();
    let btnWidth = rect.width;
    let clickedX = coords.clientX - rect.x;
    if (clickedX <= btnWidth / 2) {
      onLeftClick();
    } else {
      onRightClick();
    }
  }

  const onCrossClick = () => {
    // console.log("Cross Click", i)
    const moveOutWidth = window.innerWidth
    cardRef.current.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
    const direction = 'left';
    setTimeout(() => {
      onSwipe(profile, direction, i);
    }, 100)
  }
  const onBookmarkClick = () => {
    console.log("Bookmark Click", i)
  }
  const onHeartClick = async () => {
    console.log("Heart Click", i)
    const moveOutWidth = window.innerWidth
    cardRef.current.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`
    const direction = 'right';
    setTimeout(() => {
      onSwipe(profile, direction, i);
    }, 100)
  }

  return (
    <>
      <div ref={cardRef} id={`imageChangeCard_${i}`} className={`profile-card absolute text-white bg-primary ease-linear duration-100 transition-transform rounded-xl select-none overflow-hidden w-full h-full ${i === activeIndex ? "cursor-grab" : ""}`}>
        {/* onMouseDown={onCardDragStart} onMouseUp={onCardDragEnd} */}
        <div className="relative group w-full h-full">
          {profile.avatar_url
            ? <Image src={profile.avatar_url} alt={profile.username} width={1000} height={1000} className='h-full w-full rounded-xl object-cover object-center pointer-events-none' priority />
            : <>
              {(profile.sugar_type === "EliteDaddy" || profile.sugar_type === "EliteBoy")
                ? <Image src={manPlaceolderImg} unoptimized alt={profile.username} width={1000} height={1000} className="h-full w-full rounded-xl object-contain object-center pointer-events-none bg-primary-dark-5 py-14" priority />
                : (profile.sugar_type === "EliteMama" || profile.sugar_type === "EliteBabe")
                  ? <Image src={womanPlaceolderImg} unoptimized alt={profile.username} width={1000} height={1000} className="h-full w-full rounded-xl object-contain object-center pointer-events-none bg-primary-dark-5 py-14" priority />
                  : <Image src={placeholder} unoptimized alt={profile.username} width={1000} height={1000} className="h-full w-full rounded-xl object-contain object-center pointer-events-none bg-primary-dark-5 py-14" priority />
              }
            </>
          }
          <div className='discover-card-bg h-full w-full rounded-xl absolute top-0 pointer-events-none'></div>
          <div className="absolute inset-0 w-full h-full flex flex-col justify-end items-center pt-[14px] pb-[17px] px-[17px]">
            <div className='relative h-full w-full flex flex-col justify-between'>
              {(onlineUsers.some(i => i === profile.id)) && <div className='absolute right-[-3px] top-[-1px] h-[13.2px] w-[13px] border-[2px] border-white bg-success rounded-full'></div>}
              <div className='flex w-full justify-center gap-x-[5.5px]'>
                {/* {
                  profile?.public_images?.map((item, idx) => {
                    return (
                      <div key={idx} className={`rounded-full h-[11px] w-[11px] ${(activeIndex === i) ? (currentPhotoNumber === idx ? "bg-secondary" : "bg-white/50") : (idx === 0 ? "bg-secondary" : "bg-white/50")}`} />
                    )
                  })
                } */}
              </div>
              <div className='flex justify-between items-end'>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-x-[11px]">
                    <div className='text-[clamp(19px,2vw,22px)] leading-[22px] font-bold'>{profile.username},{profile.age}</div>
                    {profile.is_premium && <Image src={premiumUserIcon} alt="" height={24} width={24} priority className="pointer-events-none" />}
                  </div>
                  <div className="mt-[5px] text-[clamp(14px,1.5vw,15px)] leading-[14px] font-medium text-white/50">{profile.region}</div>
                </div>
                <div className='flex flex-col gap-y-[13.2px] z-20'>
                  <button className='flex justify-center items-center cursor-pointer h-[52.3px] w-[52.3px] bg-white/50 rounded-full' onMouseDown={(e) => { e.stopPropagation(); onCardDragStart(e) }} onMouseUp={(e) => { e.stopPropagation(); onCardDragEnd(e, onCrossClick) }}>
                    <Image src={closeIcon} alt="" height={22} width={22} priority className="pointer-events-none" />
                  </button>
                  {/* <button className='flex justify-center items-center cursor-pointer h-[52.3px] w-[52.3px] bg-white/50 rounded-full' onMouseDown={(e) => { e.stopPropagation(); onCardDragStart(e) }} onMouseUp={(e) => { e.stopPropagation(); onCardDragEnd(e, onBookmarkClick) }}>
                    <Image src={starIcon} alt="" height={22} width={22} priority className="pointer-events-none" />
                  </button> */}
                  <button className='flex justify-center items-center z-20 cursor-pointer h-[52.3px] w-[52.3px] bg-secondary rounded-full' onMouseDown={(e) => { e.stopPropagation(); onCardDragStart(e) }} onMouseUp={(e) => { e.stopPropagation(); onCardDragEnd(e, onHeartClick) }}>
                    <Image src={heartIcon} alt="" height={24} width={22} priority className="pointer-events-none h-[24px] w-[22px] aspect-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div >
    </>
  );
};

export default SwipeCard;