import { all_friend_Notifications, all_profiles_action, chat_list_action, friend_request_notifications } from "@/app/lib/actions"
import Search_Index from "@/components/search/Search_Index"
import { cookies } from "next/headers"
import CryptoJS from "crypto-js"
import { redirect } from "next/navigation"
import { client_routes } from "@/app/lib/helpers"

const Search = async () => {

  const userId = cookies().get("user")?.value

  if (!userId) {
    redirect(client_routes.home)
  }

  const bytes = CryptoJS.AES.decrypt(userId, 'SecretKey');
  const id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const all_users = await all_profiles_action();
  const allFriendNotifications = await all_friend_Notifications();
  const allChat = await chat_list_action();

  if (!all_users?.success || !allFriendNotifications?.success) {
    return <div>Fetch Failed</div>
  }

  const users = all_users.data.filter((i) => i.id !== id)
  const currentUser = all_users.data.find((i) => i.id === id)
  const currentUserChatId = allChat.data
    .filter(i => i.receiver_id === currentUser.id || i.sender_id === currentUser.id)
    .map(i => i.receiver_id === currentUser.id ? i.sender_id : i.receiver_id)
    .filter((value, index, self) => self.indexOf(value) === index);

  const mySendedRequests = allFriendNotifications.data.filter(i => (i.sender_id === id && !i.message))
  const myRecievedRequests = allFriendNotifications.data.filter(i => (i.receiver_id === id && !i.message))
  const myFrnds = currentUser.is_friends.map(i => i?.user_id)
  let removalUsers = [...myFrnds];

  currentUserChatId.length && currentUserChatId.forEach(i => removalUsers.push(i));
  mySendedRequests.length && mySendedRequests.forEach(i => removalUsers.push(i.receiver_id));
  myRecievedRequests.length && myRecievedRequests.forEach(i => removalUsers.push(i.sender_id));

  // if (mySendedRequests.length) {
  //   mySendedRequests.forEach(i => {
  //     removalUsers.push(i.receiver_id)
  //   })
  // }
  // if (myRecievedRequests.length) {
  //   myRecievedRequests.forEach(i => {
  //     removalUsers.push(i.sender_id)
  //   })
  // }

  return (
    <Search_Index allUsers={users} remainingList={users.filter(i => !removalUsers.includes(i.id))} user={currentUser} myRecievedRequests={myRecievedRequests} />
  )
}


export default Search