import Image from "next/image";
import workingHomeDesktopImg from "../../public/assets/working_home_desktop.svg";
import workingHomeMobileImg from "../../public/assets/working_home_mobile.svg";
import addUserIcon from "../../public/assets/add_user.svg";
import premiumIcon from "../../public/assets/premium_icon.svg";
import knowSiteIcon from "../../public/assets/know_site.svg";
import heartIcon from "../../public/assets/heart_icon.svg";

const Working = () => {
  return (
    <div className="mt-[50px] lg:mt-[120px] w-full flex justify-center px-4 sm:px-0">
      <div className="w-full sm:w-8/12 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center" data-aos="fade-in" data-aos-duration="500">
          <div className="text-[clamp(26px,5vw,60px)] font-extrabold leading-[normal] -tracking-[0.5px] lg:-tracking-[1px] text-center">
            How does it work?
          </div>
          <div className="text-[16px] font-light leading-6 lg:leading-7 w-full sm:w-10/12 2xl:w-6/12 mt-3 px-2 sm:px-0 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum.
          </div>
        </div>
        <div className="mt-10 2xl:mt-[100px] w-full justify-center items-center grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-[65px] gap-y-[22px]">
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-start" data-aos="flip-right" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={addUserIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-auto lg:w-auto select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-start">Create a profile</div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum.
            </div>
          </div>
          <div className="row-start-1 2xl:col-span-1 lg:col-span-2 2xl:row-span-2 flex justify-center items-center" data-aos="fade-in" data-aos-duration="800">
            <Image src={workingHomeDesktopImg} alt="" height={1000} width={1000} className="sm:w-8/12 lg:w-6/12 2xl:w-full hidden sm:block" />
            <Image src={workingHomeMobileImg} alt="" height={1000} width={1000} className="w-10/12 sm:hidden" />
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-end" data-aos="flip-left" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={premiumIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-auto lg:w-auto select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-end">
              Confirm your email
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-end">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum.
            </div>
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-start" data-aos="flip-right" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={knowSiteIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-auto lg:w-auto select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-start">
              Get to know the site
            </div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum.
            </div>
          </div>
          <div className="bg-primary-dark-2 px-3 py-10 sm:px-10 lg:py-[30px] rounded-[5px] flex flex-col items-center lg:items-end" data-aos="flip-left" data-aos-duration="500">
            <div className="h-[47px] w-[47px] lg:h-[75px] lg:w-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={heartIcon} alt="" height={40} width={40} className="h-[27px] w-[27px] lg:h-auto lg:w-auto select-none pointer-events-none" />
            </div>
            <div className="mt-5 text-[20px] lg:mt-7 lg:text-[24px] font-medium lg:font-bold leading-[normal] -tracking-[1px] text-center lg:text-end">Sugardate</div>
            <div className="mt-4 lg:mt-3 text-[16px] font-light leading-7 text-center lg:text-end">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet pellentesque ac mauris ultricies laoreet dictum.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Working