import Header from "@/components/header/Header";
import { get_user_action } from "../lib/actions";
import Image from "next/image";
import { client_routes } from "../lib/helpers";
// import logo from "/public/assets/Logo (1).svg"
import logo from "/public/assets/main-site-logo.svg"
import Link from "next/link";
import Footer from "@/components/common/Footer";
import { getAllStrings } from "../lib/allStrings";

export default async function RootLayout({ children }) {
    const user = await get_user_action()
    const allStrings = await getAllStrings();
    if (allStrings?.success) {
        return <>
            {
                user ?
                    <header className="flex h-[66px] bg-primary-dark text-white items-center justify-center top-0 fixed w-full z-[2]" >
                        <div className="flex justify-between items-center w-full px-4 md:px-0">
                            <div className={`flex items-center md:ms-[72px]`}>
                                <button >
                                    <Image height={35} width={177} src={logo} alt="" className="pointer-events-none h-[35px] w-[152px] md:w-[177px]" priority />
                                </button>
                            </div>
                            <div className="flex items-center md:me-[72px]">
                                <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
                                    {user[0]?.avatar_url
                                        ? <Image height={40} width={40} src={user[0]?.avatar_url} alt="profile_pic" className="cursor-pointer rounded-full aspect-square object-cover" priority />
                                        : <div className="h-10 w-10 flex items-center justify-center text-[18px] bg-secondary rounded-full capitalize">{user[0]?.username.charAt(0)}</div>
                                    }
                                </Link>
                            </div>
                        </div>
                    </header>
                    : <Header allStrings={allStrings.data} />
            }
            {children}
            <Footer allStrings={allStrings.data} />
        </>;
    } else {
        return <>fetch failed</>
    }
}