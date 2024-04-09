import { all_profiles_action, decrypt_user, getCountries } from "@/app/lib/actions"
import Loader from "@/components/common/Loader"
import Search_Index from "@/components/search/Search_Index"
import { Suspense } from "react"

const Search = async () => {

  const all_users = await all_profiles_action()
  const current_user = decrypt_user()

  const users = all_users.data.filter((i) => i.id !== current_user?.id)

  return (
    <>
      {
        all_users.success
          ? <Search_Index allUsers={users} />
          : <div>No data found</div>
      }
    </>
  )
}

export default Search