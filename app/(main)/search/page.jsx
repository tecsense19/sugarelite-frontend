import { all_profiles_action, decrypt_user } from "@/app/lib/actions"
import Search_Index from "@/components/search/Search_Index"

const Search = async () => {

  const all_users = await all_profiles_action()
  const current_user = decrypt_user()

  const users = all_users.data.filter((i) => i.id !== current_user?.id)

  if (all_users.success) {
    return (
      <Search_Index allUsers={users} />
    )
  }

  return <div>No data found</div>
}

export default Search