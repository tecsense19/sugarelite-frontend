import RootHeader from "@/components/header/RootHeader";
import { cookies } from "next/headers";
import { all_friend_Notifications, all_profiles_action, get_user_action, private_album_notification } from "../lib/actions";

export default async function RootLayout({ children }) {
    const token = cookies().get("user")?.value
    try {
        if (token) {
            const [user, allUsers, matchNotifications, albumNotifications] = await Promise.all([
                get_user_action(),
                all_profiles_action(),
                all_friend_Notifications(),
                get_user_action().then(user => private_album_notification({ user_id: user[0]?.id }))
            ]);

            return (
                <>
                    <RootHeader
                        user={user[0]}
                        allUsers={allUsers.data.filter(i => i.id !== user[0].id)}
                        matchNotifications={matchNotifications.data.filter(
                            i => i.receiver_id === user[0].id || i.user_id === user[0].id || i.sender_id === user[0].id
                        )}
                        albumNotifications={albumNotifications.data}
                    />
                    {children}
                </>
            );
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div className="h-dvh w-full bg-primary text-white flex justify-center items-center">
            Fetch failed
        </div>
    }
}
