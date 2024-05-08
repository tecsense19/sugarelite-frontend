import RootHeader from "@/components/header/RootHeader";
import { cookies } from "next/headers";
import { all_friend_Notifications, all_profiles_action, get_user_action } from "../lib/actions";
import { redirect } from "next/navigation";
import { client_routes } from "../lib/helpers";

export default async function RootLayout({ children }) {
    const token = cookies().get("user")?.value
    if (token) {
        const user = await get_user_action()
        const allUsers = await all_profiles_action()
        const matchNotifications = await all_friend_Notifications()
        return <>
            <RootHeader user={user[0]} allUsers={allUsers.data.filter(i => i.id !== user[0].id)} matchNotifications={matchNotifications.data} />
            {children}
        </>;
    }
    return redirect(client_routes.login)
}