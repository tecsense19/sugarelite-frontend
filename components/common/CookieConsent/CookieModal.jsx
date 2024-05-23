import { ConfigProvider, Modal } from 'antd'
import Image from 'next/image'
import React from 'react'
import Logo from "/public/assets/fire_logo_2.svg"

const CookieModal = ({ isModalOpen }) => {
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
                    "colorBgBase": "#141414",
                    "colorTextBase": "#ffffff"
                }
            }}
        >

            <Modal
                closeIcon={false}
                centered={true}
                open={isModalOpen}
                footer={null}
                className='report-container'
                width={720}
            >
                <div className='w-full text-white'>
                    <div className='flex items-center justify-center gap-x-2'>
                        <Image src={Logo} alt='logo' width={1000} height={1000} priority className='h-10 w-10' />
                        <p className='text-[20px]'>Elite Sugar</p>
                    </div>
                    <div className='border'>
                        next
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}

export default CookieModal