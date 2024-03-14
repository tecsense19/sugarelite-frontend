import { all_profiles_action, chat_list_action, decrypt_user, friends_list_action } from "@/app/lib/actions"
import ChatIndex from "@/components/chat/ChatIndex"

const Chat = async () => {


  const currentUser = decrypt_user()

  const allUsers = await all_profiles_action()

  const users = allUsers.data.filter((i) => parseInt(i.id) !== currentUser?.id)

  const chatList = await chat_list_action()

  const user_chats = chatList.data.filter((i) => (i.sender_id === currentUser?.id) || (i.receiver_id === currentUser?.id))

  const allUserIds = Array.from(new Set([
    ...user_chats.filter(i => i.sender_id !== currentUser?.id).map(i => i.sender_id),
    ...user_chats.filter(i => i.receiver_id !== currentUser?.id).map(i => i.receiver_id)
  ]));

  let friendsList = []

  allUserIds.forEach((id) => {
    const user = users.filter(user => user.id === id)
    friendsList.push(user[0])
  })


  if (allUsers.success && chatList.success) {
    return (
      <>
        <ChatIndex users={friendsList} decryptedUser={currentUser} chatList={user_chats} />
      </>
    )
  }
}

export default Chat