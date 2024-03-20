import { decrypt_user, search_profile_action } from "@/app/lib/actions"
import { client_routes } from "@/app/lib/helpers"
import SearchProfileIndex from "@/components/profile/searched_Profile/SearchProfileIndex"
import Link from "next/link"


const ProfileId = async ({ params }) => {

    const currentUser = decrypt_user()
    const queried_user = await search_profile_action(params.id)

    if (queried_user.success) {
        return (
            <SearchProfileIndex currentUser={currentUser} queried_user={queried_user.data[0]} />
        )
    }
    return (
        <>
            <main className="min-h-dvh lg:pt-[66px] bg-primary flex-col flex justify-center items-center text-white text-center gap-3">

                <p>Sorry, We cannot found the user.</p>

                <p className="text-white/60">
                    Back to <Link href={client_routes.profile} className="text-secondary">Profile</Link> Page
                </p>

            </main>

        </>
    )
}

export default ProfileId