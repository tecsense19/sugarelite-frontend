import EditMainContent from "@/components/profile/EditMainContent"
import SideContent from "@/components/profile/SideContent"
import Image from "next/image"
import Link from "next/link"


export default () => {
  return (
    <>
      <main className="xl:pt-[66px] bg-primary flex flex-col xl:flex-row">
        <SideContent />
        <EditMainContent />
        <Link href={'/profile'} className="hidden fixed z-[1000] bg-secondary top-[96px] right-[72px] h-14 w-14 md:flex items-center justify-center rounded-[5px]">
          <Image src={'/assets/arrow_left.svg'} alt="edit" width={30} height={30} className="w-auto h-auto pointer-events-none" />
        </Link>
      </main>
    </>
  )
}