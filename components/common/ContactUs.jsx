import React from 'react'
import mailIcon from "/public/assets/contact_mail.svg"
import locationIcon from "/public/assets/contact_mail.svg"
import Image from 'next/image'

const ContactUs = () => {
  const boxes = [
    {
      name: "Email",
      desc: "supports@elitesugar.com",
      image: mailIcon
    },
    {
      name: "Press & media",
      desc: "press@elitesugar.com",
      image: mailIcon
    },
    {
      name: "Address",
      desc: "Disp I/S Maglebjergvej 6 2800 CVR : 433433912",
      image: locationIcon
    }
  ]
  return (
    <div className='pt-10 flex flex-col items-center w-full'>
      <div className="font-bold text-[30px] leading-[40px]">Contact Us</div>
      <div className='mt-[100px] flex justify-between w-[61%]'>
        {boxes.map((obj, inx) => (
          <div key={inx} className='flex flex-col gap-y-5 items-center w-[230px]'>
            <div className='rounded-full bg-tinder flex justify-center items-center h-[100px] w-[100px]'>
              <Image src={obj.image} alt={obj.name} width={40} height={40} />
            </div>
            <div className='flex flex-col items-center gap-y-[5px]'>
              <div className='text-center text-[20px] font-semibold leading-[normal]'>{obj.name}</div>
              <div className='text-center text-white/90 text-[16px] font-normal leading-[25px]'>{obj.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-[75px] border w-[49.3%]'>
        <div className='text-[30px] font-semibold leading-[30px]'>Send us a message</div>
        <div className='mt-7'>
          <div className='text-[16px] font-normal leading-[normal]'>Email(cannot Be Changed)</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs