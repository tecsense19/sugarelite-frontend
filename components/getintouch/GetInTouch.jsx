"use client"

import Loader from "@/components/common/Loader"
import { Suspense } from "react"

const GetInTouch = ({ allStrings }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className={`flex justify-center md:pt-[80px] pt-[65px]`}>
          <div className="p-4 py-6 flex flex-col text-white w-full max-w-[770px]">
            <div className="relative flex flex-col justify-center items-center">
              <div className="text-[16px] font-semibold text-secondary uppercase">{allStrings["string_privacy_policy"]}</div>
              <p className="text-[26px] md:text-[32px] font-semibold text-center leading-[38px]">SugarMake&#39;s <span>{allStrings["string_privacy_policy"]}</span></p>
            </div>
            <div className="my-5">
              <div>
                <div className="font-bold text-[18px] mb-1 text-white">What is Lorem Ipsum?</div>
                <div className="font-medium text-[16px] text-white/70">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_personal_information"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_personal_information_description_1"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_purpose"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_purpose_description_2"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_disclosure_of_information"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_disclosure_of_information_description_2"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_disclosure_of_information_description_3"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_disclosure_of_information_description_4"]}

                </div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_disclosure_of_information_description_5"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>

            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default GetInTouch