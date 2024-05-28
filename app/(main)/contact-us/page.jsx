import { get_user_action } from '@/app/lib/actions'
import { getAllStrings } from '@/app/lib/allStrings'
import ContactUs from '@/components/common/ContactUs'
import Loader from '@/components/common/Loader'
import React from 'react'
import { Suspense } from "react"

const Page = async () => {

  const user = await get_user_action();
  const allStrings = await getAllStrings();

  if (allStrings?.success) {
    return (
      <Suspense fallback={<Loader />}>
        <div className='min-h-dvh pt-0 md:pt-[66px] flex text-white'>
          <ContactUs allStrings={allStrings.data} user={user[0]} />
        </div>
      </Suspense>
    )
  } else {
    <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
      Fetch failed
    </div>
  }
}

export default Page