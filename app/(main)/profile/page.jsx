import { decrypt_user } from "@/app/lib/actions"
import ProfileIndex from "@/components/profile/ProfileIndex"
import ProfileMainContent from "@/components/profile/ProfileMainContent"
import SideContent from "@/components/profile/SideContent"


const Profile = () => {

  const user = decrypt_user()

  return (
    <>
      <ProfileIndex user={user} />
    </>
  )
}

export default Profile