"use client"

import { ConfigProvider, Select, Slider } from "antd"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import chevron_down from "/public/assets/chevron-down.svg"
import Image from "next/image"
import Mob_Checkbox from "./Mob_Checkbox"

const { Option } = Select;

const Mob_Filter = () => {

    const { register, handleSubmit, control, watch, reset, setValue } = useForm()

    const sugarType = watch("sugar_type")


    const [age, setAge] = useState({
        age_from: 18,
        age_to: 18
    })

    const typeArray = [
        {
            sugarType: "EliteDaddy",
        },
        {
            sugarType: "EliteBoy",
        },
        {
            sugarType: "EliteMama",
        },
        {
            sugarType: "EliteBabe",
        }
    ]

    const countries = [
        { img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg", name: "Denmark", value: "denmark" },
        { img: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg", name: "India", value: "india" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg", name: "China", value: "china" },
        { img: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg", name: "Japan", value: "japan" },
        { img: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg", name: "Sweden", value: "sweden" }
    ]

    const submitHandler = (data) => {
        console.log(data)
    }

    const customSliderTheme = {
        token: { colorBgElevated: "#2d2d2d", colorPrimaryBorderHover: "white", borderRadiusXS: 50 },
        components: {
            Slider: {
                handleColor: "white", handleActiveColor: "white",
                handleSize: 20, handleSizeHover: 20, handleLineWidth: 2, handleLineWidthHover: 2,
                railBg: "rgba(255,255,255,0.08)", railHoverBg: "rgba(255,255,255,0.08)", railSize: 10,
                trackBg: "black", trackHoverBg: "black"
            }
        }
    };

    const customDropdownTheme = {
        token: { borderRadius: '5px', colorPrimary: "#6C6C6C", controlPaddingHorizontal: 2 },
        components: {
            Select: {
                selectorBg: "#1F1F1F", boxShadow: "none",
                colorTextPlaceholder: "rgba(255,255,255,0.5)", colorText: "rgba(255,255,255,0.8)",
                colorSuccessBorderHover: "none", colorInfoBorderHover: "none", colorTextActive: "black",
                controlItemBgHover: "none", controlHeight: "42px", controlOutline: "none",
                optionSelectedColor: "black", optionSelectedBg: "rgba(255,255,255,0.6)", optionPadding: '8px 12px',
                optionHeight: "auto", optionActiveBg: "rgba(255,255,255,0.2)"
            },
        }
    }

    useEffect(() => {
        setAge({ age_from: watch("age_from") })
    }, [watch("age_from")])

    useEffect(() => {
        setAge({ age_to: watch("age_to") })
    }, [watch("age_to")])


    return (
        <div className='text-white px-4 bg-primary md:hidden slide-in-bottom pb-4'>
            <button className="bg-black w-full flex items-center justify-center h-[42px] text-white text-[16px] font-medium rounded-[5px] mt-3" style={{ lineHeight: "normal" }} onClick={() => reset()}>
                RESET SEARCH
            </button>
            <form onSubmit={handleSubmit(submitHandler)} className="w-full">
                <div className="flex flex-col mt-[25px]">
                    <label htmlFor="by_name" className="text-[16px] font-medium leading-[normal] mb-[6px]">Search by name</label>
                    <input type="text" {...register("name")} id="by_name" placeholder="Search..." className="bg-primary-dark-3 outline-none border-none h-[42px] rounded-[5px] text-[14px] font-light placeholder:opacity-70 px-[20px]" />
                </div>
                <div className="mt-[25px]">
                    <div className="font-[500] text-[16px] text-white/80" style={{ lineHeight: "normal" }}>Age from ( {watch("age_from")} )</div>
                    <Controller name="age_from" control={control} defaultValue={18} render={({ field }) => (
                        <ConfigProvider theme={customSliderTheme}>
                            <Slider {...field} className={`!mt-[15px] !mb-0 ${age.age_from > 19 ? "!ms-0" : "!ms-[10px]"} ${age.age_from > 97 && "!me-[10px]"}`} min={18} max={99}
                                onChange={(val) => { (val <= watch("age_to")) ? setValue("age_from", val) : setValue("age_to", val); setValue("age_from", val) }}
                            />
                        </ConfigProvider>
                    )} />
                </div>
                <div className="mt-[25px]">
                    <div className="font-[500] text-[16px] text-white/80" style={{ lineHeight: "normal" }}>Age to ( {watch("age_to")} )</div>
                    <Controller name="age_to" control={control} defaultValue={30} render={({ field }) => (
                        <ConfigProvider theme={customSliderTheme}>
                            <Slider {...field} className={`!mt-[15px] !mb-0 ${age.age_to > 19 ? "!ms-0" : "!ms-[10px]"} ${age.age_to > 97 && "!me-[10px]"}`} min={18} max={99}
                                onChange={(val) => { (watch("age_from") <= val) ? setValue("age_to", val) : setValue("age_from", val); setValue("age_to", val) }} />
                        </ConfigProvider>
                    )} />
                </div>
                <div className="flex flex-col mt-[25px]">
                    <label className="text-[16px] font-medium leading-[normal] mb-[6px]">Select Sugar Type</label>
                    <div className="grid grid-cols-2 w-full gap-4 text-center mt-[15px]">
                        {
                            typeArray.map((type, inx) => (
                                <label htmlFor={type.sugarType} key={inx} className={`w-full border-primary_border border rounded-[50px] h-[30px] flex items-center justify-center cursor-pointer ${sugarType === type.sugarType && "bg-secondary border-0"}`}>
                                    <input type="radio" className="hidden" id={type.sugarType} {...register("sugar_type")} value={type.sugarType} />
                                    <span className="text-center text-[16px] font-medium leading-[normal] cursor-pointer">{type.sugarType}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-[25px] flex justify-center items-center relative country-container_filter w-full'>
                    <Controller name="country" control={control} defaultValue={countries[0]} render={({ field }) => (
                        <ConfigProvider theme={customDropdownTheme}>
                            <Select {...field} placeholder="Select Country" showSearch optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                                className="w-full text-[16px] font-[400] text-white/80"
                                filterOption={(input, option) => {
                                    return option.children.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }}>
                                {countries.map((ctry) => (
                                    <Option className="!flex !items-center !justify-center" key={ctry.value} value={ctry.value}>
                                        <div className='flex justify-start items-center text-[16px] font-[500]'>
                                            <Image src={ctry.img} alt='' height={20} width={20} className='aspect-square me-3' />
                                            {ctry.name}
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                            <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={20} height={20} priority className='absolute left-[calc(100%-36px)] pointer-events-none' />
                        </ConfigProvider>
                    )}
                    />
                </div>
                <div className='mt-[15px] flex justify-center items-center relative country-container_filter w-full'>
                    <Controller name="region" control={control} render={({ field }) => (
                        <ConfigProvider theme={{ ...customDropdownTheme, components: { Select: { ...customDropdownTheme.components.Select, } } }}>
                            <Select {...field} placeholder="Select Region" showSearch optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                                className="w-full text-[16px] font-medium text-white"
                                filterOption={(input, option) => {
                                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }}>
                                {countries.map((ctry) => (
                                    <Option className="text-[16px] font-medium" key={ctry.value} value={ctry.value}>
                                        {ctry.name}
                                    </Option>
                                ))}
                            </Select>
                            <Image src={chevron_down} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={20} height={20} priority className='absolute left-[calc(100%-36px)] pointer-events-none' />
                        </ConfigProvider>
                    )} />
                </div>
                <div className='mt-[32px]'>
                    <Mob_Checkbox setValue={setValue} control={control} text={"Has a profile picture"} watch={watch} name={"has_profile_picture"} />
                </div>
                <div className="mt-[21px]">
                    <Mob_Checkbox setValue={setValue} control={control} text={"Has a public photos"} watch={watch} name={"has_public_photos"} />
                </div>
                <div className="mt-[21px]">
                    <Mob_Checkbox setValue={setValue} control={control} text={"Is Verified"} watch={watch} name={"is_verified"} />
                </div>
                <button className='mt-[30px] text-white/80 text-[16px] font-[600] bg-secondary h-[42px] text-center w-full rounded-[5px]' style={{ lineHeight: "normal" }}>
                    SAVE SEARCH
                </button>
                <div className='mt-[15px] text-[16px] font-medium w-full text-center text-white/80' style={{ lineHeight: "normal" }}>Profile found: 499</div>
            </form>
        </div>
    )
}

export default Mob_Filter