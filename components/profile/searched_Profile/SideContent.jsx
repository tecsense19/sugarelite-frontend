"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchedProfile from './Buttons_Profile'
import arrow_left from "../../../public/assets/arrow_left.svg"
import more_horizontal from "../../../public/assets/more_horizontal.svg"
import profile_img_5 from "../../../public/assets/profile_img_5.png"
import premium from "../../../public/assets/premium.svg"
import PopOver from '../commons/PopOver'

const SideContent = ({ params }) => {

	const path = usePathname()

	return (
		<div className="lg:bg-primary-dark-3 lg:h-[calc(100vh-66px)] lg:fixed lg:w-[350px] 2xl:w-[400px] text-white flex justify-start flex-col" data-aos='fade-right'>
			<div className="md:hidden w-full px-[15px] mt-[12px] mb-[30px] flex justify-between items-center">
				<Link href={path === "/profile/edit" ? "/profile" : "/search"}><Image src={arrow_left} alt="left" width={24} height={24} priority className="cursor-pointer" /></Link>
				<p className="text-[24px] font-semibold select-none">Profile</p>
				<PopOver>
					<Image src={more_horizontal} alt="more" width={30} height={30} priority className="cursor-pointer" />
				</PopOver>
			</div>
			<div className="w-full flex justify-start items-center flex-col lg:items-start h-full md:pt-[96px] lg:pt-[30px] px-[15px] lg:px-[30px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
				<div className="w-full aspect-square max-w-[200px] lg:max-w-full lg:rounded-[10px] flex justify-center items-center relative">
					<Image src={profile_img_5} width={1000} height={1000} alt="person" className={`h-full w-full rounded-full lg:rounded-[10px] select-none pointer-events-none ${path === "/profile/edit" && "opacity-50"}`} priority />
					<div className='h-3 w-3 lg:h-[14px] lg:w-[14px] bg-[#1DD719] absolute top-[220px] right-[75px] lg:right-[10px] lg:top-[10px] border border-white rounded-full'></div>

				</div>
				<div className="lg:self-start mt-[20px] lg:mt-[30px]">
					<div className="flex flex-col text-center lg:text-left" data-aos='zoom-in'>
						<div className='flex items-center '>
							<span className="text-[30px] font-bold me-[20px]">{params.id}. Dhaval</span>
							<Image src={premium} alt='edit' width={30} height={30} priority />
							<span className='text-[16px] font-semibold ms-2'>Premium</span>
						</div>
						<div className='mt-[11px]'>
							<span className="text-[20px] font-semibold text-opacity-80 text-white me-[14px]">LIVING IN</span>
							<span className="text-[16px] font-semibold text-opacity-80 text-white mt-[11px]">Ask me, Del Valle</span>
						</div>
					</div>
				</div>
				<div className='mt-[30px] mb-[10px] w-full sm:max-w-[75%] lg:hidden flex justify-center md:flex-row flex-col gap-3'>
					<SearchedProfile />
				</div>
				<div className="w-full bg-[#626262] mt-[30px] rounded-[5px] sm:max-w-[75%] lg:max-w-full lg:mb-[30px]" data-aos='zoom-in'>
					<div className="p-4 text-[16px] font-light">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, cumque quas. Sint reiciendis commodi libero, sequi ipsam nam sed iusto odio perferendis voluptates eveniet ducimus nostrum quidem est. Voluptatum, voluptatibus?
					</div>
					<div className="bg-primary-dark-3 lg:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
						<p className="text-[18px] font-medium">Biography</p>
						<p className="text-[12px] font-medium text-white text-opacity-80">No Cinema</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SideContent