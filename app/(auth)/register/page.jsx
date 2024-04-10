"use client"
import DOB from "@/components/register/DOB"
import Password from "@/components/register/Password"
import Region from "@/components/register/Region"
import Success from "@/components/register/Success"
import SugarType from "@/components/register/SugarType"
import UserName from "@/components/register/UserName"
import Image from "next/image"
import { Suspense, useEffect, useState } from "react"
import dayjs from 'dayjs';
import { useForm } from "react-hook-form"
import chevronLeft from "/public/assets/chevron_left.svg"
import bgMobileImg from "/public/assets/Group 427318831.png"
import large_image from "/public/assets/large_image.png"
import boy_small from "/public/assets/boy_small.svg"
import pad_lock from "/public/assets/pad_lock.svg"
import treasure_map from "/public/assets/treasure_map.svg"
import calendar_3 from "/public/assets/calendar_3.svg"
import check_mark from "/public/assets/check_mark.svg"
import gmail from "/public/assets/gmail.svg"
import { useRouter } from "next/navigation"
import { client_notification, client_routes } from "@/app/lib/helpers"
import { register_action } from "@/app/lib/actions"
import { notification } from "antd"
import Loader from "@/components/common/Loader"

const Register = () => {

	const { register, handleSubmit, control, watch, setValue } = useForm()

	const [api, contextHolder] = notification.useNotification();

	const [nextStep, setNextStep] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useRouter()

	const registerhandler = async (data) => {
		data = { ...data, "birthdate": dayjs(data.birthdate).format("YYYY/MM/DD") }
		setIsLoading(true)
		const res = await register_action(data)
		if (!res.success || res.error) {
			setIsLoading(false)
			client_notification(api, "topRight", "error", res?.error || res?.message, 2)
		} else {
			setIsLoading(false)
			client_notification(api, "topRight", "success", res?.message, 2)
			setNextStep(6)
		}
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
			<Suspense fallback={<Loader />}>
				{/* Mobile View */}
				<main className="sm:hidden block h-dvh ">
					{contextHolder}
					<div className={`h-full w-full relative ${nextStep === 6 ? "bg-white" : "bg-tinder"}`}>
						<div className="h-full w-full absolute p-4 sm:flex items-center sm:items-start sm:pt-[130px] sm:pb-[50px] justify-center overflow-y-auto overflow-x-hidden">
							{
								nextStep === 1 && <Image src={chevronLeft} alt="back-btn" width={26} height={26} onClick={() => navigate.push(client_routes.home)} />
							}
							<div className="flex h-[calc(100%-32px)] justify-center text-white  ">
								<form className="flex flex-col items-center w-full my-auto" onSubmit={handleSubmit(registerhandler)} >
									{
										nextStep === 1 && <SugarType register={register} setValue={setValue} watch={watch} nextStepHandler={nextStepHandler} />
									}
									{
										nextStep === 2 && <UserName register={register} setValue={setValue} watch={watch} setNextStep={setNextStep} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 3 && <Password register={register} setValue={setValue} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 4 && <Region setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 5 && <DOB setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} isLoading={isLoading} />
									}
									{
										nextStep === 6 && <Success />
									}
								</form>
							</div>
						</div>
						{/* <Image src={bgMobileImg} width={1000} height={1000} alt="mob_bg" priority className="w-full h-full sm:hidden block object-cover object-top select-none pointer-events-none" /> */}
					</div>
				</main>

				{/* Web view */}

				<main className="hidden sm:flex h-screen ">
					<div className="h-full w-full relative">
						<div className="h-full w-full absolute p-4 sm:flex items-center sm:items-start sm:pt-[130px] sm:pb-[50px] justify-center overflow-y-auto">
							<div className="text-white h-[725px] sm:w-[90%] xl:w-[60%] my-auto py-[50px] rounded-[5px] sm:bg-primary/80 sm:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center flex-col ">
								<h1 className="italic font-[900] sm:text-[35px] md:text-[45px] pb-[50px]">ELITE<span className="font-normal sm:ms-2 md:ms-3">SUGAR</span></h1>

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
										nextStep === 2 && <UserName setValue={setValue} register={register} watch={watch} setNextStep={setNextStep} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 3 && <Password setValue={setValue} register={register} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 4 && <Region register={register} setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 5 && <DOB setValue={setValue} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} isLoading={isLoading} />
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
			</Suspense>
		</>
	)
}

export default Register