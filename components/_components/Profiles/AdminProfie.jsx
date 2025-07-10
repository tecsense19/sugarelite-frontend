import React, { useEffect } from 'react'
import Logo from "/public/assets/fire_log.svg"
import Stroke_Online from '/public/assets/online_stroke.svg'
import Image from 'next/image'
import { useStore } from '@/store/store'

const AdminProfie = ({ message, setShowMobileChatContent, allStrings }) => {

    const { dispatch } = useStore()

    const getTime = (timeStamp) => {
        const time = new Date(timeStamp);
        const today = new Date();

        if (time.toDateString() === today.toDateString()) {
            const timeDiffInMilliseconds = today - time;
            const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));

            if (timeDiffInMinutes < 1) {
                return allStrings["string_just_now"];
            } else if (timeDiffInMinutes < 60) {
                return `${timeDiffInMinutes} mins`;
            } else {
                const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
                return `${timeDiffInHours} hrs`;
            }
        } else if (time.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
            return allStrings["string_yesterday"];
        } else {
            const timeString = time.toDateString().split(' ')
            const month = time.getMonth() + 1
            return `${timeString[2]}-${month < 10 ? `0${month}` : month}-${timeString[3].slice(2, 4)}`
        }
    };

    return (
        <div className="rounded-[5px] border-[1px] border-white/30 bg-primary py-[10px] md:py-[16px] px-4 flex justify-between cursor-pointer"
            onClick={() => {
                setShowMobileChatContent(true)
                dispatch({ type: "Message_To", payload: "Admin" })
            }}
        >
            <div className="flex gap-4 items-center">
                <div className="relative bg-tinder rounded-full h-[40px] flex min-w-[40px] md:h-[50px] md:min-w-[50px]">
                    <Image src={Logo} height={40} width={40} alt="avatar" className="h-[26px] w-[22px] md:h-[32px] md:w-[27px] object-cover m-auto" />
                    <Image src={Stroke_Online} height={10} width={10} alt="avatar" className='absolute top-[-1px] right-[3px] md:top-0 md:right-[5px]' />
                </div>
                <div>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-[20px] capitalize">
                        Team SugarMake
                    </p>
                    <p className="text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mt-[5px] max-w-[200px] line-clamp-1 break-all">
                        {
                            message ? message.description : "Welcome to the SugarMake Support"
                        }
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end min-w-fit">
                <p className="italic text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mb-[8px]">
                    {/* {getTime(message.updated_at)} */}
                </p>
            </div>
        </div>
    )
}

export default AdminProfie