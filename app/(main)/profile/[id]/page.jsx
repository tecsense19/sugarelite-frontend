import { decrypt_user, get_user_action, private_album_notification, search_profile_action } from "@/app/lib/actions"
import { getAllStrings } from "@/app/lib/allStrings"
import { client_routes } from "@/app/lib/helpers"
import SearchProfileIndex from "@/components/profile/searched_Profile/SearchProfileIndex"
import Link from "next/link"
import { redirect } from "next/navigation"

const ProfileId = async ({ params }) => {
  const profile = await get_user_action();
  const allStrings = await getAllStrings();
  // const currentUser = decrypt_user();
  if (!profile) redirect(client_routes.profile);
  const currentUser = profile[0];
  const myAccount = await search_profile_action(currentUser.id);

  if (!myAccount.success) {
    return null;
  }

  const isBlockedOrSelf = myAccount.data[0].is_blocked_users.some(i => i.user_id === parseInt(params.id)) || currentUser.id === parseInt(params.id);
  if (isBlockedOrSelf) {
    redirect(client_routes.profile);
  }

  const queriedUser = await search_profile_action(params.id);
  const notifications = await private_album_notification({ user_id: params.id })

  if (allStrings?.success) {
    if (queriedUser.success && notifications.success) {
      return (
        <SearchProfileIndex currentUser={currentUser} queried_user={queriedUser.data[0]} pendingList={notifications.data} allStrings={allStrings.data} />
      )
    }
    return (
      <main className="min-h-dvh lg:pt-[66px] bg-primary flex-col flex justify-center items-center text-white text-center gap-3">
        <p>{allStrings.data["string_sorry,_we_cannot_find_the_user."]}</p>
        <p className="text-white/60">
          {allStrings.data["string_back_to"]} <Link href={client_routes.profile} className="text-secondary">{allStrings.data["string_profile"]}</Link> {allStrings.data["string_page"]}
        </p>
      </main>
    );
  } else {
    <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
      Fetch failed
    </div>
  }
};

export default ProfileId