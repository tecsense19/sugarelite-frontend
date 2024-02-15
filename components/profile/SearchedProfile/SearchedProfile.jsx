import Image from 'next/image'
import React from 'react'

const SearchedProfile = () => {
    return (
        <div className='mt-[30px] mb-[10px] w-full sm:max-w-[75%] xl:hidden flex justify-center flex-col gap-3'>
            <button className='bg-[#3DC73A] w-full flex justify-center items-center gap-[10px] h-[42px] rounded-[5px]'>
                <Image src={'/assets/message_circle.svg'} width={22} height={22} alt='message' />
                SEND MESSAGE
            </button>
            <button className='bg-secondary w-full flex justify-center items-center gap-[10px] h-[42px] rounded-[5px]'>
                <Image src={'/assets/lock_1.svg'} width={22} height={22} alt='message' />
                Request View Album
            </button>
        </div>
    )
}

export default SearchedProfile