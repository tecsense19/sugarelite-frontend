import React, { useEffect } from 'react'
import TopNav from './TopNav'
import Profiles from './Profiles'

const ProfileSection = ({ messages, user, allUsers, setShowMobileChatContent, supportChat }) => {
    return (
        <>
            <TopNav messages={messages} allUsers={allUsers} user={user} setShowMobileChatContent={setShowMobileChatContent} />
            <Profiles messages={messages} allUsers={allUsers} user={user} setShowMobileChatContent={setShowMobileChatContent} supportChat={supportChat.map(i => i.get_support)} />
        </>
    )
}

export default ProfileSection