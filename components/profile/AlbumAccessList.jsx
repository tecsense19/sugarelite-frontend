import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import arrow_left from "/public/assets/arrow_left.svg"
import { notification } from 'antd'
import { private_image_access } from '@/app/lib/actions'
import { client_notification } from '@/app/lib/helpers'

const AlbumAccessList = ({ setProfileToggle, user, type, albumAccessList, allUsers, socket }) => {

    const [api, contextHolder] = notification.useNotification()


    const [data, setData] = useState([])
    console.log(albumAccessList)

    useEffect(() => {
        const matchedProfiles = allUsers.filter(user1 => {
            return albumAccessList.some(user2 => user2.user_id === user1.id);
        });
        setData(matchedProfiles)
    }, [albumAccessList])

    const getDateOfAccess = (id) => {
        const user = albumAccessList.filter((i) => i.user_id === id)
        const time = new Date(user[0].time)
        return `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`
    }

    const handleSubmit = async (id) => {
        const res = await private_image_access({ sender_id: user.id, receiver_id: id, is_approved: 0 })
        if (res.success && socket) {
            // const arr = myNotifications.filter((i) => i.sender_id !== id)
            // client_notification(api, "topRight", "success", res?.message, 3)
            // setMyNotifications(arr)
            socket.emit("album-access", { userId: id, sender_id: user.id, type: "decline" })
        }
    }

    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]">
            {contextHolder}
            <div className='w-full'>
                <div className='w-full flex flex-col items-center'>
                    <div className='text-center text-white text-[30px] font-bold leading-[40px] relative flex items-center justify-center w-full'>
                        <button className='absolute left-0' onClick={() => setProfileToggle("")}>
                            <Image src={arrow_left} alt='' width={24} height={24} className='pointer-events-none' />
                        </button>
                        {type === "photo"
                            ? "Manage Photo Requests"
                            : "Manage Block List"
                        }
                    </div>
                    <div className='text-center mt-[14px] text-[18px] font-light leading-[20px]'>
                        {type === "photo"
                            ? "Hear you Can Remove and Accept requests To See Your Private Photos."
                            : "Manage Your Blocked Profiles: View and Unblock Users You've Previously Blocked"
                        }
                    </div>
                </div>
                <div className='mt-[70px]'>
                    <div className='text-[20px] font-normal leading-[20px]'>
                        {type === "photo"
                            ? "Your Accepted request"
                            : "Your Block List"
                        }
                    </div>
                    <div className='mt-6'>
                        <table className='w-full border-0 table-auto'>
                            <thead>
                                <tr className='bg-primary-dark h-[58px]'>
                                    <th className='text-center text-[16px] font-normal leading-[20px]'>Name</th>
                                    <th className='text-center text-[16px] font-normal leading-[20px] 2xl:table-cell hidden'></th>
                                    <th className='text-center text-[16px] font-normal leading-[20px]'>Created On</th>
                                    <th className='text-center text-[16px] font-normal leading-[20px]'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {/* <div className='max-h-[300px] overflow-y-auto w-full'> */}
                                {data && data.length
                                    ? <>
                                        {data.map((item, inx) => (
                                            <tr key={inx} className='bg-primary-dark-6 h-[80px] px-10 w-full'>
                                                <td className='text-center h-full items-center '>
                                                    <div className='flex ms-10 items-center'>
                                                        {item.avatar_url
                                                            ? <Image src={item.avatar_url} alt='' height={50} width={50} className='rounded-full pointer-events-none h-[50px] w-[50px]' />
                                                            : <div className='h-[50px] w-[50px] bg-secondary text-white flex justify-center items-center rounded-full'>{item.username.charAt(0)}</div>
                                                        }
                                                        <div className='ms-[14px] text-[20px] font-normal leading-[20px] flex items-center'>{item.username}</div>
                                                    </div>
                                                </td>
                                                <td className=' ps-6 h-full text-[18px] font-normal leading-[20px] 2xl:table-cell hidden '>
                                                    {type === "photo"
                                                        ? `${item.username} can access your private photos.`
                                                        : `You have blocked the profile of ${item.username}.`
                                                    }
                                                </td>
                                                <td className='text-center px-2 h-full text-[20px] font-normal leading-[20px] '>{getDateOfAccess(item.id)}</td>
                                                <td className='text-center px-2 h-full '>
                                                    <button className='bg-danger px-4 py-[6px] text-[16px] font-medium rounded-[5px] leading-[20px]' onClick={() => handleSubmit(item.id)}>
                                                        {type === "photo"
                                                            ? "Decline"
                                                            : "Unblock"
                                                        }
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    : <tr className='bg-primary-dark-6 h-[80px]'>
                                        <td colSpan={4} className='text-center'>No data found !</td>
                                    </tr>
                                }
                                {/* </div> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumAccessList