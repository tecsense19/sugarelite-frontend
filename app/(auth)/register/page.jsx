"use client"
import DOB from "@/components/register/DOB"
import Password from "@/components/register/Password"
import Region from "@/components/register/Region"
import Success from "@/components/register/Success"
import SugarType from "@/components/register/SugarType"
import UserName from "@/components/register/UserName"
import Image from "next/image"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import { useForm } from "react-hook-form"
import chevronLeft from "../../../public/assets/chevron_left.svg"
import bgMobileImg from "../../../public/assets/Group 427318831.png"
import large_image from "../../../public/assets/large_image.png"
import boy_small from "../../../public/assets/boy_small.svg"
import pad_lock from "../../../public/assets/pad_lock.svg"
import treasure_map from "../../../public/assets/treasure_map.svg"
import calendar_3 from "../../../public/assets/calendar_3.svg"
import check_mark from "../../../public/assets/check_mark.svg"
import gmail from "../../../public/assets/gmail.svg"

const Register = () => {

	const { register, handleSubmit, control, watch, setValue } = useForm()

	const [nextStep, setNextStep] = useState(1)

	const registerhandler = (data, e) => {
		e.preventDefault()
		data = { ...data, "date": dayjs(data.date).format("DD/MM/YYYY") }
		console.log(data)
	}

	const nextStepHandler = () => {
		setNextStep((prev) => prev + 1)
	}

	const prevStepHandler = () => {
		setNextStep((prev) => prev - 1)
	}

	const stepsArr = [
		{
			step: "sugarType",
			img_url: boy_small,
			val: 1
		},
		{
			step: "email",
			img_url: gmail,
			val: 2
		},
		{
			step: "password",
			img_url: pad_lock,
			val: 3
		},
		{
			step: "region",
			img_url: treasure_map,
			val: 4
		},
		{
			step: "dob",
			img_url: calendar_3,
			val: 5
		},
		{
			step: "success",
			img_url: check_mark,
			val: 6
		}
	]


	return (
		<>
			{/* Mobile View */}

			<main className="sm:hidden flex bg-black h-dvh">
				<div className="h-full w-full relative">
					<div className="h-[calc(100%-12px)] w-full absolute p-4">
						<div className="text-white w-full h-full">
							{/* <Image src={chevronLeft} alt="back-btn" width={26} height={26} className="pointer-events-none" /> */}
							<div className="flex justify-center items-center h-[calc(100%-26px)]">
								<form className="flex flex-col items-center w-full" onSubmit={handleSubmit(registerhandler)}>
									{
										nextStep === 1 && <SugarType register={register} setValue={setValue} watch={watch} nextStepHandler={nextStepHandler} />
									}
									{
										nextStep === 2 && <UserName register={register} setValue={setValue} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 3 && <Password register={register} setValue={setValue} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 4 && <Region setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 5 && <DOB setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 6 && <Success />
									}
								</form>
							</div>
						</div>
					</div>
					<Image src={bgMobileImg} width={1000} height={1000} alt="mob_bg" priority className="w-full block sm:hidden h-full object-cover object-top" />
				</div>
			</main>

			{/* Web view */}

			<main className="hidden sm:flex h-screen">
				<div className="h-full w-full relative">
					<div className="h-full w-full absolute p-4 sm:flex items-center sm:items-start sm:pt-[130px] sm:pb-[50px] justify-center overflow-y-auto">
						<div className="text-white h-[725px]  sm:w-[90%] xl:w-[60%] py-[50px] rounded-[5px] sm:bg-primary  flex justify-center items-center flex-col ">
							<h1 className="italic font-[900] sm:text-[35px] md:text-[45px] pb-[50px]">SUGAR<span className="font-normal sm:ms-2 md:ms-3">ELITE</span></h1>
							{/* step status tarcker starts */}

							<div className="sm:w-[82%] lg:w-[665px] mb-[50px] relative h-[40px]">
								<div className="bg-black w-full h-1 rounded-[29px] absolute top-[50%] translate-y-[-50%]"></div>
								<div style={{ transform: `scaleX(${(nextStep - 1) * 20}%)` }} className="bg-secondary transition-transform duration-300 ease-in-out w-full origin-left h-1 rounded-[29px] absolute top-[43.5%] translate-y-[-50%]"></div>
								<div className="flex justify-between absolute w-full top-[50%] translate-y-[-50%] ">
									{
										stepsArr.map((step, inx) => (
											<div className={`h-[40px] w-[40px] flex items-center justify-center rounded-full transition-all duration-500 ease-in ${nextStep >= step.val ? "bg-secondary" : "bg-black"}`} key={inx}>
												<Image src={step.img_url} alt={step.step} width={24} height={24} priority />
											</div>
										))
									}
								</div>
							</div>
							{/* step status tarcker ends */}

							<form className="flex flex-col items-center sm:w-[82%] lg:w-[665px]" onSubmit={handleSubmit(registerhandler)}>
								{
									nextStep === 1 && <SugarType setValue={setValue} register={register} watch={watch} nextStepHandler={nextStepHandler} />
								}
								{
									nextStep === 2 && <UserName setValue={setValue} register={register} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
								}
								{
									nextStep === 3 && <Password setValue={setValue} register={register} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
								}
								{
									nextStep === 4 && <Region register={register} setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
								}
								{
									nextStep === 5 && <DOB setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
								}
								{
									nextStep === 6 && <Success />
								}
							</form>
						</div>
					</div>
					<Image src={large_image} width={1000} height={1000} alt="mob_bg" priority className="w-full h-full hidden sm:block object-cover select-none pointer-events-none" />
				</div>
			</main>

		</>
	)
}

export default Register