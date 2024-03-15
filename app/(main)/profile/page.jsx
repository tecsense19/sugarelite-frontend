import { all_profiles_action, decrypt_user } from "@/app/lib/actions"
import ProfileIndex from "@/components/profile/ProfileIndex"
import ProfileMainContent from "@/components/profile/ProfileMainContent"
import SideContent from "@/components/profile/SideContent"


const Profile = async () => {

  const user = decrypt_user()
  const allUsers = await all_profiles_action()

  if (allUsers.success) {
    const accessList = allUsers.data.filter((i) => i.id === user?.id)
    return (
      <>
        <ProfileIndex decryptedUser={user} allUsers={allUsers.data} accessList={accessList[0]} />
      </>
    )
  }
}

export default Profile