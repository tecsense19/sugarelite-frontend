import Image from 'next/image';
import React, { useEffect } from 'react'
import logo from "/public/assets/small_logo.svg"

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

const FriendNotification = ({ notification, allUsers }) => {
    const i = notification

    const getUserData = (id, type) => {
        let value;
        if (id.user_id) {
            if (type === "time") {
                const res = getTime(id.updated_at)
                return res
            } else {
                allUsers.forEach((i) => {
                    if (i.id === id.sender_id) {
                        value = i[type]
                    }
                })
                return value
            }
        }
        else {
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
    }

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
                    return "just now";
                } else if (timeDiffInMinutes < 60) {
                    return `${timeDiffInMinutes} Min`;
                } else {
                    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
                    return `${timeDiffInHours} hrs`;
                }
            } else if ((currDate - 1) === notificationDate) {
                return `Yesterday`
            } else {
                return `${(currDate - notificationDate)} days`
            }
        } else {
            return `${notificationDate.toExponential().length < 10 ? '0' + notificationDate : notificationDate} ${months[notiMon - 1]}`
        }
    }


    return (
        <div className='w-full h-auto px-[30px] '>
            {
                !i?.user_id ?
                    <div className='flex gap-4'>
                        {getUserData(i, "avatar_url") ?
                            <Image src={getUserData(i, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full object-cover min-w-[50px] max-h-[50px]' />
                            :
                            <p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px] uppercase'>
                                {getUserData(i, "username").charAt(0)}
                            </p>
                        }
                        <div className='w-full'>
                            <div className='flex justify-between'>
                                <p className='text-[20px] font-semibold leading-[20px] capitalize '>
                                    {getUserData(i, "username")}
                                </p>
                                <p className='text-[16px] font-medium leading-[20px]'>{getUserData(i, "time")}</p>
                            </div>
                            <p className='text-[16px] font-light leading-[20px] tracking-tight text-white/80 mt-[6px]'>
                                💌 Match request from <span className='capitalize'>{getUserData(i, "username")}.</span> Swipe right to match or left to unmatch.
                            </p>
                        </div>
                    </div>
                    :
                    <div className='flex gap-4'>
                        {getUserData(i, "avatar_url") ?
                            <Image src={getUserData(i, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full object-cover min-w-[50px] max-h-[50px]' />
                            :
                            <p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px] uppercase'>
                                {getUserData(i, "username").charAt(0)}
                            </p>
                        }
                        <div className='w-full'>
                            <div className='flex justify-between'>
                                <p className='text-[20px] font-semibold leading-[20px] capitalize '>
                                    {getUserData(i, "username")}
                                </p>
                                <p className='text-[16px] font-medium leading-[20px]'>{getUserData(i, "time")}</p>
                            </div>
                            <p className='text-[16px] font-light leading-[20px] text-white/80 mt-[6px] flex items-center gap-x-2'>
                                {/* <Image src={logo} width={18} height={18} alt='icon' className='' /> Its a match. You can chat with {i.message.split(' ')[0]}. */}
                                🎉 Its a match. You can chat with {getUserData(i, "username")}.
                            </p>
                        </div>
                    </div>
            }

        </div>
    )
}

export default FriendNotification