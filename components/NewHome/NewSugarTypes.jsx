"use client"

import React, { useState } from 'react'
import sugar_mom from "../../public/new_assets/sugar_mom.svg";
import sugar_babe from "../../public/new_assets/sugar_babe.svg";
import sugar_daddy from "../../public/new_assets/sugar_daddy.svg";
import sugar_boy from "../../public/new_assets/sugar_boy.svg";
import Image from 'next/image';

const NewSugarTypes = ({ allStrings }) => {

	const [selectedItem, setSelectedItem] = useState(1);

	const sugarItems = [
		{ id: 1, title: allStrings["string_sugarmom"], desc: allStrings["string_sugarmom_description"], image: sugar_mom },
		{ id: 2, title: allStrings["string_sugarbabe"], desc: allStrings["string_sugarbabe_description"], image: sugar_babe },
		{ id: 3, title: allStrings["string_sugardaddy"], desc: allStrings["string_sugardaddy_description"], image: sugar_daddy },
		{ id: 4, title: allStrings["string_sugarboy"], desc: allStrings["string_sugarboy_description"], image: sugar_boy }
	]

	return (
		<div className="mb-[50px] lg:mb-[100px] w-full flex flex-col items-center justify-center px-4 sm:px-0">
			<div className="w-full sm:w-10/12 md:w-8/12 flex flex-col justify-center items-center">
				<div className="text-[clamp(26px,5vw,50px)] font-bold leading-[normal] -tracking-[0.5px] lg:-tracking-[1px] text-center">
					{allStrings["string_what_is_a"]}
				</div>
				<div className='my-4 sm:mt-7 sm:mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3 xl:gap-5 w-full xs:w-10/12 sm:w-full lg:w-10/12 2xl:w-9/12'>
					{sugarItems.map((item, inx) => (
						<button key={inx} className={`w-full flex justify-center items-center py-2 xl:py-3 text-center rounded-[5px] font-bold text-[17px] sm:text-[18px] xl:text-[23px] leading-[normal] ${selectedItem === item.id ? "bg-tinder text-white" : "border border-black text-black"}`} onClick={() => setSelectedItem(item.id)}>
							{item.title}
						</button>
					))}
				</div>
			</div>
			<div className='w-full py-4 sm:py-8 xl:py-9 px-4 sm:px-10 lg:px-8 xl:px-[50px] 2xl:px-[100px] custom-shadow-home rounded-[15px] sm:rounded-[20px] flex flex-col items-center lg:flex-row gap-5 sm:gap-8 xl:gap-[64px] sm:w-10/12 md:w-[65%]'>
				<Image src={sugarItems[selectedItem - 1].image} alt={sugarItems[selectedItem - 1].title} priority quality={1} height={1000} width={1000} className='w-[180px] sm:w-[250px] lg:w-[220px] xl:w-[310px] aspect-square pointer-events-none' />
				<div className='w-full flex flex-col justify-center lg:items-start items-center'>
					<div className='text-black text-[clamp(26px,5vw,35px)] font-extrabold leading-[normal]'>{sugarItems[selectedItem - 1].title}</div>
					<div className='mt-3 sm:mt-4 text-[#555] text-center lg:text-left text-[16px] lg:text-[18px] font-normal leading-[normal]'>{sugarItems[selectedItem - 1].desc}</div>
				</div>
			</div>
		</div>
	)
}

export default NewSugarTypes