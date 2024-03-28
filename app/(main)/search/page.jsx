import { all_profiles_action, decrypt_user } from "@/app/lib/actions"
import Loader from "@/components/common/Loader"
import Search_Index from "@/components/search/Search_Index"
import { Suspense } from "react"

const Search = async () => {

  const all_users = await all_profiles_action()
  const current_user = decrypt_user()

  const users = all_users.data.filter((i) => i.id !== current_user?.id)
  const myBlockList = all_users.data.filter((i) => i.id === current_user?.id)[0].is_blocked_users.map((i) => i?.user_id)

  const filteredUsers = users.filter(user => {
    if (user.id && Array.isArray(user.is_blocked_users)) {
      return user.is_blocked_users.some(blockedUser => blockedUser.user_id === current_user.id);
    }
  }).map((i) => i?.id);
  return (
    <Suspense fallback={<Loader />}>
      {
        (all_users.success)
          ? <Search_Index allUsers={users} blockList={[...myBlockList, ...filteredUsers]} />
          : <div>No data found</div>
      }
    </Suspense>
  )
}

export default Search