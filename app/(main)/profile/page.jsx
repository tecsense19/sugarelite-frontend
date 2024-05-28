import { all_profiles_action, decrypt_user, get_user_action } from "@/app/lib/actions"
import { getAllStrings } from "@/app/lib/allStrings"
import Loader from "@/components/common/Loader"
import ProfileIndex from "@/components/profile/ProfileIndex"
import { Suspense } from "react"


const Profile = async () => {

  // const user = decrypt_user()
  const user = await get_user_action()
  const allUsers = await all_profiles_action()
  const allStrings = await getAllStrings();

  if (allStrings?.success && allUsers?.success && user) {
    const accessList = allUsers.data.filter((i) => i.id === user[0]?.id)
    return (
      <>
        <Suspense fallback={<Loader />}>
          <ProfileIndex user={user[0]} allUsers={allUsers.data} accessList={accessList[0]} allStrings={allStrings.data} />
        </Suspense>
      </>
    )
  } else {
    <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
      Fetch failed
    </div>
  }
}

export default Profile