import Image from 'next/image'
import React from 'react'
import premium from "/public/assets/premium.svg"

const ChatProfile = ({ selectedObj }) => {
  return (
    <div className='w-[400px] h-full flex flex-col bg-primary 2xl:bg-primary-dark-3 pt-[50px] px-[30px] text-white'>
      <div className="w-full flex justify-start items-center flex-col h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="flex justify-center items-center relative">
          <Image src={selectedObj.img_url.src} width={180} height={180} alt="person" className={`rounded-full select-none pointer-events-none`} priority />
        </div>
        <div className="flex flex-col text-center mt-[30px]" data-aos='zoom-in'>
          <div className='flex items-center'>
            <span className="text-[26px] font-bold leading-[30px]">{selectedObj.name}, {selectedObj.age}</span>
            {selectedObj.is_premium && <>
              <Image src={premium} alt='premium' width={30} height={30} priority className='pointer-events-none ms-4' />
              <span className='text-[16px] font-semibold leading-[normal] text-white/80 ms-2'>Premium</span>
            </>}
          </div>
          <div className='mt-[11px] flex items-center'>
            <span className="text-[18px] font-semibold text-white/80 me-[14px] leading-[normal]">LIVING IN</span>
            <span className="text-[16px] font-semibold text-white/80 leading-[normal]">Ask me, Del Valle</span>
          </div>
        </div>

        <div className="w-full mt-[30px]" data-aos='zoom-in'>
          <div className="bg-primary-dark-4 rounded-t-[5px] px-4 pt-4 pb-10 text-[16px] font-light leading-[24px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, cumque quas. Sint reiciendis commodi libero, sequi ipsam nam sed iusto odio perferendis voluptates eveniet ducimus nostrum quidem est. Voluptatum, voluptatibus?
          </div>
          <div className="bg-primary-dark-3 2xl:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
            <p className="text-[18px] font-medium leading-[normal] text-white/80">Biography</p>
            <p className="mt-[7px] text-[12px] font-medium leading-[normal] text-white/80">No Cinema</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatProfile