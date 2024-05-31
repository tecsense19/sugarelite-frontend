"use client"

import Loader from "@/components/common/Loader"
import { Suspense } from "react"

const PrivacyPolicy = ({ allStrings }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className={`flex justify-center md:pt-[80px] pt-[65px]`}>
          <div className="p-4 py-6 flex flex-col text-white w-full max-w-[770px]">
            <div className="relative flex flex-col justify-center items-center">
              <div className="text-[16px] font-semibold text-secondary uppercase">{allStrings["string_privacy_policy"]}</div>
              <p className="text-[26px] md:text-[32px] font-semibold text-center leading-[38px]">EliteSugar's <span>{allStrings["string_privacy_policy"]}</span></p>
            </div>
            <div className="my-5">
              <div>
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_introduction"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_introduction_description"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_personal_information"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_personal_information_description_1"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_personal_information_description_2"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_purpose"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_purpose_description_1"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_purpose_description_2"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_disclosure_of_information"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_disclosure_of_information_description_1"]}
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
                  {allStrings["string_policy_disclosure_of_information_description_6"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_google_analytics"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_goolge_analytics_description"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_right_of_withdrawal"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_right_of_withdrawal_description"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_cookies"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_cookies_description_1"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_cookies_description_2"]}
                </div>
                <div className="font-medium mt-5 text-[16px] text-white/70">
                  {allStrings["string_policy_cookies_description_3"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_insights_and_complaints"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_insights_and_complaints_description"]}
                </div>
              </div>
              <div className="mt-6">
                <div className="font-bold text-[18px] mb-1 text-white">{allStrings["string_publisher"]}</div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_policy_publisher_description"]}
                </div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_disp_i/s_maglebjergvej_6_2800_cvr_:_433433912"]}
                </div>
                <div className="font-medium text-[16px] text-white/70">
                  {allStrings["string_email"]}: {allStrings["string_supports@elitesugar.com"]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default PrivacyPolicy