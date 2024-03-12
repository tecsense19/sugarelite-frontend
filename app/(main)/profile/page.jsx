import { decrypt_user } from "@/app/lib/actions"
import ProfileMainContent from "@/components/profile/ProfileMainContent"
import SideContent from "@/components/profile/SideContent"


const Profile = () => {

  const user = decrypt_user()

  return (
    <>
      <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
        <SideContent decryptedUser={user} />
        <ProfileMainContent decryptedUser={user} />
      </main>
    </>
  )
}

export default Profile