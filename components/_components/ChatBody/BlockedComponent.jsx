import { block_user_action } from '@/app/lib/actions'
import { client_notification } from '@/app/lib/helpers'
import { useSocket } from '@/store/SocketContext'
import { useStore } from '@/store/store'
import { notification } from 'antd'
import React, { useEffect, useState } from 'react'

const BlockedComponent = ({ user, toUser, allStrings }) => {

    const { state: { blockedUsersState } } = useStore()
    const { mySocket } = useSocket()

    const [api, contextHolder] = notification.useNotification()
    const [unBlockLoader, setUnBlockLoader] = useState(false);

    const blockedUser = blockedUsersState.find(i => ((i.receiver_id === toUser.id || i.sender_id === toUser.id) && i.is_blocked === 1))
    const isMine = blockedUser.sender_id === user.id

    const unblockHandler = async () => {
        setUnBlockLoader(true);
        const res = await block_user_action({ sender_id: user?.id, receiver_id: toUser.id, is_blocked: 0 })
        if (res.success) {
            client_notification(api, "topRight", "success", res.message, 4)
            mySocket.emit("user-unblocked", res.data)
        }
        setUnBlockLoader(false);
    }

    return (
        <div className='w-full flex justify-center items-center h-[calc(100%-60px)] md:h-[calc(100%-101px)]'>
            {contextHolder}
            {isMine
                ? <div className='text-[15px] text-center font-medium'>
                    {unBlockLoader
                        ? <div className='loader after:border-[20px]'></div>
                        : <>
                            <p className='text-[18px] mb-1'>{allStrings["string_you've_blocked"]} {user.username}</p>
                            <p>{allStrings["string_you_can"]} <span className='text-secondary cursor-pointer' onClick={unblockHandler}>{allStrings["string_unblock"]}</span> {allStrings["string_by_clicking_here"]}</p>
                        </>
                    }
                </div>
                : <div className='text-[16px] font-medium'>
                    {allStrings["string_oops!_it_seems_like"]} {toUser.username} {allStrings["string_has_blocked_you"]}
                </div>
            }

        </div>
    )
}

export default BlockedComponent