import { decrypt_user, search_profile_action } from "@/app/lib/actions"
import { client_routes } from "@/app/lib/helpers"
import SearchProfileIndex from "@/components/profile/searched_Profile/SearchProfileIndex"
import Link from "next/link"
import { redirect } from "next/navigation"



const ProfileId = async ({ params }) => {
    const currentUser = decrypt_user();
    const myAccount = await search_profile_action(currentUser.id);

    if (!myAccount.success) {
        return null;
    }

    const isBlockedOrSelf = myAccount.data[0].is_blocked_users.some(i => i.user_id === parseInt(params.id)) || currentUser.id === parseInt(params.id);
    if (isBlockedOrSelf) {
        redirect(client_routes.profile);
        return null;
    }

    const queriedUser = await search_profile_action(params.id);
    if (queriedUser.success) {
        return <SearchProfileIndex currentUser={currentUser} queried_user={queriedUser.data[0]} />;
    }

    return (
        <main className="min-h-dvh lg:pt-[66px] bg-primary flex-col flex justify-center items-center text-white text-center gap-3">
            <p>Sorry, We cannot find the user.</p>
            <p className="text-white/60">
                Back to <Link href={client_routes.profile} className="text-secondary">Profile</Link> Page
            </p>
        </main>
    );
};

export default ProfileId