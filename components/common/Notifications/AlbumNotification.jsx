import { private_image_access } from '@/app/lib/actions';
import { client_notification } from '@/app/lib/helpers';
import { useStore } from '@/store/store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { notification as customNotification } from 'antd';

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


const AlbumNotification = ({ notification, allUsers, socket, allStrings }) => {
    const i = notification
    const [loadingArr, setLoadingArr] = useState([])
    const { dispatch } = useStore()
    const [api, contextHolder] = customNotification.useNotification();

    const getUserData = (id, type) => {
        let value;
        if (type === "time") {
            const res = getTime(id.updated_at)
            return res
        }
        else {
            allUsers.forEach((i) => {
                if (i.id === id.sender_id) {
                    value = i[type]
                }
            })
            return value
        }
    }

    useEffect(() => {
        console.log(socket)
    }, [])

    const getTime = (id) => {
        const time = new Date(id)
        const today = new Date()
        const currDate = today.getDate()
        const notificationDate = time.getDate()
        const currMon = today.getMonth() + 1
        const notiMon = time.getMonth() + 1

        if ((currMon === notiMon)) {
            if (currDate === notificationDate) {
                const timeDiffInMilliseconds = today - time;
                const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));
                if (timeDiffInMinutes < 1) {
                    return allStrings["string_just_now"];
                } else if (timeDiffInMinutes < 60) {
                    return `${timeDiffInMinutes} Min`;
                } else {
                    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
                    return `${timeDiffInHours} hrs`;
                }
            } else if ((currDate - 1) === notificationDate) {
                return allStrings["string_yesterday"]
            } else {
                return `${(currDate - notificationDate)} days`
            }
        } else {
            return `${notificationDate.toExponential().length < 10 ? '0' + notificationDate : notificationDate} ${months[notiMon - 1]}`
        }
    }

    const acceptHandler = async (id, type, data) => {
        const res = await private_image_access({ request_id: id, is_approved: "1" })
        if (res.success) {
            dispatch({ type: "Remove_Album_Notification", payload: { id: id } })
            client_notification(api, "topRight", "success", res?.message, 3)
            socket.emit("request-album", { data: data, status: "accept" })
        }
        setLoadingArr((prev) => prev.filter(ele => ele.id !== id))
    }

    const declineHandler = async (id, type, data) => {
        const res = await private_image_access({ request_id: id, is_approved: '2' })
        if (res.success) {
            dispatch({ type: "Remove_Album_Notification", payload: { id: id } })
            client_notification(api, "topRight", "success", res?.message, 3)
            socket.emit("request-album", { data: data, status: "decline" })
        }
        setLoadingArr((prev) => prev.filter(ele => ele.id !== id))
    }

    return (
        <div className='w-full h-auto px-[30px] ' >
            {contextHolder}
            <div className='flex gap-4'>
                {getUserData(i, "avatar_url") ?
                    <Image src={getUserData(i, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full  min-w-[50px] max-h-[50px]' />
                    :
                    <p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px] uppercase'>
                        {getUserData(i, "username").charAt(0)}
                    </p>
                }
                <div className='w-full'>
                    <div className='flex justify-between '>
                        <div className='text-[20px] font-semibold leading-[20px] capitalize relative'>
                            {getUserData(i, "username")}
                            <p className='-right-[17px] h-[9px] w-[9px] rounded-full bg-secondary text-center absolute top-1/2 -translate-y-1/2'></p>
                        </div>
                        <p className='text-[16px] font-medium leading-[20px]'>{getUserData(i, "time")}</p>
                    </div>
                    <p className='text-[16px] text-white/80 font-light leading-[20px]  mt-[6px]'><span className='capitalize'>
                        {getUserData(i, "username")}</span> {allStrings["string_has_requested_permission_to_view_your_profile_photo."]}
                    </p>
                    <div className='mt-[14px] flex gap-[10px]'>
                        {(!loadingArr.some((ele) => (ele.id === i.id && ele.type === "accept"))) ?
                            <button
                                className='py-[6px] rounded-[5px] px-4 text-white bg-secondary text-[14px] font-medium leading-[20px] transition-all duration-150 ease-linear hover:scale-105'
                                onClick={() => { acceptHandler(i.id, "socket", i); setLoadingArr((prev => [...prev, { id: i.id, type: "accept" }])) }}
                            >
                                {allStrings["string_accept"]}
                            </button>
                            : <div className='w-[82px] h-[32px] rounded-[5px] flex justify-center bg-secondary ' >
                                <span className='loader after:border-[11px]'></span>
                            </div>
                        }
                        {(!loadingArr.some((ele) => (ele.id === i.id && ele.type === "decline"))) ?
                            <button className='py-[6px] rounded-[5px] px-4 bg-black transition-all duration-150 ease-linear hover:scale-105'
                                onClick={() => { setLoadingArr((prev => [...prev, { id: i.id, type: "decline" }])); declineHandler(i.id, "socket", i) }}>
                                {allStrings["string_decline"]}
                            </button>
                            : <div className='w-[82px] h-[32px] rounded-[5px] flex justify-center bg-black ' >
                                <span className='loader after:border-[11px]'></span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumNotification