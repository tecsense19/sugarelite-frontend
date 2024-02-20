"use client"
import Cards from "@/components/search/Cards"
import Filters from "@/components/search/Filters"
import Image from "next/image"
import chevron_down from "/public/assets/arrow_left.svg"
import settingsIcon from "/public/assets/settings_icon.svg";

const Search = () => {

  return (
    <div className="font-bold h-dvh pt-0 md:pt-[66px] flex flex-col md:flex-row">
      <div className="md:hidden text-white p-4 flex justify-between items-center my-2 ">
        <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={24} height={24} priority className=' pointer-events-none' />
        <span className="text-[24px] font-semibold leading-[22.8px]">Results</span>
        <button >
          <Image src={settingsIcon} alt='down_arrow' width={20} height={20} priority className='text-white pointer-events-none' />
        </button>
      </div>
      <Filters />
      <Cards />
    </div>
  )
}

export default Search