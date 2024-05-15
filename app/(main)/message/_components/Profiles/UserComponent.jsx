import { useStore } from '@/store/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Stroke_Online from '/public/assets/online_stroke.svg'

const UserComponent = ({ foundUser, latestMessage }) => {

    const { state: { onlineUsers } } = useStore()

    const handleToUser = () => {

    }

    const getTime = (timeStamp) => {
        const time = new Date(timeStamp);
        const today = new Date();

        if (time.toDateString() === today.toDateString()) {
            const timeDiffInMilliseconds = today - time;
            const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));

            if (timeDiffInMinutes < 1) {
                return "just now";
            } else if (timeDiffInMinutes < 60) {
                return `${timeDiffInMinutes} mins`;
            } else {
                const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
                return `${timeDiffInHours} hrs`;
            }
        } else if (time.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
            return "Yesterday";
        } else {
            const timeString = time.toDateString().split(' ')
            const month = time.getMonth() + 1
            return `${timeString[2]}-${month < 10 ? `0${month}` : month}-${timeString[3].slice(2, 4)}`
        }
    };

    return (
        <div onClick={handleToUser} className='rounded-[5px] border-[1px] border-white/30 bg-primary py-[10px] md:py-[16px] px-4 flex justify-between cursor-pointer'>
            <div className='flex gap-4 items-center'>
                <div className="relative ">
                    {foundUser.avatar_url ? (
                        <Image src={foundUser.avatar_url} height={40} width={40} alt="avatar" className="h-[40px]  object-cover min-w-[40px] md:h-[50px] md:min-w-[50px] rounded-full" />
                    ) : (
                        <p className="uppercase flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:min-w-[50px] rounded-full bg-primary-dark text-[20px]">{foundUser.username.charAt(0)}</p>
                    )}
                    {onlineUsers.some(i => (i === foundUser.id)) && <Image src={Stroke_Online} height={10} width={10} alt="avatar" className='absolute top-[-1px] right-[3px] md:top-0 md:right-[5px]' />}
                </div>
                <div>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-[20px] capitalize">{foundUser.username}</p>
                    <p className="text-white/70 flex text-[14px] md:text-[16px] font-normal leading-[20px] mt-[5px] max-w-[150px] line-clamp-1 break-all">
                        {/* {latestMessage?.id ? (latestMessage.type === "deleted" ? "Message deleted" : latestMessage?.text || `${latestMessage?.get_all_chat_with_image?.length} Images ${latestMessage.sender_id !== foundUser.id ? "sended" : "received"}`) : `You started chat with ${foundUser.username}`} */}
                        {LatestMessage(foundUser, latestMessage)}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end min-w-fit">
                <p className="italic text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mb-[8px]">
                    {getTime(parseInt(latestMessage.milisecondtime))}
                </p>
                {/* {
                    latestMessage.sender_id === user.id ? readStatus(latestMessage) : <>
                        {
                            (unReadCount.find((ele) => ele.id === foundUser.id) && latestMessage.status !== "read") ? (
                                <p className="h-[20px] w-[20px] bg-green-active text-white text-[10px] font-medium leading-[20px] rounded-full flex justify-center items-center">{unReadCount.find((ele) => ele.id === foundUser.id).count}</p>
                            ) : ""
                        }
                    </>
                } */}
            </div>
        </div>
    )
}

const LatestMessage = (user, latestMessage) => {
    if (latestMessage.type === "deleted") return "This message was deleted"
    else if (latestMessage.get_all_chat_with_image.length) {
        return <>
            <div>{user.id === latestMessage.sender_id ? "" : "You"}</div>

        </>
    }
}

export default UserComponent