import Image from 'next/image'

const UserComponent = ({ setSelectedObj, setShowMobileChatContent, user, message, unReadCount, unReadUsers }) => {
    const getTime = (timeStamp) => {
        const time = new Date(timeStamp)
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
                    return `${timeDiffInMinutes} mins`;
                } else {
                    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
                    return `${timeDiffInHours} hrs`;
                }
            } else if ((currDate - 1) === notificationDate) {
                return `Yesterday`
            } else {
                return `${(currDate - notificationDate)} days`
                // return `${time.toDateString().split(" ")[2]}-${time.toDateString().split(" ")[1]}`
            }
        }
    }

    return (
        <>
            <div className="rounded-[5px] md:hidden border-[1px] border-white/30 bg-primary py-[10px] px-4 flex justify-between cursor-pointer" onClick={() => { setSelectedObj(user); setShowMobileChatContent(true) }}>
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        {
                            user.avatar_url ? <Image src={user.avatar_url} height={40} width={40} alt="avatar" className="h-[40px] min-w-[40px] rounded-full" />
                                :
                                <p className="uppercase flex justify-center items-center h-[40px] w-[40px] rounded-full bg-primary-dark text-[20px]">{user.username.charAt(0)}</p>
                        }
                        {user.online === 1 &&
                            <p className="absolute h-[9px] w-[9px] bg-green-active top-1 rounded-full right-1 "></p>
                        }
                    </div>
                    <div>
                        <p className="font-semibold text-[18px] leading-[20px] capitalize">{user.username}</p>
                        <p className="text-white/70 text-[14px] font-normal leading-[20px] mt-[5px]">{message ? message.text : ''}</p>
                    </div>
                </div>
                <div className="flex flex-col  items-end">
                    <p className="italic text-white/70 text-[14px] font-normal leading-[20px] mb-[8px]">{message ? getTime(message.updated_at) : ""}</p>
                    {
                        (unReadCount && unReadUsers.some((i) => i === user.id)) ?
                            <p className=" h-[20px] w-[20px] bg-green-active text-white text-[14px] font-medium leading-[20px] rounded-full flex justify-center items-center">{unReadCount}</p> : ""
                    }
                </div>
            </div>
            <div className="rounded-[5px] border-[1px] border-white/30 bg-primary py-4 px-[15px] hidden md:flex justify-between cursor-pointer" onClick={() => setSelectedObj(user)}>
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        {
                            user.avatar_url ? <Image src={user.avatar_url} height={50} width={50} alt="avatar" className="h-[50px] min-w-[50px] rounded-full" />
                                :
                                <p className="uppercase flex justify-center items-center h-[50px] w-[50px] rounded-full bg-primary-dark text-[20px]">{user.username.charAt(0)}</p>
                        }
                        {user.online === 1 &&
                            <p className="absolute h-[9px] w-[9px] bg-green-active top-1 rounded-full right-1 "></p>
                        }
                    </div>
                    <div>
                        <p className="font-semibold text-[20px] leading-[20px] capitalize">{user.username}</p>
                        <p className="text-white/70 text-[16px] font-normal leading-[20px] mt-[5px] line-clamp-2">{message && message.text}</p>
                    </div>
                </div>
                <div className="flex flex-col w-[8rem] items-end">
                    <p className="italic text-white/70 text-[16px] font-normal leading-[20px] mb-[8px]">{message && getTime(message.updated_at)}</p>
                    {
                        (unReadCount && unReadUsers.some((i) => i === user.id)) ?
                            <p className=" h-[22px] w-[22px] bg-green-active text-white text-[14px] font-medium leading-[20px] rounded-full flex justify-center items-center">{unReadCount}</p>
                            : ""
                    }
                </div>
            </div>
        </>
    )
}

export default UserComponent