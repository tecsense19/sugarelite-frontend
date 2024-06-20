import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LOGO from '/public/new_assets/new_logo.svg'
import BANNER_IMG from '/public/new_assets/new_banner_img.svg'
import { client_routes } from '@/app/lib/helpers'

const NewBanner = ({ user, allStrings }) => {
    return (
        <div className='pb-10 lg:pb-0 lg:h-dvh bg-gradient-home w-full flex flex-col items-center'>
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
            <div className='h-[calc(100%-65px)] lg:h-[calc(100%-85px)] w-11/12 xl:w-9/12 mx-4 flex flex-col items-center justify-center lg:flex-row-reverse'>
                <div className='h-[260px] sm:h-[295px] w-[260px] sm:w-[295px] lg:basis-1/2  lg:h-full lg:flex'>
                    <Image src={BANNER_IMG} alt="BANNER_IMG" width={1000} height={1000} priority className="pointer-events-none h-full lg:h-[68%] lg:m-auto w-full mix-blend-multiply" />
                </div>
                <div className='text-center w-full flex flex-col lg:basis-1/2 lg:text-start'>
                    <div>
                        <span className='uppercase text-[clamp(30px,9vw,60px)] font-extrabold tracking-[-0.2px] me-[6px]'>SUGAR</span>
                        <span className='uppercase text-[clamp(30px,9vw,60px)] font-normal '>MAKE</span>
                    </div>
                    <div className="m-auto lg:m-none w-[285px] lg:w-full text-[clamp(22px,6vw,30px)] font-medium text-center lg:text-start" style={{ lineHeight: "clamp(22px,6vw,30px)" }}>
                        <span className=''>{allStrings["string_create_a_free_sugar_date_profile_now!"]}</span>
                    </div>
                    <div className='mt-[20px] text-center lg:text-start px-1 lg:p-0 text-[clamp(17px,4.61539vw,20px)] font-normal tracking-[-0.18px]'>
                        {allStrings["string_in_publishing_and_graphic_design,_lorem_ipsum_is_a_placeholder_demonstrate_the_visual_form_of_a_document_or_a_typeface_without_relying"]}
                    </div>
                    <div className='mt-[30px] md:mt-[50px] flex justify-center lg:justify-start gap-x-[10px] lg:gap-x-[15px]'>
                        <Link href={client_routes.register} className='h-[42px] lg:h-[50px] bg-tinder basis-1/2 lg:max-w-[220px] rounded-[5px] font-medium lg:font-semibold text-white text-[clamp(16px,4vw,18px)] flex uppercase pt-[2px]'>
                            <span className='m-auto'> {allStrings["string_create_profile"]}</span>
                        </Link>
                        {
                            user
                                ? <Link href={client_routes.register} className='h-[42px] lg:h-[50px] bg-black basis-1/2 lg:max-w-[220px] rounded-[5px] font-medium lg:font-semibold text-white text-[clamp(16px,4vw,18px)] flex uppercase pt-[2px]'>
                                    <span className='m-auto'>  {allStrings["string_read_more"]}</span>
                                </Link>
                                : <Link href={client_routes.register} className='h-[42px] lg:h-[50px] bg-black basis-1/2 lg:max-w-[220px] rounded-[5px] font-medium lg:font-semibold text-white text-[clamp(16px,4vw,18px)] flex uppercase pt-[2px]'>
                                    <span className='m-auto'>{allStrings["string_login"]}</span>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBanner