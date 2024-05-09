import { get_user_action } from "@/app/lib/actions"
import Loader from "@/components/common/Loader";
import Index from "@/components/profile/EditProfile/Index"
import { Suspense } from "react";

const EditProfile = async () => {
  const user = await get_user_action()
  return (
    <>
      <Suspense fallback={<Loader />}>
        <main className="lg:pt-[66px] bg-primary w-full">
          <Index user={user[0]} />
        </main>
      </Suspense>
    </>
  )
}

export default EditProfile