"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from "/public/assets/fire_log.svg"
import Left from "/public/assets/chevron_left.svg"
import CookieModal from './CookieModal'
import { setCookie } from 'nookies'

const CookieConsent = ({ allStrings }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCookie, setIsCookie] = useState(false)
    const [data, setData] = useState({
        Necessary: true,
        Statistics: true,
        Marketing: true,
        method: 'explicit',
        ver: 1,
        utc: Date.now(),
        region: 'in'
    })

    const cookieSet = (type) => {
        if (type === "all") {
            const jsonData = JSON.stringify({
                Necessary: true,
                Statistics: true,
                Marketing: true,
                method: 'explicit',
                ver: 1,
                utc: Date.now(),
                region: 'in'
            })
            setCookie(null, "cookieConsent", jsonData)
        } else {
            const jsonData = JSON.stringify(data)
            setCookie(null, "cookieConsent", jsonData)
        }
        setIsCookie(true)
        setIsModalOpen(false)
    }

    return (
        <>
            <div className={`fixed hidden  bottom-[-100px] left-0 right-0 z-[1000] bg-[#141414] items-center py-[80px] px-[120px] ${(isModalOpen || isCookie) ? "hidden" : "xl:flex  "} text-white gap-x-10  justify-center w-full slide-top `}>
                <div className='flex flex-col items-center justify-center gap-y-2'>
                    <Image src={Logo} alt='logo' width={1000} height={1000} priority className='h-12 w-12' />
                    <p className='text-[20px] text-secondary font-semibold'>SugarMake</p>
                </div>
                <div className='max-w-[60%]'>
                    <p className='text-[20px] font-bold'>{allStrings["string_we_use_cookies"]}</p>
                    <p className=''>
                        {allStrings["string_we_use_cookies_description"]}
                    </p>
                </div>
                <div className='flex flex-col gap-y-3'>
                    <button className='bg-secondary w-[150px] py-2 rounded-[5px]' onClick={() => cookieSet("all")}>{allStrings["string_allow_all"]}</button>
                    <button className='bg-secondary w-[150px] py-2 rounded-[5px] flex justify-center items-center' onClick={() => setIsModalOpen(true)}>
                        {allStrings["string_customize"]}
                        <Image src={Left} alt='logo' width={1000} height={1000} priority className='h-5 w-5 rotate-180 -me-2' />
                    </button>
                </div>
            </div>
            <div className={`fixed bottom-[-85px] left-[5%] right-[5%]  rounded-[5px] p-4 z-[1000] bg-[#141414] ${(isModalOpen || isCookie) ? "hidden" : "xl:hidden  "} text-white slide-top `}>
                <div className='text-[20px] font-semibold'>{allStrings["string_we_use_cookies"]}</div>
                <p className='text-[15px] leading-[20px] mt-1'>
                    {allStrings["string_we_use_cookies_description"]}
                </p>
                <div className='flex gap-x-3 mt-3 justify-end'>
                    <button className='bg-secondary w-[150px] py-1 rounded-[5px] flex justify-center items-center' onClick={() => setIsModalOpen(true)}>
                        {allStrings["string_customize"]}
                        <Image src={Left} alt='logo' width={1000} height={1000} priority className='h-5 w-5 rotate-180 -me-2' />
                    </button>
                    <button className='bg-secondary w-[150px] py-1 rounded-[5px]' onClick={() => cookieSet("all")}>{allStrings["string_allow_all"]}</button>
                </div>
            </div>
            <CookieModal isModalOpen={isModalOpen} cookieSet={cookieSet} setData={setData} data={data} allStrings={allStrings} />
        </>
    )
}

export default CookieConsent