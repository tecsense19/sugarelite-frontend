import { all_profiles_action, chat_list_action, decrypt_user } from "@/app/lib/actions"
import ChatIndex from "@/components/chat/ChatIndex"

const Chat = async () => {

  const currentUser = decrypt_user()

  const allUsers = await all_profiles_action()
  const users = allUsers.data.filter((i) => parseInt(i.id) !== currentUser.id)

  const chatList = await chat_list_action()

  const user_chats = chatList.data.filter((i) => (i.message_from === currentUser.id) || (i.message_to === currentUser.id))

  const allUserIds = Array.from(new Set([
    ...user_chats.filter(i => i.message_from !== currentUser.id).map(i => i.message_from),
    ...user_chats.filter(i => i.message_to !== currentUser.id).map(i => i.message_to)
  ]));

  let friendsList = []

  allUserIds.forEach((id) => {
    const user = users.filter(user => user.id === id)
    friendsList.push(user[0])
  })


  if (allUsers.success && chatList.success) {
    return (
      <>
        <ChatIndex users={friendsList} currentUser={currentUser} chatList={chatList.data} />
      </>
    )
  }
}

export default Chat