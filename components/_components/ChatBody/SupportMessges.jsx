import Image from 'next/image'
import React, { useEffect } from 'react'
import Logo from "/public/assets/fire_log.svg"

const SupportMessges = ({ supportChat }) => {

    let currentDate = null

    return (
        <div className='h-[calc(100%-100.8px)] md:h-[calc(100%-110.8px)] w-full flex flex-col  p-4 md:py-5 md:px-10'>
            <div className='h-full flex flex-col justify-end w-full'>
                <div className='flex flex-col-reverse overflow-y-auto w-full gap-y-3 scroll-smooth' style={{ scrollbarWidth: "none" }}>
                    {
                        supportChat.reverse().map((msg, inx) => {
                            return (
                                <div key={inx}>
                                    <div className='flex items-end gap-x-2'>
                                        <div className="flex h-10 min-w-10 bg-tinder rounded-full relative">
                                            <Image src={Logo} alt="ELite_Logo" height={40} width={40} priority className="aspect-square m-auto h-[67%] w-[67%] object-cover rounded-full pointer-events-none" />
                                        </div>
                                        <div className='min-h-10 px-3 py-2 max-w-[80%] md:max-w-[50%] break-words rounded-[10px] rounded-bl-none bg-[#626262]'>
                                            {msg.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SupportMessges