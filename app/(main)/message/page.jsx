import { all_profiles_action, chat_list_action, get_support_msg, get_user_action } from "@/app/lib/actions"
import ChatIndex from "@/components/_components/ChatIndex"
import { cookies } from "next/headers"

const Chat = async () => {
    const token = cookies().get("user")?.value
    if (token) {
        const user = await get_user_action()
        const allUsers = await all_profiles_action()
        const chatList = await chat_list_action()
        const supportChat = await get_support_msg({ user_id: user[0].id })

        if (!allUsers?.success || !chatList?.success || !supportChat?.success) {
            return <>fetch failed</>
        }

        return (
            <ChatIndex
                allUsers={allUsers.data.filter(i => i.id !== user[0].id)}
                chatList={chatList.data.filter(i => (i.sender_id === user[0].id || i.receiver_id === user[0].id))}
                user={user[0]}
                supportChat={supportChat.data}
            />
        )
    }
}

export default Chat