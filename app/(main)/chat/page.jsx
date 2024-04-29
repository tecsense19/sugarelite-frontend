import { all_profiles_action, chat_list_action, decrypt_user, get_user_action } from "@/app/lib/actions";
import { client_routes } from "@/app/lib/helpers";
import Index from "@/components/NewMessage/Index";
import { redirect } from "next/navigation";

const Chat = async () => {
    const profile = await get_user_action()
    // const currentUser = decrypt_user();
    if (!profile) {
        redirect(client_routes.home)
    }
    const currentUser = profile[0]
    const allUsers = await all_profiles_action();
    const chatList = await chat_list_action();

    if (!allUsers.success || !chatList.success || !currentUser) {
        return null;
    }

    const users = allUsers.data.filter(user => parseInt(user.id) !== currentUser?.id);
    const user_chats = chatList.data.filter(chat => chat.sender_id === currentUser?.id || chat.receiver_id === currentUser?.id);

    const myChattedProfiles = Array.from(new Set(user_chats.map(chat => chat.sender_id !== currentUser.id ? chat.sender_id : chat.receiver_id)));

    const myChatsWithProfiles = myChattedProfiles.map(profileID => {
        const profile = users.find(user => user.id === profileID);
        const conversation = user_chats.filter(chat => chat.sender_id === profileID || chat.receiver_id === profileID);
        conversation.sort((a, b) => a.id - b.id);
        return {
            profile,
            messages: conversation
        };
    });

    myChatsWithProfiles.sort((a, b) => {
        const latestMessageIDA = a.messages.length > 0 ? a.messages[a.messages.length - 1].id : 0;
        const latestMessageIDB = b.messages.length > 0 ? b.messages[b.messages.length - 1].id : 0;
        return latestMessageIDB - latestMessageIDA;
    });

    return <Index decryptedUser={currentUser} profilesList={myChatsWithProfiles} allUsers={users} myChats={user_chats} />
};

export default Chat;