import Image from "next/image"
import Img1 from "../../public/assets/hug.svg"
// import Img2 from "../../public/assets/online-dating.svg"
// import Img3 from "../../public/assets/champagne.svg genuine-profiles.svg"
import Img2 from "../../public/assets/focus-on-privacy-and-discretion.svg"
import Img3 from "../../public/assets/online-dating.svg"
import Img4 from "../../public/assets/date.svg"
import Img5 from "../../public/assets/search (1).svg"
import Img6 from "../../public/assets/green_check_mark.svg"

const NewServices = ({ allStrings }) => {
    const servicesArr = [
        { id: 1, imgUrl: Img1, title: allStrings["string_sugar_dating"], description: allStrings["string_sugar_dating_description"] },
        { id: 2, imgUrl: Img4, title: allStrings["string_the_concept"], description: allStrings["string_the_concept_description"] },
        { id: 3, imgUrl: Img2, title: allStrings["string_start_your_journey_here"], description: allStrings["string_start_your_journey_here_description"] },
        { id: 4, imgUrl: Img6, title: allStrings["string_successful_dating_online"], description: allStrings["string_succesful_dating_online_description"] },
        { id: 5, imgUrl: Img5, title: allStrings["string_the_start_of_your_journey"], description: allStrings["string_the_start_of_your_journey_description"] },
        { id: 6, imgUrl: Img3, title: allStrings["string_dating_experience"], description: allStrings["string_dating_experience_description"] }
    ]
    return (
        <div id="services_container" className="w-full flex justify-center">
            <div className="my-[50px] lg:my-[100px] w-full sm:w-8/12 grid gap-y-4 sm:gap-y-[25px] gap-x-[30px] columns-2 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                {servicesArr?.map((item, idx) => {
                    return (
                        <div key={idx} className="bg-tinder mx-4 sm:m-0 rounded-[5px] px-4 py-10 sm:py-7 sm:px-8 flex flex-col items-center justify-center sm:block text-white">
                            <div className="flex items-center">
                                {/* <div className="bg-secondary rounded-full h-10 w-10 sm:h-[63px] sm:w-[63px]"></div> */}
                                <Image src={item.imgUrl} alt="" height={45} width={45} priority className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] pointer-events-none select-none" />
                            </div>
                            <div className="mt-5 text-[20px] font-bold tracking-[-0.2px] text-center sm:text-start" style={{ lineHeight: "normal" }}>{item.title}</div>
                            <div className="mt-3 text-[16px] font-normal text-center sm:text-start" style={{ lineHeight: "28px" }}>{item.description}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewServices