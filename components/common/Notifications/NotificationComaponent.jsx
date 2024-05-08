import { ConfigProvider, Drawer, notification } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Cross from "/public/assets/cross_icon.svg";
import No_Notification from "/public/assets/no_notification.svg"
import { useStore } from '@/store/store';
import AlbumNotification from './AlbumNotification';
import FriendNotification from './FriendNotification';

const NotificationComaponent = ({ open, allUsers, socket }) => {
    const { state: { userState, notificationOpenState, notificationState }, dispatch } = useStore()
    const [api, contextHolder] = notification.useNotification();
    const [allNotifications, setAllNotifications] = useState([])

    const onClose = () => {
        dispatch({ type: "Close_Notification", payload: false })
    }

    useEffect(() => {
        const { albumNotifications, friendRequests } = notificationState
        const mergedNotifications = [...albumNotifications, ...friendRequests]
        mergedNotifications.sort((a, b) => {
            const dateA = new Date(a.updated_at);
            const dateB = new Date(b.updated_at);
            return dateB - dateA;
        });
        console.log(friendRequests)
        setAllNotifications(mergedNotifications)
    }, [notificationState])

    return (
        <div className={`fixed md:top-[66px] bottom-0 right-0 w-full z-[10] h-full md:h-[calc(100%-66px)] transition-transform duration-300 ease-out origin-right ${open ? "scale-x-1" : "scale-x-0"}`}>
            {contextHolder}
            <ConfigProvider
                theme={{
                    components: {
                        Drawer: {
                            zIndexPopup: 0
                        }
                    },
                    token: {
                        colorBgElevated: "#1F1F1F",
                        colorBgMask: "transparent",
                        paddingLG: "0",
                    },
                }}
            >
                <Drawer getContainer={false} closable={false} onClose={onClose} open={open} className='text-white' zIndex={0} >
                    {
                        allNotifications.length ?
                            <>
                                <div className='text-[26px] font-bold leading-[30px] px-[30px] py-[20px] flex items-center justify-between'>
                                    Notification
                                    <Image src={Cross} width={30} height={30} alt='cross' className='md:hidden cursor-pointer' onClick={() => dispatch({ type: "Close_Notification", payload: false })} />
                                </div>
                                <div className='flex flex-col gap-y-7 mt-2'>
                                    {
                                        allNotifications.map((i, inx) => {
                                            if (i.hasOwnProperty('status')) {
                                                return <AlbumNotification key={inx} notification={i} allUsers={allUsers} socket={socket} />
                                            } else {
                                                return <FriendNotification key={inx} notification={i} allUsers={allUsers} socket={socket} />
                                            }
                                        })
                                    }
                                </div>
                            </>
                            :
                            <div className='w-full text-center h-full text-[20px]  px-[10px] py-[18px]'>
                                <div className='text-[26px] font-bold leading-[30px] px-[10px] py-[0px] flex md:hidden items-center justify-between'>
                                    Notification
                                    <Image src={Cross} width={30} height={30} alt='cross' className='md:hidden cursor-pointer' onClick={() => dispatch({ type: "Close_Notification", payload: false })} />
                                </div>
                                <div className='h-[calc(100%-30px)] flex pt-[10rem] flex-col items-center w-full font-semibold'>
                                    <Image src={No_Notification} alt='No_notification' width={200} height={200} className='' />
                                    <p className='font-[400] text-[18px] mt-6'>You are completely up to Date !</p>
                                    <p className='px-8 leading-[20px] font-light text-[16px] mt-1 text-white/60'>Come back here to get about matches, messages, album access insights and much more! </p>
                                </div>
                            </div>
                    }
                </Drawer>
            </ConfigProvider>

        </div>
    )
}

export default NotificationComaponent