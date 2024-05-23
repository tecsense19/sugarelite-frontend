import { ConfigProvider, Modal, Collapse } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from "/public/assets/fire_logo_2.svg"
import Left from "/public/assets/chevron_left.svg"

const CookieModal = ({ isModalOpen }) => {

    const [type, setIsType] = useState("consent")



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
                        <button onClick={() => setIsType("consent")} className={`w-full flex items-center hover:text-secondary justify-center ${type === "consent" && "text-secondary border-b border-secondary"}`}>Consent</button>
                        <button onClick={() => setIsType("details")} className={`w-full flex items-center hover:text-secondary justify-center ${type === "details" && "text-secondary border-b border-secondary"}`}>Details</button>
                        <button onClick={() => setIsType("about")} className={`w-full flex items-center hover:text-secondary justify-center ${type === "about" && "text-secondary border-b border-secondary"}`}>About</button>
                    </div>
                    <div className='p-4 border-b border-[#4b4b4b] h-[420px] bg-primary-dark-2'>
                        {
                            type === "consent" && <div>
                                <p className='text-[20px] mb-1'>We use cookies</p>
                                <p className='text-[18px] leading-[22px] text-white/80'>
                                    We use cookies to customize our content and ads, to show you social media features and to analyze our traffic. We also share information about your use of our website with our social media partners, advertising partners and analytics partners. Our partners may combine this data with other information you have provided to them or that they have collected from your use of their services.
                                </p>
                            </div>
                        }
                        {
                            type === "details" && <div>

                            </div>
                        }
                        {
                            type === "about" && <div className='flex flex-col gap-y-[12px] text-[18px] text-white/80'>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>Cookies are small text files that can be used by websites to make a user's experience more efficient.</p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>The law states that we can store cookies on your device if they are strictly necessary to ensure the provision of the service you have expressly requested to use. For all other types of cookies, we must obtain your consent.</p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>This website uses different types of cookies. Some cookies are set by third-party services that appear on our pages.</p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>You can change or withdraw your consent from the Cookie Declaration on our website at any time.</p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>Find out more about who we are, how you can contact us and how we process personal data in our Privacy Policy.</p>
                                </div>
                                <div className='flex gap-x-3'>
                                    <p className='h-2 min-w-2 bg-white text-black rounded-full mt-2'></p>
                                    <p className='leading-[22px]'>Please provide your consent ID and date when contacting us regarding your consent.</p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex gap-x-2 p-3 justify-end bg-primary-dark-2'>
                        <button className='bg-secondary w-[150px] py-2 rounded-[5px] flex justify-center items-center'>
                            Customize
                            <Image src={Left} alt='logo' width={1000} height={1000} priority className='h-5 w-5 rotate-180' />
                        </button>
                        <button className='bg-secondary w-[150px] py-2 rounded-[5px]'>Allow all</button>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}

export default CookieModal