import { useStore } from '@/store/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import read_tick from "/public/assets/read_tick.svg";
import single_tick from "/public/assets/single_tick.svg";
import double_tick from "/public/assets/double_tick.svg";
import Stroke_Online from '/public/assets/online_stroke.svg'
import Pending from "/public/assets/pending.svg"
import { useChat } from '@/store/ChatContext';
import ProfileReadStatus from './ProfileReadStatus';

const UserComponent = ({ foundUser, latestMessage, setShowMobileChatContent, user, allStrings }) => {

    const { state: { onlineUsers }, dispatch } = useStore()
    const { state: { typingUsers, unReadCount } } = useChat()

    const handleToUser = () => {
        setShowMobileChatContent(true)
        dispatch({ type: "Message_To", payload: foundUser })
    }

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
            // return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else if (time.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
            return allStrings["string_yesterday"];
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
                    <p className="text-white/70 flex items-center text-[14px] md:text-[16px] font-normal leading-[20px] mt-[5px] ">
                        {typingUsers.some(i => (i.receiver_id === user.id && foundUser.id === i.sender_id)) ? allStrings["string_typing..."] : LatestMessage(foundUser, latestMessage, allStrings)}
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end min-w-fit">
                <p className="italic text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px]">
                    {getTime(parseInt(latestMessage.milisecondtime))}
                </p>
                {
                    unReadCount.length
                        ? unReadCount.some(i => i.id === foundUser.id) && <p className='h-[20px] w-[20px] bg-green-active text-white text-[10px] font-medium leading-[20px] rounded-full flex justify-center items-center'>
                            {unReadCount.find(i => i.id === foundUser.id).count}
                        </p>
                        : ""
                }
                {/* <p className="h-[20px] w-[20px] bg-green-active text-white text-[10px] font-medium leading-[20px] rounded-full flex justify-center items-center">
                            3
                        </p> */}
                {/* </> : "" */}

            </div>
        </div>
    )
}

const LatestMessage = (user, latestMessage, allStrings) => {
    if (latestMessage.type === "deleted") {
        return <span className='max-w-[150px] line-clamp-1 break-all emoji-fontFamily'>{allStrings["string_message_deleted"]}</span>
    }
    else if (latestMessage.get_all_chat_with_image.length) {
        return <>
            {user.id === latestMessage.sender_id
                ? ""
                : <ProfileReadStatus message={latestMessage} />
            }
            <span className='max-w-[150px] line-clamp-1 break-all emoji-fontFamily'>{latestMessage.get_all_chat_with_image.length} {latestMessage.get_all_chat_with_image.length > 1 ? "Images" : "Image"}  {latestMessage.sender_id !== user.id ? allStrings["string_sended"] : allStrings["string_received"]}</span>
        </>
    } else {
        return <>
            <span>{user.id === latestMessage.sender_id ? "" : <ProfileReadStatus message={latestMessage} />}</span>
            <span className='max-w-[150px] line-clamp-1 break-all emoji-fontFamily'>{latestMessage.text}</span>
        </>
    }
}

const readStatus = (message) => {
    if ((message.status === "read")) {
        return <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none me-1`} />
    } else if ((message.status === "delivered")) {
        return <Image src={double_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none me-1" />
    } else if ((message.status === "pending")) {
        return <Image src={Pending} alt="edit-icon" height={14} width={14} priority className="pointer-events-none me-1" />
    }
    else {
        return <Image src={single_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none  me-1" />
    }
}

export default UserComponent