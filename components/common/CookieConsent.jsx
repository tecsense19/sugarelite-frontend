import Image from 'next/image'
import React from 'react'
import Logo from "/public/assets/fire_log.svg"

const CookieConsent = () => {
    return (
        <div className='fixed bottom-0 left-0 right-0 z-[1000] bg-[#141414] items-center py-10 px-[120px] flex text-white gap-x-10  justify-center w-full'>
            <div className='flex flex-col items-center justify-center gap-y-2'>
                <Image src={Logo} alt='logo' width={1000} height={1000} priority className='h-12 w-12' />
                <p className='text-[20px] text-secondary'>Elite Sugar</p>
            </div>
            <div className='max-w-[60%]'>
                <p className='text-[20px]'>We use cookies</p>
                <p className=''>
                    We use cookies to customize our content and ads, to show you social media features and to analyze our traffic. We also share information about your use of our website with our social media partners, advertising partners and analytics partners. Our partners may combine this data with other information you have provided to them or that they have collected from your use of their services.
                </p>
            </div>
            <div className='flex flex-col gap-y-3'>
                <button className='bg-secondary w-[150px] py-2 rounded-[5px]'>Allow all</button>
                <button className='bg-secondary w-[150px] py-2 rounded-[5px]'>Customize</button>
            </div>
        </div>
    )
}

export default CookieConsent