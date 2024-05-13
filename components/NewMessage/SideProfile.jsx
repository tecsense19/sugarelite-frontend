import Image from 'next/image'
import React, { useState } from 'react'
import premium from "/public/assets/premium.svg"
import starIcon from "/public/assets/chat_option_star_icon.svg";
import reportIcon from "/public/assets/chat_report_icon.svg";
import blockIcon from "/public/assets/chat_block_icon.svg";
import optionsIcon from "/public/assets/chat_options_icon.svg";
import arrowLeft from "/public/assets/arrow_left.svg";
import { ConfigProvider, Popover } from 'antd';
import Link from 'next/link';
import { client_routes } from '@/app/lib/helpers';

const SideProfile = ({ selectedObj, setShowMobileProfile }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleShowOptionsChange = (val) => {
        setShowOptions(val)
    }

    return (
        <div className='w-full h-full flex flex-col bg-primary 2xl:bg-primary-dark-3 pt-[14px] md:pt-[50px] px-4 md:px-[30px] text-white'>
            <div className='flex md:hidden justify-between items-center mb-[30px]'>
                <button className="flex md:hidden items-center justify-center" onClick={() => setShowMobileProfile(false)}>
                    <Image src={arrowLeft} alt="" height={24} width={24} priority className="pointer-events-none" />
                </button>
                <div className="text-[24px] font-semibold leading-[23px]">Profile</div>
                <ConfigProvider theme={{ components: { Popover: {} }, token: { colorBgElevated: "black" } }}>
                    <Popover placement="bottomRight" trigger="click" open={showOptions} onOpenChange={handleShowOptionsChange} content={(
                        <div className="text-white flex flex-col p-[10px] gap-y-[6px] z-20">
                            <button className="bg-secondary w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                                <Image src={starIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                <div className="text-[14px] font-medium leading-[20px]">Favorites</div>
                            </button>
                            <button className="bg-primary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                                <Image src={reportIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                <div className="text-[14px] font-medium leading-[20px]">Rapporter</div>
                            </button>
                            <button className="bg-primary border-[1px] border-white/30 w-[125px] h-[32px] flex justify-start items-center gap-x-[10px] rounded-sm">
                                <Image src={blockIcon} alt="" height={14} width={14} priority className="ms-5 pointer-events-none" />
                                <div className="text-[14px] font-medium leading-[20px]">Blocker</div>
                            </button>
                        </div>
                    )}>
                        <button className="h-[30px] w-[30px] flex items-center">
                            <Image src={optionsIcon} alt="" height={30} width={30} priority className="pointer-events-none" />
                        </button>
                    </Popover>
                </ConfigProvider>
            </div>

            <div className="w-full flex justify-start items-center flex-col h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <Link prefetch={true} href={client_routes.profile + "/" + selectedObj.id} className="flex justify-center items-center relative !text-white">
                    {
                        selectedObj.avatar_url ?
                            <Image src={selectedObj?.avatar_url} width={180} height={180} alt="person" className={`hidden md:block rounded-full h-[180px] min-h-[180px] select-none pointer-events-none object-cover`} priority />
                            : <p className="h-[180px] w-[180px] hidden uppercase md:flex items-center justify-center bg-primary-dark rounded-full text-[84px] ">{selectedObj.username.charAt(0)}</p>
                    }
                    {
                        selectedObj.avatar_url ?
                            <Image src={selectedObj?.avatar_url} width={140} height={140} alt="person" className={`md:hidden min-h-[140px] h-[140px] rounded-full select-none pointer-events-none object-cover`} priority />
                            : <p className="h-[140px] w-[140px]  md:hidden uppercase flex items-center justify-center bg-primary-dark rounded-full text-[64px] ">{selectedObj.username.charAt(0)}</p>
                    }
                    {/* <Image src={Img1} width={180} height={180} alt="person" className={`hidden md:block rounded-full select-none pointer-events-none`} priority /> */}

                </Link>
                <div data-aos='zoom-in'>
                    <div className={`flex flex-col mt-5 md:mt-[30px] items-center ${selectedObj.is_subscribe === 1 ? "md:items-start" : "md:items-center"}`}>
                        <div className='flex items-center'>
                            <Link prefetch={true} href={client_routes.profile + "/" + selectedObj.id} className="text-[24px] md:text-[26px] font-bold leading-[30px] flex !text-white capitalize">{selectedObj.username}, {selectedObj.age}</Link>
                            {selectedObj.is_subscribe === 1 && <>
                                <Image src={premium} alt='premium' width={30} height={30} priority className='pointer-events-none ms-3 md:ms-4' />
                                <span className='text-[16px] font-semibold leading-[normal] text-white/80 ms-2'>Premium</span>
                            </>}
                        </div>
                        <div className='mt-[11px] flex items-center self-center'>
                            <span className="text-[18px] font-semibold text-white/80 me-[14px] leading-[normal]">{selectedObj.country},</span>
                            <span className="text-[16px] font-semibold text-white/80 leading-[normal]">{selectedObj.region}</span>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-[30px]">
                    <div className="bg-primary-dark-4 rounded-t-[5px] p-5 md:px-4 md:pt-4 md:pb-4 text-[16px] font-light leading-[22px] md:leading-[24px]">
                        {selectedObj.bio ? selectedObj.bio : "No Bio added"}
                    </div>
                    <div className="bg-primary-dark-3 2xl:bg-primary px-5 md:px-[24px] py-[13px] md:pt-[11px] md:pb-[15px] rounded-b-[5px]">
                        <p className="text-[18px] font-medium leading-[normal] text-white/80">Biography</p>
                        {/* <p className="mt-[7px] text-[12px] font-medium leading-[normal] text-white/80">No Cinema</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideProfile