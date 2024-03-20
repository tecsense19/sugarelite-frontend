"use client"
import { private_image_access } from '@/app/lib/actions';
import { client_notification, socket_server } from '@/app/lib/helpers';
import { useStore } from '@/store/store';
import { ConfigProvider, Drawer, notification, } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client"
import Cross from "/public/assets/cross_icon.svg"

let socket;

const Notification = ({ open, setOpen, notifications, user, allUsers }) => {

	const onClose = () => {
		setOpen(false)
	}

	const { state: { userState }, dispatch } = useStore()
	const [api, contextHolder] = notification.useNotification();

	const [myNotifications, setMyNotifications] = useState(notifications.length ? notifications.filter((i) => i.receiver_id === user.id) : [])

	const [socketNotifications, setSocketNotifications] = useState([])


	const getTime = (id) => {
		const time = new Date(id)
		const today = new Date()
		const currDate = today.getDate()
		const notificationDate = time.getDate()
		const currMon = today.getMonth() + 1
		const notiMon = time.getMonth() + 1
		if ((currMon === notiMon)) {
			if (currDate === notificationDate) {
				const timeDiffInMilliseconds = today - time;
				const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));

				if (timeDiffInMinutes < 1) {
					return "just now";
				} else if (timeDiffInMinutes < 60) {
					return `${timeDiffInMinutes} Min`;
				} else {
					const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
					return `${timeDiffInHours} hrs`;
				}
			} else if ((currDate - 1) === notificationDate) {
				return `Yesterday`
			} else {
				return `${(currDate - notificationDate)} days`
			}
		}
	}

	const getUserData = (id, type) => {
		let value;
		if (type === "normal") {
			const res = getTime(id)
			return res
		} else if (type === "socket") {
			const res = getTime(new Date())
			return res
		}
		else {
			allUsers.forEach((i) => {
				if (i.id === id.sender_id) {
					value = i[type]
				}
			})
			return value
		}
	}
	useEffect(() => {
		socket = io(socket_server)
		socket.on("album-notification", (obj) => {
			if (user.id === obj.receiver_id) {
				console.log(obj)
				setSocketNotifications((prev) => [obj, ...prev])
			}
		})

		return () => {
			if (socket) {
				socket.disconnect()
			}
		}
	}, [socket])


	const acceptHandler = async (id, type) => {
		if (userState.username && type !== "socket") {
			const res = await private_image_access({ request_id: id, is_approved: 1 })
			console.log(id)
			console.log(res)
			if (res.success) {
				const arr = myNotifications.filter((i) => i.id !== id)
				setMyNotifications(arr)
				client_notification(api, "topRight", "success", res?.message, 3)
				// socket.emit("album-access", { userId: id, sender_id: userState.id, type: "accept" })
			}
		} else if (userState.username && type === "socket") {

			const res = await private_image_access({ request_id: id, is_approved: 1 })
			console.log(res)
			if (res.success) {
				const arr = socketNotifications.filter((i) => i.id !== id)
				setSocketNotifications(arr)
				client_notification(api, "topRight", "success", res?.message, 3)
				// socket.emit("album-access", { userId: id, sender_id: userState.id, type: "accept" })
			}
		}
	}

	const declineHandler = async (id, type) => {
		if (type === "normal") {
			const res = await private_image_access({ sender_id: userState.id, receiver_id: id, is_approved: 0 })
			if (res.success) {
				const arr = myNotifications.filter((i) => i.sender_id !== id)
				client_notification(api, "topRight", "success", res?.message, 3)
				setMyNotifications(arr)
				socket.emit("album-access", { userId: id, sender_id: userState.id, type: "decline" })
			}
		} else {
			const res = await private_image_access({ sender_id: userState.id, receiver_id: id, is_approved: 0 })
			if (res.success) {
				const arr = socketNotifications.filter((i) => i !== id)
				client_notification(api, "topRight", "success", res?.message, 3)
				setSocketNotifications(arr)
				socket.emit("album-access", { userId: id, sender_id: userState.id, type: "decline" })
			}
		}
	}


	return (
		<div className={`fixed md:top-[66px] bottom-0 right-0 w-full z-[10] h-full md:h-[calc(100%-66px)] transition-transform duration-300 ease-out origin-right ${open ? "scale-x-1" : "scale-x-0"}`}>
			{contextHolder}

			<ConfigProvider
				theme={{
					components: {
						Drawer: {
							zIndexPopup: 0
						}
					},
					token: {
						colorBgElevated: "#1F1F1F",
						colorBgMask: "transparent",
						paddingLG: "0",
					},
				}}
			>
				<Drawer getContainer={false} closable={false} onClose={onClose} open={open} className='text-white' zIndex={0} >
					{(myNotifications.length || socketNotifications.length) ?
						<>
							<div className='text-[26px] font-bold leading-[30px] px-[30px] py-[20px] flex items-center justify-between'>Notification <Image src={Cross} width={30} height={30} alt='cross' className='md:hidden cursor-pointer' onClick={() => dispatch({ type: "Close_Notification", payload: false })} /></div>
							<div className='flex flex-col'>
								{
									socketNotifications.length ? socketNotifications.map((i, inx) => {
										return <div className='w-full h-[150px] px-[30px] py-[18px]' key={inx}>
											<div className='flex items-start gap-[29px]'>
												<div className='flex  gap-4'>
													{getUserData(i, "avatar_url") ?
														<Image src={getUserData(i, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full  min-w-[50px] max-h-[50px]' /> : <>
															<p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px]'>{getUserData(i, "username").charAt(0)}</p>
														</>
													}
													<div>
														<p className='text-[20px] font-semibold leading-[20px]'>{getUserData(i, "username")}</p>
														<p className='text-[16px] font-light leading-[20px]  mt-[6px]'>{getUserData(i, "username")} has requested permission to view your profile photo.</p>
														<div className='mt-[14px] flex gap-[10px]'>
															<button className='py-[6px] rounded-[5px] px-4 text-white bg-secondary text-[14px] font-medium leading-[20px] transition-all duration-150 ease-linear hover:scale-105' onClick={() => acceptHandler(i.id, "socket")}>Accept</button>
															<button className='py-[6px] rounded-[5px] px-4 bg-black transition-all duration-150 ease-linear hover:scale-105' onClick={() => declineHandler(i.id, "socket")}>Decline</button>
														</div>
													</div>
												</div>
												<div className='flex flex-col items-center  min-w-[80px]'>
													<p className='text-[16px] font-medium leading-[20px]'>{getUserData(i, "socket")}</p>
													<p className='mt-5 h-[9px] w-[9px] rounded-full bg-secondary text-center'></p>
												</div>
											</div>
										</div>
									}) : <></>
								}
								{
									(myNotifications)
										? myNotifications && myNotifications.map((i, inx) => {
											return (
												<div className='w-full h-[150px] px-[30px] py-[18px]' key={inx}>
													<div className='flex items-start justify-between gap-[29px]'>
														<div className='flex  gap-4'>
															{getUserData(i, "avatar_url") ?
																<Image src={getUserData(i, "avatar_url")} width={50} height={50} alt='icon' className='rounded-full min-w-[50px] max-h-[50px]' /> : <>
																	<p className='h-[50px] min-w-[50px] rounded-full bg-primary flex justify-center items-center text-[22px]'>{getUserData(i, "username").charAt(0)}</p>
																</>
															}
															<div>
																<p className='text-[20px] font-semibold leading-[20px]'>{getUserData(i, "username")}</p>
																<p className='text-[16px] font-light leading-[20px]  mt-[6px]'>{getUserData(i, "username")} has requested permission to view your profile photo.</p>
																<div className='mt-[14px] flex gap-[10px]'>
																	<button className='py-[6px] rounded-[5px] px-4 text-white bg-secondary text-[14px] font-medium transition-all duration-150 ease-linear hover:scale-105 leading-[20px]' onClick={() => acceptHandler(i.id, "normal")}>Accept</button>
																	<button className='py-[6px] rounded-[5px] px-4 bg-black transition-all duration-150 ease-linear hover:scale-105' onClick={() => declineHandler(i.id, "normal")}>Decline</button>
																</div>
															</div>
														</div>
														<div className='flex flex-col items-center min-w-[55px]'>
															<p className='text-[16px] font-medium leading-[20px] '>{getUserData(i.updated_at, "normal")}</p>
															<p className='mt-5 h-[9px] w-[9px] rounded-full bg-secondary text-center'></p>
														</div>
													</div>

												</div>
											)
										})
										: <></>
								}
							</div>
						</>
						:
						<div className='w-full text-center h-full text-[20px]  px-[10px] py-[18px]'>
							<div className='text-[26px] font-bold leading-[30px] px-[10px] py-[0px] flex md:hidden items-center justify-between'>
								Notification
								<Image src={Cross} width={30} height={30} alt='cross' className='md:hidden cursor-pointer' onClick={() => dispatch({ type: "Close_Notification", payload: false })} />
							</div>
							<div className='h-[calc(100%-70px)] flex justify-center items-center w-full font-semibold'>
								You are completely up to Date !
							</div>
						</div>
					}
				</Drawer>
			</ConfigProvider>

		</div>
	)
}

export default Notification