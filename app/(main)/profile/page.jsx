import { all_profiles_action, decrypt_user } from "@/app/lib/actions"
import Loader from "@/components/common/Loader"
import ProfileIndex from "@/components/profile/ProfileIndex"
import { Suspense } from "react"


const Profile = async () => {

  const user = decrypt_user()
  const allUsers = await all_profiles_action()

  if (allUsers.success) {
    const accessList = allUsers.data.filter((i) => i.id === user?.id)
    return (
      <>
        <Suspense fallback={<Loader />}>
          <ProfileIndex decryptedUser={user} allUsers={allUsers.data} accessList={accessList[0]} />
        </Suspense>
      </>
    )
  }
}

export default Profile