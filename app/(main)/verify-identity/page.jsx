import { get_user_action } from '@/app/lib/actions'
import Loader from '@/components/common/Loader'
import Verification from '@/components/verify/Verification'
import React from 'react'
import { Suspense } from "react"

const Page = async () => {

  const user = await get_user_action();

  return (
    <Suspense fallback={<Loader />}>
      <div className='min-h-dvh pt-0 md:pt-[66px] flex text-white'>
        <Verification user={user[0]} />
      </div>
    </Suspense>
  )
}

export default Page