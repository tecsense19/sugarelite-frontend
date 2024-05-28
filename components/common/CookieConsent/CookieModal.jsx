import { ConfigProvider, Modal } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from "/public/assets/fire_logo_2.svg"
import Left from "/public/assets/chevron_left.svg"
import Details from './Details'

const CookieModal = ({ isModalOpen, cookieSet, setData, data, allStrings }) => {

    const [type, setIsType] = useState("details")

    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        titleColor: "#070F2B",
                        titleFontSize: "22px",
                        padding: 0,
                    },
                },
                "token": {
                    "colorPrimary": "#f16667",
                    "colorInfo": "#f16667",
                    "colorBgBase": "#2d2d2d",
                    "colorTextBase": "#ffffff"
                }
            }}
        >

            <Modal
                closeIcon={false}
                centered={true}
                open={isModalOpen}
                footer={null}
                className='cookie-container'
                width={860}
            >
                <div className='w-full text-white'>
                    <div className='flex items-center justify-center gap-x-2 h-[70px] bg-[#2d2d2d]'>
                        <Image src={Logo} alt='logo' width={1000} height={1000} priority className='h-10 w-10' />
                        <p className='text-[25px] font-semibold mt-2'>Elite Sugar</p>
                    </div>
                    <div className='flex justify-between h-[50px] text-[16px] border-b border-[#4b4b4b] bg-primary-dark-2'>
                        <button onClick={() => setIsType("consent")} className={`w-full flex items-center hover:text-secondary justify-center font-medium ${type === "consent" && "text-secondary border-b border-secondary"}`}>{allStrings["string_consent"]}</button>
                        <button onClick={() => setIsType("details")} className={`w-full flex items-center hover:text-secondary justify-center font-medium ${type === "details" && "text-secondary border-b border-secondary"}`}>{allStrings["string_details"]}</button>
                        <button onClick={() => setIsType("about")} className={`w-full flex items-center hover:text-secondary justify-center font-medium ${type === "about" && "text-secondary border-b border-secondary"}`}>{allStrings["string_about"]}</button>
                    </div>
                    <div className='p-4 border-b border-[#4b4b4b] h-[420px] bg-primary-dark-2 overflow-y-auto' style={{ scrollbarWidth: "none" }}>
                        {
                            type === "consent" && <div>
                                <p className='text-[20px] mb-1 font-semibold'>{allStrings["string_we_use_cookies"]}</p>
                                <p className='text-[16px] leading-[22px] text-white/80'>
                                    {allStrings["string_we_use_cookies_description"]}
                                </p>
                            </div>
                        }
                        {
                            type === "details" && <Details setData={setData} data={data} allStrings={allStrings} />
                        }
                        {
                            type === "about" && <div className='flex flex-col gap-y-[12px] text-[16px] text-white/80'>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>
                                        {allStrings["string_cookie_consent_about_section_1"]}
                                    </p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>
                                        {allStrings["string_cookie_consent_about_section_2"]}
                                    </p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>
                                        {allStrings["string_cookie_consent_about_section_3"]}
                                    </p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>
                                        {allStrings["string_cookie_consent_about_section_4"]}
                                    </p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>
                                        {allStrings["string_cookie_consent_about_section_5"]}
                                    </p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>
                                        {allStrings["string_cookie_consent_about_section_6"]}
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex gap-x-2 p-3 justify-end bg-primary-dark-2'>
                        {
                            type === "details"
                                ? <button className='bg-secondary w-[150px] py-2 rounded-[5px]' onClick={() => cookieSet("custom")}>
                                    {allStrings["string_allow_selected"]}
                                </button>
                                : <button className='bg-secondary w-[150px] py-2 rounded-[5px] flex justify-center items-center' onClick={() => setIsType("details")}>
                                    {allStrings["string_customize"]}
                                    <Image src={Left} alt='logo' width={1000} height={1000} priority className='h-5 w-5 rotate-180 -me-2' />
                                </button>
                        }
                        <button className='bg-secondary w-[150px] py-2 rounded-[5px]' onClick={() => cookieSet("all")}>{allStrings["string_allow_all"]}</button>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}

export default CookieModal