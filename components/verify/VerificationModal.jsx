
import { ConfigProvider, Modal, notification } from 'antd'
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CloseIcon from '/public/assets/gray_cross_icon.svg'
import verification_logo from '/public/assets/verification_logo.svg'
import begin_verification_image from '/public/assets/begin_verification_image.svg'

const VerificationModal = ({ setIsModalOpen, isModalOpen }) => {

  const [isLoading, setisLoading] = useState(false)
  const { handleSubmit, register, reset } = useForm()
  const [api, contextHolder] = notification.useNotification()

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: { Modal: { titleColor: "#070F2B", titleFontSize: "22px", padding: 0 } },
          "token": { "colorPrimary": "#f16667", "colorInfo": "#f16667", "colorBgBase": "#ffffff" }
        }} >
        <Modal closeIcon={false} centered={true} open={isModalOpen} footer={null} className='verify-container m-3'>
          <div className='w-full'>
            <div className='w-full relative bg-white flex flex-col justify-between items-center text-primary-dark-3 px-[23px]'>
              <Image src={CloseIcon} alt='colse' width={20} height={20} onClick={() => { setIsModalOpen(false) }} className='cursor-pointer absolute right-[22px] top-[22px]' />
              <div className='flex justify-center mt-10 w-full'>
                <Image src={verification_logo} alt='' width={240} height={137} className='pointer-events-none' />
              </div>
              <div className='mt-2 text-[18px] font-normal leading-[23px] text-center max-w-[360px]'>
                We need some information to help us confirm your identity
              </div>
              <div className='flex justify-center mt-10 w-full'>
                <Image src={begin_verification_image} alt='' height={160} width={261} className='pointer-events-none' />
              </div>
              <div className='mt-10 text-[15px] font-normal leading-[20px] text-center'>
                By clicking the button below, you consent to Persona, our vendor, collecting, using, and utilizing their service providers to process your biometric information to verify your identity, identify fraud, and improve Persona’s platform in accordance with its Privacy Policy. Your biometric information will be stored for no more than 3 years.
              </div>
              <button className='mt-7 mb-10 bg-tinder rounded-[5px] h-[56px] text-white text-[18px] font-semibold leading-[20px] w-full'>
                BEGIN VERIFYING
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>

    </>
  )
}

export default VerificationModal