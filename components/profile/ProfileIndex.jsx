"use client"
import SideContent from './SideContent'
import ProfileMainContent from './ProfileMainContent'
import { useEffect, useState } from 'react'
import AccessToggler from './AccessToggler'
import { useStore } from '@/store/store'
import { all_profiles_action, search_profile_action } from '@/app/lib/actions'
import AlbumAccessList from './AlbumAccessList'
import BlockList from './BlockList'

const ProfileIndex = ({ decryptedUser, allUsers, accessList }) => {

    const { state: { userState } } = useStore()

    const [user, setUser] = useState(userState ? userState : decryptedUser)

    useEffect(() => {
        setUser(userState ? userState : decryptedUser)
    }, [userState])

    const [profileToggle, setProfileToggle] = useState('')



    return (
        <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
            <SideContent decryptedUser={user} setProfileToggle={setProfileToggle} />
            {/* {
                !profileToggle ? <ProfileMainContent decryptedUser={user} /> : <AccessToggler type={profileToggle} setProfileToggle={setProfileToggle} decryptedUser={user} allUsers={allUsers} currentUser={user} accessList={userAccessList} />
            } */}
            {
                !profileToggle ? <ProfileMainContent decryptedUser={user} /> : profileToggle === "photo" ? <AlbumAccessList type={profileToggle} setProfileToggle={setProfileToggle} /> : <BlockList type={profileToggle} setProfileToggle={setProfileToggle} />
            }
        </main>
    )
}

export default ProfileIndex