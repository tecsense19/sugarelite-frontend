"use client"
import Image from 'next/image'
import message_circle from "/public/assets/message_circle.svg"
import lock_1 from "/public/assets/lock_1.svg"
import PopOver from '../commons/PopOver'
import more_horizontal from "/public/assets/more_horizontal.svg"
import { notification } from 'antd'
import { client_notification, client_routes } from '@/app/lib/helpers'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/store'
import { private_image_request } from '@/app/lib/actions'
import { useEffect, useState } from 'react'
import { useChat } from '@/store/ChatContext'

const Buttons = ({ user, currentUser, privateAlbumState, socket, isModalOpen, setIsModalOpen, allStrings }) => {
    const navigate = useRouter()
    const [api, contextHolder] = notification.useNotification();
    const { dispatch, state: { chatProfileState } } = useStore()
    const [isRequesting, setIsRequesting] = useState(false)
    const { addMessage } = useChat();

    const generateRandomId = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        return `${randomNumber}${randomLetter}`;
    };

    const requestHandler = async (type) => {
        if (type === "request_view_album") {
            const res = await private_image_request({ sender_id: currentUser?.id, receiver_id: user?.id, is_approved: 0 })
            if (res.success) {
                socket.emit("request-album", { data: res.data, status: "pending" })
                client_notification(api, "topRight", "success", res?.message, 4)
            }
        } else {
            // dispatch({ type: "Add_Profile", payload: { obj: { id: 1, sender_id: currentUser?.id, receiver_id: user.id, text: `You started Chat with ${user.username}`, updated_at: new Date() }, type: "normal", user: user } })
            // dispatch({ type: "Add_Message", payload: { sender_id: currentUser?.id, receiver_id: user.id, updated_at: new Date(), milisecondtime: new Date().getTime(), user: user } })
            const isThere = chatProfileState.some(i => i.id === user.id)
            if (!isThere) {
                dispatch({ type: "Add_Profile", payload: { id: user.id, milisecondtime: new Date().getTime() } })
                addMessage({ id: generateRandomId(), sender_id: currentUser.id, receiver_id: user.id, type: "regular", status: "new", milisecondtime: Date.now(), created_at: new Date().getTime(), text: "You started chat", get_all_chat_with_image: "" })
                dispatch({ type: "Message_To", payload: user })
                navigate.push(client_routes.chat)
            } else {
                dispatch({ type: "Message_To", payload: user })
                navigate.push(client_routes.chat)
            }
        }
    }

    useEffect(() => {
        setIsRequesting(false)
    }, [privateAlbumState])

    return (
        <>
            {contextHolder}
            <button onClick={() => requestHandler("send_message")} className='bg-[#3DC73A] w-full max-w-[273px] md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-right'>
                <Image src={message_circle} width={22} height={22} alt='message' />
                <span className='xl:text-[20px] font-[600] leading-[normal] uppercase'>{allStrings["string_send_message"]}</span>
            </button>
            {
                !privateAlbumState && (
                    !isRequesting ?
                        <button onClick={() => { requestHandler("request_view_album"); setIsRequesting(true) }} className={`bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]`} data-aos='fade-left'>
                            <Image src={lock_1} width={22} height={22} alt='message' />
                            <span className='xl:text-[20px] font-[600] leading-[normal] uppercase'>{allStrings["string_request_view_album"]}</span>
                        </button> :
                        <div className='bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]'>
                            <span className='xl:text-[20px] font-[600] leading-[normal] uppercase'>{allStrings["string_requesting...!"]}</span>
                        </div>
                )
            }
            {
                (privateAlbumState === "pending") &&
                <div className='bg-primary-dark-3 w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    <Image src={lock_1} width={22} height={22} alt='message' />
                    <span className='xl:text-[20px] font-[600] leading-[normal]'>{allStrings["string_request_pending"]}</span>
                </div>
            }
            {
                privateAlbumState === "accept" &&
                <div className='bg-secondary w-full max-w-[273px] md:w-[calc(100%/2-10px)]  lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] lg:h-[56px] rounded-[5px]' data-aos='fade-left'>
                    {/* <Image src={lock_1} width={22} height={22} alt='message' /> */}
                    <span className='xl:text-[20px] font-[600] leading-[normal] uppercase'>{allStrings["string_you_got_access"]}</span>
                </div>
            }



            <div className=' justify-center items-center hidden md:flex 2xl:hidden'>
                <PopOver user={user} currentUser={currentUser} socket={socket} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                    <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
                </PopOver>
            </div>

        </>
    )
}

export default Buttons