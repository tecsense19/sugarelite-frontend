import { decrypt_user } from "@/app/lib/actions"
import Index from "@/components/profile/EditProfile/Index"

const EditProfile = () => {
  const user = decrypt_user();
  return (
    <>
      <main className="lg:pt-[66px] bg-primary w-full">
        <Index user={user} />
      </main>
    </>
  )
}

export default EditProfile