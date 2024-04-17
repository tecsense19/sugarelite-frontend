import React from 'react'
import UserComponent from './UserComponent'

const Profiles = ({ profileList, unReadCount, isTyping }) => {
    return (
        <>
            <div className="mt-5 px-4 md:mt-[30px] md:px-[30px]">
                <div className="text-[20px] md:text-[26px] font-semibold md:font-bold leading-[30px]">My Chat List</div>
            </div>
            <div className="flex flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100%-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 md:me-3 md:pe-3 second-child" style={{ scrollbarWidth: "none" }}>
                {profileList.map((item, inx) => (
                    <UserComponent key={inx} user={item.profile} message={item.messages} unReadCount={unReadCount} isTyping={isTyping} />
                ))}
            </div>

        </>
    )
}

export default Profiles