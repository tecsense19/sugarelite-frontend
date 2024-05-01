import { all_profiles_action, friend_request_notifications } from "@/app/lib/actions"
import Search_Index from "@/components/search/Search_Index"
import { cookies } from "next/headers"
import CryptoJS from "crypto-js"

const Search = async () => {

  const all_users = await all_profiles_action()
  const userId = cookies().get("user")?.value

  if (userId) {
    const bytes = CryptoJS.AES.decrypt(userId, 'SecretKey');
    const id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const users = all_users.data.filter((i) => i.id !== id)
    const pendingList = await friend_request_notifications(parseInt(id))
    return (
      <>
        {
          all_users?.success
            ? <Search_Index allUsers={users} pendingList={pendingList?.data} decryptedUser={all_users.data.find((i) => i.id === id)} />
            : <div className="text-red-600">No data found</div>
        }
      </>
    )
  }

}

export default Search