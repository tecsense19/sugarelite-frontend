
import { cookies } from "next/headers";
import Index from "./Index";

export default async function RootLayout({ children }) {
    const token = cookies().get("user")?.value
    if (token) {
        return (
            <>
                <Index children={children} />
            </>
        );
    }

}
