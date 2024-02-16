import ProfileMainContent from "@/components/profile/ProfileMainContent"
import SideContent from "@/components/profile/SideContent"
import Image from "next/image"
import Link from "next/link"
import editImg from "../../../public/assets/edit.svg";

const Profile = () => {

  return (
    <>
      <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
        <SideContent />
        <ProfileMainContent />
        <Link href={'/profile/edit'} className="hidden fixed z-[1000] bg-secondary top-[96px] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px]" data-aos='zoom-in'>
          <Image src={editImg} alt="edit" width={30} height={30} className="w-auto h-auto pointer-events-none" />
        </Link>
      </main>
    </>
  )
}

export default Profile