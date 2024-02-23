import Image from "next/image"
import leftArrow from "/public/assets/arrow_left.svg"
import Link from "next/link"
import { client_routes } from "@/app/lib/helpers"

const Disclaimer = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="p-4 pt-6 flex flex-col text-white max-w-[700px]">
          <div className="relative flex justify-center items-center">
            <Link className="absolute left-0" href={client_routes.home}>
              <Image src={leftArrow} alt="" height={26} width={26} className="pointer-events-none" />
            </Link>
            <div className="text-[27px] font-semibold ">Disclaimer</div>
          </div>
          <div className="mt-6 text-[19px] font-normal text-justify">
            {"->"} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="mt-5 text-[19px] font-normal text-justify">
            {"->"} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="mt-5 text-[19px] font-normal text-justify">
            {"->"} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </>
  )
}

export default Disclaimer