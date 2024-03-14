"use client"
import SideContent from './SideContent'
import ProfileMainContent from './ProfileMainContent'
import { useState } from 'react'
import AccessToggler from './AccessToggler'

const ProfileIndex = ({ user }) => {

    const [profileToggle, setProfileToggle] = useState('')

    return (
        <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
            <SideContent decryptedUser={user} setProfileToggle={setProfileToggle} />
            {
                !profileToggle ? <ProfileMainContent decryptedUser={user} /> : <AccessToggler type={profileToggle} />
            }
        </main>
    )
}

export default ProfileIndex