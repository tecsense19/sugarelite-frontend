import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import heartIcon from "/public/assets/heart_swipe_icon.svg";
import premiumUserIcon from "/public/assets/premium_user_icon.svg";
import closeIcon from "/public/assets/cross_icon.svg";
import Image from 'next/image';
import { useStore } from '@/store/store';

const SwiperComponent = ({ users }) => {
    const [user, setUsers] = useState(users)
    const { state: { onlineUsers } } = useStore()

    const resetHandler = () => {
        setUsers(users)

    }

    useEffect(() => {
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

        const Direction = Swing.Direction
        const stack = Swing.Stack(config)
        const cards = [].slice.call(document.querySelectorAll('.card'));

        cards.forEach((targetElement, index) => {
            stack.createCard(targetElement);
        });

        stack.on('throwout', (event) => {
            const id = event.target.id
            const profile = users.find(i => i.id === parseInt(id))
            console.log(`You ${(event.throwDirection == Direction.LEFT ? 'removed' : 'liked')} ${profile.username} profile`)
            setUsers(prev => prev.filter(i => i.id !== parseInt(id)))
        });

    }, [])


    const handleClick = (type, id) => {
        const card = document.getElementById(id)
        const profile = users.find(i => i.id === parseInt(id))

        if (type === "like") {
            card.style.transition = "transform .6s ease-out";
            card.style.transform = "translateX(1000px) translateY(100px) rotate(70deg)";
            console.log(`You liked ${profile.username} profile`)
        } else {
            card.style.transition = "transform .6s ease-out";
            card.style.transform = "translateX(-1000px) translateY(100px) rotate(-70deg)";
            console.log(`You removed ${profile.username} profile`)
        }
        setTimeout(() => {
            setUsers(prev => prev.filter(i => i.id !== parseInt(id)))
        }, 100)
    }

    return (
        <div className='h-[calc(100%-88px)] flex justify-center items-center w-full transition-opacity duration-[.1s] ease-in-out' data-aos="fade-up" data-aos-duration="800">
            <div className='relative max-w-[500px] max-h-[800px] h-[calc(100dvh-224px)] w-[calc(100vw-60px)] text-black'>
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
                                                <Image src={getPlaceholder(profile.sugar_type)} alt={profile.username} width={1000} height={1000} className='pointer-events-none ' />
                                            )}
                                        </div>
                                        <div className='discover-card-bg h-full w-full absolute flex flex-col text-white p-4 justify-end'>
                                            <div className="flex items-center gap-x-[11px]">
                                                <div className='text-[clamp(19px,2vw,22px)] leading-[22px] font-bold'>{profile.username},{profile.age}</div>
                                                {profile.is_subscribe === 1 && <Image src={premiumUserIcon} alt="" height={24} width={24} priority className="pointer-events-none" />}
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
                                        {
                                            (onlineUsers.some(i => i === profile.id)) && <div className='absolute right-3 top-3 h-[13.2px] w-[13px] border-[2px] border-white bg-success rounded-full'></div>
                                        }
                                    </div>
                                </div>
                            )
                        }) : <div className='text-white flex items-center justify-center h-full w-full '>
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