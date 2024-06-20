"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LOGO from '/public/new_assets/new_logo.svg'
import BANNER_IMG from '/public/new_assets/new_banner_img.svg'
import { client_routes } from '@/app/lib/helpers'
import upArrowIcon from "../../public/assets/up_arrow.svg";

const NewBanner = ({ user, allStrings }) => {

	const [headerBg, setHeaderBg] = useState(false);
	const [showScrollTopBtn, setShowScrollTopBtn] = useState(false)

	useEffect(() => {
		scrollEventHandler();
		window.addEventListener("scroll", () => {
			scrollEventHandler();
		})
	}, [])

	const scrollEventHandler = () => {
		if (window.scrollY > 10) {
			setHeaderBg(true);
		} else {
			setHeaderBg(false);
		}
		if (window.scrollY > 300) {
			setShowScrollTopBtn(true)
		} else {
			setShowScrollTopBtn(false)
		}
	}

	const handleReadMoreClick = () => {
		const targetElement = document.getElementById("services_container")
		if (targetElement) {
			const elementOffsetTop = targetElement.getBoundingClientRect().top;
			window.scrollTo({ top: elementOffsetTop, left: 0, behavior: 'smooth' });
		}
	}

	const handleScrollTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
	}

	return (
		<>
			<div className={`w-full flex flex-col items-center fixed transition-all ease-linear duration-200 z-[1] ${headerBg ? "bg-white shadow" : "bg-transparent"}`}>
				<header className='h-[65px] md:h-[85px] flex justify-between items-center w-11/12 xl:w-9/12'>
					<Link href={user ? client_routes.profile : client_routes.home}>
						<Image src={LOGO} alt="logo" height={1000} width={1000} className="pointer-events-none select-none h-[30px] w-[120px] md:h-[47px] md:w-[237px]" priority />
					</Link>
					{user
						? <Link href={client_routes.profile} className="inline-flex justify-center items-center transition-all duration-150 hover:scale-105">
							{!user[0]?.avatar_url
								? <Image height={100} width={100} src={user[0]?.avatar_url} alt="profile_pic" className="w-10 md:w-[50px] cursor-pointer rounded-full aspect-square object-cover" priority quality={1} />
								: <div className="pt-[2px] w-10 md:w-[50px] aspect-square flex items-center justify-center text-[20px] md:text-[25px] font-bold bg-tinder text-white rounded-full capitalize">{user[0]?.username.charAt(0)}</div>
							}
						</Link>
						: <div className='flex gap-x-2 md:gap-x-[18px]'>
							<Link className='bg-tinder px-4 md:pl-[29px] md:pr-[34px] h-[32px] md:h-[45px] text-center text-white rounded-[5px] text-[12px] md:text-[18px] font-semibold tracking-[-0.18px] leading-[normal] transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center uppercase pt-[2px]' href={client_routes.register}>
								{allStrings.string_register_now}
							</Link>
							<Link className='bg-black px-3 md:px-[28px] h-[32px] md:h-[45px] text-center text-white rounded-[5px] text-[12px] md:text-[18px] font-semibold tracking-[-0.18px] leading-[normal] transition-all ease-linear duration-75 hover:scale-105 inline-flex justify-center items-center uppercase pt-[2px]' href={client_routes.login}>
								{allStrings.string_login}
							</Link>
						</div>
					}
				</header>
			</div>
			<div className='pb-10 lg:pb-0 lg:h-dvh bg-gradient-home w-full flex flex-col items-center pt-[65px] md:pt-[85px]'>
				<div className='h-[calc(100%-65px)] lg:h-[calc(100%-85px)] w-11/12 md:w-9/12 xl:w-9/12 mx-4 flex flex-col items-center justify-center lg:flex-row-reverse'>
					<div className='h-[260px] sm:h-[295px] w-[260px] sm:w-[295px] md:w-[350px] md:h-[350px] lg:basis-1/2 lg:h-full lg:flex'>
						<Image src={BANNER_IMG} alt="BANNER_IMG" width={1000} height={1000} priority className="pointer-events-none h-full lg:h-[68%] lg:m-auto w-full mix-blend-multiply" />
					</div>
					<div className='text-center w-full flex flex-col lg:basis-1/2 lg:text-start'>
						<div>
							<span className='uppercase text-[clamp(30px,9vw,60px)] font-extrabold tracking-[-0.2px] me-[6px]'>SUGAR</span>
							<span className='uppercase text-[clamp(30px,9vw,60px)] font-medium'>MAKE</span>
						</div>
						<div className="m-auto lg:m-none w-[285px] lg:w-full text-[clamp(22px,6vw,30px)] font-medium text-center lg:text-start" style={{ lineHeight: "clamp(22px,6vw,30px)" }}>
							<span className=''>{allStrings["string_create_a_free_sugar_date_profile_now!"]}</span>
						</div>
						<div className='mt-[20px] text-center lg:text-start px-1 lg:p-0 text-[clamp(17px,4.61539vw,20px)] font-normal tracking-[-0.18px]'>
							{allStrings["string_in_publishing_and_graphic_design,_lorem_ipsum_is_a_placeholder_demonstrate_the_visual_form_of_a_document_or_a_typeface_without_relying"]}
						</div>
						<div className='mt-[30px] md:mt-[50px] flex justify-center lg:justify-start gap-x-[10px] lg:gap-x-[15px]'>
							<Link href={client_routes.register} className='h-[42px] lg:h-[50px] bg-tinder basis-1/2 lg:max-w-[220px] rounded-[5px] font-medium lg:font-semibold text-white text-[clamp(16px,4vw,18px)] flex uppercase pt-[2px]'>
								<span className='m-auto'> {allStrings["string_create_profile"]}</span>
							</Link>
							{user
								? <button className='h-[42px] lg:h-[50px] bg-black basis-1/2 lg:max-w-[220px] rounded-[5px] font-medium lg:font-semibold text-white text-[clamp(16px,4vw,18px)] flex uppercase pt-[2px]' onClick={handleReadMoreClick}>
									<span className='m-auto'>{allStrings["string_read_more"]}</span>
								</button>
								: <Link href={client_routes.login} className='h-[42px] lg:h-[50px] bg-black basis-1/2 lg:max-w-[220px] rounded-[5px] font-medium lg:font-semibold text-white text-[clamp(16px,4vw,18px)] flex uppercase pt-[2px]'>
									<span className='m-auto'>{allStrings["string_login"]}</span>
								</Link>
							}
						</div>
					</div>
				</div>
			</div>
			<button className={`fade-down fixed bottom-5 right-5 w-10 h-10 bg-tinder rounded-full flex justify-center items-center transition-all ease-linear duration-200 z-[1] ${showScrollTopBtn ? "block" : "hidden"}`} onClick={handleScrollTop}>
				<Image src={upArrowIcon} alt="" height={22} width={22} priority className="select-none pointer-events-none transition-all ease-linear duration-75 group-hover:scale-110" />
			</button>
		</>
	)
}

export default NewBanner