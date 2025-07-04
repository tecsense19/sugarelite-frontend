import Image from "next/image";
import workingHomeDesktopImg from "../../public/assets/working_home_desktop.svg";
import workingHomeMobileImg from "../../public/assets/working_home_mobile.svg";
import addUserIcon from "../../public/assets/add_user.svg";
import premiumIcon from "../../public/assets/premium_icon.svg";
import knowSiteIcon from "../../public/assets/know_site.svg";
import heartIcon from "../../public/assets/heart_icon.svg";

const Working = ({ allStrings }) => {
  return (
    <div className="mt-[50px] mb-[50px] md:mb-[120px] lg:mt-[120px] w-full flex justify-center px-4 sm:px-0">
      <div className="w-full sm:w-9/12 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center" data-aos="fade-in" data-aos-duration="500">
          <div className="text-[clamp(26px,5vw,60px)] font-extrabold leading-[normal] -tracking-[0.5px] lg:-tracking-[1px] text-center">
            {allStrings["string_how_does_it_work?"]}
          </div>
          <div className="text-[16px] font-light leading-6 lg:leading-7 w-full sm:w-10/12 2xl:w-6/12 mt-3 px-2 sm:px-0 text-center">
            {allStrings["string_working_description"]}
          </div>
        </div>
        <div className="mt-10 2xl:mt-[100px] w-full justify-center items-center grid grid-cols-1 lg:grid-cols-2 gap-x-[65px] gap-y-[22px]">
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center" data-aos="flip-right" data-aos-duration="500" style={{ height: "-webkit-fill-available" }}>
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={addUserIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center">
              {allStrings["string_create_profile"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center max-w-md">
              {allStrings["string_create_profile_description"]}
            </div>
          </div>
          {/* <div className="row-start-1 2xl:col-span-1 lg:col-span-2 2xl:row-span-2 flex justify-center items-center" data-aos="fade-in" data-aos-duration="800">
            <Image src={workingHomeDesktopImg} alt="" height={1000} width={1000} className="sm:w-8/12 lg:w-6/12 2xl:w-full hidden sm:block pointer-events-none" />
            <Image src={workingHomeMobileImg} alt="" height={1000} width={1000} className="w-10/12 sm:hidden pointer-events-none" />
          </div> */}
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center" data-aos="flip-left" data-aos-duration="500" style={{ height: "-webkit-fill-available" }}>
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={premiumIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center">
              {allStrings["string_confirm_your_email"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center max-w-md">
              {allStrings["string_confirm_your_email_description"]}
            </div>
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center" data-aos="flip-right" data-aos-duration="500" style={{ height: "-webkit-fill-available" }}>
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={knowSiteIcon} alt="" height={40} width={40} className="h-[27px] mt-[6px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center">
              {allStrings["string_get_to_know_the_site"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center max-w-md">
              {allStrings["string_get_to_know_the_site_description"]}
            </div>
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center" data-aos="flip-left" data-aos-duration="500" style={{ height: "-webkit-fill-available" }}>
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={heartIcon} alt="" height={40} width={40} className="h-[27px] mt-[6px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center">
              {allStrings["string_sugardate"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center max-w-md">
              {allStrings["string_sugardate_description"]}
            </div>
          </div>
        </div>
        {/* <div className="mt-10 2xl:mt-[100px] w-full justify-center items-center grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-[65px] gap-y-[22px]">
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-start" data-aos="flip-right" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={addUserIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-start">
              {allStrings["string_create_profile"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-start">
              {allStrings["string_create_profile_description"]}
            </div>
          </div>
          <div className="row-start-1 2xl:col-span-1 lg:col-span-2 2xl:row-span-2 flex justify-center items-center" data-aos="fade-in" data-aos-duration="800">
            <Image src={workingHomeDesktopImg} alt="" height={1000} width={1000} className="sm:w-8/12 lg:w-6/12 2xl:w-full hidden sm:block pointer-events-none" />
            <Image src={workingHomeMobileImg} alt="" height={1000} width={1000} className="w-10/12 sm:hidden pointer-events-none" />
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-end" data-aos="flip-left" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={premiumIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-end">
              {allStrings["string_confirm_your_email"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-end">
              {allStrings["string_confirm_your_email_description"]}
            </div>
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-start" data-aos="flip-right" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={knowSiteIcon} alt="" height={40} width={40} className="h-[27px] mt-[6px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-start">
              {allStrings["string_get_to_know_the_site"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-start">
              {allStrings["string_get_to_know_the_site_description"]}
            </div>
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-end" data-aos="flip-left" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={heartIcon} alt="" height={40} width={40} className="h-[27px] mt-[6px] w-[27px] lg:h-[40px] lg:w-[40px] select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-end">
              {allStrings["string_sugardate"]}
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-end">
              {allStrings["string_sugardate_description"]}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Working