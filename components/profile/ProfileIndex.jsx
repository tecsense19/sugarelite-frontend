"use client"
import SideContent from './SideContent'
import ProfileMainContent from './ProfileMainContent'
import { useEffect, useState } from 'react'
import { useStore } from '@/store/store'
import AlbumAccessList from './AlbumAccessList'
import BlockList from './BlockList'
import { socket_server } from '@/app/lib/helpers'
import { io } from 'socket.io-client'
import { getSocket } from '@/app/lib/socket'

// const useSocket = () => {
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         const newSocket = io(socket_server);
//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     return socket;
// };

const ProfileIndex = ({ decryptedUser, allUsers, accessList }) => {

    const { state: { userState, mySocket } } = useStore()
    const socket = getSocket()


    const [user, setUser] = useState(userState ? userState : decryptedUser)

    useEffect(() => {
        setUser(userState ? userState : decryptedUser)
    }, [userState])

    const [profileToggle, setProfileToggle] = useState('')

    return (
        <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
            <SideContent decryptedUser={user} setProfileToggle={setProfileToggle} />
            {
                !profileToggle ? <ProfileMainContent decryptedUser={user} /> : profileToggle === "photo" ? <AlbumAccessList albumAccessList={accessList.allow_privateImage_access_users} user={user} type={profileToggle} allUsers={allUsers} setProfileToggle={setProfileToggle} socket={socket} /> : <BlockList type={profileToggle} setProfileToggle={setProfileToggle} user={user} allUsers={allUsers} socket={socket} />
            }
        </main>
    )
}

export default ProfileIndex