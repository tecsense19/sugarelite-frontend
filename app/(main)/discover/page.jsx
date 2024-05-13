import { all_profiles_action, decrypt_user } from "@/app/lib/actions"
import Loader from "@/components/common/Loader"
import SwipeFilter from "@/components/discover/SwipeFilter"
import SwipePage from "@/components/discover/SwipePage"
import { Suspense } from "react"

const Discover = async () => {

  const all_users = await all_profiles_action()
  const current_user = decrypt_user()
  const users = all_users.data.filter((i) => parseInt(i.id) !== current_user.id).slice(0, 10)

  if (all_users.success) {
    return (
      <Suspense fallback={<Loader />}>
        <div className="font-bold h-dvh pt-0 md:pt-[66px] flex">
          <SwipeFilter />
          <SwipePage allUsers={users} currentUser={current_user} />
        </div>
      </Suspense>
    )
  }

}

export default Discover