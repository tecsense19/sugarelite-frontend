
import React, { useMemo, useCallback } from 'react';
import TopNav from './TopNav';
import UserItem from "./UserItem";

const SideProfiles = React.memo(({ messages, user, allUsers, setToUser, unReadCount, setShowMobileChatContent }) => {

    const sortedUsers = useMemo(() => sortUsersByLatestMessage(messages, user), [messages, user]);

    const handleUserClick = useCallback((foundUser) => {
        setToUser(foundUser);
        setShowMobileChatContent(true);
    }, [setToUser, setShowMobileChatContent]);

    return (
        <>
            <TopNav messages={messages} user={user} allUsers={allUsers} />
            <div className="flex flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100vh-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 pb-6 md:me-3 md:pe-3 second-child" style={{ scrollbarWidth: "none" }}>
                {sortedUsers.length ? sortedUsers.map((latestMessage, index) => (
                    <UserItem key={latestMessage.id} latestMessage={latestMessage} user={user} allUsers={allUsers} unReadCount={unReadCount} onClick={handleUserClick} />
                )) : "No chats"}
            </div>
        </>
    );
});

// Function to sort users by latest message
const sortUsersByLatestMessage = (messages, currentUser) => {
    const userMessages = {};
    messages.forEach(message => {
        const otherUserId = message.sender_id === currentUser.id ? message.receiver_id : message.sender_id;
        if (!userMessages[otherUserId] || userMessages[otherUserId].milisecondtime < message.milisecondtime) {
            userMessages[otherUserId] = message;
        }
    });
    return Object.values(userMessages).sort((a, b) => b.milisecondtime - a.milisecondtime);
};

export default SideProfiles;
