"use client"
import Cards from "@/components/search/Cards"
import Filters from "@/components/search/Filters"
import { useStore } from "@/store/store"
import Mob_Filter from "@/components/search/Mob_Filter"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { Countries } from "@/app/lib/constants"
import SwipePage from "../discover/SwipePage"

const Search_Index = ({ allUsers }) => {

    const { state: { filterState: { isFilterOpen }, blockedUsersState, userState }, dispatch } = useStore()
    const [users, setUsers] = useState([])
    const { register, handleSubmit, control, watch, setValue, reset } = useForm()
    const [dummyUsers, setDummyUsers] = useState([]);
    const [cities, setCities] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

    const navigate = useRouter()

    const filterHandler = () => {
        if (isFilterOpen) {
            dispatch({ type: "Filter_Close" })
        } else {
            dispatch({ type: "Filter_Open" })
        }
    }

    useEffect(() => {
        const blockList = blockedUsersState.filter((i) => i.is_blocked === 1)
        const otherIDsSet = new Set();

        blockList.forEach(message => {
            if (message.sender_id !== userState.id) {
                otherIDsSet.add(message.sender_id);
            }
            if (message.receiver_id !== userState.id) {
                otherIDsSet.add(message.receiver_id);
            }
        });

        const otherIDs = Array.from(otherIDsSet);
        setUsers(allUsers.filter((i) => !otherIDs.some(j => j == i.id)))
    }, [blockedUsersState])

    const handleResize = () => {
        if (window.innerWidth > 768) {
            dispatch({ type: "Filter_Close" })
        }
    }

    useEffect(() => {
        setDummyUsers(users);
        handleResize()
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const submitHandler = ({ name, age_from, age_to, sugar_type, country, region, has_profile_picture, has_public_photos, is_verified }) => {
        const filteredUsers = users.filter(user => {
            let condition = true;
            if (name !== undefined) {
                condition = condition && user.username.toLowerCase().includes(name.toLowerCase());
            }
            if (age_from !== undefined) {
                condition = condition && user.age >= age_from;
            }
            if (age_to !== undefined) {
                condition = condition && user.age <= age_to;
            }
            if (sugar_type) {
                condition = condition && user.sugar_type === sugar_type;
            }
            if (country) {
                condition = condition && user.country === country;
            }
            if (region) {
                condition = condition && user.region === region;
            }
            if (has_profile_picture) {
                condition = condition && user.avatar_url;
            }
            if (has_public_photos) {
                condition = condition && user.get_all_profileimg.length > 0;
            }
            if (is_verified) {
                condition = condition && user.is_subscribe;
            }
            return condition;
        });
        setDummyUsers(filteredUsers)
        dispatch({ type: "Filter_Close" })
        setIsFiltered(true)
    };

    const handleReset = () => {
        reset()
        setValue("age_from", 1)
        setValue("age_to", 99)
        setDummyUsers(users)
        dispatch({ type: "Filter_Close" })
        setCities([])
        setIsFiltered(false)
    }

    useEffect(() => {
        if (watch("country")) {
            const city = Countries.find(i => i.name.toLowerCase() === watch("country")?.toLowerCase())?.cities
            setCities(city)
        }
    }, [watch("country")])

    useEffect(() => {
        setDummyUsers(users)
    }, [users])


    return (
        <>
            {/* <div className="font-bold md:h-dvh pt-0 md:pt-[66px] flex flex-col md:flex-row">
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
                <Filters allUsers={users} dummyUsers={dummyUsers} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} handleReset={handleReset} />
                {
                    !isFilterOpen ? getComponent()
                        :
                        <Mob_Filter handleReset={handleReset} allUsers={users} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} setDummyUsers={setDummyUsers} dummyUsers={dummyUsers} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} />
                }
            </div> */}

            {/* web view */}

            <div className="font-bold hidden md:flex md:h-dvh pt-0 md:pt-[66px] flex-col md:flex-row">
                <Filters allUsers={users} dummyUsers={dummyUsers} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} handleReset={handleReset} />
                <Cards allUsers={dummyUsers} />
            </div>

            {/* mobile view */}

            <div className={`${isFilterOpen ? "" : "h-dvh"} md:hidden`}>
                {
                    !isFiltered ? (isFilterOpen ? <Mob_Filter handleReset={handleReset} allUsers={users} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} setDummyUsers={setDummyUsers} dummyUsers={dummyUsers} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} /> :
                        <SwipePage allUsers={allUsers.slice(0, 10)} currentUser={userState} filterHandler={filterHandler} />) :
                        (
                            isFilterOpen ? <Mob_Filter handleReset={handleReset} allUsers={users} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} setDummyUsers={setDummyUsers} dummyUsers={dummyUsers} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} /> :
                                <Cards allUsers={dummyUsers} filterHandler={filterHandler} resetHandler={handleReset} />
                        )
                }
            </div>

        </>
    )
}

export default Search_Index