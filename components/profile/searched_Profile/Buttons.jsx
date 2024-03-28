"use client"
import Image from 'next/image'
import message_circle from "/public/assets/message_circle.svg"
import lock_1 from "/public/assets/lock_1.svg"
import PopOver from '../commons/PopOver'
import more_horizontal from "/public/assets/more_horizontal.svg"
import { notification } from 'antd'
import { client_notification, client_routes } from '@/app/lib/helpers'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/store'
import { private_image_request } from '@/app/lib/actions'
import { useState } from 'react'

const Buttons = ({ user, currentUser, privateAlbumState, socket }) => {

    const navigate = useRouter()
    const [api, contextHolder] = notification.useNotification();
    const { dispatch } = useStore()

    const requestHandler = async (type) => {
        if (type === "request_view_album") {
            const res = await private_image_request({ sender_id: currentUser?.id, receiver_id: user?.id, is_approved: 0 })
            if (res.success) {
                socket.emit("request-album", { data: res.data, status: "pending" })
                client_notification(api, "topRight", "success", res?.message, 4)

            }
        } else {
            dispatch({ type: "Add_Profile", payload: { obj: { id: 1, sender_id: currentUser?.id, receiver_id: user.id, text: `You started Chat with ${user.username}`, updated_at: new Date() }, type: "normal", user: user } })
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
            {
                !privateAlbumState &&
                <button onClick={() => requestHandler("request_view_album")} className='bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    <Image src={lock_1} width={22} height={22} alt='message' />
                    <span className='xl:text-[20px] font-[600] leading-[normal]'>REQUEST VIEW ALBUM</span>
                </button>
            }
            {
                privateAlbumState === "pending" &&
                <div className='bg-primary-dark-3 w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    <Image src={lock_1} width={22} height={22} alt='message' />
                    <span className='xl:text-[20px] font-[600] leading-[normal]'>REQUEST PENDING</span>
                </div>
            }
            {
                privateAlbumState === "accept" &&
                <div className='bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    {/* <Image src={lock_1} width={22} height={22} alt='message' /> */}
                    <span className='xl:text-[20px] font-[600] leading-[normal] uppercase'>you got access</span>
                </div>
            }



            <div className=' justify-center items-center hidden md:flex 2xl:hidden'>
                <PopOver user={user} socket={socket}>
                    <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
                </PopOver>
            </div>

        </>
    )
}

export default Buttons