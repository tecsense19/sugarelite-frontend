"use server"

import { getAllStrings } from "@/app/lib/allStrings"
import CookieConsent from "./CookieConsent"

const CookieIndex = async () => {
  const allStrings = await getAllStrings();
  if (allStrings?.success) {
    return (
      <CookieConsent allStrings={allStrings.data} />
    )
  }
}

export default CookieIndex