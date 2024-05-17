import React from 'react'
import premium from "/public/assets/premium.svg"
import Logo from "/public/assets/fire_log.svg"
import Image from 'next/image'


const AdminSideProfile = () => {
    return (
        <div className='hidden 2xl:block w-[400px] bg-primary-dark-3 pt-[50px] px-[30px]'>
            <div className="w-full flex justify-start items-center flex-col h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="flex justify-center items-center relative bg-tinder rounded-full h-[180px] max-h-[180px] min-w-[180px]">
                    <Image src={Logo} width={180} height={180} alt="person" className={`hidden md:block rounded-full w-[58%] h-[70%] select-none pointer-events-none object-cover`} priority />                </div>
                <div>
                    <div className={`flex flex-col mt-5 md:mt-[30px] items-start`}>
                        <div className='flex items-center'>
                            <div className="text-[24px] md:text-[26px] font-bold leading-[30px] flex !text-white capitalize">Team Elite</div>
                            <Image src={premium} alt='premium' width={30} height={30} priority className='pointer-events-none ms-3 md:ms-4' />
                            <span className='text-[16px] font-semibold leading-[normal] text-white/80 ms-2'>Premium</span>
                        </div>
                        <div className='mt-[11px] flex items-center self-center'>
                            <span className="text-[18px] font-semibold text-white/80 me-[14px] leading-[normal]">India,</span>
                            <span className="text-[16px] font-semibold text-white/80 leading-[normal]">Gujrat</span>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-[30px]">
                    <div className="bg-primary-dark-4 rounded-t-[5px] p-5 md:px-4 md:pt-4 md:pb-4 text-[16px] font-light leading-[22px] md:leading-[24px]">
                        {"No Bio added"}
                    </div>
                    <div className="bg-primary-dark-3 2xl:bg-primary px-5 md:px-[24px] py-[13px] md:pt-[11px] md:pb-[15px] rounded-b-[5px]">
                        <p className="text-[18px] font-medium leading-[normal] text-white/80">Biography</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSideProfile