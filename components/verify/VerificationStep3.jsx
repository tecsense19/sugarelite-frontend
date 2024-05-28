import React from 'react'
import Image from 'next/image';
import CloseIcon from '/public/assets/gray_cross_icon.svg';
import verification_left_arrow from '/public/assets/verification_left_arrow.svg';
import verification_upload_card from '/public/assets/verification_upload_card.svg';

const VerificationStep3 = ({ nextStepHandler, backStepHandler, closeModal, selectedIdentity, handleChange, allStrings }) => {
  return (
    <div className='px-5 py-5'>
      <div className='w-full flex justify-between items-center'>
        <button onClick={backStepHandler}>
          <Image src={verification_left_arrow} alt='' height={20} width={20} className='pointer-events-none' />
        </button>
        <button onClick={closeModal}>
          <Image src={CloseIcon} alt='' height={20} width={20} className='pointer-events-none' />
        </button>
      </div>
      {selectedIdentity
        ? <>
          <div className='mt-4 md:mt-4 text-start text-black text-[20px] font-bold leading-[30px]'>
            {selectedIdentity}
          </div>
          <div className='mt-4 md:mt-4 text-start text-primary-dark-3 text-[16px] font-normal leading-[25px]'>
            {`${allStrings["string_take_a_clear_photo_of_the_front_of_your"]} ${selectedIdentity}.`}
          </div>
          <div className='w-full rounded-[5px] flex justify-center items-center h-[200px] mt-5 bg-secondary/30'>
            <Image src={verification_upload_card} alt='' width={127} height={83} className='pointer-events-none' />
          </div>
          <input type="file" id='uploadImg' className='hidden' accept='.png, .svg, .jpg, .jpeg' onChange={handleChange} />
          <label className='cursor-pointer w-full' htmlFor='uploadImg'>
            <div className='mt-5 md:mt-7 mb-2 bg-tinder rounded-[5px] h-10 md:h-[56px] text-white flex justify-center items-center text-[18px] font-semibold leading-[20px] w-full uppercase'>
              {allStrings["string_upload_photo"]}
            </div>
          </label>
        </>
        : <></>
      }
    </div>
  )
}

export default VerificationStep3