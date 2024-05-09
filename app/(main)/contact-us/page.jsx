import { get_user_action } from '@/app/lib/actions'
import ContactUs from '@/components/common/ContactUs'
import Loader from '@/components/common/Loader'
import React from 'react'
import { Suspense } from "react"

const Page = async () => {

  const user = await get_user_action();

  return (
    <Suspense fallback={<Loader />}>
      <div className='min-h-dvh pt-0 md:pt-[66px] flex text-white'>
        <ContactUs user={user[0]} />
      </div>
    </Suspense>
  )
}

export default Page