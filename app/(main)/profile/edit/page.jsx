import { decrypt_user } from "@/app/lib/actions"
import Loader from "@/components/common/Loader";
import Index from "@/components/profile/EditProfile/Index"
import { Suspense } from "react";

const EditProfile = () => {
  const user = decrypt_user();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <main className="lg:pt-[66px] bg-primary w-full">
          <Index decryptedUser={user} />
        </main>
      </Suspense>
    </>
  )
}

export default EditProfile