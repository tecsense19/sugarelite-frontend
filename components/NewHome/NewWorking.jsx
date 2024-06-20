import React from 'react'

const NewWorking = ({ allStrings }) => {
    return (
        <div className='my-[100px] flex flex-col items-center px-4 '>
            <div className='text-center'>
                <div className='text-[clamp(26px,5vw,50px)] font-bold leading-[normal] -tracking-[0.5px] lg:-tracking-[1px] text-center'>
                    {allStrings["string_how_does_it_work?"]}
                </div>
                {/* <div className="text-[16px] font-light leading-6 lg:leading-7 w-full sm:w-10/12 2xl:w-6/12 mt-3 px-2 sm:px-0 text-center">
                    {allStrings["string_working_description"]}
                </div> */}
            </div>
            <div className="mt-[30px] w-full lg:gap-x-3 2xl:gap-x-16 gap-y-5 sm:w-9/12 md:w-7/12 lg:w-11/12 2xl:w-[64%] flex flex-col lg:flex-row">
                <div className='basis-1/3 rounded-[5px] p-6 pb-9 text-center lg:text-start xl:p-10 bg-white custom-shadow-home flex flex-col gap-3 '>
                    <p className='text-gradient text-[58px] leading-[normal] font-bold'>1</p>
                    <p className='text-[24px] font-bold'> {allStrings["string_create_profile"]}</p>
                    <p>{allStrings["string_create_profile_description"]}</p>
                </div>
                <div className='basis-1/3 rounded-[5px] p-6 pb-9 text-center lg:text-start xl:p-10 bg-white custom-shadow-home flex flex-col gap-3 '>
                    <p className='text-gradient text-[58px] leading-[normal] font-bold'>2</p>
                    <p className='text-[24px] font-bold leading-[normal]'> {allStrings["string_confirm_your_email"]}</p>
                    <p> {allStrings["string_confirm_your_email_description"]}</p>
                </div>
                <div className='basis-1/3 rounded-[5px] p-6 pb-9 text-center lg:text-start xl:p-10 bg-white custom-shadow-home flex flex-col gap-3 '>
                    <p className='text-gradient text-[58px] leading-[normal] font-bold'>3</p>
                    <p className='text-[24px] font-bold'> {allStrings["string_sugardate"]}</p>
                    <p> {allStrings["string_sugardate_description"]}</p>
                </div>
            </div>
        </div>
    )
}

export default NewWorking