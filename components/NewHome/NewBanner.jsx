import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LOGO from '/public/new_assets/new_logo.svg'
import { client_routes } from '@/app/lib/helpers'

const NewBanner = ({ user, allStrings }) => {
    return (
        <div className='h-[848px] bg-gradient-home w-full flex flex-col items-center'>
            <header className='h-[65px] md:h-[85px] flex justify-between items-center w-11/12 xl:w-9/12'>
                <Link href={user ? client_routes.profile : client_routes.home}>
                    <Image src={LOGO} alt="logo" height={1000} width={1000} className="pointer-events-none select-none h-[30px] w-[120px] md:h-[47px] md:w-[237px]" priority />
                </Link>
                <div className='flex gap-x-2 md:gap-x-[18px]'>
                    <Link className='bg-tinder px-4 md:pl-[29px] md:pr-[34px] h-[32px] md:h-[45px] text-center text-white rounded-[5px] text-[12px] md:text-[18px] font-semibold tracking-[-0.18px] leading-[normal] transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center uppercase pt-[2px]' href={client_routes.register}>
                        {allStrings.string_register_now}
                    </Link>
                    <Link className='bg-black px-3 md:px-[28px] h-[32px] md:h-[45px] text-center text-white rounded-[5px] text-[12px] md:text-[18px] font-semibold tracking-[-0.18px] leading-[normal] transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center uppercase pt-[2px]' href={client_routes.register}>
                        {allStrings.string_login}
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default NewBanner