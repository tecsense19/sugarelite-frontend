import { all_profiles_action } from "@/app/lib/actions"
import Search_Index from "@/components/search/Search_Index"
import { cookies } from "next/headers"

const Search = async () => {

  const all_users = await all_profiles_action()
  const currentUserId = cookies().get("id")?.id

  const users = all_users.data.filter((i) => i.id !== currentUserId?.id)

  return (
    <>
      {
        all_users?.success
          ? <Search_Index allUsers={users} />
          : <div className="text-red-600">No data found</div>
      }
    </>
  )
}

export default Search