import { client_routes } from "@/app/lib/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Banner = () => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center">
      <div className="w-9/12 flex justify-between items-center mt-[65px]">
        <div className="w-6/12" data-aos="fade-right" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="500">
          <div className="flex items-center">
            <span className="text-[70px] italic font-[750] me-2" style={{ lineHeight: "70px" }}>SUGAR</span>
            <span className="text-[70px] font-[350]" style={{ lineHeight: "70px" }}>ELITE</span>
          </div>
          <div className="mt-[15px] text-[40px] font-[500] tracking-[-0.4px]" style={{ lineHeight: "normal" }}>
            Create a free sugar Date profile now!
          </div>
          <div className="mt-[10px] text-white/50 text-[21px] font-[500] tracking-[-0.22px]" style={{ lineHeight: "35px" }}>
            In publishing and graphic design, Lorem ipsum is a placeholder demonstrate the visual form of a document or a typeface without relying
          </div>
          <div className="mt-[40px] flex items-center">
            <button className="rounded-[5px] w-4/12 py-4 text-[20px] font-[600] tracking-[-0.2px] bg-secondary me-[20px]" style={{ lineHeight: "normal" }} onClick={() => router.push(client_routes.register)}>
              CREATE PROFILE
            </button>
            <button className="rounded-[5px] w-4/12 py-4 text-[20px] font-[600] tracking-[-0.2px] bg-neutral border border-white/30" style={{ lineHeight: "normal" }}>
              READ MORE
            </button>
          </div>
        </div>
        <div className="w-5/12" data-aos="fade-left" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="500">
          <Image src={"/assets/In love-bro 1.svg"} alt="" width={1000} height={1000} priority className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default Banner