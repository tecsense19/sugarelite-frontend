import Image from "next/image"
import Img1 from "../../public/assets/hug.svg"
import Img2 from "../../public/assets/online-dating.svg"
import Img3 from "../../public/assets/champagne.svg"
import Img4 from "../../public/assets/date.svg"
import Img5 from "../../public/assets/search (1).svg"
import Img6 from "../../public/assets/green_check_mark.svg"
// import Img6 from "../../public/assets/profile.svg"

const Services = ({ allStrings }) => {
  const servicesArr = [
    { id: 1, imgUrl: Img1, title: allStrings["string_sugar_dating"], description: allStrings["string_sugar_dating_description"] },
    { id: 2, imgUrl: Img2, title: allStrings["string_start_your_journey_here"], description: allStrings["string_start_your_journey_here_description"] },
    { id: 3, imgUrl: Img3, title: allStrings["string_successful_dating_online"], description: allStrings["string_succesful_dating_online_description"] },
    { id: 4, imgUrl: Img4, title: allStrings["string_the_concept"], description: allStrings["string_the_concept_description"] },
    { id: 5, imgUrl: Img5, title: allStrings["string_the_start_of_your_journey"], description: allStrings["string_the_start_of_your_journey_description"] },
    { id: 6, imgUrl: Img6, title: allStrings["string_dating_experience"], description: allStrings["string_dating_experience_description"] }
  ]
  return (
    <div id="services_container" className="w-full flex justify-center">
      <div className="mt-[50px] lg:mt-[150px] w-full sm:w-8/12 grid gap-y-[16px] sm:gap-y-[25px] gap-x-[30px] columns-2 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {servicesArr?.map((item, idx) => {
          return (
            <div key={idx} className="bg-primary-dark-2 mx-4 sm:m-0 rounded-[5px] p-8 flex flex-col items-center justify-center sm:block" data-aos="flip-right" data-aos-offset="100" data-aos-duration="500">
              <div className="relative group flex items-center me-[50px] sm:me-0 left-[34px]">
                <div className="bg-secondary rounded-full h-10 w-10 sm:h-[63px] sm:w-[63px]"></div>
                <Image src={item.imgUrl} alt="" height={45} width={45} priority className="absolute h-[35px] w-[35px] sm:h-[45px] sm:w-[45px] -translate-x-[18px] sm:-translate-x-[22px] pointer-events-none select-none" />
              </div>
              <div className="mt-5 sm:mt-[28px] text-[20px] font-[500] tracking-[-0.2px] text-center sm:text-start" style={{ lineHeight: "normal" }}>{item.title}</div>
              <div className="mt-3 sm:mt-1 text-[16px] font-[300] text-center sm:text-start" style={{ lineHeight: "28px" }}>{item.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Services