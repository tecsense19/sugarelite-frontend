import React, { useEffect } from 'react'
import AdminProfie from './AdminProfie'
import UserComponent from './UserComponent';

const Profiles = ({ messages, user, allUsers, setShowMobileChatContent, supportChat }) => {

    const sortUsersByLatestMessage = (chat, currentUser) => {
        const userMessages = {};
        chat.forEach(message => {
            const otherUserId = message.sender_id === currentUser.id ? message.receiver_id : message.sender_id;
            if (!userMessages[otherUserId] || userMessages[otherUserId].milisecondtime < message.milisecondtime) {
                userMessages[otherUserId] = message;
            }
        });
        return Object.values(userMessages).sort((a, b) => b.milisecondtime - a.milisecondtime);
    };

    return (
        <>
            <div className="mt-5 px-4 md:mt-[30px] md:px-[30px]">
                <div className="text-[20px] md:text-[26px] font-semibold md:font-bold leading-[30px]">My Chat List</div>
            </div>
            <div className="flex flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100%-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 md:me-[18px] md:pe-3 pb-8 md:pb-3 second-child" style={{ scrollbarWidth: "none" }}>
                <AdminProfie message={supportChat[supportChat.length - 1]} />
                {
                    sortUsersByLatestMessage(messages, user).length ? sortUsersByLatestMessage(messages, user).map((latestMessage, index) => {
                        const otherUserId = latestMessage.sender_id === user.id ? latestMessage.receiver_id : latestMessage.sender_id;
                        const foundUser = allUsers.find(user => user.id === otherUserId);
                        return <UserComponent key={index} latestMessage={latestMessage} foundUser={foundUser} />
                    }) : ""
                }
            </div>
        </>
    )
}

export default Profiles