"use client"
import Image from "next/image"
import sugarDaddy from '../../public/new_assets/sugar_daddy.jpg'
import sugarBoy from '../../public/new_assets/sugar_boy.jpg'
import sugarMama from '../../public/new_assets/sugar_mom.jpg'
import sugarBabe from '../../public/new_assets/sugar_babe.jpg'
import boy_2 from '../../public/assets/boy_2.svg'
import sugar_type from "/public/assets/sugar_type.svg"
import chevron_right from '../../public/assets/chevron_right.svg'


const SugarType = ({ register, nextStepHandler, watch, setValue, allStrings }) => {

    const isValid = watch("sugar_type")


    const typeArray = [
        {
            sugarType: "EliteDaddy",
            sugarTypeName: "SugarDaddy",
            img: sugarDaddy
        },
        {
            sugarType: "EliteBoy",
            sugarTypeName: "SugarBoy",
            img: sugarBoy
        },
        {
            sugarType: "EliteMama",
            sugarTypeName: "SugarMom",
            img: sugarMama
        },
        {
            sugarType: "EliteBabe",
            sugarTypeName: "SugarBabe",
            img: sugarBabe
        }
    ]

    return (
        <>
            <div className="text-center ">
                <div className="flex justify-center items-center rounded-full">
                    <Image src={sugar_type} alt="boy" width={165} height={125} className="w-[120px] sm:w-[165px] pointer-events-none select-none" />
                </div>
                <p className="text-2xl sm:text-[20px] pt-3 sm:pt-[13px] font-medium">
                    {allStrings["string_i_am_a"]}
                </p>
            </div>
            <div className="text-center mt-10 sm:mt-[28px] w-[20rem] sm:w-full md:w-[85%]">
                <div className="flex gap-x-6 gap-y-2 sm:gap-3 flex-wrap justify-center sm:flex-nowrap">
                    {
                        typeArray.map((type, inx) => (
                            <div className={`${isValid === type.sugarType && "bg-white"} border border-transparent hover:border-white py-3 px-5 sm:px-3 sm:py-2 rounded-[5px] sm:w-full  sm:flex justify-center transition-all ease-linear duration-200`} key={inx}>
                                <label htmlFor={type.sugarType} className=" cursor-pointer ">
                                    <p className={`mb-[9px] font-bold text-[16px] ${isValid === type.sugarType ? "text-primary-dark-5" : ""}`}>{type.sugarTypeName}</p>
                                    <Image src={type.img} alt={type.sugarType} width={90} height={90} className=" min-w-[90px] rounded-full" priority />
                                </label>
                                <input type="radio" {...register("sugar_type")} onChange={(e) => setValue("sugar_type", e.target.value)} value={type.sugarType} className="hidden" id={type.sugarType} />
                            </div>
                        ))
                    }

                </div>

            </div>
            <button className={`bg-white w-full max-w-[26rem] sm:max-w-full text-primary-dark-5 h-[42px] mt-[60px] sm:mt-[51px] rounded  lg:w-[665px] ${isValid ? "transition-all duration-150 hover:scale-[1.01]" : ""}`} onClick={nextStepHandler} type="button" disabled={!isValid}>
                <div className="flex justify-center gap-[5px] font-bold text-[#263238]">
                    {allStrings["string_next"]}
                    <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                </div>
            </button>

        </>
    )
}

export default SugarType