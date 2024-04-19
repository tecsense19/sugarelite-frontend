import { all_profiles_action } from '@/app/lib/actions'
import Tinder from '@/components/tinder/Tinder'
import React from 'react'

const page = async () => {

    const allUsers = await all_profiles_action()

    if (!allUsers?.success) {
        return
    }
    return (
        <Tinder users={allUsers.data} />
    )
}

export default page
