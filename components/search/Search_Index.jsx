"use client"
import Cards from "@/components/search/Cards"
import Filters from "@/components/search/Filters"
import Image from "next/image"
import chevron_down from "/public/assets/arrow_left.svg"
import settingsIcon from "/public/assets/settings_icon.svg";
import { useStore } from "@/store/store"
import Mob_Filter from "@/components/search/Mob_Filter"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { client_routes } from "@/app/lib/helpers"

const Search_Index = ({ allUsers, blockList }) => {

    const { state: { filterState: { isFilterOpen }, blockedUsersState, userState }, dispatch } = useStore()

    const [users, setUsers] = useState(allUsers.filter((user) => !blockList.includes(user.id)))

    const navigate = useRouter()

    const filterHandler = () => {
        if (isFilterOpen) {
            dispatch({ type: "Filter_Close" })
        } else {
            dispatch({ type: "Filter_Open" })
        }
    }


    useEffect(() => {
        const blocked = allUsers.filter((user) => !blockList.includes(user.id))
        if (blockedUsersState.length) {
            if (blockedUsersState.some(i => i.sender_id === userState.id)) {
                const blockList = blockedUsersState.map((i) => i.receiver_id)
                const arr = blocked.filter((i) => !blockList.includes(i.id))
                setUsers(arr)
            } else if (blockedUsersState.some(i => i.receiver_id === userState.id)) {
                const blockList = blockedUsersState.map((i) => i.sender_id)
                const arr = blocked.filter((i) => !blockList.includes(i.id))
                setUsers(arr)
            }
        } else {
            setUsers(allUsers.filter((user) => !blockList.includes(user.id)))
        }
    }, [blockedUsersState])

    const handleResize = () => {
        if (window.innerWidth > 768) {
            dispatch({ type: "Filter_Close" })
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className="font-bold md:h-dvh pt-0 md:pt-[66px] flex flex-col md:flex-row">
            {
                !isFilterOpen ? <div className="md:hidden text-white p-4 flex justify-between items-center my-2 ">
                    <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={24} height={24} priority className='cursor-pointer ' onClick={() => navigate.push(client_routes.profile)} />
                    <span className="text-[24px] font-semibold leading-[22.8px]">Results</span>
                    <button onClick={filterHandler}>
                        <Image src={settingsIcon} alt='down_arrow' width={20} height={20} priority className='text-white pointer-events-none' />
                    </button>
                </div> :
                    <div className="md:hidden text-white p-4 flex justify-between items-center my-2 ">
                        <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={24} height={24} priority className='cursor-pointer' onClick={() => dispatch({ type: "Filter_Close" })} />
                        <span className="text-[24px] font-semibold leading-[22.8px]">Filter & Sort</span>
                        <div></div>
                    </div>
            }
            <Filters allUsers={users} />
            {!isFilterOpen ? <Cards allUsers={users} /> : <Mob_Filter allUsers={users} />}
        </div>
    )
}

export default Search_Index