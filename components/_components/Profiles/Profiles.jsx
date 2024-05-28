import React, { useEffect, useMemo, useState } from 'react'
import AdminProfie from './AdminProfie'
import UserComponent from './UserComponent';
import searchIcon from "/public/assets/home_search_icon.svg"
import Image from 'next/image';

const Profiles = ({ messages, user, allUsers, setShowMobileChatContent, supportChat, allStrings }) => {

    const [isSearch, setIsSearch] = useState(false)
    const [searchVal, setSearchVal] = useState('')

    const sortUsersByLatestMessage = ((chat, currentUser) => {
        const userMessages = {};
        chat.forEach(message => {
            const otherUserId = message.sender_id === currentUser.id ? message.receiver_id : message.sender_id;
            if (!userMessages[otherUserId] || userMessages[otherUserId].milisecondtime < message.milisecondtime) {
                userMessages[otherUserId] = message;
            }
        });
        const arr = Object.values(userMessages).sort((a, b) => b.milisecondtime - a.milisecondtime)
        const finArr = arr.map(i => {
            const id = i.sender_id === user.id ? i.receiver_id : i.sender_id
            const username = allUsers.find(u => u.id === id).username
            return { ...i, username }
        })
        // return Object.values(userMessages).sort((a, b) => b.milisecondtime - a.milisecondtime);
        return finArr
    });

    return (
        <>
            <div className="mt-5 px-4 md:mt-[30px] md:px-[30px] relative">
                <div className='flex items-center justify-between '>
                    <div className="text-[20px] md:text-[26px] font-semibold md:font-bold leading-[30px]">{allStrings["string_my_chat_list"]}</div>
                    <Image height={18} width={25} src={searchIcon} alt="search" className=" cursor-pointer" priority onClick={() => { setSearchVal(''); setIsSearch(!isSearch) }} />
                </div>
                <div className={`h-10 rounded-[5px] overflow-hidden mt-2 mb-3 text-black transition-all duration-150 ease-linear origin-top ${isSearch ? "scale-y-100" : "scale-y-0"}`}>
                    <input type="text" placeholder={`${allStrings["string_search"]}...`} value={searchVal} className='h-full rounded-[5px] overflow-hidden w-full p-2 outline-none' onChange={(e) => setSearchVal(e.target.value)} />
                </div>
            </div>
            <div className={`flex flex-col mt-[10px] md:mt-5 gap-y-[10px] md:gap-y-4 overflow-y-auto h-[calc(100%-190px)] md:h-[calc(100%-170px)] ps-4 px- md:ps-[30px] me-0 pe-4 md:me-[18px] md:pe-3 pb-8 md:pb-3 second-child transition-all duration-150 ease-linear ${isSearch ? "translate-y-0" : "-translate-y-10 pb-12"}`} style={{ scrollbarWidth: "none" }}>
                <AdminProfie message={supportChat[supportChat.length - 1]} setShowMobileChatContent={setShowMobileChatContent} allStrings={allStrings} />
                {/* {console.log(sortUsersByLatestMessage(messages, user))} */}
                {
                    sortUsersByLatestMessage(messages, user).length ? sortUsersByLatestMessage(messages, user).filter(i => i.username.toLowerCase().includes(searchVal.toLowerCase())).map((latestMessage, index) => {
                        const otherUserId = latestMessage.sender_id === user.id ? latestMessage.receiver_id : latestMessage.sender_id;
                        const foundUser = allUsers.find(user => user.id === otherUserId);
                        return <UserComponent key={index} latestMessage={latestMessage} foundUser={foundUser} setShowMobileChatContent={setShowMobileChatContent} user={user} allStrings={allStrings} />
                    }) : ""
                }
            </div>
        </>
    )
}

export default React.memo(Profiles)