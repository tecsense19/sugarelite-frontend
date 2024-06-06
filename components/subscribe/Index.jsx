"use client"
import { useStore } from '@/store/store'
import { ConfigProvider, Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import StripeModal from './StripeModal'
import subscription_include from "/public/assets/subscription_include.svg"
import subscription_not_include from "/public/assets/subscription_not_include.png"
import Image from 'next/image'
import arrow_left from "/public/assets/arrow_left.svg";
import { client_notification, client_routes } from '@/app/lib/helpers'
import Link from 'next/link'
import { cancel_subscription_action, search_profile_action, start_stop_subscription_action } from '@/app/lib/actions'

const Index = ({ subscriptions, STRIPE_TEST_KEY, userData, allStrings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentObj, setSelectedPaymentObj] = useState("")
  const { dispatch } = useStore();
  const [user, setUser] = useState(userData);
  const [isPremium, setIsPremium] = useState((user.is_subscribe === 1) ? true : false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const [isStartStopLoading, setIsStartStopLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();

  const details = [
    { including: true, desc: allStrings["string_read_and_write_messages_without_any_restrictions"] },
    { including: true, desc: allStrings["string_stop_your_subscription_at_any_time"] },
    { including: true, desc: allStrings["string_see_all_pictures"] },
    { including: true, desc: allStrings["string_24-hour_support"] },
    { including: true, desc: allStrings["string_emblem_on_your_profile_that_shows_you_are_a_premium_user"] },
    // { including: true, desc: "Lorem ipsum dolor sit amet" },
    // { including: true, desc: "Lorem ipsum dolor sit amet" },
  ]

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

  const handleCancelPlan = async () => {
    setIsLoading(true)
    setIsCancelLoading(true)
    console.log("Cancel plan");
    let obj = {
      "user_id": user?.id,
      "at_cancel": "yes"
    }
    const res = await cancel_subscription_action(obj);
    console.log("res ::", res);
    if (res?.success) {
      const userRes = await search_profile_action(user.id)
      // const token = CryptoJS.AES.encrypt(JSON.stringify(userRes.data[0]), "SecretKey").toString()
      // setCookie(null, "user", token, { maxAge: 36000, secure: true, path: '/' })
      client_notification(api, "topRight", "success", res.message, 2)
      setUser(userRes.data[0]);
      dispatch({ type: "Current_User", payload: userRes.data[0] })
    }
    setIsLoading(false)
    setIsCancelLoading(false)
  }

  const handleStartStopPlan = async () => {
    console.log("Stop plan");
    setIsLoading(true)
    setIsStartStopLoading(true)
    let obj = {
      "user_id": user?.id,
      "start_stop": user?.is_subscription_stop ? "start" : "stop"
    }
    const res = await start_stop_subscription_action(obj);
    console.log("res ::", res);
    if (res?.success) {
      const userRes = await search_profile_action(user.id)
      // const token = CryptoJS.AES.encrypt(JSON.stringify(userRes.data[0]), "SecretKey").toString()
      // setCookie(null, "user", token, { maxAge: 36000, secure: true, path: '/' })
      client_notification(api, "topRight", "success", res.message, 2)
      // window.location.reload();
      console.log(userRes.data[0]);
      setUser(userRes.data[0]);
      dispatch({ type: "Current_User", payload: userRes.data[0] })
    }
    setIsLoading(false)
    setIsStartStopLoading(false)
  }

  const getSubscriptionPlan = (name) => {
    let tempObj = subscriptions.filter(item => item.value === name)
    if (tempObj.length) {
      return tempObj[0].name
    } else {
      return ""
    }
  }

  // console.log(subscriptions)

  return (
    <div className='md:pt-[66px] text-white px-5 py-3'>
      {contextHolder}
      <div className='md:mt-10 flex flex-col w-full items-center relative'>
        <Link href={client_routes.profile} prefetch={true} className='absolute left-0 top-1 flex md:hidden'>
          <Image src={arrow_left} alt='' height={30} width={30} className='pointer-events-none h-[24px] w-[24px] md:h-[30px] md:w-[30px]' />
        </Link>
        <div className='xl:text-[30px] lg:text-[25px] text-[20px] font-bold leading-[32px] xl:leading-[40px] text-center px-6 sm:px-0'>
          {isPremium
            ? allStrings["string_your_subscription"]
            : <span className='inline'>{allStrings["string_upgrade_your_dating_journey"]} <span className='hidden sm:inline'>{allStrings["string_get_premium_access_now."]}</span></span>
          }
        </div>
        <div className='mt-[14px] text-[18px] text-center font-light leading-[20px]'>
          {isPremium
            ? allStrings["string_manage_your_current_plan"]
            : <span className='inline'>
              {allStrings["string_discover_your_perfect_match_with_our_premium_features."]} <span className='hidden sm:inline'>{allStrings["string_find_your_love_faster_with_exclusive_benefits._upgrade_your_dating_experience_today"]}</span>
            </span>
          }
        </div>
      </div>
      {isPremium
        ? <div className='flex w-full justify-center mt-7 sm:my-10'>
          <div className="2xl:w-9/12 xl:w-10/12 w-full flex flex-col rounded-xl overflow-hidden">
            <div className='bg-black p-5 sm:p-8 2xl:px-[70px] xl:px-[60px] flex justify-between items-center'>
              <div className='flex flex-col items-start'>
                <div className='text-[15px] sm:text-[16px] font-semibold leading-[normal]'>{allStrings["string_current_plan"]}</div>
                <div className='mt-[10px] text-[24px] sm:text-[30px] font-semibold leading-[24px] sm:leading-[30px]'>
                  {getSubscriptionPlan(user?.user_subscriptions?.subscription_plan)}
                  {/* 4 Weeks  */}
                </div>
              </div>
              <div className='text-[30px] sm:text-[40px] font-semibold leading-[normal]'>
                {allStrings["string_dkk"]} {user?.user_subscriptions?.subscription_amount}
              </div>
            </div>
            <div className="bg-primary-dark-6 p-6 sm:p-10">
              <div className='flex justify-between sm:px-0 md:px-[20px] xl:px-[60px] 2xl:px-[80px]'>
                <div className="flex flex-col items-start">
                  <div className="text-[20px] sm:text-[22px] font-bold leading-[normal]">{getDate(user?.subscription_start_date)}</div>
                  <div className="mt-[7px] sm:mt-[10px] text-[15px] sm:text-[16px] font-medium leading-[normal]">{allStrings["string_subscription_date"]}</div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-[20px] sm:text-[22px] font-bold leading-[normal]">
                    {user?.is_subscription_cancel
                      ? getDate(user?.subscription_cancel_date)
                      : <>
                        {user?.is_subscription_stop
                          ? <>{getDate(user?.subscription_stop_date)}</>
                          : <>{getDate(user?.next_subscription_date)}</>
                        }
                      </>
                    }
                  </div>
                  <div className="mt-[7px] sm:mt-[10px] text-[15px] sm:text-[16px] font-medium leading-[normal]">
                    {user?.is_subscription_cancel
                      ? allStrings["string_cancel_date"]
                      : <>
                        {user?.is_subscription_stop
                          ? allStrings["string_pause_date"]
                          : allStrings["string_renewal_date"]
                        }
                      </>
                    }
                  </div>
                </div>
              </div>
              {!user?.is_subscription_cancel
                ? <div className='flex flex-col sm:flex-row justify-center mt-7 sm:mt-10 gap-3 sm:gap-5'>
                  <button className={`w-full sm:w-[250px] md:w-[340px] rounded-[5px] justify-center items-center flex py-[15px] sm:py-[19px] text-[17px] sm:text-[18px] font-semibold leading-[17px] sm:leading-[18px] bg-primary-dark-4 uppercase ${isLoading ? "pointer-events-none" : ""}`} onClick={handleCancelPlan}>
                    {isCancelLoading
                      ? <div className="loader"></div>
                      : allStrings["string_cancel_plan"]
                    }
                  </button>
                  <button className={`w-full sm:w-[250px] md:w-[340px] rounded-[5px] justify-center items-center flex py-[15px] sm:py-[19px] text-[17px] sm:text-[18px] font-semibold leading-[17px] sm:leading-[18px] bg-danger uppercase ${isLoading ? "pointer-events-none" : ""}`} onClick={handleStartStopPlan}>
                    {isStartStopLoading
                      ? <div className="loader"></div>
                      : <>
                        {user?.is_subscription_stop ? allStrings["string_resume_plan"] : allStrings["string_stop_plan"]}
                      </>
                    }
                  </button>
                </div>
                : <></>
              }
            </div>
          </div>
        </div>
        : <></>
      }
      <div className='flex w-full justify-center'>
        <div className='2xl:w-9/12 xl:w-10/12 w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[37px] mt-10'>
          {subscriptions.map((item, inx) => (
            <div key={inx} className={`flex justify-center items-center ${inx === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
              <div className='bg-primary-dark rounded-[5px] w-full max-w-[450px]'>
                <div className={`mt-10 bg-[url('/assets/subscription_details_bg.png')] bg-cover bg-right-top text-[28px] sm:text-[32px] font-bold leading-[56px] h-[79px] w-[260px] sm:w-[275px] ps-[45px] sm:ps-[56px] flex items-center`}>
                  {item.name}
                </div>
                <div className='mt-[35px] flex justify-center items-center text-[50px] sm:text-[60px] font-bold leading-[70px] sm:leading-[80px]'> {allStrings["string_dkk"]} {item.amount}</div>
                <div className='mt-[30px] flex flex-col gap-y-7 items-center'>
                  {details.map((item, idx) => (
                    <div key={idx} className='flex gap-x-[7px] sm:gap-x-[10px] items-start justify-start px-3 w-full sm:px-5 md:px-8 xl:px-5 2xl:px-8'>
                      <Image src={item.including ? subscription_include : subscription_not_include} unoptimized alt="" height={20} width={20} className='pointer-events-none' />
                      <div className='text-[18px] font-medium leading-[20px]'>{item.desc}</div>
                    </div>
                  ))
                  }
                </div>

                <div className='w-full flex items-center justify-center mt-[45px] mb-10'>
                  <button className='bg-tinder rounded-[5px] py-[11px] w-[230px] sm:w-[241px] flex justify-center items-center text-[16px] font-semibold leading-[normal] uppercase' onClick={() => handleSubmit(item)}>
                    {allStrings["string_get_started"]}
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
          <StripeModal selectedPaymentObj={selectedPaymentObj} setIsModalOpen={setIsModalOpen} STRIPE_TEST_KEY={STRIPE_TEST_KEY} user={user} />
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default Index