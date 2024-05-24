import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import No_Request from "/public/assets/Chat-amico_1.svg"
import womanPlaceolderImg from "/public/assets/woman.png";
import manPlaceolderImg from "/public/assets/man.png";
import placeholder from "/public/assets/place_holder.png";
import heartIcon from "/public/assets/heart_swipe_icon.svg";
import premiumUserIcon from "/public/assets/crown_yellow_icon.svg";
import closeIcon from "/public/assets/cross_icon.svg";
import closeSecondaryIcon from "/public/assets/cross_secondary.svg";
import request_placeholder_image from "/public/assets/request_placeholder_image.svg";
import LoveLock from "/public/assets/lock.png";
import { useStore } from '@/store/store';
import { friend_request_action } from '@/app/lib/actions';
import Stroke_Online from '/public/assets/online_stroke.svg'
import Link from 'next/link';
import { client_routes } from '@/app/lib/helpers';

const RequestsComponent = ({ toggle, myRecievedRequests, currentUser, socket }) => {

	const [users, setUsers] = useState(myRecievedRequests)
	const { state: { onlineUsers, requestsState, notificationState }, dispatch } = useStore()
	const [showLike, setShowLike] = useState({ id: null, d: null })

	useEffect(() => {
		handleSetCards()
	}, [])



	const acceptReq = async (receiver_id) => {
		const res = await friend_request_action({ receiver_id: receiver_id, sender_id: currentUser.id, is_approved: 1 })
		if (res.success) {
			socket.emit("card-swiped", res.data)
			dispatch({ type: "Add_Accepted_Request", payload: { id: receiver_id } })
			dispatch({ type: "Remove_Friend_Request", payload: res.data })
		}
	}

	const declineReq = async (receiver_id) => {
		console.log(receiver_id, currentUser.id)
		const res = await friend_request_action({ receiver_id: receiver_id, sender_id: currentUser.id, is_approved: 2 })
		if (res.success) {
			socket.emit("card-swiped", res.data)
			dispatch({ type: "Remove_Friend_Request", payload: res.data })
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
		const cards = [].slice.call(document.querySelectorAll('.card-request'));

		if (cards.length) {
			const Direction = Swing.Direction
			const stack = Swing.Stack(config)
			cards.forEach((targetElement, index) => {
				stack.createCard(targetElement);
			});

			stack.on('throwout', (event) => {
				const id = event.target.id
				const profile = myRecievedRequests.find(i => i.id === parseInt(id))
				console.log(`You ${(event.throwDirection == Direction.LEFT ? 'removed' : 'liked')} ${profile.username} profile`)
				if (event.throwDirection == Direction.RIGHT) {
					acceptReq(profile.id)
				} else {
					declineReq(profile.id)
				}

				setUsers(prev => prev.filter(i => i.id !== parseInt(id)))
			});

			stack.on("dragmove", (e) => {
				if (e.offset > 0) {
					setShowLike({ id: parseInt(e.target.id), d: "right" })
				} else if (e.offset < 0) {
					setShowLike({ id: parseInt(e.target.id), d: "left" })
				}
			})
			stack.on("dragend", (e) => {
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
			card.style.transform = "translateX(1000px) translateY(100px) rotate(70deg)";
			console.log(`You liked ${profile.username} profile`)
		} else {
			setShowLike({ id: parseInt(id), d: "left" })
			card.style.transition = "transform 1s ease-out";
			card.style.transform = "translateX(-1000px) translateY(100px) rotate(-70deg)";
			console.log(`You removed ${profile.username} profile`)
		}
		setTimeout(() => {
			setUsers(prev => prev.filter(i => i.id !== parseInt(id)))
			setShowLike({ id: null, d: null })
		}, 500)
	}

	return (
		<div className={`h-[calc(100%-88px)] justify-center items-center w-full transition-opacity duration-[.1s] ease-in-out ${!toggle ? "hidden" : "flex"}`}>
			{users.length
				? <>
					{(currentUser.is_subscribe === 1 && currentUser.is_subscription_stop === 0 && currentUser.is_subscription_cancel === 0)
						? <div className='relative max-w-[500px] max-h-[800px] h-[calc(100dvh-180px)] w-[calc(100vw-60px)] text-black'>
							{
								users.map((profile, inx) => {
									return (
										<div key={inx} id={profile.id} className='absolute inset-0 rounded-[10px] h-full w-full card-request overflow-hidden'>
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
												</div>
												<div className={`absolute right-3 top-3 rotate-[25deg] pointer-events-none p-4 rounded-full transition-all duration-300 ${(profile.id === showLike?.id && showLike?.d === "left" ? "bg-gray-500/50" : "bg-none")}`}>
													<Image src={closeSecondaryIcon} alt='' height={50} width={50} className={`pointer-events-none transition-all duration-300 ${(profile.id === showLike?.id && showLike?.d === "left" ? "scale-100" : "scale-0")}`} />
												</div>
												{
													(onlineUsers.some(i => i === profile.id)) && <div className='absolute right-3 top-3 h-[13.2px] w-[13px] border-[2px] border-white bg-success rounded-full'></div>
												}
											</div>
										</div>
									)
								})
							}
						</div>
						: <div className='relative max-w-[500px] max-h-[800px] h-[calc(100dvh-180px)] w-[calc(100vw-60px)] flex flex-col justify-between'>
							<div className='w-full'>
								<div className='grid gap-x-4 grid-cols-2'>
									{[...Array(2)].map((_, index) => (
										<div key={index} className='relative rounded-[5px] overflow-hidden'>
											<Image src={request_placeholder_image} alt='' height={1000} width={1000} className='pointer-events-none rounded-[5px] w-full' />
											<div className='absolute blur-image top-0 left-0 w-full h-full px-3 py-4 flex flex-col justify-end'>
												<div className='flex items-center gap-x-[6px]'>
													<Image src={Stroke_Online} alt='' height={10} width={10} className='pointer-events-none rounded-full mb-[2px]' />
													<div className='text-[12px] font-medium leading-[12px]'>Recently Active</div>
												</div>
											</div>
										</div>
									))}
								</div>
								<div className='mt-[30px] text-center'>
									Upgrade your plan to see people who already like you.
								</div>
							</div>
							<div className='flex justify-center items-center'>
								<Link href={client_routes.subscription} className='py-[13px] px-7 bg-secondary rounded-[5px] text-[18px] font-700 leading-[20px]'>Upgrade Your Plan</Link>
							</div>
							{/* <div className='px-8 leading-[20px] font-semibold text-[18px] rounded-[10px] text-black text-center flex flex-col gap-y-2 absolute top-1/2 -translate-y-1/2 justify-center items-center h-full background-no'>
								<p>
									🔓 You've got a hidden gem waiting for you! To reveal their profile and kickstart a conversation, you just need to upgrade to our premium plan. Don't miss out on this exciting opportunity to connect with someone special. Subscribe now and let the magic begin! ✨💬
								</p>
								<button className='bg-white py-2 px-5 rounded-[5px] mt-2'>Subscribe</button>
							</div>
							<div className='h-full w-full bg-white/30 rounded-[10px] flex justify-center items-center'>
								<Image src={womanPlaceolderImg} alt='no' width={280} height={180} className='opacity-10' />
							</div> */}
						</div>
					}
				</>
				: <div className={`h-[calc(100%-88px-123px)] mt-[-5rem] items-center flex-col justify-center px-4 w-full ${!toggle ? "hidden" : "flex"}`}>
					<Image src={No_Request} alt='no' width={180} height={180} className='' />
					<p className='font-[400] text-[18px] mt-1'>No requests yet</p>
					<p className='px-8 leading-[20px] font-light text-[16px] mt-1 text-white/60 text-center flex flex-col gap-y-2'>
						<span>Don't worry though, your charm is just waiting for the right match to come along and light up your notifications!</span>
						<span>✨ Keep shining ✨</span>
					</p>
				</div>
			}
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

export default RequestsComponent