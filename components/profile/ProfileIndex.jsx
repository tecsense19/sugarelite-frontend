"use client"
import SideContent from './SideContent'
import ProfileMainContent from './ProfileMainContent'
import { useEffect, useState } from 'react'
import { useStore } from '@/store/store'
import AlbumAccessList from './AlbumAccessList'
import BlockList from './BlockList'
import { useSocket } from '@/store/SocketContext'
// import { getSocket } from '@/app/lib/socket'

const ProfileIndex = ({ user, allUsers, accessList, allStrings }) => {

    // const socket = getSocket()
    const { mySocket } = useSocket();
    const socket = mySocket;

    const [profileToggle, setProfileToggle] = useState('')

    return (
        <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
            <SideContent user={user} setProfileToggle={setProfileToggle} allStrings={allStrings} />
            {
                !profileToggle
                    ? <ProfileMainContent user={user} allStrings={allStrings} />
                    : profileToggle === "photo"
                        ? <AlbumAccessList albumAccessList={accessList.allow_privateImage_access_users} user={user} type={profileToggle} allUsers={allUsers} setProfileToggle={setProfileToggle} socket={socket} allStrings={allStrings} />
                        : <BlockList type={profileToggle} setProfileToggle={setProfileToggle} user={user} allUsers={allUsers} socket={socket} allStrings={allStrings} />
            }
        </main>
    )
}

export default ProfileIndex