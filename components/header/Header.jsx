'use client'
import { client_routes } from '@/app/lib/helpers'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../../public/assets/Logo (1).svg"
import logo2 from "../../public/assets/Logo (2).svg"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <>
            {/* mobile view */}
            {(pathname !== client_routes.login && pathname !== client_routes.register) &&
                <header className="md:hidden top-0 fixed w-full z-[2]" data-aos="fade-down" data-aos-duration="500">
                    <div className="flex bg-black text-white items-center justify-center">
                        <div className="w-full sm:w-11/12 xl:w-9/12 px-4">
                            <div className="flex justify-between items-center h-[65px]">
                                <div className="flex items-center">
                                    <button onClick={() => router.push(client_routes.home)}>
                                        <Image src={logo2} alt="" height={22} width={102} className="pointer-events-none select-none h-[22px] w-[102px]" priority />
                                    </button>
                                </div>
                                <div className="flex items-center gap-x-[8.6px]">
                                    <Link prefetch={true} href={client_routes.register} className={`w-[78.5px] h-[31px] flex justify-center items-center ${(pathname === client_routes.register || pathname === client_routes.home) ? "bg-secondary" : "bg-neutral border border-white/30"} text-white text-[12px] font-medium leading-[normal] tracking-[-0.11px] rounded-[2.5px]`}>Register</Link>
                                    <Link prefetch={true} href={client_routes.login} className="w-[57px] h-[31px] flex justify-center items-center bg-neutral border border-white/30 text-white text-[12px] font-medium leading-[normal] tracking-[-0.11px] rounded-[2.5px]">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
            }

            {/* web view */}
            <header className="hidden md:flex h-[80px] bg-black text-white items-center justify-center top-0 fixed w-full z-[2]">
                <div className="w-11/12 xl:w-9/12 flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={() => router.push(client_routes.home)}>
                            <Image height={37} width={188} className="pointer-events-none select-none" src={logo} alt="" priority />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <Link prefetch={true} href={client_routes.register} className={`px-[35px] h-[42px] text-center ${(pathname === client_routes.register || pathname === client_routes.home) ? "bg-secondary" : "bg-neutral border border-white/30"}  rounded-[5px] text-[18px] font-[450] tracking-[-0.18] me-4 transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center`}>
                            Register Now
                        </Link>
                        <Link prefetch={true} href={client_routes.login} className={`px-[35px] h-[42px] text-center ${pathname === client_routes.login ? "bg-secondary" : "bg-neutral border border-white/30"}  rounded-[5px] text-[18px] font-[450] tracking-[-0.18] me-4 transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center`}>
                            Login
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header