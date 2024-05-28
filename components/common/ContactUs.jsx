"use client"

import React, { useEffect, useState } from 'react'
import mailIcon from "/public/assets/contact_mail.svg"
import locationIcon from "/public/assets/contact_location.svg"
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { contact_us_action } from '@/app/lib/actions'
import { notification } from 'antd'
import { client_notification, client_routes } from '@/app/lib/helpers'
import NotificationIcon from "/public/assets/bell_icon.svg"
import Bars_Icon from "/public/assets/bars.svg"
import { useStore } from '@/store/store'
import arrowLeft from "/public/assets/arrow_left.svg";
import Link from 'next/link'

const ContactUs = ({ user, allStrings }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, setValue, watch, handleSubmit } = useForm();
  const { dispatch, state: { notifyBadgeState } } = useStore()
  const [isEmail, setIsEmail] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const boxes = [
    {
      name: allStrings["string_email"],
      desc: allStrings["string_supports@elitesugar.com"],
      image: mailIcon
    },
    {
      name: allStrings["string_press_&_media"],
      desc: allStrings["string_press@elitesugar.com"],
      image: mailIcon
    },
    {
      name: allStrings["string_address"],
      desc: allStrings["string_disp_i/s_maglebjergvej_6_2800_cvr_:_433433912"],
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

  const handleContactUsSubmit = async () => {
    let obj = {
      user_id: user.id,
      subject: watch("subject"),
      message: watch("message")
    }
    setIsLoading(true);
    let res = await contact_us_action(obj);
    console.log(res);
    if (res.success) {
      client_notification(api, "topRight", "success", res.message, 3);
    } else {
      client_notification(api, "topRight", "error", res.message, 3);
    }
    setValue("subject", "")
    setValue("message", "")
    setIsLoading(false);
  }

  return (
    <div className=' md:pt-10 flex flex-col items-center w-full md:mb-20 mb-10'>
      {contextHolder}
      <div className="md:hidden w-full px-[15px] mb-[30px] mt-[12px] flex justify-center items-center relative">
        <Link href={client_routes.profile} className='absolute left-[15px]'>
          <Image src={arrowLeft} alt="left" width={24} height={24} priority className="cursor-pointer" />
        </Link>
        <p className="text-[24px] font-semibold select-none">{allStrings["string_contact_us"]}</p>
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
      <div className="font-bold text-[30px] leading-[40px] hidden md:block">{allStrings["string_contact_us"]}</div>
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
          <div className='text-[25px] md:text-[30px] font-semibold leading-[25px] md:leading-[30px] text-center md:text-start'>{allStrings["string_send_us_a_message"]}</div>
          <div className='mt-5 md:mt-7 flex flex-col sm:flex-row gap-x-5 md:gap-x-10'>
            {isEmail
              ? <div className='w-full'>
                <div className='text-[16px] font-normal leading-[normal]'>{`${allStrings["string_email"]} (${allStrings["string_cannot_be_changed"]})`}</div>
                <input type="text" {...register("email")} className='mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 h-10 w-full' disabled />
              </div>
              : <div className='w-full'>
                <div className='text-[16px] font-normal leading-[normal]'>{`${allStrings["string_mobile_number"]} (${allStrings["string_cannot_be_changed"]})`}</div>
                <input type="text" {...register("mobile_no")} className='mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 h-10 w-full' disabled />
              </div>
            }
            <div className='w-full flex flex-col justify-between mt-3 sm:mt-0'>
              <div className='text-[16px] font-normal leading-[normal]'>{allStrings["string_subject"]}</div>
              <input type="text" {...register("subject", { required: true })} className={`mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 h-10 w-full ${isLoading ? "pointer-events-none" : ""}`} required autoComplete='off' />
            </div>
          </div>
          <div className='w-full mt-3 sm:mt-5'>
            <div className='text-[16px] font-normal leading-[normal]'>{allStrings["string_message"]}</div>
            <textarea type="text" {...register("message", { required: true })} className={`mt-1 md:mt-3 bg-primary-dark-6 rounded-md border-none focus:outline-none px-3 w-full resize-none py-2 ${isLoading ? "pointer-events-none" : ""}`} rows={4} required autoComplete='off' />
          </div>
          <div className='mt-5 md:mt-10 w-full flex justify-center'>
            <button type='submit' className={`flex justify-center items-center bg-tinder rounded-[5px] w-full max-w-[340px] h-10 sm:h-[56px] text-center font-semibold text-[18px] leading-[18px] ${isLoading ? "pointer-events-none" : ""}`}>
              {isLoading
                ? <div className='loader'></div>
                : allStrings["string_send"]
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs