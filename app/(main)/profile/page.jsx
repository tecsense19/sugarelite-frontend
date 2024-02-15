import ProfileMainContent from "@/components/profile/ProfileMainContent"
import SideContent from "@/components/profile/SideContent"
import Image from "next/image"
import Link from "next/link"


export default () => {

  return (
    <>
      <main className="min-h-dvh xl:pt-[66px] bg-primary flex flex-col xl:flex-row">
        <SideContent />
        <ProfileMainContent />
        <Link href={'/profile/edit'} className="hidden fixed z-[1000] bg-secondary top-[96px] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px]">
          <Image src={'/assets/edit.svg'} alt="edit" width={30} height={30} className="w-auto h-auto pointer-events-none" />
        </Link>
      </main>
    </>
  )
}