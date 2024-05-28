import React from 'react'
import read_tick from "/public/assets/read_tick.svg";
import single_tick from "/public/assets/single_tick.svg";
import double_tick from "/public/assets/double_tick.svg";
import Pending from "/public/assets/pending.svg"
import Image from 'next/image';

const ProfileReadStatus = ({ message }) => {

    if (message.status === "pending") {
        return <Image src={Pending} alt="edit-icon" height={14} width={14} priority className="pointer-events-none me-1" />
    } else if ((message.status === "read")) {
        return <Image src={read_tick} alt="edit-icon" height={14} width={18} priority className={`pointer-events-none me-1`} />
    } else if ((message.status === "delivered")) {
        return <Image src={double_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none me-1" />
    } else {
        return <Image src={single_tick} alt="edit-icon" height={14} width={18} priority className="pointer-events-none me-1" />
    }
}


export default ProfileReadStatus