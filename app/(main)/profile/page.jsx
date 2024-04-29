import { all_profiles_action, decrypt_user, get_user_action } from "@/app/lib/actions"
import Loader from "@/components/common/Loader"
import ProfileIndex from "@/components/profile/ProfileIndex"
import { Suspense } from "react"


const Profile = async () => {

  // const user = decrypt_user()
  const user = await get_user_action()
  const allUsers = await all_profiles_action()

  if (allUsers?.success && user) {
    const accessList = allUsers.data.filter((i) => i.id === user[0]?.id)
    return (
      <>
        <Suspense fallback={<Loader />}>
          <ProfileIndex decryptedUser={user[0]} allUsers={allUsers.data} accessList={accessList[0]} />
        </Suspense>
      </>
    )
  }
}

export default Profile