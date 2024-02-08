import Image from 'next/image'
import React from 'react'

const Password = ({ nextStepHandler, prevStepHandler, register }) => {
    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={"/assets/pad_lock.svg"} alt="pad_lock" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl pt-5 font-medium max-w-[15rem]">What should your password be?</p>
                <p className='text-white opacity-[50%] mt-3 text-[16px] max-w-[20rem]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className='mt-14 w-full'>
                <input type="password" {...register('password', { required: true })} placeholder='Password' className='w-full bg-transparent border border-[#535353] rounded py-3 ps-[18px] text-white text-opacity-[50%] outline-none mb-3' autoComplete='off' />
                <input type="password" {...register('cpassword', { required: true })} placeholder='Confirm password' className='w-full bg-transparent border border-[#535353] rounded py-3 ps-[18px] text-white text-opacity-[50%] outline-none' autoComplete='off' />
            </div>
            <div className='mt-14 w-full'>
                <button className="bg-secondary w-full py-3 mb-3 rounded" onClick={prevStepHandler} type="button">BACK</button>
                <button className=" w-full py-3 rounded border border-[#53535350]" onClick={nextStepHandler} type="button">NEXT</button>
            </div>
        </>
    )
}

export default Password