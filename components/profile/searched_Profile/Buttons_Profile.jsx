import Image from 'next/image'
import React from 'react'
import message_circle from "../../../public/assets/message_circle.svg"
import lock_1 from "../../../public/assets/lock_1.svg"
const Buttons_Profile = () => {
    return (
        <>
            <button className='bg-[#3DC73A] w-full md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] rounded-[5px]' data-aos='zoom-in'>
                <Image src={message_circle} width={22} height={22} alt='message' />
                SEND MESSAGE
            </button>
            <button className='bg-secondary w-full md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] rounded-[5px]' data-aos='zoom-in'>
                <Image src={lock_1} width={22} height={22} alt='message' />
                Request View Album
            </button>
        </>
    )
}

export default Buttons_Profile