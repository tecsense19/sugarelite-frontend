// import Image from 'next/image';
// import React, { useEffect } from 'react'
// import logo from "/public/assets/small_logo.svg"

// const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec"
// ];

// const FriendNotification = ({ notification, allUsers, user }) => {
//     const i = notification

//     const getUserData = (id, type) => {
//         let value;
//         if (id.user_id) {
//             if (type === "time") {
//                 const res = getTime(id.updated_at)
//                 return res
//             } else {
//                 allUsers.forEach((i) => {
//                     if (i.id === (id.user_id === user.id ? id.sender_id : id.user_id)) {
//                         value = i[type]
//                     }
//                 })
//                 return value
//             }
//         }
//         else {
//             if (type === "time") {
//                 const res = getTime(id.updated_at)
//                 return res
//             }
//             else {
//                 allUsers.forEach((i) => {
//                     console.log(id)
//                     if (i.id === (id.receiver_id === user.id ? id.sender_id : id.receiver_id)) {
//                         value = i[type]
//                     }
//                 })
//                 return value
//             }
//         }
//     }

//     const getTime = (id) => {
//         const time = new Date(id)
//         const today = new Date()
//         const currDate = today.getDate()
//         const notificationDate = time.getDate()
//         const currMon = today.getMonth() + 1
//         const notiMon = time.getMonth() + 1

//         if ((currMon === notiMon)) {
//             if (currDate === notificationDate) {
//                 const timeDiffInMilliseconds = today - time;
//                 const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));
//                 if (timeDiffInMinutes < 1) {
//                     return "just now";
//                 } else if (timeDiffInMinutes < 60) {
//                     return `${timeDiffInMinutes} Min`;
//                 } else {
//                     const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
//                     return `${timeDiffInHours} hrs`;
//                 }
//             } else if ((currDate - 1) === notificationDate) {
//                 return `Yesterday`
//             } else {
//                 return `${(currDate - notificationDate)} days`
//             }
//         } else {
//             return `${notificationDate.toExponential().length < 10 ? '0' + notificationDate : notificationDate} ${months[notiMon - 1]}`
//         }
//     }


//     return (
//         <div className='w-full h-auto px-[30px] '>
//             {
//                 !i?.user_id ?
//                     <div className='flex gap-4'>
//                         {getUserData(i, "avatar_url") ?
//                             <Image src={getUserData(i, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full object-cover min-w-[50px] max-h-[50px]' />
//                             :
//                             <p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px] uppercase'>
//                                 {getUserData(i, "username").charAt(0)}
//                             </p>
//                         }
//                         <div className='w-full'>
//                             <div className='flex justify-between'>
//                                 <p className='text-[20px] font-semibold leading-[20px] capitalize '>
//                                     {getUserData(i, "username")}
//                                 </p>
//                                 <p className='text-[16px] font-medium leading-[20px]'>{getUserData(i, "time")}</p>
//                             </div>
//                             <p className='text-[16px] font-light leading-[20px] tracking-tight text-white/80 mt-[6px]'>
//                                 💌 Match request from <span className='capitalize'>{getUserData(i, "username")}.</span> Swipe right to match or left to unmatch.
//                             </p>
//                         </div>
//                     </div>
//                     :
//                     <div className='flex gap-4'>
//                         {getUserData(i, "avatar_url") ?
//                             <Image src={getUserData(i, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full object-cover min-w-[50px] max-h-[50px]' />
//                             :
//                             <p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px] uppercase'>
//                                 {getUserData(i, "username").charAt(0)}
//                             </p>
//                         }
//                         <div className='w-full'>
//                             <div className='flex justify-between'>
//                                 <p className='text-[20px] font-semibold leading-[20px] capitalize '>
//                                     {getUserData(i, "username")}
//                                 </p>
//                                 <p className='text-[16px] font-medium leading-[20px]'>{getUserData(i, "time")}</p>
//                             </div>
//                             <p className='text-[16px] font-light leading-[20px] text-white/80 mt-[6px] flex items-center gap-x-2'>
//                                 {/* <Image src={logo} width={18} height={18} alt='icon' className='' /> Its a match. You can chat with {i.message.split(' ')[0]}. */}
//                                 🎉 Its a match. You can chat with {getUserData(i, "username")}.
//                             </p>
//                         </div>
//                     </div>
//             }

//         </div>
//     )
// }

// export default FriendNotification

import Image from 'next/image';
import React from 'react';
import logo from "/public/assets/small_logo.svg";

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

const FriendNotification = ({ notification, allUsers, user, allStrings }) => {
    const getUserData = (notificationId, type) => {
        const id = notificationId.user_id ? (notificationId.user_id === user?.id ? notificationId.sender_id : notificationId.user_id) : (notificationId.receiver_id === user?.id ? notificationId.sender_id : notificationId.receiver_id);
        const currentUser = allUsers.find(i => i.id === id);
        return currentUser ? (type === "time" ? getTime(notificationId.updated_at) : currentUser[type]) : null;
    };

    const getTime = (updatedAt) => {
        const time = new Date(updatedAt);
        const today = new Date();
        const currDate = today.getDate();
        const notificationDate = time.getDate();
        const currMon = today.getMonth() + 1;
        const notiMon = time.getMonth() + 1;

        if (currMon === notiMon) {
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
                return `${(currDate - notificationDate)} ${allStrings["string_days"]}`
            }
        } else {
            return `${notificationDate.toString().padStart(2, '0')} ${months[notiMon - 1]}`
        }
    };

    return (
        <div className='w-full h-auto px-[15px] md:px-[30px]'>
            <div className='flex gap-4'>

                {
                    getUserData(notification, "avatar_url") ?
                        <Image src={getUserData(notification, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full  min-w-[50px] max-h-[50px] object-cover' /> : <p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px] uppercase'>{getUserData(notification, "username")?.charAt(0)}</p>
                }

                <div className='w-full'>
                    <div className='flex justify-between'>
                        <p className='text-[20px] font-semibold leading-[20px] capitalize'>
                            {getUserData(notification, "username")}
                        </p>
                        <p className='text-[16px] font-medium leading-[20px]'>{getUserData(notification, "time")}</p>
                    </div>
                    <p className='text-[16px] font-light leading-[20px] text-white/80 mt-[6px]'>
                        {(notification.is_friend && notification.is_friend === 1) ?
                            `🎉 ${allStrings["string_it's_a_match._you_can_chat_with"]} ${getUserData(notification, "username")}.` :
                            `💌 ${allStrings["string_match_request_from"]} ${getUserData(notification, "username")}. ${allStrings["string_swipe_right_to_match_or_left_to_unmatch."]}`
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FriendNotification;
