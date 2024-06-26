import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import arrow_left from "/public/assets/arrow_left.svg"
import { useStore } from '@/store/store'
import { block_user_action } from '@/app/lib/actions'
import { notification } from 'antd'
import { client_notification } from '@/app/lib/helpers'

const BlockList = ({ setProfileToggle, type, allUsers, socket, user, allStrings }) => {

	const [data, setData] = useState([])
	const { state: { blockedUsersState } } = useStore()
	const [api, contextHolder] = notification.useNotification()
	const [isLoading, setIsLoading] = useState([])

	useEffect(() => {
		const arr = allUsers.filter((i) => blockedUsersState.some(j => (j.receiver_id === i.id && j.sender_id === user.id && j.is_blocked === 1)))
		setData(arr)
	}, [blockedUsersState])

	const handleSubmit = async (id) => {
		const res = await block_user_action({ sender_id: user?.id, receiver_id: id, is_blocked: 0 })
		if (res.success) {
			client_notification(api, "topRight", "success", res.message, 4)
			socket.emit("user-unblocked", res.data)
		}
		setIsLoading(isLoading.filter(ele => ele !== id))
	}

	const getDateOfAccess = useMemo(() => (id) => {
		const blockedUser = blockedUsersState.find(i => i.receiver_id === id)

		const dataToCheck = blockedUser.time || blockedUser.updated_at
		if (dataToCheck) {
			const time = new Date(dataToCheck)
			return `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`
		}
		return "";
	}, [blockedUsersState]);

	return (
		<div id='blockList' className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[31px] sm:mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]">
			{contextHolder}
			<div className='w-full'>
				<div className='w-full hidden sm:flex flex-col items-center'>
					<div className='text-center text-white text-[30px] font-bold leading-[40px] relative flex items-center justify-center w-full'>
						<button className='absolute left-0' onClick={() => setProfileToggle("")}>
							<Image src={arrow_left} alt='' width={24} height={24} className='pointer-events-none' />
						</button>
						{type === "photo"
							? allStrings["string_manage_photo_requests"]
							: allStrings["string_manage_block_list"]
						}
					</div>
					<div className='text-center mt-[14px] text-[18px] font-light leading-[20px]'>
						{type === "photo"
							? allStrings["string_hear_you_can_remove_and_accept_requests_to_see_your_private_photos."]
							: allStrings["string_manage_your_blocked_profiles:_view_and_unblock_users_you've_previously_blocked"]
						}
					</div>
				</div>
				<div className='mt-[14px] sm:mt-[70px]'>
					<div className='text-[24px] sm:text-[20px] font-bold sm:font-normal leading-[normal] sm:leading-[20px]'>
						{type === "photo"
							? allStrings["string_your_accepted_request"]
							: allStrings["string_your_block_list"]
						}
					</div>
					<div className='flex sm:hidden mt-[10px] text-[13px] font-light leading-[normal] text-start'>
						{type === "photo"
							? allStrings["string_hear_you_can_remove_and_accept_requests_to_see_your_private_photos."]
							: allStrings["string_manage_your_blocked_profiles:_view_and_unblock_users_you've_previously_blocked"]
						}
					</div>
					<div className='my-6'>
						<table className='w-full border-0'>
							<thead>
								<tr className='bg-primary-dark h-[58px]'>
									<th className='text-start ps-4 sm:ps-0 sm:text-center text-[16px] font-normal leading-[20px] 2xl:text-start 2xl:ps-[100px]'>
										{allStrings["string_name"]}
									</th>
									<th className='text-center text-[16px] font-normal leading-[20px] 2xl:table-cell hidden'></th>
									<th className='text-center text-[16px] font-normal leading-[20px] hidden sm:table-cell'>
										{allStrings["string_created_on"]}
									</th>
									<th className='text-end pe-4 sm:text-center text-[16px] font-normal leading-[20px]'>
										{allStrings["string_actions"]}
									</th>
								</tr>
							</thead>
							<tbody>
								{data && data.length
									? <>
										{data.reverse().map((item, inx) => (
											<tr key={inx} className='bg-primary-dark-6 h-[70px] sm:h-[80px] px-10 w-full'>
												<td className='text-center h-full items-center '>
													<div className='sm:flex hidden ms-10 items-center'>
														{item.avatar_url
															? <Image src={item.avatar_url} alt='' height={50} width={50} className='rounded-full object-cover pointer-events-none h-[50px] w-[50px]' />
															: <div className='h-[50px] w-[50px] text-[25px] bg-secondary text-white flex justify-center items-center rounded-full'>{item.username.charAt(0)}</div>
														}
														<div className='ms-[14px] text-[20px] font-normal leading-[20px] flex items-center'>{item.username}</div>
													</div>
													<div className='sm:hidden flex ms-4 items-center'>
														{item.avatar_url
															? <Image src={item.avatar_url} alt='' height={50} width={50} className='rounded-full object-cover pointer-events-none h-[40px] w-[40px]' />
															: <div className='h-[40px] min-w-[40px] text-[24px] pt-1 bg-secondary text-white flex justify-center items-center rounded-full uppercase'>{item.username.charAt(0)}</div>
														}
														<div className='ms-[10px] flex flex-col items-start gap-y-1'>
															<div className='text-[17px] font-semibold leading-[20px]'>{item.username}</div>
															<div className='text-start text-[11px] font-normal leading-[normal]'>
																{type === "photo"
																	? `${item.username} ${allStrings["string_can_access_your_private_photos."]}`
																	: `${allStrings["string_you_have_blocked_the_profile_of"]} ${item.username}.`
																}
															</div>
														</div>
													</div>
												</td>
												<td className=' ps-6 h-full text-[18px] font-normal leading-[20px] 2xl:table-cell hidden '>
													{type === "photo"
														? `${item.username} ${allStrings["string_can_access_your_private_photos."]}`
														: `${allStrings["string_you_have_blocked_the_profile_of"]} ${item.username}.`
													}
												</td>
												<td className='text-center px-2 h-full text-[20px] font-normal leading-[20px] sm:table-cell hidden'>{getDateOfAccess(item.id)}</td>
												<td className='text-end pe-4 ps-2 sm:text-center sm:px-2 h-full sm:table-cell hidden'>
													<button className={`bg-danger px-4 py-[6px] text-[16px] font-medium rounded-[5px] leading-[20px] 2xl:ms-3 ${(isLoading.some(ele => ele === item.id)) && "pointer-events-none w-[95px]"}`} onClick={() => { handleSubmit(item.id); setIsLoading((prev) => [...prev, item.id]) }}>
														{(isLoading.some(ele => ele === item.id)) ? <span className='loader after:border-[10px] '></span> : allStrings["string_unblock"]}
													</button>
												</td>
												<td className='text-end pe-4 ps-2 sm:text-center sm:px-2 h-full table-cell sm:hidden'>
													<div className='flex flex-col items-end gap-y-3'>
														<div className='text-[11px] font-normal leading-[normal]'>{getDateOfAccess(item.id)}</div>
														<button className={`bg-danger w-[95px] py-[3px] text-[11px] sm:text-[16px] font-medium rounded-[5px] leading-[20px] ${(isLoading.some(ele => ele === item.id)) && "pointer-events-none w-[67.26px]"}`} onClick={() => { handleSubmit(item.id); setIsLoading((prev) => [...prev, item.id]) }}>
															{(isLoading.some(ele => ele === item.id)) ? <span className='loader after:border-[9px] '></span> : allStrings["string_unblock"]}
														</button>
													</div>
												</td>
											</tr>
										))}
									</>
									: <tr className='bg-primary-dark-6 h-[80px]'>
										<td colSpan={4} className='text-center'>{allStrings["string_no_data_found!"]}</td>
									</tr>
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlockList