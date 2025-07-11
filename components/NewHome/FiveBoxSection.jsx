import Image from "next/image"
import Img1 from "../../public/assets/five-box-1.svg"
import Img2 from "../../public/assets/five-box-2.svg"
import Img3 from "../../public/assets/five-box-3.svg"
import Img4 from "../../public/assets/five-box-4.svg"
import Img5 from "../../public/assets/five-box-5.svg"

const FiveBoxSection = ({ allStrings }) => {
    // const servicesArr = [
    //     { id: 1, imgUrl: Img1, title: allStrings["string_sugar_dating"], description: allStrings["string_sugar_dating_description"] },
    //     { id: 2, imgUrl: Img2, title: allStrings["string_start_your_journey_here"], description: allStrings["string_start_your_journey_here_description"] },
    //     { id: 3, imgUrl: Img3, title: allStrings["string_successful_dating_online"], description: allStrings["string_succesful_dating_online_description"] },
    //     { id: 4, imgUrl: Img4, title: allStrings["string_the_concept"], description: allStrings["string_the_concept_description"] },
    //     { id: 5, imgUrl: Img5, title: allStrings["string_the_start_of_your_journey"], description: allStrings["string_the_start_of_your_journey_description"] }
    // ]
    const servicesArr = [
        { id: 1, imgUrl: Img1, title: allStrings["string_five_box_decription_1"] },
        { id: 2, imgUrl: Img2, title: allStrings["string_five_box_decription_2"] },
        { id: 3, imgUrl: Img3, title: allStrings["string_five_box_decription_3"] }
    ]
    const servicesArrnew = [
        { id: 4, imgUrl: Img4, title: allStrings["string_five_box_decription_4"] },
        { id: 5, imgUrl: Img5, title: allStrings["string_five_box_decription_5"] }
    ]

    return (
        <div>
            <div id="services_container" className="w-full flex justify-center">
                <div className="mb-[30px] lg:mb-[30px] w-full sm:w-10/12 flex flex-wrap gap-[30px] justify-center">
                {servicesArr?.map((item, idx) => {
                    return (
                    <div
                        key={idx}
                        className="relative bg-tinder max-w-[450px] mx-4 sm:m-0 rounded-[5px] px-4 py-10 sm:py-7 sm:px-8 flex flex-col items-center justify-center sm:block text-white"
                    >
                        <p class="text-[24px]-400 leading-[normal] opacity-50 absolute left-[20px] top-[20px]">0{item.id}</p>
                        <div className="flex items-center justify-center">
                        <Image
                            src={item.imgUrl}
                            alt=""
                            height={45}
                            width={45}
                            priority
                            className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] pointer-events-none select-none"
                        />
                        </div>
                        <div
                        className="mt-5 text-[24px] font-bold tracking-[-0.2px] text-center"
                        style={{ lineHeight: "normal" }}
                        >
                        {item.title}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
            <div id="services_container" className="w-full flex justify-center">
                <div className="flex justify-center flex-wrap gap-[30px] sm:w-auto mx-auto mb-[50px] lg:mb-[100px]">
                {servicesArrnew?.map((item, idx) => {
                    return (
                    <div
                        key={idx}
                        className="relative bg-tinder max-w-[450px] mx-4 sm:m-0 rounded-[5px] px-4 py-10 sm:py-7 sm:px-8 flex flex-col items-center justify-center sm:block text-white"
                    >
                        <p class="text-[24px]-400 leading-[normal] opacity-50 absolute left-[20px] top-[20px]">0{item.id}</p>
                        <div className="flex items-center justify-center">
                        <Image
                            src={item.imgUrl}
                            alt=""
                            height={45}
                            width={45}
                            priority
                            className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] pointer-events-none select-none"
                        />
                        </div>
                        <div
                        className="mt-5 text-[24px] font-bold tracking-[-0.2px] text-center"
                        style={{ lineHeight: "normal" }}
                        >
                        {item.title}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>

    )
}

export default FiveBoxSection