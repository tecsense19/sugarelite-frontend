"use client"

import { ConfigProvider, Select, Slider } from "antd"
import { useEffect, useState } from "react"
// import { Controller, useForm } from "react-hook-form"
import chevron_down from "/public/assets/chevron-down.svg"
import chevron_left from "/public/assets/arrow_left.svg"
import Image from "next/image"
import Mob_Checkbox from "./Mob_Checkbox"
import { useStore } from "@/store/store"
import { Countries } from "@/app/lib/constants"

const { Option } = Select;

const Mob_Filter = ({ allUsers, register, handleSubmit, control, handleReset, watch, setValue, Controller, dummyUsers, submitHandler, reset, setDummyUsers, cities, setCities }) => {

    // const [dummyUsers, setDummyUsers] = useState(allUsers);

    const { dispatch } = useStore()

    const sugarType = watch("sugar_type")

    const [age, setAge] = useState({
        age_from: 18,
        age_to: 18
    })

    const typeArray = [
        { name: "Elite Daddy", value: "EliteDaddy" },
        { name: "Elite Boy", value: "EliteBoy" },
        { name: "Elite Mama", value: "EliteMama" },
        { name: "Elite Babe", value: "EliteBabe" }
    ]
    // const submitHandler = () => {
    //     // console.log("Submit ::", watch())
    //     const selectedMenu = watch();
    //     let dummyData = allUsers;
    //     // For name
    //     dummyData = dummyData.filter((item) => {
    //         if (item.username.toLowerCase().includes(selectedMenu.name.toLowerCase())) {
    //             return true
    //         } else {
    //             return false
    //         }
    //     })

    //     // For age
    //     dummyData = dummyData.filter((item) => {
    //         if (item.age) {
    //             if (selectedMenu.age_from <= item.age && selectedMenu.age_to >= item.age) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         } else {
    //             return true
    //         }
    //     })

    //     // For sugartype
    //     if (selectedMenu.sugar_type) {
    //         dummyData = dummyData.filter((item) => {
    //             if (selectedMenu.sugar_type === item.sugar_type) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         })
    //     }

    //     // For Country
    //     if (selectedMenu.country) {
    //         dummyData = dummyData.filter((item) => {
    //             if (selectedMenu.country === item.country) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         })
    //     }

    //     // For Region
    //     if (selectedMenu.region) {
    //         dummyData = dummyData.filter((item) => {
    //             if (selectedMenu.region === item.region) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         })
    //     }

    //     // For has profile picture
    //     if (selectedMenu.has_profile_picture) {
    //         dummyData = dummyData.filter((item) => {
    //             if (item.avatar_url) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         })
    //     }

    //     // For has public picture
    //     if (selectedMenu.has_public_photos) {
    //         dummyData = dummyData.filter((item) => {
    //             if (item.get_all_profileimg && item.get_all_profileimg.length) {
    //                 let flag = false;
    //                 for (let tempObj of item.get_all_profileimg) {
    //                     if (tempObj.image_type === "public") {
    //                         flag = true;
    //                         break
    //                     }
    //                 }
    //                 if (flag) {
    //                     return true
    //                 } else {
    //                     return false
    //                 }
    //             } else {
    //                 return false
    //             }
    //         })
    //     }

    //     // For is verified
    //     if (selectedMenu.is_verified) {
    //         dummyData = dummyData.filter((item) => {
    //             if (item.premium !== "false") {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         })
    //     }
    //     // console.log("dummyData :: ", dummyData)
    //     dispatch({ type: "all_users_data", payload: dummyData })
    //     setDummyUsers(dummyData)
    //     dispatch({ type: "Filter_Close" })
    // }

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



    const handleSugarTypeChange = (event) => {
        setValue("sugar_type", event.target.value)
    };

    return (
        <>
            <div className="md:hidden text-white p-4 flex justify-between items-center mb-2 ">
                <Image src={chevron_left} alt='down_arrow' style={{ height: "auto", width: "auto" }} width={24} height={24} priority className='cursor-pointer' onClick={() => dispatch({ type: "Filter_Close" })} />
                <span className="text-[24px] font-semibold leading-[22.8px]">Filter & Sort</span>
                <div></div>
            </div>
            <div className='text-white px-4 bg-primary md:hidden slide-in-bottom pb-4'>
                <button className="bg-black w-full flex items-center justify-center h-[42px] text-white text-[16px] font-medium rounded-[5px] mt-3" style={{ lineHeight: "normal" }} onClick={handleReset}>
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
                        <Controller name="age_to" control={control} defaultValue={99} render={({ field }) => (
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
                                    <label htmlFor={type.value} key={inx} className={`w-full border-primary_border border rounded-[50px] h-[30px] flex items-center justify-center cursor-pointer ${sugarType === type.value && "bg-secondary border-0"}`}>
                                        <input
                                            type="radio"
                                            className="hidden"
                                            id={type.value}
                                            name="sugar_type" // Ensure that all radio buttons have the same name
                                            value={type.value}
                                            checked={sugarType === type.value} // Check if this radio button is selected
                                            onChange={handleSugarTypeChange} // Handle change event
                                        />
                                        <span className="text-center text-[16px] font-medium leading-[normal] cursor-pointer">{type.name}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    <div className='mt-[25px] flex justify-center items-center relative country-container_filter w-full'>
                        <Controller name="country" control={control} render={({ field }) => (
                            <ConfigProvider theme={customDropdownTheme}>
                                <Select {...field} placeholder="Select Country" showSearch optionFilterProp="children" dropdownStyle={{ backgroundColor: '#131313' }}
                                    className="w-full text-[16px] font-[400] text-white/80"
                                    filterOption={(input, option) => {
                                        return option.children.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }}>
                                    {Countries.map((ctry, ind) => (
                                        <Option className="!flex !items-center !justify-center" key={ind} value={ctry.name}>
                                            <div className='flex justify-start items-center text-[16px] font-[500]'>
                                                <Image src={ctry.flag} alt='' height={20} width={20} className='aspect-square me-3' />
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
                                    {cities.map((ctry, inx) => (
                                        <Option className="text-[16px] font-medium" key={inx} value={ctry}>
                                            {ctry}
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
                    <button className='mt-[30px] text-white text-[16px] font-[600] bg-secondary h-[42px] text-center w-full rounded-[5px]' style={{ lineHeight: "normal" }}>
                        SAVE SEARCH
                    </button>
                    <div className='mt-[15px] text-[16px] font-medium w-full text-center text-white/80' style={{ lineHeight: "normal" }}>Profile found: {dummyUsers.length}</div>
                </form>
            </div>
        </>
    )
}

export default Mob_Filter