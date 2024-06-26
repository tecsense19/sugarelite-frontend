import RootHeader from "@/components/header/RootHeader"
import { all_friend_Notifications, all_profiles_action, chat_list_action, get_support_msg, get_user_action, private_album_notification } from "../lib/actions";
import { getAllStrings } from "../lib/allStrings";

const Index = async ({ children }) => {

  try {
    // const [user, allUsers, matchNotifications, chatList, supportChat, albumNotifications] = await Promise.all([
    //   get_user_action(),
    //   all_profiles_action(),
    //   all_friend_Notifications(),
    //   chat_list_action(),
    //   get_user_action().then(i => get_support_msg({ user_id: i[0].id })),
    //   get_user_action().then(user => private_album_notification({ user_id: user[0]?.id }))
    // ]);

    const user = await get_user_action()
    const allStrings = await getAllStrings();

    if (user && allStrings?.success) {

      const allUsers = await all_profiles_action()
      const matchNotifications = await all_friend_Notifications()
      const chatList = await chat_list_action()
      const supportChat = await get_support_msg({ user_id: user[0].id })
      const albumNotifications = await private_album_notification({ user_id: user[0].id })

      return (
        <>
          <RootHeader
            user={user[0]}
            allUsers={allUsers.data.filter(i => i.id !== user[0].id)}
            matchNotifications={matchNotifications.data.filter(
              i => i.receiver_id === user[0].id || i.user_id === user[0].id || i.sender_id === user[0].id
            )}
            albumNotifications={albumNotifications.data}
            chatList={chatList.data.filter(i => (i.sender_id === user[0].id || i.receiver_id === user[0].id))}
            supportChat={supportChat.data}
            allStrings={allStrings.data}
          />
          {children}
        </>
      )
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
      Fetch failed
    </div>
  }

}

export default Index