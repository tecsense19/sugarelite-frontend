"use client"

import { useEffect } from 'react';
const SwipeFilter = () => {

  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
  }, [])

  return (
    // Filter Section
    <div className="bg-primary-dark-3 h-full max-h-full overflow-y-auto hidden md:block md:w-[300px] lg:w-[400px] py-10 px-[30px] text-white filter-container" style={{ scrollbarWidth: "none" }} data-aos="fade-right" data-aos-duration="800">
      <button className="bg-secondary w-full flex items-center justify-center h-[56px] text-white/80 text-[16px] font-semibold rounded-[5px] leading-[normal]">
        START MATCHING
      </button>
      <button className="bg-black mt-5 w-full flex items-center justify-center h-[56px] text-white/80 text-[16px] font-semibold rounded-[5px] leading-[normal]">
        MESSAGES
      </button>
    </div >
  )
}

export default SwipeFilter