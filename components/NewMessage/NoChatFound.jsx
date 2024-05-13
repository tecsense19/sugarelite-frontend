"use client"
import { client_routes } from "@/app/lib/helpers"
import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

const NoChatFound = () => {

    // const navigate = useRouter()
    // const [redirecting, setRedirecting] = useState(false);
    // const [count, setCount] = useState(3);
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setRedirecting(true);
    //     }, 3000);

    //     const countInterval = setInterval(() => {
    //         setCount((prevCount) => prevCount - 1);
    //     }, 1000);

    //     return () => {
    //         clearTimeout(timer);
    //         clearInterval(countInterval);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (redirecting) {
    //         navigate.push(client_routes.search);
    //     }
    // }, [redirecting]);

    return (
        <div className="h-dvh flex w-full flex-col justify-center items-center gap-2 text-white">
            <p className=" text-xl">No Chats Found..!</p>
            <p className="text-white/60">redirecting to <Link href={client_routes.search} className="text-secondary inline">profiles</Link> page</p>
            {/* <p>{count}</p> */}
        </div>
    )
}

export default NoChatFound