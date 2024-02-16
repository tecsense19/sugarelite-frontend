import Index from "@/components/profile/EditProfile/Index"
import Image from "next/image"
import Link from "next/link"
import arrow_left from "../../../../public/assets/arrow_left.svg";

const EditProfile = () => {
  return (
    <>
      <main className="lg:pt-[66px] bg-primary ">
        <Index />
        <Link href={'/profile'} className="hidden fixed z-[1000] bg-secondary top-[96px] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px]" data-aos='fade-left'>
          <Image src={arrow_left} alt="edit" width={30} height={30} className="w-auto h-auto pointer-events-none" />
        </Link>
      </main>
    </>
  )
}

export default EditProfile