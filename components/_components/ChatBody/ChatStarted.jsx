import Image from 'next/image'
import React from 'react'

const ChatStarted = ({ messages, user, toUser, allStrings }) => {
    if (messages.length) {
        if (user.is_friends.some(i => i.user_id === toUser.id) || messages[0].status === "new") {
            const msg = messages.find(i => i.status === "new")
            return <div className='w-full flex flex-col gap-y-3 justify-center items-center pb-8'>
                {/* <div className=" relative flex justify-center w-full ">
                    <p className="absolute top-1/2 z-[0] -translate-y-1/2 bg-white/30 h-[1px] w-full"></p>
                    <p className='text-center font-medium bg-primary z-[1] px-2 text-[14px] md:text-[18px] leading-[20px] text-white/50'>
                        {new Date(parseInt(msg.milisecondtime)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div> */}
                <p className='text-secondary text-[20px]'>{allStrings["string_it's_a_match"]}</p>
                <div className='flex justify-center items-start relative'>
                    <div>
                        {user.avatar_url ? (
                            <Image src={user.avatar_url} height={1000} width={500} alt="avatar" className=" h-[60px] w-[60px] md:h-[80px] md:min-w-[80px] object-cover rounded-full" />
                        ) : (
                            <p className="uppercase flex justify-center items-center h-[60px] w-[60px] md:h-[80px] md:min-w-[80px] rounded-full bg-primary-dark text-[20px]">{user.username.charAt(0)}</p>
                        )}
                    </div>
                    <div className='-ms-5'>
                        {toUser.avatar_url ? (
                            <Image src={toUser.avatar_url} height={80} width={80} alt="avatar" className="h-[60px] w-[60px] md:h-[80px] md:min-w-[80px]  object-cover rounded-full" />
                        ) : (
                            <p className="uppercase flex justify-center items-center h-[60px] w-[60px] md:h-[80px] md:min-w-[80px] rounded-full bg-primary-dark text-[20px]">{toUser.username.charAt(0)}</p>
                        )}
                    </div>
                </div>
                <p>{allStrings["string_you_and"]} {toUser.username} {allStrings["string_have_liked_each_other"]}</p>
            </div>
        }
        return (
            <div className='w-full flex flex-col justify-center items-center pb-4 pt-6'>
                <p className='uppercase text-white/70 text-center'>{user.id === messages[0].sender_id ? "you" : toUser.username} {allStrings["string_started_a_conversation_with"]} {user.id === messages[0].sender_id ? toUser.username : "You"}.</p>
            </div>
        )
    }
}

export default ChatStarted