import ContactUs from '@/components/common/ContactUs'
import Loader from '@/components/common/Loader'
import React from 'react'
import { Suspense } from "react"

const Page = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className='h-dvh pt-0 md:pt-[66px] flex text-white'>
        <ContactUs />
      </div>
    </Suspense>
  )
}

export default Page