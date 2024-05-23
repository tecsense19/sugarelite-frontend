import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"
import bannerImg from "../../public/assets/In love-bro 1.svg";
import Link from "next/link";
import { decrypt_user } from "@/app/lib/actions";
import { useStore } from "@/store/store";

const Banner = ({ user, allStrings }) => {
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
            {allStrings["string_create_a_free_sugar_date_profile_now!"]}
          </div>
          <div className="mt-[10px] text-[clamp(22px,6vw,30px)] font-[500] text-center lg:hidden block" style={{ lineHeight: "clamp(22px,6vw,30px)" }}>
            {allStrings["string_create_a_free_sugar_date_profile_now!"]}
          </div>
          <div className="mt-[10px] text-white/50 text-[21px] font-[500] tracking-[-0.22px] hidden lg:block" style={{ lineHeight: "35px" }}>
            {allStrings["string_in_publishing_and_graphic_design,_lorem_ipsum_is_a_placeholder_demonstrate_the_visual_form_of_a_document_or_a_typeface_without_relying"]}
          </div>
          <div className="mt-[20px] text-center text-white/50 text-[clamp(17px,4.61539vw,20px)] font-[400] tracking-[-0.18px] lg:hidden block" style={{ lineHeight: "clamp(20px,6vw,28px)" }}>
            {allStrings["string_in_publishing_and_graphic_design,_lorem_ipsum_is_a_placeholder_demonstrate_the_visual_form_of_a_document_or_a_typeface_without_relying"]}
          </div>
          <div className="mt-[30px] lg:mt-[40px] flex justify-center lg:justify-start items-center w-full sm:w-8/12 lg:w-auto">
            <Link href={client_routes.register} className="rounded-[5px] max-w-[244px] w-10/12 lg:w-5/12 py-3 lg:py-4 text-[clamp(14px,4vw,17px)] lg:text-[20px] font-[600] bg-secondary me-[20px] transition-all ease-linear duration-75 hover:scale-105 flex justify-center items-center uppercase" style={{ lineHeight: "normal" }}>
              {allStrings["string_create_profile"]}
            </Link>
            {
              user ?
                <button className="rounded-[5px] max-w-[244px] w-10/12 lg:w-5/12 py-3 lg:py-4 text-[clamp(14px,4vw,17px)] lg:text-[20px] font-[600] bg-neutral lg:border lg:border-white/30 transition-all ease-linear duration-75 hover:scale-105 flex justify-center items-center uppercase" style={{ lineHeight: "normal" }} onClick={handleReadMoreClick}>
                  {allStrings["string_read_more"]}
                </button> :
                <Link href={client_routes.login} prefetch className="rounded-[5px] max-w-[244px] w-10/12 lg:w-5/12 py-3 lg:py-4 text-[clamp(14px,4vw,17px)] lg:text-[20px] font-[600] bg-neutral lg:border lg:border-white/30 transition-all ease-linear duration-75 hover:scale-105 flex justify-center items-center uppercase" style={{ lineHeight: "normal" }} >
                  {allStrings["string_login"]}
                </Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner