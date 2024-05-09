"use client"

import React, { useEffect, useState } from 'react'
import mailIcon from "/public/assets/contact_mail.svg"
import locationIcon from "/public/assets/contact_location.svg"
import Image from 'next/image'
import { useForm } from 'react-hook-form'

const ContactUs = ({ user }) => {
  const { register, setValue, watch, handleSubmit } = useForm();
  const [isEmail, setIsEmail] = useState(true);
  const boxes = [
    {
      name: "Email",
      desc: "supports@elitesugar.com",
      image: mailIcon
    },
    {
      name: "Press & media",
      desc: "press@elitesugar.com",
      image: mailIcon
    },
    {
      name: "Address",
      desc: "Disp I/S Maglebjergvej 6 2800 CVR : 433433912",
      image: locationIcon
    }
  ]

  useEffect(() => {
    if (user) {
      if (user.email) {
        setValue("email", user.email)
        setIsEmail(true)
      } else if (user.mobile_no) {
        setValue("mobile_no", user.email)
        setIsEmail(false)
      }
    }
  }, [])

  const handleContactUsSubmit = () => {

  }

  return (
    <div className='pt-5 md:pt-10 flex flex-col items-center w-full md:mb-20 mb-10'>
      <div className="font-bold text-[30px] leading-[40px]">Contact Us</div>
      <div className='flex flex-col-reverse xs:flex-col items-center w-full'>
        <div className='mt-6 md:mt-[100px] grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 items-center gap-y-5 md:w-[61%] md:min-w-[750px] w-full'>
          {boxes.map((obj, inx) => (
            <div key={inx} className={`flex justify-center w-full  ${inx === 2 ? "xs:col-span-2 md:col-span-1" : ""} ${inx === 0 ? "md:justify-start" : (inx === boxes.length - 1 ? "md:justify-end" : "md:justify-center")}`}>
              <div className={`flex flex-col gap-y-2 md:gap-y-5 items-center md:w-[230px] w-full px-5 xs:px-3  md:px-0`}>
                <div className='rounded-full bg-tinder flex justify-center items-center h-[80px] w-[80px] sm:h-[100px] sm:w-[100px]'>
                  <Image src={obj.image} alt={obj.name} width={40} height={40} className='w-8 h-8 sm:w-10 sm:h-10' />
                </div>
                <div className='flex flex-col items-center gap-y-1 md:gap-y-[5px]'>
                  <div className='text-center text-[18px] md:text-[20px] font-medium md:font-semibold leading-[normal]'>{obj.name}</div>
                  <div className='text-center text-white/90 text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[25px]'>{obj.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form className='mt-6 md:mt-[75px] w-full px-5 md:px-0 md:w-[49.3%] md:min-w-[600px]' onSubmit={handleSubmit(handleContactUsSubmit)}>
          <div className='text-[25px] md:text-[30px] font-semibold leading-[25px] md:leading-[30px] text-center md:text-start'>Send us a message</div>
          <div className='mt-5 md:mt-7 flex flex-col sm:flex-row gap-x-5 md:gap-x-10'>
            {isEmail
              ? <div className='w-full'>
                <div className='text-[16px] font-normal leading-[normal]'>Email (cannot be changed)</div>
                <input type="text" {...register("email")} className='mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 h-10 w-full' disabled />
              </div>
              : <div className='w-full'>
                <div className='text-[16px] font-normal leading-[normal]'>Phone (cannot be changed)</div>
                <input type="text" {...register("mobile_no")} className='mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 h-10 w-full' disabled />
              </div>
            }
            <div className='w-full flex flex-col justify-between mt-3 sm:mt-0'>
              <div className='text-[16px] font-normal leading-[normal]'>Subject</div>
              <input type="text" {...register("subject")} className='mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 h-10 w-full' />
            </div>
          </div>
          <div className='w-full mt-3 sm:mt-5'>
            <div className='text-[16px] font-normal leading-[normal]'>Message</div>
            <textarea type="text" {...register("message")} className='mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 w-full resize-none py-2' rows={4} />
          </div>
          <div className='mt-5 md:mt-10 w-full flex justify-center'>
            <button type='submit' className='flex justify-center items-center bg-tinder rounded-[5px] w-full max-w-[340px] h-10 sm:h-[56px] text-center font-semibold text-[18px] leading-[18px]'>
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs