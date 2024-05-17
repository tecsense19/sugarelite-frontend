import Image from 'next/image'
import React, { useEffect } from 'react'
import double_tick from "/public/assets/double_tick.svg";
import double_tick_2 from "/public/assets/double_tick_2.svg";
import read_tick from "/public/assets/read_tick.svg";
import single_tick from "/public/assets/single_tick.svg";
import single_tick_2 from "/public/assets/single_tick_2.svg";
import shadow_bg_chat from "/public/assets/shadow_bg_chat.svg";
import Pending from "/public/assets/pending.svg"
import { useStore } from '@/store/store';

const ReadTickRender = ({ isImage, message, user }) => {
    const { state: { chatPartnerList, onlineUsers } } = useStore()

    if (!isImage) {
        if (message.status === "pending") {
            return <Image src={Pending} alt="edit-icon" height={14} width={12} priority className="pointer-events-none ms-[2px]" />
        } else if ((message.status === "read") || chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId))) {
            return <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none`} />
        } else if ((message.status === "delivered") ||
            onlineUsers.some(i => (i === message.receiver_id) ||
                chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId)))) {
            return <Image src={double_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " />
        } else {
            return <Image src={single_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none " />
        }
    } else {
        if (message.status === "pending") {
            return <Image src={Pending} alt="edit-icon" height={14} width={14} priority className="pointer-events-none me-1" />
        } else if ((message.status === "read") || chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId))) {
            return <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none absolute bottom-0`} />
        } else if ((message.status === "delivered") ||
            onlineUsers.some(i => (i === message.receiver_id) ||
                chatPartnerList.some(i => (i.sender_id === message.receiver_id) && (message.id <= i.lastMsgId)))) {
            return <Image src={double_tick_2} alt="edit-icon" height={14} width={18} priority className="pointer-events-none absolute bottom-0" />
        } else {
            return <Image src={single_tick_2} alt="edit-icon" height={14} width={18} priority className="pointer-events-none absolute bottom-0" />
        }
    }
}

export default React.memo(ReadTickRender)