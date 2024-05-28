import { get_user_action } from "@/app/lib/actions"
import { getAllStrings } from "@/app/lib/allStrings";
import Loader from "@/components/common/Loader";
import Index from "@/components/profile/EditProfile/Index"
import { Suspense } from "react";

const EditProfile = async () => {
  const user = await get_user_action();
  const allStrings = await getAllStrings();
  if (allStrings?.success) {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <main className="lg:pt-[66px] bg-primary w-full">
            <Index user={user[0]} allStrings={allStrings.data} />
          </main>
        </Suspense>
      </>
    )
  } else {
    <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
      Fetch failed
    </div>
  }
}

export default EditProfile