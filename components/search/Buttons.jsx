import React from 'react'

const Buttons = () => {
    const messageHandler = (e) => {
        console.log("button clicked")
    }
    return (
        <div className="grid grid-cols-2 gap-x-4 md:hidden mx-[10px] w-full px-[30px]">
            <button className="h-[46px] rounded-[5px] flex justify-center items-center text-white bg-primary-dark-4 text-[18px] font-medium leading-[20px]">
                Refers
            </button>
            <button className="h-[46px] rounded-[5px] flex justify-center items-center text-white bg-primary-dark-4 text-[18px] font-medium leading-[20px]" onClick={messageHandler}>
                Message
            </button>
        </div>
    )
}

export default Buttons