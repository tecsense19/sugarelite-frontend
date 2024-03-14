"use client"
import { private_image_access } from '@/app/lib/actions';
import { useStore } from '@/store/store';
import { ConfigProvider, Drawer, } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const Notification = ({ open, setOpen, notifications, user, allUsers }) => {

    const onClose = () => {
        setOpen(false)
    }

    const { state: { userState } } = useStore()
    const [myNotifications, setMyNotifications] = useState(notifications.length && notifications.filter((i) => i.receiver_id === user.id))
    console.log(myNotifications)

    const getUserData = (id, type) => {
        let value;
        allUsers.forEach((i) => {
            if (i.id === id) {
                value = i[type]
            }
        })
        return value
    }

    const acceptHandler = async (id) => {
        console.log("sender ::", userState.id)
        console.log("reciever ::", id)
        if (userState.username) {
            const res = await private_image_access({ sender_id: userState.id, receiver_id: id, is_approved: 1 })
            console.log(res)
            if (res.success) {
                const arr = myNotifications.filter((i) => i.sender_id !== id)
                setMyNotifications(arr)
            }
        }
    }


    return (
        <div className={`fixed top-[66px] bottom-0 right-0 w-full z-20 h-[calc(100%-66px)] transition-transform duration-300 ease-out origin-right ${open ? "scale-x-1" : "scale-x-0"}`}>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgElevated: "#1F1F1F",
                        colorBgMask: "transparent",
                        paddingLG: "0"
                    },
                }}
            >
                <Drawer getContainer={false} closable={false} onClose={onClose} open={open} className='text-white'  >
                    <p className='text-[26px] font-bold leading-[30px] px-[30px] py-[20px]'>Notification</p>
                    <div className='flex flex-col'>
                        {
                            myNotifications
                                ? myNotifications && myNotifications.map((i, inx) => {
                                    return (
                                        <div className='w-full h-[150px] px-[30px] py-[18px]' key={inx}>
                                            <div className='flex items-start gap-[29px]'>
                                                <div className='flex  gap-4'>
                                                    {getUserData(i.sender_id, "avatar_url") ?
                                                        <Image src={getUserData(i.sender_id, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full bg-white max-h-[50px]' /> : <>
                                                            <p className='h-[50px] w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px]'>{getUserData(i.receiver_id, "username").charAt(0)}</p>
                                                        </>
                                                    }
                                                    <div>
                                                        <p className='text-[20px] font-semibold leading-[20px]'>{getUserData(i.sender_id, "username")}</p>
                                                        <p className='text-[16px] font-light leading-[20px] w-[260px] mt-[6px]'>{getUserData(i.sender_id, "username")} has requested permission to view your profile photo.</p>
                                                        <div className='mt-[14px] flex gap-[10px]'>
                                                            <button className='py-[6px] rounded-[5px] px-4 text-white bg-secondary text-[14px] font-medium leading-[20px]' onClick={() => acceptHandler(i.sender_id)}>Accept</button>
                                                            <button className='py-[6px] rounded-[5px] px-4 bg-black'>Decline</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-[16px] font-medium leading-[20px] '>45 min</p>
                                                    <p className='mt-5 h-[9px] w-[9px] rounded-full bg-secondary text-center'></p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                                : <>You are completely upto date</>
                        }
                    </div>
                </Drawer>
            </ConfigProvider>
        </div>
    )
}

export default Notification