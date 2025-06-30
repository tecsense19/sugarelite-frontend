

import Image from "next/image"
import leftArrow from "/public/assets/arrow_left.svg"
import Link from "next/link"
import { client_routes } from "@/app/lib/helpers"
import { useStore } from "@/store/store"
import { Suspense } from "react"
import Loader from "@/components/common/Loader"
import { getAllStrings } from "@/app/lib/allStrings"

const TermsOfUse = async () => {

  const res = await getAllStrings()

  if (res?.success) {
    const allStrings = res.data
    return (
      <>
        <Suspense fallback={<Loader />}>
          <div className={`flex justify-center md:pt-[80px] pt-[65px]`}>
            <div className="p-4 py-6 flex flex-col text-white max-w-[700px]">
              <div className="relative flex flex-col justify-center items-center">
                <div className="text-[16px] font-semibold text-secondary uppercase">{allStrings["string_terms_of_use"]}</div>
                <p className="text-[26px] md:text-[32px] font-semibold text-center leading-[38px]">SugarMake&#39;s <span>{allStrings["string_terms_of_use"]}</span></p>
              </div>
              <div className="mt-4 text-[16px] font-normal leading-[25px] text-white/70 text-justify">
                {allStrings["string_terms_of_use_description"]}
              </div>
              <div className="mt-6 ">
                <div className="font-bold text-[18px]">{allStrings["string_conditions_for_profiles"]}</div>
                <ul className="list-disc ms-10 leading-[25px] mt-4 flex flex-col gap-y-2 text-[16px]">
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_1"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_2"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_3"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_4"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_5"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_6"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_7"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_8"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_9"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_10"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profiles_desc_11"]}</li>
                </ul>
              </div>
              <div className="mt-6 ">
                <div className="font-bold text-[18px]">{allStrings["string_conditions_for_profile_photos"]}</div>
                <ul className="list-disc ms-10 leading-[25px] mt-4 flex flex-col gap-y-2 text-[16px]">
                  <li>{allStrings["string_tou_conditions_for_profile_photos_desc_1"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_photos_desc_2"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_photos_desc_3"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_photos_desc_4"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_photos_desc_5"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_photos_desc_6"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_photos_desc_7"]}</li>
                </ul>
              </div>
              <div className="mt-6 ">
                <div className="font-bold text-[18px]">{allStrings["string_conditions_for_profile_content,_including_profile_texts,_sending_messages,_and_profile_names"]}</div>
                <ul className="list-disc ms-10 leading-[25px] mt-4 flex flex-col gap-y-2 text-[16px]">
                  <li>{allStrings["string_tou_conditions_for_profile_content_desc_1"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_content_desc_2"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_content_desc_3"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_content_desc_4"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_content_desc_5"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_content_desc_6"]}</li>
                  <li>{allStrings["string_tou_conditions_for_profile_content_desc_7"]}</li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-y-3 mb-3 text-white/70">
                <p className="leading-[25px]">{allStrings["string_tou_description_1"]}</p>

                <p className="leading-[25px]">{allStrings["string_tou_description_2"]}</p>

                <p className="leading-[25px]">{allStrings["string_tou_description_3"]}</p>

                <p className="leading-[25px]">{allStrings["string_tou_description_4"]}</p>

                <p className="leading-[25px]">{allStrings["string_tou_description_5"]}</p>

              </div>
            </div>
          </div>
        </Suspense>
      </>
    )
  }

}

export default TermsOfUse