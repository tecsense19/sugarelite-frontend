import React from 'react'

const ProfileLoader = () => {
    return (
        <section className='h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full'>
            <div className='lg:bg-primary-dark-3 lg:h-[calc(100vh-66px)] w-full lg:fixed lg:w-[350px] 2xl:w-[400px] text-white flex items-center lg:justify-start justify-center flex-col p-[25px] lg:px-[50px]'>
                <div className="w-full aspect-square max-w-[200px]  lg:max-w-full lg:rounded-[10px] flex justify-center items-center ">
                    <div className={`bg-primary-dark-2 lg:bg-primary h-full w-full rounded-full object-cover object-top lg:rounded-[10px] select-none pointer-events-none flex justify-center items-center text-[50px] `}>

                    </div>
                </div>
            </div>
            <div className='w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]'>
                hi
            </div>
        </section>
    )
}

export default ProfileLoader