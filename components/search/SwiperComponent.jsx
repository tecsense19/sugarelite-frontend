import React, { useEffect, useState } from 'react'
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import heartIcon from "/public/assets/heart_swipe_icon.svg";
import premiumUserIcon from "/public/assets/crown_yellow_icon.svg";
import closeIcon from "/public/assets/cross_icon.svg";
import closeSecondaryIcon from "/public/assets/cross_secondary.svg";
import Image from 'next/image';
import { useStore } from '@/store/store';
import './animations/style.css'
import { friend_request_action } from '@/app/lib/actions';

const SwiperComponent = ({ users, toggle, setOffSet, remainingList, socket, currentUser }) => {
    const [user, setUsers] = useState(remainingList)
    const { state: { onlineUsers }, dispatch } = useStore()
    const [showLike, setShowLike] = useState({ id: null, d: null })

    const resetHandler = () => {
        setUsers(users);
        setTimeout(() => {
            handleSetCards()
        }, 500)
    }

    useEffect(() => {
        // console.log(remainingList)
    }, [remainingList])

    useEffect(() => {
        // setUsers(users)
        handleSetCards()
    }, [])

    const sendFriendReq = async (receiver_id) => {
        const res = await friend_request_action({ receiver_id: receiver_id, sender_id: currentUser.id, is_approved: 0 })
        if (res.success) {
            socket.emit("card-swiped", res.data)
            dispatch({ type: "Add_Sended_Request", payload: { id: res.data.receiver_id } })
        }
    }

    const handleSetCards = () => {
        const Swing = require("swing")
        const config = {
            throwOutConfidence: (xOffset, yOffset, element) => {
                const xConfidence = Math.abs(xOffset) >= 120 ? 1 : Math.abs(xOffset) / element.offsetWidth;
                const yConfidence = Math.abs(yOffset) >= 120 ? 1 : Math.abs(yOffset) / element.offsetHeight;
                return Math.max(xConfidence, yConfidence);
            },
            allowedDirections: [Swing.Direction.LEFT, Swing.Direction.RIGHT],
            minThrowOutDistance: 2000,
            maxThrowOutDistance: 2000
        };
        const cards = [].slice.call(document.querySelectorAll('.card'));

        if (cards.length) {
            const Direction = Swing.Direction
            const stack = Swing.Stack(config)
            cards.forEach((targetElement, index) => {
                stack.createCard(targetElement);
            });

            stack.on('throwout', (event) => {
                const id = event.target.id
                const profile = remainingList.find(i => i.id === parseInt(id))
                // console.log(`You ${(event.throwDirection == Direction.LEFT ? 'removed' : 'liked')} ${profile.username} profile`)
                if (event.throwDirection == Direction.RIGHT) {
                    sendFriendReq(profile.id)
                }
                setUsers(prev => prev.filter(i => i.id !== parseInt(id)))
            });

            stack.on("dragmove", (e) => {
                if (e.offset > 0) {
                    setOffSet("right")
                    setShowLike({ id: parseInt(e.target.id), d: "right" })
                } else if (e.offset < 0) {
                    setOffSet("left")
                    setShowLike({ id: parseInt(e.target.id), d: "left" })
                }
            })
            stack.on("dragend", (e) => {
                setOffSet(null)
                setShowLike({ id: null, d: null })
            })
        }
    }

    const handleClick = (type, id) => {
        const card = document.getElementById(id)
        const profile = users.find(i => i.id === parseInt(id))

        if (type === "like") {
            setShowLike({ id: parseInt(id), d: "right" })
            card.style.transition = "transform 1s ease-out";
            sendFriendReq(profile.id);
            card.style.transform = "translateX(1000px) translateY(100px) rotate(70deg)";
            console.log(`You liked ${profile.username} profile`)
        } else {
            setShowLike({ id: parseInt(id), d: "left" })
            card.style.transition = "transform 1s ease-out";
            card.style.transform = "translateX(-1000px) translateY(100px) rotate(-70deg)";
            console.log(`You removed ${profile.username} profile`)
        }
        setTimeout(() => {
            setOffSet(null)
            setUsers(prev => prev.filter(i => i.id !== parseInt(id)))
            setShowLike({ id: null, d: null })
        }, 500)
    }

    return (
        <div className={`h-[calc(100%-88px)] justify-center items-center w-full transition-opacity duration-[.1s] ease-in-out ${toggle ? "hidden" : "flex"}`}>
            <div className='relative max-w-[500px] max-h-[800px] h-[calc(100dvh-180px)] w-[calc(100vw-60px)] text-black'>
                {
                    user.length ?
                        user.map((profile, inx) => {
                            return (
                                <div key={inx} id={profile.id} className='absolute inset-0 rounded-[10px] h-full w-full card overflow-hidden'>
                                    <div className='relative h-full'>
                                        <div className='h-full w-full absolute flex justify-center items-center bg-primary-dark-5'>
                                            {profile.avatar_url ? (
                                                <Image src={profile.avatar_url} alt={profile.username} width={1000} height={1000} className='h-full select-none touch-none w-full object-cover rounded-xl pointer-events-none' />
                                            ) : (
                                                <Image src={getPlaceholder(profile.sugar_type)} unoptimized alt={profile.username} width={1000} height={1000} className='pointer-events-none ' />
                                            )}
                                        </div>
                                        <div className='discover-card-bg h-full w-full absolute flex flex-col text-white p-4 justify-end'>
                                            <div className="flex items-center gap-x-[11px]">
                                                <div className='text-[clamp(19px,2vw,22px)] leading-[22px] font-bold'>{profile.username},{profile.age}</div>
                                                {(profile.is_subscribe === 1 && profile.is_subscription_stop === 0 && profile.is_subscription_cancel === 0)
                                                    ? <Image src={premiumUserIcon} alt="" height={24} width={24} priority className="pointer-events-none" />
                                                    : <></>
                                                }
                                            </div>
                                            <div className="mt-[5px] text-[clamp(14px,1.5vw,15px)] leading-[14px] font-medium text-white/50">{profile.region}</div>
                                        </div>
                                        <div className='absolute bottom-4 text-white right-4 flex flex-col gap-y-3'>
                                            <button className='bg-white/50 rounded-full h-[48px] w-[48px] flex' onClick={() => handleClick('close', profile.id)}>
                                                <Image src={closeIcon} alt="" height={24} width={22} priority className="pointer-events-none h-[24px] m-auto w-[22px] aspect-auto" />
                                            </button>
                                            <button className='bg-secondary rounded-full w-[48px] h-[48px] flex' onClick={() => handleClick('like', profile.id)}>
                                                <Image src={heartIcon} alt="" height={24} width={22} priority className="pointer-events-none h-[24px] m-auto w-[22px] aspect-auto" />
                                            </button>
                                        </div>
                                        <div className={`absolute left-3 top-3 -rotate-[25deg] pointer-events-none p-4 rounded-full aspect-square flex justify-center items-end transition-all duration-300 ${(profile.id === showLike?.id && showLike?.d === "right" ? "bg-secondary/80" : "bg-none")}`}>
                                            <Image src={heartIcon} alt='' height={50} width={50} className={`pointer-events-none transition-all duration-300 ${(profile.id === showLike?.id && showLike?.d === "right" ? "scale-100" : "scale-0")}`} />
                                            {/* <div class="bouncing-text tracking-wider">
                                                <div class="b">L</div>
                                                <div class="o">I</div>
                                                <div class="u">K</div>
                                                <div class="n">E</div>
                                                <div class="shadow"></div>
                                            </div> */}
                                        </div>
                                        <div className={`absolute right-3 top-3 rotate-[25deg] pointer-events-none p-4 rounded-full transition-all duration-300 ${(profile.id === showLike?.id && showLike?.d === "left" ? "bg-gray-500/50" : "bg-none")}`}>
                                            <Image src={closeSecondaryIcon} alt='' height={50} width={50} className={`pointer-events-none transition-all duration-300 ${(profile.id === showLike?.id && showLike?.d === "left" ? "scale-100" : "scale-0")}`} />
                                            {/* <div class="bouncing-text tracking-wider">
                                                <div class="b N">N</div>
                                                <div class="o O">O</div>
                                                <div class="u P">P</div>
                                                <div class="n E">E</div>
                                                <div class="shadow"></div>
                                            </div> */}
                                        </div>
                                        {
                                            (onlineUsers.some(i => i === profile.id)) && <div className='absolute right-3 top-3 h-[13.2px] w-[13px] border-[2px] border-white bg-success rounded-full'></div>
                                        }
                                    </div>
                                </div>
                            )
                        }) : <div className='text-white flex items-center justify-center h-full w-full'>
                            <p className='py-1 px-6 bg-secondary rounded-[10px] ' onClick={resetHandler}>Reset</p>
                        </div>
                }
            </div>
        </div>
    )
}

const getPlaceholder = (sugarType) => {
    if (sugarType === "EliteDaddy" || sugarType === "EliteBoy") {
        return manPlaceolderImg;
    } else if (sugarType === "EliteMama" || sugarType === "EliteBabe") {
        return womanPlaceolderImg;
    } else {
        return placeholder;
    }
};

export default SwiperComponent