import { decrypt_user } from "@/app/lib/actions"
import Index from "@/components/profile/EditProfile/Index"

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