"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ButtonProfile from './Buttons_Profile'
import arrow_left from "../../../public/assets/arrow_left.svg"
import more_horizontal from "../../../public/assets/more_horizontal.svg"
import profile_img_5 from "../../../public/assets/profile_img_5.png"
import premium from "../../../public/assets/premium.svg"
import PopOver from '../commons/PopOver'
import { client_routes } from '@/app/lib/helpers'
import Buttons_Profile from './Buttons'
import Buttons from './Buttons'

const Side = ({ user, currentUser, privateAlbumState, socket }) => {

    const path = usePathname()

    return (
        <div className="lg:bg-primary-dark-3 lg:h-[calc(100vh-66px)] lg:fixed lg:w-[350px] 2xl:w-[400px] text-white flex justify-start flex-col" data-aos='fade-right'>
            <div className="md:hidden w-full px-[15px] mt-[12px] mb-[30px] flex justify-between items-center">
                <Link href={path === client_routes.edit_profile ? client_routes.profile : client_routes.search}><Image src={arrow_left} alt="left" width={24} height={24} priority className="cursor-pointer" /></Link>
                <p className="text-[24px] font-semibold select-none">Profile</p>
                <PopOver user={user} socket={socket}>
                    <Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
                </PopOver>
            </div>
            <div className="w-full flex justify-start items-center flex-col lg:items-start h-full md:pt-[96px] lg:pt-[30px] px-[15px] lg:px-[30px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="w-full aspect-square max-w-[200px] lg:max-w-full lg:rounded-[10px] flex justify-center items-center relative">
                    {
                        user?.avatar_url && (user?.avatar_url).includes("https://admin-sugarelite.tec-sense.co.in") ?
                            <Image src={user.avatar_url} width={1000} height={1000} alt="person" className={`h-full w-full rounded-full lg:rounded-[10px] select-none pointer-events-none ${path === client_routes.edit_profile && "opacity-50"}`} priority quality={100} />
                            :
                            <p className='bg-primary-dark-4 md:bg-primary h-full w-full  rounded-full lg:rounded-[10px] select-none flex justify-center items-center capitalize text-[650%] md:text-[8rem]'>
                                {user?.username?.charAt(0)}
                            </p>
                    }
                    {
                        user?.online === 1 &&
                        <div className='h-3 w-3 lg:h-[14px] lg:w-[14px] hidden lg:block bg-success absolute top-[220px] right-[75px] lg:right-[10px] lg:top-[10px] border border-white rounded-full'></div>
                    }
                </div>
                <div className="lg:self-start mt-[20px] lg:mt-[30px]">
                    <div className="flex flex-col text-center lg:text-left" data-aos='zoom-in'>
                        <div className={`flex items-center ${!user?.premium ? "justify-center lg:justify-start" : "justify-start"} gap-2 `}>
                            <div className="text-[24px] leading-[30px] md:text-[30px] font-bold relative">{user?.username},{user?.age}
                                {
                                    user?.online === 1 &&
                                    <div className='h-3 w-3 lg:h-[14px] lg:w-[14px] block lg:hidden bg-success absolute top-[0px] -right-[15px] border border-white rounded-full'></div>
                                }
                            </div>
                            {
                                user?.is_subscribe === 1 &&
                                <div className='flex items-center'>
                                    <Image src={premium} alt='edit' className='ms-[20px]' width={30} height={30} priority />
                                    <span className='text-[16px] font-semibold ms-2'>Premium</span>
                                </div>
                            }
                        </div>
                        <div className='mt-[11px]'>
                            <span className="text-[18px] md:text-[20px] font-semibold text-opacity-80 text-white me-[14px]">{user?.country},</span>
                            <span className="text-[16px] font-semibold text-opacity-80 text-white mt-[11px]">{user?.region}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-[30px] mb-[10px] w-full sm:max-w-[75%] lg:hidden flex justify-center items-center md:flex-row flex-col gap-3'>
                    {/* <ButtonProfile user={user} allUsers={allUsers} pendingList={pendingList} accessList={accessList} /> */}
                    {
                        <Buttons user={user} currentUser={currentUser} privateAlbumState={privateAlbumState} socket={socket} />
                    }
                </div>
                <div className="w-full bg-primary-dark-4 mt-[30px] rounded-[5px] sm:max-w-[75%] lg:max-w-full lg:mb-[30px]" data-aos='zoom-in'>
                    <div className="p-4 text-[16px] font-light">
                        {user.bio ? user.bio : "No Bio added"}
                    </div>
                    <div className="bg-primary-dark-3 lg:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
                        <p className="text-[18px] font-medium">Biography</p>
                        {/* <p className="text-[12px] font-medium text-white text-opacity-80">No Cinema</p> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Side