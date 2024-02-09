"use client"
import DOB from "@/components/register/DOB"
import Password from "@/components/register/Password"
import Region from "@/components/register/Region"
import Success from "@/components/register/Success"
import SugarType from "@/components/register/SugarType"
import UserName from "@/components/register/UserName"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default () => {

	const { register, handleSubmit, control, watch, formState: { isValid } } = useForm()

	const [nextStep, setNextStep] = useState(1)

	const registerhandler = (data) => {
		console.log(data)
	}

	const nextStepHandler = () => {
		setNextStep((prev) => prev + 1)
	}

	const prevStepHandler = () => {
		setNextStep((prev) => prev - 1)
	}



	return (
		<>
			{/* Mobile View */}

			<main className="sm:hidden flex bg-black h-dvh">
				<div className="h-full w-full relative">
					<div className="h-[calc(100%-12px)] w-full absolute p-4">
						<div className="text-white w-full h-full">
							<Image src={"/assets/chevron_left.svg"} alt="back-btn" width={26} height={26} className="pointer-events-none" />
							<div className="flex justify-center items-center h-[calc(100%-26px)]">
								<form className="flex flex-col items-center w-full" onSubmit={handleSubmit(registerhandler)}>
									{
										nextStep === 1 && <SugarType register={register} watch={watch} nextStepHandler={nextStepHandler} />
									}
									{
										nextStep === 2 && <UserName register={register} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 3 && <Password register={register} watch={watch} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 4 && <Region register={register} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 5 && <DOB register={register} watch={watch} control={control} nextStepHandler={nextStepHandler} prevStepHandler={prevStepHandler} />
									}
									{
										nextStep === 6 && <Success />
									}
								</form>
							</div>
						</div>
					</div>
					<Image src={'/assets/Group 427318831.png'} width={1000} height={1000} alt="mob_bg" priority className="w-full block sm:hidden h-full object-cover object-top" />
				</div>
			</main>

			{/* Web view */}

			<main className="hidden sm:flex h-dvh">
				<div className="w-full relative flex justify-center items-center">
					<div className="absolute pt-[80px] text-white ">
						<div className="h-[665px] bg-primary bg-opacity-[80%] w-[1020px]">

						</div>
					</div>
					<Image src={'/assets/large_image.png'} width={1000} height={1000} alt="mob_bg" priority className="w-full  h-full object-cover " />

				</div>
			</main>

		</>
	)
}