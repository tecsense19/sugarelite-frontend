import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"
import bannerImg from "../../public/assets/In love-bro 1.svg";
import Link from "next/link";

const Banner = () => {
  const router = useRouter();

  const handleReadMoreClick = () => {
    const targetElement = document.getElementById("services_container")
    if (targetElement) {
      const elementOffsetTop = targetElement.getBoundingClientRect().top;
      window.scrollTo({ top: elementOffsetTop, left: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full px-4 sm:w-11/12 xl:w-9/12 lg:flex lg:flex-row-reverse justify-between items-center mt-5 lg:mt-[65px]">
        <div className="w-full flex justify-center items-center lg:block lg:w-5/12" data-aos="fade-left" data-aos-anchor="#example-anchor" data-aos-duration="800">
          <Image src={bannerImg} alt="" width={1000} height={1000} priority className="pointer-events-none lg:w-full md:w-8/12 sm:9/12 w-11/12" />
        </div>
        <div className="w-full flex flex-col items-center mt-[30px] lg:block lg:w-6/12 lg:mt-0" data-aos="fade-right" data-aos-anchor="#example-anchor" data-aos-duration="800">
          <div className="flex items-center">
            <span className="text-[70px] italic font-[650] lg:me-3 hidden lg:block" style={{ lineHeight: "70px" }}>ELITE </span>
            <span className="text-[clamp(30px,9vw,50px)] italic font-[750] me-[10px] lg:hidden block" style={{ lineHeight: "clamp(30px,9vw,50px)" }}>ELITE</span>

            <span className="text-[70px] font-[350] hidden lg:block" style={{ lineHeight: "70px" }}>SUGAR </span>
            <span className="text-[clamp(30px,9vw,50px)] font-[350] lg:hidden block" style={{ lineHeight: "clamp(30px,9vw,50px)" }}> SUGAR</span>
          </div>
          <div className="mt-[15px] text-[40px] font-[500] tracking-[-0.4px] hidden lg:block" style={{ lineHeight: "normal" }}>
            Create a free sugar Date profile now!
          </div>
          <div className="mt-[10px] text-[clamp(22px,6vw,30px)] font-[500] text-center lg:hidden block" style={{ lineHeight: "clamp(22px,6vw,30px)" }}>
            Create a free sugar Date profile now!
          </div>
          <div className="mt-[10px] text-white/50 text-[21px] font-[500] tracking-[-0.22px] hidden lg:block" style={{ lineHeight: "35px" }}>
            In publishing and graphic design, Lorem ipsum is a placeholder demonstrate the visual form of a document or a typeface without relying
          </div>
          <div className="mt-[20px] text-center text-white/50 text-[clamp(17px,4.61539vw,20px)] font-[400] tracking-[-0.18px] lg:hidden block" style={{ lineHeight: "clamp(20px,6vw,28px)" }}>
            In publishing and graphic design, Lorem ipsum is a placeholder demonstrate the visual form of a document or a typeface without relying
          </div>
          <div className="mt-[30px] lg:mt-[40px] flex justify-center lg:justify-start items-center w-full sm:w-8/12 lg:w-auto">
            <Link href={client_routes.register} className="rounded-[5px] max-w-[244px] w-10/12 lg:w-5/12 py-3 lg:py-4 text-[clamp(14px,4vw,17px)] lg:text-[20px] font-[500] lg:font-[600] tracking-[-0.2px] bg-secondary me-[20px] transition-all ease-linear duration-75 hover:scale-105 flex justify-center items-center" style={{ lineHeight: "normal" }}>
              CREATE PROFILE
            </Link>
            <button className="rounded-[5px] max-w-[244px] w-10/12 lg:w-5/12 py-3 lg:py-4 text-[clamp(14px,4vw,17px)] lg:text-[20px] font-[500] lg:font-[600] tracking-[-0.2px] bg-neutral lg:border lg:border-white/30 transition-all ease-linear duration-75 hover:scale-105 flex justify-center items-center" style={{ lineHeight: "normal" }} onClick={handleReadMoreClick}>
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner