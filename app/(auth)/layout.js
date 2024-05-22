import Header from "@/components/header/Header";
import { get_language_action } from "../lib/actions";

export default async function RootLayout({ children }) {
    const allStrings = await get_language_action();

    if (allStrings?.success) {
        return <>
            <div className="relative bg-[url('/assets/large_image.png')] bg-no-repeat bg-cover">
                <Header allStrings={allStrings.data} />
                {children}
            </div>
        </>;
    } else {
        return <>fetch failed</>
    }
}