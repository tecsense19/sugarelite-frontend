import Image from 'next/image'
import React from 'react'
import NO_Pitcure from "/public/assets/no_image.svg"

const Msg = ({ msg, setSelectedImages }) => {
    if (msg.get_all_chat_with_image?.length) {
        return (
            <div className=' flex flex-col gap-2 w-full'>

                {/* <p className=''>{msg.text}</p> */}
                <div className={`overflow-hidden relative flex gap-1 flex-wrap cursor-pointer ${msg.get_all_chat_with_image.length === 2 ? "h-[6rem] w-[12rem]" : "w-[12rem] h-[12rem]"}`} onClick={() => setSelectedImages(msg.get_all_chat_with_image)}>
                    {
                        msg.get_all_chat_with_image.map((i, inx) => {
                            return (
                                <React.Fragment key={inx} >
                                    <Image
                                        width={1000} height={1000} src={i.chat_images} alt="phot"
                                        className={` rounded-md bg-primary-dark-4 object-cover ${msg.get_all_chat_with_image.length === 1 ? "h-full w-full" : msg.get_all_chat_with_image.length === 2 ? "h-full w-[calc(6rem-2px)]" : "h-[calc(50%-2px)] w-[calc(6rem-2px)]"} `} />
                                    {inx > 3 &&
                                        <p className='absolute bottom-0 h-[calc(50%-2px)] text-white flex justify-center items-center w-[calc(50%-2px)] right-0 bg-primary-dark/40 rounded-md'>+ {msg.get_all_chat_with_image.length - 4}</p>
                                    }
                                    {
                                        msg.get_all_chat_with_image.length === 3 &&
                                        <div className='absolute bottom-0 h-[calc(50%-2px)] text-white text-sm font-light flex justify-center items-center w-[calc(50%-2px)] right-0  rounded-md'>
                                            <Image src={NO_Pitcure} width={1000} height={1000} alt='no image' className='w-full h-full' />
                                        </div>
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return <p className='px-2 pb-1'>{msg?.text}</p>
    }
}

Msg.displayName = 'Msg';

export default React.memo(Msg)