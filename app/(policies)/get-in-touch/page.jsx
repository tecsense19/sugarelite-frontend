import { getAllStrings } from '@/app/lib/allStrings'
import PrivacyPolicy from '@/components/policies/PrivacyPolicy'
// import PrivacyPolicy from '@/components/policies/PrivacyPolicy'
import React from 'react'

const Page = async () => {
  const res = await getAllStrings()
  if (res?.success) {
    return (
      <PrivacyPolicy allStrings={res.data} />
    )
  }
  return <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
    Fetch failed
  </div>

}

export default Page