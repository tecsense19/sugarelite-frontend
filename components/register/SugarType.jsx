"use client"
import Image from "next/image"


const SugarType = ({ register, nextStepHandler }) => {
    return (
        <>
            <div className="text-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={"/assets/boy_2.svg"} alt="boy" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl pt-5 font-medium">I am a</p>
            </div>
            <div className="text-center mt-[60px]">
                <div className="flex gap-12">
                    <div>
                        <label htmlFor="SugarDaddy" className=" cursor-pointer">
                            <p className="mb-[9px]">SugarDaddy</p>
                            <Image src={"/assets/sugar_dady.svg"} alt="sugar_dady" width={90} height={90} className=" rounded-full" priority />
                        </label>
                        <input type="radio" {...register("sugarType")} value={"SugarDaddy"} className="hidden" id="SugarDaddy" />
                    </div>
                    <div>
                        <label htmlFor="SugarBoy" className=" cursor-pointer">
                            <p className="mb-[9px]">SugarBoy</p>
                            <Image src={"/assets/sugar_boy.svg"} alt="sugar_boy" width={90} height={90} className="rounded-full" priority />
                        </label>
                        <input type="radio" {...register("sugarType")} value={"SugarBoy"} className="hidden" id="SugarBoy" />
                    </div>
                </div>
                <div className="flex gap-12 pt-[30px]">
                    <div>
                        <label htmlFor="SugarMama" className=" cursor-pointer">
                            <p className="mb-[9px]">SugarMama</p>
                            <Image src={"/assets/sugar_mama.svg"} alt="sugar_mama" width={90} height={90} className="rounded-full" priority />
                        </label>
                        <input type="radio" {...register("sugarType")} value={"SugarMama"} className="hidden" id="SugarMama" />
                    </div>
                    <div>
                        <label htmlFor="SugarBabe" className=" cursor-pointer">
                            <p className="mb-[9px]">SugarBabe</p>
                            <Image src={"/assets/sugar_babe.svg"} alt="sugar_babe" width={90} height={90} className="rounded-full" priority />
                        </label>
                        <input type="radio" {...register("sugarType")} value={"SugarBabe"} className="hidden" id="SugarBabe" />
                    </div>
                </div>
            </div>
            <button className="bg-secondary w-full py-3 mt-[65px] rounded" onClick={nextStepHandler} type="button">NEXT</button>

        </>
    )
}

export default SugarType