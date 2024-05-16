import React from 'react'
import read_tick from "/public/assets/read_tick.svg";
import single_tick from "/public/assets/single_tick.svg";
import double_tick from "/public/assets/double_tick.svg";
import Pending from "/public/assets/pending.svg"
import Image from 'next/image';
import { useStore } from '@/store/store';

const ProfileReadStatus = ({ message }) => {

    const { state: { onlineUsers, chatPartnerList } } = useStore()

    if (message.status === "pending") {
        return <Image src={Pending} alt="edit-icon" height={14} width={14} priority className="pointer-events-none me-1" />
    } else if ((message.status === "read") || chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId))) {
        return <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none me-1`} />
    } else if ((message.status === "delivered") ||
        onlineUsers.some(i => (i === message.receiver_id) ||
            chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId)))) {
        return <Image src={double_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none me-1" />
    } else {
        return <Image src={single_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " />
    }
}


export default ProfileReadStatus