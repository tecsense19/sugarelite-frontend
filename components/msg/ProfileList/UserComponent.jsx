import Image from 'next/image';
import React from 'react'

const UserComponent = ({ user, setToUser, message, unReadCount, unReadUsers }) => {

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
            const diffDays = Math.floor((today - time) / (1000 * 60 * 60 * 24));
            return `${diffDays} days`;
        }
    };

    return (
        <div className="rounded-[5px] border-[1px] border-white/30 bg-primary py-[10px] md:py-[16px] px-4 flex justify-between cursor-pointer" onClick={() => { setToUser(user); }}>
            <div className="flex gap-4 items-center">
                <div className="relative">
                    {user.avatar_url ? (
                        <Image src={user.avatar_url} height={40} width={40} alt="avatar" className="h-[40px] min-w-[40px] md:h-[50px] md:min-w-[50px] rounded-full" />
                    ) : (
                        <p className="uppercase flex justify-center items-center h-[40px] w-[40px] md:h-[50px] md:min-w-[50px] rounded-full bg-primary-dark text-[20px]">{user.username.charAt(0)}</p>
                    )}
                    {user.online === 1 && <p className="absolute h-[9px] w-[9px] bg-green-active top-1 rounded-full right-1 "></p>}
                </div>
                <div>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-[20px] capitalize">{user.username}</p>
                    <p className="text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mt-[5px]">{message.type === "deleted" ? "message deleted" : message?.text || ''}</p>
                </div>
            </div>
            <div className="flex flex-col items-end min-w-fit">
                <p className="italic text-white/70 text-[14px] md:text-[16px] font-normal leading-[20px] mb-[8px]">{message && getTime(message.updated_at)}</p>
                {
                    unReadCount && unReadUsers.includes(user.id) ? (
                        <p className="h-[20px] w-[20px] bg-green-active text-white text-[14px] font-medium leading-[20px] rounded-full flex justify-center items-center">{unReadCount}</p>
                    ) : <></>
                }
            </div>
        </div>
    )
}

export default UserComponent