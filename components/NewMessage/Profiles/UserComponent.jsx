import { getSocket } from '@/app/lib/socket';
import { useStore } from '@/store/store';
import Image from 'next/image';
import Stroke_Online from '/public/assets/online_stroke.svg'
import read_tick from "/public/assets/read_tick.svg";
import single_tick from "/public/assets/single_tick.svg";
import double_tick from "/public/assets/double_tick.svg";
import React from 'react'

const UserComponent = ({ user, message, unReadCount }) => {

    const { dispatch, state: { onlineUsers, toMessageState, userState, chatPartnerList } } = useStore()
    const socket = getSocket()
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
            return `${timeString[2]}-${month}-${timeString[3].slice(2, 4)}`
        }
        // console.log(message)
    };

    const readStatus = (msg) => {
        if (msg.sender_id !== user.id) {
            if ((message.status === "read") || chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId))) {
                return <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none`} />
            }
            else if (
                (message.status === "delivered") ||
                onlineUsers.some(i => (i === message.receiver_id) ||
                    chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId)))
            ) {
                return <Image src={double_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " />
            } else {
                return <Image src={single_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " />
            }
        }
    }

    return (
        <div
            className="rounded-[5px] border-[1px] border-white/30 bg-primary py-[10px] md:py-[16px] px-4 flex justify-between cursor-pointer"
            onClick={() => {
                if (toMessageState && toMessageState.id !== user.id) {
                    socket.emit("open-chat", { sender_id: userState.id, receiver_id: toMessageState.id, type: "closed" });
                }
                dispatch({ type: "Message_To", payload: user });
            }}
        >
            <div className="flex gap-4 items-center">
                <div className="relative">
                    {user.avatar_url ? (
                        <Image src={user.avatar_url} height={40} width={40} alt="avatar" className="h-[40px]  object-cover min-w-[40px] md:h-[50px] md:min-w-[50px] rounded-full" />
                    ) : (
                        <p className="uppercase flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:min-w-[50px] rounded-full bg-primary-dark text-[20px]">{user.username.charAt(0)}</p>
                    )}
                    {/* {onlineUsers.some(i => i === user.id) && <p className="absolute p-1 bg-green-active stroke-black stroke-2 top-0 rounded-full right-1 "></p>} */}
                    {onlineUsers.some(i => i === user.id) && <Image src={Stroke_Online} height={10} width={10} alt="avatar" className='absolute -top-[3px] right-1' />}
                </div>
                <div>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-[20px] capitalize">
                        {user.username}
                    </p>
                    {
                        message?.id ?
                            <p className="text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mt-[5px] max-w-[150px] line-clamp-1 break-all">

                                {
                                    message.type === "deleted" ? "Message deleted" : message?.text || `${message?.get_all_chat_with_image?.length} Images ${message.sender_id !== user.id ? "sended" : "received"}`
                                }
                            </p> :
                            <p className="text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mt-[5px] max-w-[150px] line-clamp-1 break-all">
                                You started chat with {user.username}
                            </p>
                    }
                </div>
            </div>
            <div className="flex flex-col items-end min-w-fit">
                <p className="italic text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mb-[8px]">
                    {getTime(parseInt(message.milisecondtime))}
                </p>
                {
                    unReadCount.find((ele) => ele.id === user.id) ? (
                        <p className="h-[20px] w-[20px] bg-green-active text-white text-[10px] font-medium leading-[20px] rounded-full flex justify-center items-center">{unReadCount.find((ele) => ele.id === user.id).count}</p>
                    ) : readStatus(message)
                    // message.sender_id !== user.id &&
                    // (message.status === "read" && chatPartnerList.some(i => user.sender_id === i.receiver_id && message.id <= i.lastMsgId) ? <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none`} /> :
                    //     message.status === "delivered" ? <Image src={double_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " /> :
                    //         <Image src={single_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " />
                    // )
                }
            </div>
        </div>
    )
}

export default UserComponent