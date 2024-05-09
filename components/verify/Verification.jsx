"use client"

import React, { useState } from 'react'
import verification_img from "/public/assets/verification_img.svg"
import Image from 'next/image'
import VerificationModal from './VerificationModal'

const Verification = ({ user }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='pt-5 md:pt-10 flex flex-col items-center w-full md:mb-20 mb-10'>
      <VerificationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="font-bold text-[30px] leading-[40px]">Verification</div>
      <Image src={verification_img} alt='' height={300} width={250} className='pointer-events-none mx-2 mb-5 mt-12' />
      <div className='flex flex-col justify-center px-2 md:px-0'>
        <div className='flex flex-col text-center'>
          <div>Get your profile verified.</div>
          <div>In this way, we and others can see that you are genuine.</div>
          <div>You will receive a unique badge showing you are verified.</div>
        </div>
        <div className="flex w-full justify-center">
          <button className='mt-5 flex justify-center items-center bg-tinder rounded-[5px] w-full max-w-[350px] h-10 sm:h-[56px] text-center font-semibold text-[18px] leading-[18px]' onClick={() => setIsModalOpen(true)}>
            VERIFY
          </button>
        </div>
        <div className='flex flex-col items-center mt-8 font-semibold text-[18px]'>
          <li className="">Your picture can only be seen by administrators.</li>
          <li className=" mt-4">The ID card is deleted after handling the request.</li>
        </div>
      </div>
    </div>
  )
}

export default Verification