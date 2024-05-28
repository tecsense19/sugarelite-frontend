"use client"

import React, { useState } from 'react'
import verification_img from "/public/assets/verification_img.svg"
import Image from 'next/image'
import VerificationModal from './VerificationModal'
import Link from 'next/link'
import { client_routes } from '@/app/lib/helpers'
import NotificationIcon from "/public/assets/bell_icon.svg"
import Bars_Icon from "/public/assets/bars.svg"
import { useStore } from '@/store/store'
import arrowLeft from "/public/assets/arrow_left.svg";

const Verification = ({ user, allStrings }) => {

  const { dispatch, state: { notifyBadgeState } } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='md:pt-10 flex flex-col items-center w-full md:mb-20 mb-10'>
      <VerificationModal user={user} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} allStrings={allStrings} />
      <div className="md:hidden w-full px-[15px] mb-[30px] mt-[12px] flex justify-center items-center relative">
        <Link href={client_routes.profile} className='absolute left-[15px]'>
          <Image src={arrowLeft} alt="left" width={24} height={24} priority className="cursor-pointer" />
        </Link>
        <p className="text-[24px] font-semibold select-none">{allStrings["string_identity_verification"]}</p>
        <div className='flex gap-x-4 items-center absolute right-[15px]'>
          <div className='relative'>
            <Image src={NotificationIcon} alt="bell icon" width={20} height={20} priority className="cursor-pointer" onClick={() => dispatch({ type: "Open_Notification", payload: true })} />
            {notifyBadgeState.notify &&
              <p className="h-2 w-2 bg-secondary bounce rounded-full absolute -top-1 -right-1 "></p>
            }
          </div>
          <Image src={Bars_Icon} alt="more" width={24} height={24} priority className="cursor-pointer" onClick={() => dispatch({ type: "Show_Menu" })} />
        </div>
      </div>
      <div className="font-bold text-[30px] leading-[40px] hidden md:block">{allStrings["string_identity_verification"]}</div>
      {user.is_identityverification === "rejected"
        ? <div className='flex flex-col items-center w-full md:mt-5 mt-0'>
          <div className='w-full max-w-[440px] text-center text-secondary'>
            {allStrings["string_identity_verification_rejected_message"]}
          </div>
        </div>
        : <></>
      }
      {user.is_identityverification === "pending"
        ? <>
          <div className='flex flex-col items-center w-full md:mt-5 mt-0'>
            <div className='w-full max-w-[400px] text-center text-white/80 text-[16.5px]'>
              {allStrings["string_identity_verification_pending_message"]}
            </div>
          </div>
        </>
        : <></>
      }
      {user.is_identityverification === "approved"
        ? <div className='flex flex-col items-center w-full md:mt-5 mt-0'>
          <div className='w-full max-w-[400px] text-center text-[#4fff4f] text-[16.5px]'>
            {allStrings["string_identity_verification_approved_message"]}
          </div>
        </div>
        : <></>
      }
      <Image src={verification_img} alt='' height={300} width={250} className='pointer-events-none mx-2 mb-5 mt-12' />
      <div className={`flex flex-col justify-center px-2 md:px-0 ${(user.is_identityverification === "pending" || user.is_identityverification === "approved") ? "pointer-events-none opacity-50" : ""}`}>
        <div className='flex flex-col text-center'>
          <div>{allStrings["string_get_your_profile_verified."]}</div>
          <div>{allStrings["string_in_this_way,_we_and_others_can_see_that_you_are_genuine."]}</div>
          <div>{allStrings["string_you_will_receive_a_unique_badge_showing_you_are_verified."]}</div>
        </div>
        <div className="flex w-full justify-center">
          <button className='mt-5 flex justify-center items-center bg-tinder rounded-[5px] w-full max-w-[350px] h-10 sm:h-[56px] text-center font-semibold text-[18px] leading-[18px]' onClick={() => setIsModalOpen(true)}>
            {allStrings["string_verify"]}
          </button>
        </div>
        <div className='flex flex-col items-start mt-8 font-semibold text-[18px]'>
          <li className="">{allStrings["string_your_picture_can_only_be_seen_by_administrators."]}</li>
          <li className="mt-4">{allStrings["string_the_id_card_is_deleted_after_handling_the_request."]}</li>
        </div>
      </div>
    </div>
  )
}

export default Verification