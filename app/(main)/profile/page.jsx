import ProfileMainContent from "@/components/profile/ProfileMainContent"
import SideContent from "@/components/profile/SideContent"
const Profile = () => {



  return (
    <>
      <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
        <SideContent />
        <ProfileMainContent />
      </main>
    </>
  )
}

export default Profile