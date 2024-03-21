"use client"
import { useStore } from '@/store/store'
import { ConfigProvider, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import StripeModal from './StripeModal'
import subscription_include from "/public/assets/subscription_include.png"
import subscription_not_include from "/public/assets/subscription_not_include.png"
import Image from 'next/image'
import arrow_left from "/public/assets/arrow_left.svg";
import { client_routes } from '@/app/lib/helpers'
import Link from 'next/link'

const subscriptions = [
  { name: "4 Weeks", value: "4week", key: process.env.NEXT_PUBLIC_STRIPE_4_WEEKS, amount: 116 },
  { name: "6 Weeks", value: "6week", key: process.env.NEXT_PUBLIC_STRIPE_6_WEEKS, amount: 156 },
  { name: "12 Weeks", value: "12week", key: process.env.NEXT_PUBLIC_STRIPE_12_WEEKS, amount: 228 },
]

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentObj, setSelectedPaymentObj] = useState("")
  const { state: { userState } } = useStore()
  console.log(userState);
  const [isPremium, setIsPremium] = useState(false)

  const details = [
    { including: true, desc: "Read and write messages without any restrictions" },
    { including: true, desc: "Stop your subscription at any time" },
    { including: true, desc: "See all pictures" },
    { including: true, desc: "24-timers support" },
    { including: true, desc: "Emblem on your profile that shows you are a Premium user" },
    // { including: true, desc: "Lorem ipsum dolor sit amet" },
    // { including: true, desc: "Lorem ipsum dolor sit amet" },
  ]

  useEffect(() => {
    if (userState) {
      setIsPremium(userState?.is_subscribe ? true : false)
    }
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (obj) => {
    setSelectedPaymentObj(obj)
    showModal()
  }

  const getDate = (date) => {
    const tempDate = new Date(date);
    const str = tempDate.toDateString();
    let newDate = str.split(" ");
    return `${newDate[1]} ${newDate[2]}, ${newDate[3]}`
  }

  return (
    <div className='md:pt-[66px] text-white p-5'>
      <div className='md:mt-10 flex flex-col w-full items-center relative'>
        <Link href={client_routes.profile} prefetch={true} className='absolute left-0 top-1 flex md:hidden'>
          <Image src={arrow_left} alt='' height={30} width={30} className='pointer-events-none' />
        </Link>
        <div className='xl:text-[30px] lg:text-[25px] text-[18px] font-bold leading-[40px] text-center'>
          {isPremium
            ? "Your Subscription"
            : "Upgrade Your Dating Journey. Get Premium Access Now."
          }
        </div>
        <div className='mt-[14px] text-[18px] text-center font-light leading-[20px]'>
          {isPremium
            ? "Manage your current plan"
            : "Discover Your Perfect Match with Our Premium Features. Find Your Love Faster with Exclusive Benefits. Upgrade Your Dating Experience Today"
          }
        </div>
      </div>
      {isPremium &&
        <div className='flex w-full justify-center mt-7 sm:my-10'>
          <div className="2xl:w-9/12 xl:w-10/12 w-full flex flex-col rounded-xl overflow-hidden">
            <div className='bg-black p-5 sm:p-8 2xl:px-[70px] xl:px-[60px] flex justify-between items-center'>
              <div className='flex flex-col items-start'>
                <div className='text-[15px] sm:text-[16px] font-semibold leading-[normal]'>Current Plan</div>
                <div className='mt-[10px] text-[24px] sm:text-[30px] font-semibold leading-[24px] sm:leading-[30px]'>4 Weeks</div>
              </div>
              <div className='text-[30px] sm:text-[40px] font-semibold leading-[normal]'>
                $69
              </div>
            </div>
            <div className="bg-primary-dark-6 p-6 sm:p-10">
              <div className='flex justify-between sm:px-0 md:px-[20px] xl:px-[60px] 2xl:px-[80px]'>
                <div className="flex flex-col items-start">
                  <div className="text-[20px] sm:text-[22px] font-bold leading-[normal]">{getDate(userState.subscription_start_date)}</div>
                  <div className="mt-[7px] sm:mt-[10px] text-[15px] sm:text-[16px] font-medium leading-[normal]">Subscription Date</div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-[20px] sm:text-[22px] font-bold leading-[normal]">{getDate(userState.next_subscription_date)}</div>
                  <div className="mt-[7px] sm:mt-[10px] text-[15px] sm:text-[16px] font-medium leading-[normal]">Renewal Date</div>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row justify-center mt-7 sm:mt-10 gap-3 sm:gap-5'>
                <button className='w-full sm:w-[250px] md:w-[340px] rounded-[5px] justify-center items-center flex py-[15px] sm:py-[19px] text-[17px] sm:text-[18px] font-semibold leading-[17px] sm:leading-[18px] bg-primary-dark-4'>CANCEL PLAN</button>
                <button className='w-full sm:w-[250px] md:w-[340px] rounded-[5px] justify-center items-center flex py-[15px] sm:py-[19px] text-[17px] sm:text-[18px] font-semibold leading-[17px] sm:leading-[18px] bg-danger'>UPDATE PLAN</button>
              </div>
            </div>
          </div>
        </div>
      }
      <div className='flex w-full justify-center'>
        <div className='2xl:w-9/12 xl:w-10/12 w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[37px] mt-10'>
          {subscriptions.map((item, inx) => (
            <div key={inx} className={`flex justify-center items-center ${inx === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
              <div className='bg-primary-dark rounded-[5px] w-full max-w-[450px]'>
                <div className={`mt-10 bg-[url('/assets/subscription_details_bg.png')] bg-cover bg-right-top text-[28px] sm:text-[32px] font-bold leading-[56px] h-[79px] w-[260px] sm:w-[275px] ps-[45px] sm:ps-[56px] flex items-center`}>
                  {item.name}
                </div>
                <div className='mt-[35px] flex justify-center items-center text-[50px] sm:text-[60px] font-bold leading-[70px] sm:leading-[80px]'> ${item.amount}</div>
                <div className='mt-[30px] flex flex-col gap-y-7 items-center'>
                  {details.map((item, idx) => (
                    <div key={idx} className='flex gap-x-[7px] sm:gap-x-[10px] items-start justify-start px-3 w-full sm:px-5 md:px-8 xl:px-5 2xl:px-8'>
                      <Image src={item.including ? subscription_include : subscription_not_include} alt="" height={20} width={20} className='pointer-events-none' />
                      <div className='text-[18px] font-medium leading-[20px]'>{item.desc}</div>
                    </div>
                  ))
                  }
                </div>
                {/* {/ <div className='text-[20px]'>{item.name}</div> /} */}
                <div className='w-full flex items-center justify-center mt-[45px] mb-10'>
                  <button className='bg-tinder rounded-[5px] py-[11px] w-[230px] sm:w-[241px] flex justify-center items-center text-[16px] font-medium leading-[normal]' onClick={() => handleSubmit(item)}>
                    GET STARTED
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfigProvider theme={{
        "token": {
          "colorPrimary": "#f16661",
          "colorInfo": "#f16661"
        }
      }}>
        <Modal title="Enter card details" centered footer={false} open={isModalOpen} onCancel={handleCancel}>
          <StripeModal selectedPaymentObj={selectedPaymentObj} setIsModalOpen={setIsModalOpen} />
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default Index