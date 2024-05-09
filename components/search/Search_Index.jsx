"use client"
import Cards from "@/components/search/Cards"
import Filters from "@/components/search/Filters"
import { useStore } from "@/store/store"
import Mob_Filter from "@/components/search/Mob_Filter"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Countries } from "@/app/lib/constants"
import TinderSwipe from "./TinderSwipe"
import Loader from "../common/Loader"

const Search_Index = ({ allUsers, remainingList, user, myRecievedRequests }) => {

    const { state: { filterState: { isFilterOpen }, blockedUsersState }, dispatch } = useStore()

    const [users, setUsers] = useState([])
    const { register, handleSubmit, control, watch, setValue, reset } = useForm()
    const [dummyUsers, setDummyUsers] = useState([]);
    const [cities, setCities] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

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
            if (message.sender_id !== user.id) {
                otherIDsSet.add(message.sender_id);
            }
            if (message.receiver_id !== user.id) {
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
        const filteredUsers = users.filter(i => {
            let condition = true;
            if (name !== undefined) {
                condition = condition && i.username.toLowerCase().includes(name.toLowerCase());
            }
            if (age_from !== undefined) {
                condition = condition && i.age >= age_from;
            }
            if (age_to !== undefined) {
                condition = condition && i.age <= age_to;
            }
            if (sugar_type) {
                condition = condition && i.sugar_type === sugar_type;
            }
            if (country) {
                condition = condition && i.country === country;
            }
            if (region) {
                condition = condition && i.region === region;
            }
            if (has_profile_picture) {
                condition = condition && i.avatar_url;
            }
            if (has_public_photos) {
                condition = condition && i.get_all_profileimg.length > 0;
            }
            if (is_verified) {
                condition = condition && i.is_subscribe;
            }
            return condition;
        });
        setDummyUsers(filteredUsers)
        dispatch({ type: "Filter_Close" })
        setIsFiltered(true)
    };

    const handleReset = () => {
        reset()
        setValue("age_from", 18)
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

    // if (user) {
    return (
        <>

            {/* web view */}

            <div className="font-bold hidden md:flex md:h-dvh pt-0 md:pt-[66px] flex-col md:flex-row">
                <Filters allUsers={users} dummyUsers={dummyUsers} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} handleReset={handleReset} />
                <Cards allUsers={dummyUsers} />
            </div>

            {/* mobile view */}

            <div className={`${isFilterOpen ? "" : "h-dvh"} md:hidden`}>
                {
                    !isFiltered ? (
                        isFilterOpen ? <Mob_Filter handleReset={handleReset} allUsers={users} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} setDummyUsers={setDummyUsers} dummyUsers={dummyUsers} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} /> :
                            <TinderSwipe filterHandler={filterHandler} users={allUsers} remainingList={remainingList} currentUser={user} myRecievedRequests={myRecievedRequests} />
                    ) :
                        (
                            isFilterOpen ? <Mob_Filter handleReset={handleReset} allUsers={users} register={register} handleSubmit={handleSubmit} control={control} watch={watch} setValue={setValue} Controller={Controller} setDummyUsers={setDummyUsers} dummyUsers={dummyUsers} submitHandler={submitHandler} reset={reset} cities={cities} setCities={setCities} /> :
                                <Cards allUsers={dummyUsers} filterHandler={filterHandler} resetHandler={handleReset} />
                        )
                }
            </div>

        </>
    )
    // } else {
    //     return <Loader />
    // }

}

export default Search_Index