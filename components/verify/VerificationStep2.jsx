import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import verification_left_arrow from '/public/assets/verification_left_arrow.svg';
import CloseIcon from '/public/assets/gray_cross_icon.svg';
// import verify_driver_license from '/public/assets/verify_driver_license.svg';
// import verify_state from '/public/assets/verify_state.svg';
// import verify_passport from '/public/assets/verify_passport.svg';
// import verify_permanent_residence from '/public/assets/verify_permanent_residence.svg';
// import verify_work_permit from '/public/assets/verify_work_permit.svg';
import { verificationCards } from '@/app/lib/identityVerificationCards';

const VerificationStep2 = ({ user, nextStepHandler, backStepHandler, closeModal, selectedIdentity, setSelectedIdentity, allStrings }) => {
  const [countries, setcountries] = useState(verificationCards)
  const [options, setOptions] = useState([]);
  // console.log(user);

  useEffect(() => {
    if (user.country) {
      let tempOptions = [];
      for (let country of verificationCards) {
        if (country.name === user.country) {
          tempOptions = country.cards;
          break;
        }
      }
      if (tempOptions.length === 0) {
        tempOptions = verificationCards[0].cards;
      }
      setOptions(tempOptions)
    }
  }, [])

  const handleIdentitySelection = (name) => {
    setSelectedIdentity(name);
    nextStepHandler();
  }

  return (
    <>
      <div className='px-5 pt-5'>
        <div className='w-full flex justify-between items-center'>
          <button onClick={backStepHandler}>
            <Image src={verification_left_arrow} alt='' height={20} width={20} className='pointer-events-none' />
          </button>
          <button onClick={closeModal}>
            <Image src={CloseIcon} alt='' height={20} width={20} className='pointer-events-none' />
          </button>
        </div>
        {options.length
          ? <>
            <div className='mt-4 md:mt-6 text-start text-black text-[20px] font-bold leading-[30px]'>
              {allStrings["string_upload_a_photo_id"]}
            </div>
            <div className='mt-4 md:mt-6 text-start text-primary-dark-3 text-[16px] font-normal leading-[25px]'>
              {allStrings["string_we_require_a_photo_of_a_government_id_to_verify_your_identity."]}
            </div>
            <div className='mt-4 md:mt-6 text-start text-primary-dark-3 text-[16px] font-normal leading-[25px]'>
              {allStrings["string_choose_1_of_the_following_options"]}
            </div>
          </>
          : <>
            <div className='mt-4 md:mt-6 text-start text-black text-[20px] font-bold leading-[30px]'>
              {allStrings["string_unable_to_verify"]}
            </div>
            <div className='mt-4 md:mt-6 text-start text-primary-dark-3 text-[16px] font-normal leading-[25px]'>
              {allStrings["string_we_are_unable_to_verify_identities_in_your_country."]}
            </div>
          </>
        }
      </div>
      <div className='w-full flex flex-col mt-2 mb-[10px]'>
        {options.map((obj, inx) => (
          <button key={inx} className='flex py-[13px] px-[22px] justify-between items-center bg-[#F4F4F4] border-t border-t-[#C7C7C7]' onClick={() => handleIdentitySelection(obj.name)}>
            <div className='flex gap-x-[10px] items-center'>
              <div className='bg-tinder rounded-full h-10 w-10 flex justify-center items-center'>
                <Image src={obj.image} alt='' height={20} width={20} className='pointer-events-none' />
              </div>
              <div className='text-black text-[16px] font-normal leading-[25px] text-start'>{obj.name}</div>
            </div>
            <div>
              <Image src={verification_left_arrow} alt='' height={20} width={20} className='pointer-events-none rotate-180' />
            </div>
          </button>
        ))}
      </div>
    </>
  )
}

export default VerificationStep2