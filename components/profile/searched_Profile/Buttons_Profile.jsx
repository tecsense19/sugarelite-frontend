"use client"
import Image from 'next/image'
import React from 'react'
import message_circle from "../../../public/assets/message_circle.svg"
import lock_1 from "../../../public/assets/lock_1.svg"
import PopOver from '../commons/PopOver'
import more_horizontal from "../../../public/assets/more_horizontal.svg"
import { private_image_access } from '@/app/lib/actions'
import { useStore } from '@/store/store'
import { notification } from 'antd'
import { client_notification, client_routes } from '@/app/lib/helpers'
import { useRouter } from 'next/navigation'

const Buttons_Profile = ({ user }) => {
    // console.log(user.username)

    const { state: { userState, toMessageState }, dispatch } = useStore()

    const [api, contextHolder] = notification.useNotification();

    const navigate = useRouter()

    const requestHandler = async (type) => {
        if (type === "request_view_album") {
            const res = await private_image_access({ sender_id: userState?.id, receiver_id: user.id })
            if (res.success) {
                client_notification(api, "topRight", "success", res?.message, 4)
            }
        } else {
            dispatch({ type: "Message_To", payload: user })
            navigate.push(client_routes.chat)
        }
    }

    return (
        <>
            {contextHolder}
            <button onClick={() => requestHandler("send_message")} className='bg-[#3DC73A] w-full max-w-[273px] md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-right'>
                <Image src={message_circle} width={22} height={22} alt='message' />
                <span className='xl:text-[20px] font-[600] leading-[normal]'>SEND MESSAGE</span>
            </button>
            {/* <Link href={{ pathname: client_routes.chat, query: { id: user.id } }} className='bg-[#3DC73A] w-full max-w-[273px] md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-right'>
                <Image src={message_circle} width={22} height={22} alt='message' />
                <span className='xl:text-[20px] font-[600] leading-[normal]'>SEND MESSAGE</span>
            </Link> */}
            <button onClick={() => requestHandler("request_view_album")} className='bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                <Image src={lock_1} width={22} height={22} alt='message' />
                <span className='xl:text-[20px] font-[600] leading-[normal]'>REQUEST VIEW ALBUM</span>
            </button>

            <div className=' justify-center items-center hidden md:flex 2xl:hidden'>
                <PopOver>
                    <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
                </PopOver>
            </div>

        </>
    )
}

export default Buttons_Profile