import { all_profiles_action, chat_list_action, decrypt_user } from "@/app/lib/actions";
import Loader from "@/components/common/Loader";
import MsgIndex from "@/components/msg/MsgIndex";
import { Suspense } from "react";

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

    const myChattedProfiles = Array.from(new Set(user_chats.map(chat => chat.sender_id !== currentUser.id ? chat.sender_id : chat.receiver_id)));

    // console.log(myChattedProfiles)

    const myChatsWithProfiles = myChattedProfiles.map(profileID => {
        const profile = users.find(user => user.id === profileID);
        const conversation = user_chats.filter(chat => chat.sender_id === profileID || chat.receiver_id === profileID);
        conversation.sort((a, b) => b.id - a.id);
        return {
            profile,
            messages: conversation
        };
    });

    myChatsWithProfiles.sort((a, b) => {
        const latestMessageIDA = a.messages.length > 0 ? a.messages[0].id : 0;
        const latestMessageIDB = b.messages.length > 0 ? b.messages[0].id : 0;
        return latestMessageIDB - latestMessageIDA;
    });

    // console.log(myChatsWithProfiles)

    return <Suspense fallback={<Loader />}>
        <MsgIndex decryptedUser={currentUser} profilesList={tempList} userChats={user_chats} allUsers={users} />
    </Suspense>
};

export default Chat;
