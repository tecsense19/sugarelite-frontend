import Image from 'next/image'
import React from 'react'

const Buttons_Profile = () => {
    return (
        <>
            <button className='bg-[#3DC73A] w-full md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] rounded-[5px]' data-aos='zoom-in'>
                <Image src={'/assets/message_circle.svg'} width={22} height={22} alt='message' />
                SEND MESSAGE
            </button>
            <button className='bg-secondary w-full md:w-[calc(100%/2-10px)] lg:max-w-[300px] flex justify-center items-center gap-[10px] h-[42px] rounded-[5px]' data-aos='zoom-in'>
                <Image src={'/assets/lock_1.svg'} width={22} height={22} alt='message' />
                Request View Album
            </button>
        </>
    )
}

export default Buttons_Profile