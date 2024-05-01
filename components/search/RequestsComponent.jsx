import Image from 'next/image'
import React from 'react'
import No_Request from "/public/assets/Chat-amico_1.svg"

const RequestsComponent = ({ toggle }) => {
    return (
        <div className={`h-[calc(100%-88px-123px)] items-center flex-col justify-center px-4 w-full ${!toggle ? "hidden" : "flex"}`}>
            <Image src={No_Request} alt='no' width={180} height={180} className='' />
            <p className='font-[400] text-[18px] mt-1'>No requests yet</p>
            <p className='px-8 leading-[20px] font-light text-[16px] mt-1 text-white/60 text-center flex flex-col gap-y-2'>
                <span>Don't worry though, your charm is just waiting for the right match to come along and light up your notifications!</span>
                <span>✨ Keep shining ✨</span>
            </p>
        </div>
    )
}

export default RequestsComponent