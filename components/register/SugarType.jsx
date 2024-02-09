"use client"
import Image from "next/image"


const SugarType = ({ register, nextStepHandler, watch }) => {

    const isValid = watch("sugarType")

    const typeArray = [
        {
            sugarType: "SugarDaddy",
            img: "sugar_dady.svg"
        },
        {
            sugarType: "SugarBoy",
            img: "sugar_boy.svg"
        },
        {
            sugarType: "SugarMama",
            img: "sugar_mama.svg"
        },
        {
            sugarType: "SugarBabe",
            img: "sugar_babe.svg"
        }
    ]

    return (
        <>
            <div className="text-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={"/assets/boy_2.svg"} alt="boy" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl pt-5 font-medium">I am a</p>
            </div>
            <div className="text-center mt-[60px] w-[20rem]">
                <div className="flex gap-6 flex-wrap justify-center">
                    {
                        typeArray.map((type, inx) => (
                            <div className={`${isValid === type.sugarType && "bg-secondary"} py-3 px-5 rounded-lg`} key={inx}>
                                <label htmlFor={type.sugarType} className=" cursor-pointer ">
                                    <p className="mb-[9px]">{type.sugarType}</p>
                                    <Image src={`/assets/${type.img}`} alt={type.sugarType} width={90} height={90} className=" rounded-full" priority />
                                </label>
                                <input type="radio" {...register("sugarType")} value={type.sugarType} className="hidden" id={type.sugarType} />
                            </div>
                        ))
                    }

                </div>

            </div>
            <button className="bg-secondary w-full py-3 mt-[65px] rounded max-w-[25rem]" onClick={nextStepHandler} type="button" disabled={!isValid}>NEXT</button>

        </>
    )
}

export default SugarType