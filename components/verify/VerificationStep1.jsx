import React from 'react'
import Image from 'next/image';
import CloseIcon from '/public/assets/gray_cross_icon.svg'
import verification_logo from '/public/assets/verification_logo.svg'
import begin_verification_image from '/public/assets/begin_verification_image.svg'

const VerificationStep1 = ({ nextStepHandler, closeModal }) => {
  return (
    <>
      <div className='px-[23px] flex flex-col justify-between items-center relative'>
        <Image src={CloseIcon} alt='colse' width={20} height={20} onClick={closeModal} className='cursor-pointer absolute right-[22px] top-[22px]' />
        <div className='flex justify-center mt-8 md:mt-10 w-full'>
          <Image src={verification_logo} alt='' width={240} height={137} className='md:block hidden pointer-events-none' />
          <Image src={verification_logo} alt='' width={200} height={114} className='block md:hidden pointer-events-none' />
        </div>
        <div className='mt-2 text-[17px] md:text-[18px] font-normal leading-[20px] md:leading-[23px] text-center max-w-[360px]'>
          We need some information to help us confirm your Identity.
        </div>
        <div className='flex justify-center mt-7 md:mt-10 w-full'>
          <Image src={begin_verification_image} alt='' height={160} width={261} className='md:block hidden pointer-events-none' />
          <Image src={begin_verification_image} alt='' height={135} width={221} className='block md:hidden pointer-events-none' />
        </div>
        <div className='mt-7 md:mt-10 text-[14px] md:text-[15px] font-normal leading-[18px] md:leading-[20px] text-center'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium qui quidem, nam unde sed adipisci! Sapiente molestiae eum est quod ex. Molestiae suscipit praesentium dicta nulla eveniet commodi facere voluptatem.
        </div>
        <button className='mt-5 md:mt-7 mb-7 md:mb-10 bg-tinder rounded-[5px] h-10 md:h-[56px] text-white text-[18px] font-semibold leading-[20px] w-full' onClick={nextStepHandler}>
          BEGIN VERIFYING
        </button>
      </div>
    </>
  )
}

export default VerificationStep1