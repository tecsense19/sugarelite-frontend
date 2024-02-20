import MainContent from "@/components/profile/searched_Profile/MainContent"
import SideContent from "@/components/profile/searched_Profile/SideContent"
import ReportIcon from "/public/assets/chat_report_icon.svg"
import BlockIcon from "/public/assets/chat_block_icon.svg"
import Image from "next/image"
import PopOver from "@/components/profile/commons/PopOver"
import more_horizontal from "../../../../public/assets/more_horizontal.svg"


const ProfileId = ({ params }) => {
  return (
    <>
      <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full relative">
        <SideContent params={params} />
        <MainContent params={params} />

        {/* report and block functionality */}

        {/* 2xl size */}
        <div className="absolute hidden 2xl:block  2xl:w-[169px] 2xl:max-w-[169px] right-[2%] 2xl:right-[4%] top-[108px] ">
          <button className="w-full h-[38px] 2xl:h-[42px] bg-[#D97706] rounded-[5px] mb-2 2xl:mb-4 flex justify-start items-center px-[19px]">
            <Image src={ReportIcon} alt="report" width={18} height={18} />
            <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">RAPPORTER</span>
          </button>
          <button className="w-full h-[38px] 2xl:h-[42px] bg-[#EF4444] rounded-[5px] flex justify-start items-center px-[19px]">
            <Image src={BlockIcon} alt="block" width={18} height={18} />
            <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">BLOCKER</span>
          </button>
        </div>

        {/* Medium screen */}


      </main>
    </>
  )
}

export default ProfileId