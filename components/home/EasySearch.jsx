import Image from "next/image";
import warningIcon from "../../public/assets/warningIcon.svg";
import easySearchDesktopImg from "../../public/assets/easy_search_desktop.png";
import easySearchMobileImg from "../../public/assets/easy_search_mobile.svg";
import { useRouter } from "next/navigation";
import { client_routes } from "@/app/lib/helpers";
import Link from "next/link";

const EasySearch = ({ allStrings }) => {
  const router = useRouter();

  return (
    <div className="mt-[140px] lg:mt-[200px] 2xl:mt-[320px] px-4 lg:px-0 flex justify-center items-center lg:block">
      <div className="block lg:flex lg:flex-row-reverse justify-between items-center bg-primary-dark-2 pt-[100px] pb-[35px] px-4 lg:px-0 lg:py-[90px] rounded-[5px] lg:rounded-[0px] w-full sm:w-9/12 lg:w-full" data-aos="fade-right" data-aos-offset="100" data-aos-duration="500">
        <div className="w-full lg:w-6/12 relative h-full flex items-center justify-center lg:justify-center" data-aos="fade-left" data-aos-offset="100" data-aos-duration="500" data-aos-delay="10">
          <Image src={easySearchDesktopImg} unoptimized alt="" width={1000} height={1000} priority className="hidden lg:block absolute pointer-events-none select-none w-11/12 lg:max-w-[878px]" />
          <Image src={easySearchMobileImg} alt="" width={1000} height={1000} priority className="block lg:hidden absolute pointer-events-none select-none w-[240px] mb-10 -translate-y-[50%]" />
        </div>
        <div className="w-full lg:w-6/12 lg:flex flex-col items-end ">
          <div className="flex justify-center lg:justify-end w-full">
            <div className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] lg:w-[75px] lg:h-[75px] bg-secondary rounded-full flex justify-center items-center">
              <Image src={warningIcon} alt="" height={27} width={27} priority className="pointer-events-none select-none block sm:hidden" />
              <Image src={warningIcon} alt="" height={35} width={35} priority className="pointer-events-none select-none sm:block hidden lg:hidden" />
              <Image src={warningIcon} alt="" height={40} width={40} priority className="pointer-events-none select-none hidden lg:block" />
            </div>
          </div>
          <div className="text-[clamp(21px,5vw,25px)] lg:text-[clamp(32px,5vw,38px)] mt-4 lg:mt-5 font-semibold lg:font-extrabold text-center lg:text-end lg:max-w-[80%] -tracking-[1px] leading-[normal]">
            {allStrings["string_easily_search_for_new_acquaintances"]}
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="text-[16px] mt-3 font-light leading-7 w-11/12 text-end hidden lg:block">
              {allStrings["string_easily_search_for_new_acquaintances_long_description"]}
            </div>
            <div className="text-[16px] mt-4 font-light leading-6 w-10/12 text-center block lg:hidden">
              {allStrings["string_easily_search_for_new_acquaintances_short_description"]}
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <Link href={client_routes.register} className="mt-[36px] rounded-[5px] bg-secondary h-[48px] px-[30px] text-[18px] font-bold tracking-[-0.18px] hidden lg:inline-flex justify-center items-center transition-all ease-linear duration-75 hover:scale-105">
              {allStrings["string_create_profile"]}
            </Link>
          </div>
          <div className="lg:hidden w-full flex justify-center">
            <Link href={client_routes.register} className="mt-[38px] rounded-sm bg-secondary h-[42px] px-[18px] text-[16px] font-bold inline-flex justify-center items-center">
              {allStrings["string_create_profile"]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EasySearch