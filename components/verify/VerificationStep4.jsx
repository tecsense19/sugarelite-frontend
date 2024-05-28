import React from 'react'
import Image from 'next/image';
import CloseIcon from '/public/assets/gray_cross_icon.svg';
import verification_left_arrow from '/public/assets/verification_left_arrow.svg';

const VerificationStep4 = ({ backStepHandler, closeModal, uploadedPhoto, handleSubmit, isLoading, allStrings }) => {
  return (
    <div className='px-5 py-5'>
      <div className='w-full flex justify-between items-center'>
        <button onClick={backStepHandler} className={`${isLoading ? "pointer-events-none" : ""}`}>
          <Image src={verification_left_arrow} alt='' height={20} width={20} className='pointer-events-none' />
        </button>
        <button onClick={closeModal} className={`${isLoading ? "pointer-events-none" : ""}`}>
          <Image src={CloseIcon} alt='' height={20} width={20} className='pointer-events-none' />
        </button>
      </div>
      {uploadedPhoto.photo_url
        ? <>
          <div className='mt-3 text-start text-black text-[20px] font-bold leading-[30px]'>
            {allStrings["string_check_your_photo"]}
          </div>
          <div className='mt-3 text-start text-primary-dark-3 text-[16px] font-normal leading-[25px]'>
            {allStrings["string_make_sure_lighting_is_good_and_any_lettering_is_clear_before_continuing."]}
          </div>
          <div className='flex justify-center items-center'>
            <Image src={uploadedPhoto.photo_url} alt='' height={500} width={500} className='object-contain object-center w-full max-w-[350px] aspect-square pointer-events-none mt-5' />
          </div>
          <div className='mt-7 flex flex-col gap-y-[15px]'>
            <button className={`w-full rounded-[5px] bg-tinder text-white h-10 md:h-[56px] text-[18px] font-semibold leading-[20px] ${isLoading ? "pointer-events-none" : ""}`} onClick={handleSubmit}>
              {isLoading
                ? <div className='loader'></div>
                : allStrings["string_use_this_photo"]
              }
            </button>
            <button className={`w-full rounded-[5px] border-secondary border-[2px] text-secondary h-10 md:h-[56px] text-[18px] font-semibold leading-[20px] uppercase ${isLoading ? "pointer-events-none" : ""}`} onClick={backStepHandler}>
              {allStrings["string_retake_photo"]}
            </button>
          </div>
        </>
        : <></>
      }
    </div>
  )
}

export default VerificationStep4