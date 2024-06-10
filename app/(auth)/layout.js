import Header from "@/components/header/Header";
import { getAllStrings } from "../lib/allStrings";

export default async function RootLayout({ children }) {
    const allStrings = await getAllStrings();

    if (allStrings?.success) {
        return <>
            {/* <div className="relative bg-[url('/assets/large_image.png')] bg-no-repeat bg-cover"> */}
            <div className="relative ">
                <Header allStrings={allStrings.data} />
                {children}
            </div>
        </>;
    } else {
        return <>fetch failed</>
    }
}