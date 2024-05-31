"use client"

import Image from "next/image"
import leftArrow from "/public/assets/arrow_left.svg"
import Link from "next/link"
import { client_routes } from "@/app/lib/helpers"
import Loader from "@/components/common/Loader"
import { Suspense } from "react"

const PrivacyPolicy = () => {
  const dummyData = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className={`flex justify-center md:pt-[80px] pt-[65px]`}>
          <div className="p-4 py-6 flex flex-col text-white max-w-[700px]">
            <div className="relative flex justify-center items-center">
              {/* <Link className="absolute left-0" href={client_routes.home}>
                <Image src={leftArrow} alt="" height={26} width={26} className="pointer-events-none" />
              </Link> */}
              <div className="text-[27px] font-semibold ">Privacy Policy</div>
            </div>
            <div className="mt-6 text-[19px] font-normal text-justify">
              {"->"} {dummyData}
            </div>
            <div className="mt-5 text-[19px] font-normal text-justify">
              {"->"} {dummyData}
            </div>
            <div className="mt-5 text-[19px] font-normal text-justify">
              {"->"} {dummyData}
            </div>
            <div className="mt-5 text-[19px] font-normal text-justify">
              {"->"} {dummyData}
            </div>
            <div className="mt-5 text-[19px] font-normal text-justify">
              {"->"} {dummyData}
            </div>
            {/* <div className="mt-8 text-[20px] font-normal">
          {"->"} We may collect personal information such as your name, email address, contact details, and other information you voluntarily provide to us.
        </div>
        <div className="mt-5 text-[19px] font-normal">
          {"->"} We automatically collect certain information about your device, including your IP address, browser type, operating system, and browsing patterns on our website.
        </div>
        <div className="mt-5 text-[19px] font-normal">
          {"->"} We may use cookies and similar tracking technologies to enhance your experience and gather information about how you use our website.
        </div>
        <div className="mt-5 text-[19px] font-normal">
          {"->"} We may use your information to provide and improve our services, communicate with you, customize your experience, and analyze usage patterns.
        </div>
        <div className="mt-5 text-[19px] font-normal">
          {"->"} We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
        </div> */}
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default PrivacyPolicy