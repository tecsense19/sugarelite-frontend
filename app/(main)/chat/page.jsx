import { all_profiles_action, chat_list_action, decrypt_user } from "@/app/lib/actions";
import MsgIndex from "@/components/msg/MsgIndex";

const Chat = async () => {
    const currentUser = decrypt_user();
    const allUsers = await all_profiles_action();
    const chatList = await chat_list_action();

    if (!allUsers.success || !chatList.success || !currentUser) {
        return null;
    }

    const users = allUsers.data.filter(user => parseInt(user.id) !== currentUser?.id);
    const user_chats = chatList.data.filter(chat => chat.sender_id === currentUser?.id || chat.receiver_id === currentUser?.id);

    const allUserIds = Array.from(new Set([
        ...user_chats.map(chat => chat.sender_id !== currentUser?.id ? chat.sender_id : chat.receiver_id)
    ]));

    const tempList = allUserIds.map(id => {
        const userChats = user_chats.filter(chat => chat.sender_id === id || chat.receiver_id === id);
        const latestMsg = userChats.reduce((latest, current) => latest.id > current.id ? latest : current, {});
        const user = users.find(u => u.id === id);
        return { user, latestMsg };
    }).sort((a, b) => b.latestMsg.id - a.latestMsg.id);

    return <MsgIndex decryptedUser={currentUser} profilesList={tempList} userChats={user_chats} />;
};

export default Chat;
