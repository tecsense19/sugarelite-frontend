import Image from 'next/image'
import React from 'react'
import No_Request from "/public/assets/Chat-amico.svg"

const RequestsComponent = ({ toggle }) => {
    return (
        <div className={`h-[calc(100%-88px)]  items-center flex-col pt-[10rem] px-4 w-full ${!toggle ? "hidden" : "flex"}`}>
            <Image src={No_Request} alt='no' width={180} height={180} className='' />
            <p className='font-[400] text-[18px] mt-1'>No requests yet</p>
            <p className='px-8 leading-[20px] font-light text-[16px] mt-1 text-white/60 text-center'>
                Don't worry though, your charm is just waiting for the right match to come along and light up your notifications!<br />✨ Keep shining ✨
            </p>
        </div>
    )
}

export default RequestsComponent