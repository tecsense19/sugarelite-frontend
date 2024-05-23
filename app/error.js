'use client'

import { useEffect } from "react"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [])
  return (
    <>
      <div className="h-dvh w-dvw flex flex-col justify-center items-center text-white">
        <h2>Something went wrong!</h2>
        <button className="text-secondary" onClick={() => { reset(); window.location.reload(); }}>Try again</button>
      </div>
    </>
  )
}