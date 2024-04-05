import React from 'react'
import TopNav from './TopNav'
import Profiles from './Profiles'

const ProfileList = ({ currentUser, toUser, setToUser, profiles, unReadCount }) => {
    // console.log(profiles)
    return (
        <div className='w-full md:w-[350px] lg:w-[400px] bg-primary-dark-3 h-full py-[14px] md:py-[30px]'>
            <TopNav profileList={profiles} setToUser={setToUser} />
            <Profiles profileList={profiles} setToUser={setToUser} unReadCount={unReadCount} />
        </div>
    )
}

export default ProfileList