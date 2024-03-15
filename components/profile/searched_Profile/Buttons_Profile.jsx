"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import message_circle from "../../../public/assets/message_circle.svg"
import lock_1 from "../../../public/assets/lock_1.svg"
import PopOver from '../commons/PopOver'
import more_horizontal from "../../../public/assets/more_horizontal.svg"
import { private_image_access } from '@/app/lib/actions'
import { useStore } from '@/store/store'
import { notification } from 'antd'
import { client_notification, client_routes, socket_server } from '@/app/lib/helpers'
import { useRouter } from 'next/navigation'
import { io } from 'socket.io-client'

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(socket_server);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};


const Buttons_Profile = ({ user, allUsers, pendingList, accessList }) => {

    const { state: { userState, accessPendingState, decisionState }, dispatch } = useStore()
    const navigate = useRouter()
    const socket = useSocket();
    const [decisionListSocket, setDecisionSocketList] = useState([])
    const [privateAlbumState, setPrivateAlbumState] = useState(null)
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (!socket) return;

        socket.on("access-notify", (obj) => {
            if (obj.userId === userState?.id) {
                setDecisionSocketList((prev) => {
                    const userIndex = prev.findIndex(item => item.userId === obj.userId);

                    if (userIndex !== -1) {
                        const updatedList = [...prev];
                        updatedList[userIndex] = obj;
                        return updatedList;
                    } else {
                        return [...prev, obj];
                    }
                });
            }
        });
    }, [socket]);

    useEffect(() => {
        dispatch({ type: "Add_Decision_User", payload: decisionListSocket })
    }, [decisionListSocket])


    useEffect(() => {
        const desicion = pendingList.some((i) => (i.receiver_id === user.id && i.sender_id === userState?.id))
        if (desicion) {
            setPrivateAlbumState("pending")
        }
    }, [pendingList])

    useEffect(() => {
        const decision = accessPendingState.some((i) => i === user.id)
        if (decision) {
            setPrivateAlbumState("pending")
        }
    }, [accessPendingState])

    useEffect(() => {
        const decision = accessList.some((i) => i.user_id === user.id)
        if (decision) {
            setPrivateAlbumState("access")
        }
    }, [accessList])

    useEffect(() => {
        const isDeclined = decisionListSocket.some((i) => (i.sender_id === user.id && i.type === "decline"))
        const isAccept = decisionListSocket.some((i) => (i.sender_id === user.id && i.type === "accept"))

        if (isAccept) {
            setPrivateAlbumState("access")
            dispatch({ type: "Remove_User", payload: { id: user.id } })
        }
        if (isDeclined) {
            setPrivateAlbumState(null)
            dispatch({ type: "Remove_User", payload: { id: user.id } })
        }

    }, [decisionListSocket])

    const requestHandler = async (type) => {
        if (type === "request_view_album") {
            const res = await private_image_access({ sender_id: userState?.id, receiver_id: user.id, is_approved: 2 })
            if (res.success) {
                dispatch({ type: "Add_User", payload: user.id })
                setPrivateAlbumState("pending")
                socket.emit("request-album", { sender_id: userState?.id, receiver_id: user.id })
                client_notification(api, "topRight", "success", res?.message, 4)
            }
        } else {
            dispatch({ type: "Message_To", payload: user })
            navigate.push(client_routes.chat)
        }
    }

    return (
        <>
            {contextHolder}
            <button onClick={() => requestHandler("send_message")} className='bg-[#3DC73A] w-full max-w-[273px] md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-right'>
                <Image src={message_circle} width={22} height={22} alt='message' />
                <span className='xl:text-[20px] font-[600] leading-[normal]'>SEND MESSAGE</span>
            </button>
            {!privateAlbumState &&
                <button onClick={() => requestHandler("request_view_album")} className='bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    <Image src={lock_1} width={22} height={22} alt='message' />
                    <span className='xl:text-[20px] font-[600] leading-[normal]'>REQUEST VIEW ALBUM</span>
                </button>
            }
            {
                privateAlbumState === "access" &&
                <div className='bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    {/* <Image src={lock_1} width={22} height={22} alt='message' /> */}
                    <span className='xl:text-[20px] font-[600] leading-[normal] uppercase'>you got access</span>
                </div>
            }

            {
                privateAlbumState === "pending" &&
                <div className='bg-primary-dark-3 w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    <Image src={lock_1} width={22} height={22} alt='message' />
                    <span className='xl:text-[20px] font-[600] leading-[normal]'>REQUEST PENDING</span>
                </div>
            }

            <div className=' justify-center items-center hidden md:flex 2xl:hidden'>
                <PopOver>
                    <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
                </PopOver>
            </div>

        </>
    )
}

export default Buttons_Profile