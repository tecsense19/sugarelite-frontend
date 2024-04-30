import React, { useEffect, useRef } from 'react'

const Buttons = ({ toggle, setToggle }) => {

    const btnRef = useRef(null)
    console.log(btnRef.current?.clientWidth);

    return (
        <div className='px-[30px] w-full'>
            <div className="grid grid-cols-2 gap-x-4 md:hidden w-full mt-6 relative">
                <button id='newSouls' onClick={() => setToggle(false)} className={`h-[40px] flex justify-center tracking-wide rounded-[5px] items-center text-white text-[16px] font-semibold leading-[20px]`}>
                    New Souls
                </button>
                <button className={`pointer-events-none bg-secondary z-[-1] h-[100%] absolute rounded-[5px] transition-all duration-300 ${!toggle ? "translate-x-[0px]" : "translate-x-[calc(100%+16px)]"}`} style={{ width: "calc((100% - 16px) / 2)" }}></button>
                <button onClick={() => setToggle(true)} className={`h-[40px] flex justify-center tracking-wide rounded-[5px] items-center text-white text-[16px] font-semibold leading-[20px]`} >
                    Requests
                </button>
            </div>
        </div>
        // <div className='relative w-full px-[30px] gap-x-4 mt-6 flex'>
        //     <div className='absolute bg-secondary h-10 w-[calc(50%-38px)] rounded-[5px]'></div>
        //     <button onClick={() => setToggle(false)} className={`h-[40px] z-10 basis-1/2 flex justify-center tracking-wide rounded-[5px] items-center text-white  text-[16px] font-semibold leading-[20px]`}>
        //         New Souls
        //     </button>
        //     <button onClick={() => setToggle(true)} className={`h-[40px] z-10 basis-1/2 flex justify-center tracking-wide hover:bg-secondary rounded-[5px] items-center text-white ${toggle && "bg-secondary"} text-[16px] font-semibold leading-[20px]`} >
        //         Requests
        //     </button>

        // </div>
    )
}

export default Buttons