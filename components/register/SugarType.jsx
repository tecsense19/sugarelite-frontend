"use client"
import Image from "next/image"
import sugarDaddy from '../../public/assets/sugar_dady.svg'
import sugarBoy from '../../public/assets/sugar_boy.svg'
import sugarMama from '../../public/assets/sugar_mama.svg'
import sugarBabe from '../../public/assets/sugar_babe.svg'
import boy_2 from '../../public/assets/boy_2.svg'
import chevron_right from '../../public/assets/chevron_right.svg'


const SugarType = ({ register, nextStepHandler, watch, setValue }) => {

    const isValid = watch("sugarType")


    const typeArray = [
        {
            sugarType: "EliteDaddy",
            img: sugarDaddy
        },
        {
            sugarType: "EliteBoy",
            img: sugarBoy
        },
        {
            sugarType: "EliteMama",
            img: sugarMama
        },
        {
            sugarType: "EliteBabe",
            img: sugarBabe
        }
    ]

    return (
        <>
            <div className="text-center ">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={boy_2} alt="boy" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl sm:text-[20px] pt-5 sm:pt-[13px] font-medium">I am a</p>
            </div>
            <div className="text-center mt-[60px] sm:mt-[28px] w-[20rem] sm:w-full md:w-[85%]">
                <div className="flex gap-6 sm:gap-3 flex-wrap justify-center sm:flex-nowrap ">
                    {
                        typeArray.map((type, inx) => (
                            <div className={`${isValid === type.sugarType && "bg-secondary"} py-3 px-5 sm:px-3 sm:py-2 rounded-[5px] sm:w-full  sm:flex justify-center `} key={inx}>
                                <label htmlFor={type.sugarType} className=" cursor-pointer ">
                                    <p className="mb-[9px] font-bold text-[16px]">{type.sugarType}</p>
                                    <Image src={type.img} alt={type.sugarType} width={90} height={90} className=" min-w-[90px] rounded-full" priority />
                                </label>
                                <input type="radio" {...register("sugarType")} onChange={(e) => setValue("sugarType", e.target.value)} value={type.sugarType} className="hidden" id={type.sugarType} />
                            </div>
                        ))
                    }

                </div>

            </div>
            <button className="bg-secondary w-full max-w-[26rem] sm:max-w-full text-white text-opacity-[70%] h-[42px] mt-[65px] sm:mt-[51px] rounded  lg:w-[665px] " onClick={nextStepHandler} type="button" disabled={!isValid}>
                <div className="flex justify-center gap-[5px] font-bold ms-4">
                    NEXT
                    <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                </div>
            </button>

        </>
    )
}

export default SugarType