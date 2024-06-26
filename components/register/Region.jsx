"use client"
import { getCountries } from "@/app/lib/actions"
import { ConfigProvider, Select } from "antd"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import treasure_map from "/public/assets/treasure_map.svg"
import chevronDown from "/public/assets/chevron-down.svg"
import country from "/public/assets/country.svg"
import region from "/public/assets/region.svg"
import chevron_right from "/public/assets/chevron_right.svg"
import chevron_right_white from "/public/assets/chevron_right_white.svg"
import sugar_region from "/public/assets/sugar_region.svg"
import { Countries } from "@/app/lib/constants"


const { Option } = Select;

const Region = ({ nextStepHandler, prevStepHandler, control, watch, setValue, allStrings }) => {
    const [states, setStates] = useState([])

    const customStyles = {
        components: {
            Select: {
                selectorBg: "transparent",
                boxShadow: "none",
                controlOutline: "none",
                colorBorder: "#ffffff",
                controlItemBgHover: "none",
                controlHeight: "42px",
                colorTextPlaceholder: "rgba(255,255,255)",
                colorText: "rgba(255,255,255)",
                colorSuccessBorderHover: "none",
                colorInfoBorderHover: "none",
                colorTextActive: "black",
                optionSelectedColor: "black",
                optionSelectedBg: "rgba(255,255,255,0.8)",
                optionPadding: '8px 12px',
                optionHeight: "auto",
                optionActiveBg: "rgba(255,255,255,0.2)"
            },
        },
        token: {
            borderRadius: '5px',
            colorPrimary: "#ffffff",
            fontSize: "16px",
            padding: '12px 28px',
            colorIcon: "white",
            fontWeight: "medium"
        }
    }

    useEffect(() => {
        if (watch("country")) {
            const filteredArray = Countries.find((country) => country.name.toLowerCase() === watch("country").toLowerCase()).cities
            setStates(filteredArray)
        }
    }, [watch("country")])

    const isValid = {
        country: watch("country"),
        region: watch("region")
    }

    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="flex justify-center items-center rounded-full">
                    <Image src={sugar_region} alt="pad_lock" width={137} height={126} className="w-[120px] sm:w-[165px] pointer-events-none select-none" />
                </div>
                <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px] leading-[28px]">{allStrings["string_where_are_you_from?_which_region?"]}</p>
                <p className='text-white sm:hidden mt-3 text-[16px] max-w-[20rem]'>{allStrings["string_country_region_description"]}</p>
            </div>
            <div className='mt-14 w-full relative region_dropdown sm:mt-[25px]'>
                <div className="mb-3 relative flex justify-end items-center">
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <ConfigProvider
                                theme={customStyles}
                            >
                                <Select
                                    {...field}
                                    showSearch
                                    placeholder={allStrings["string_select_your_country"]}
                                    optionFilterProp="children"
                                    dropdownStyle={{ backgroundColor: '#232323' }}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    className="w-full "
                                >
                                    {
                                        Countries.map((country, inx) => {
                                            return <Option key={inx} value={country.name} >
                                                {country.name}
                                            </Option>
                                        })
                                    }
                                </Select>
                                <Image src={chevronDown} alt='down_arrow' width={20} height={20} priority className='absolute -translate-x-4 pointer-events-none' />
                                <Image src={country} alt='down_arrow' width={20} height={20} priority className='absolute translate-x-4 md:translate-x-6 left-0 pointer-events-none' />
                            </ConfigProvider>

                        )}
                    />
                </div>
                <div className="relative flex justify-end items-center">
                    <Controller
                        name="region"
                        control={control}
                        render={({ field }) => (
                            <ConfigProvider
                                theme={customStyles}
                            >
                                <Select
                                    {...field}
                                    showSearch
                                    placeholder={allStrings["string_select_your_region"]}
                                    optionFilterProp="children"
                                    dropdownStyle={{ backgroundColor: '#232323' }}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    className="w-full text-opacity-[70%] pt-4"
                                >
                                    {states && states.map((state, inx) => (
                                        <Option key={inx} value={state} >
                                            {state}
                                        </Option>
                                    ))}
                                </Select>
                                <Image src={chevronDown} alt='down_arrow' width={20} height={20} priority className='absolute -translate-x-4 pointer-events-none' />
                                <Image src={region} alt='down_arrow' width={20} height={20} priority className='absolute  translate-x-4 md:translate-x-6 left-0 pointer-events-none' />
                            </ConfigProvider>
                        )}
                    />
                </div>
            </div>
            <div className='mt-14 w-full flex flex-col-reverse gap-y-3 sm:grid grid-cols-2 gap-x-[37px]'>
                <button className="bg-stone-600 w-full h-[42px] mb-3 rounded text-white transition-all duration-150 hover:scale-[1.02]" onClick={prevStepHandler} type="button">
                    <div className="flex justify-center font-bold text-[16px] leading-[normal] gap-[5px]">
                        <Image src={chevron_right_white} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden  " />
                        {allStrings["string_back"]}
                    </div>
                </button>
                <button className={`w-full rounded bg-white h-[42px] relative text-[#263238] ${(!isValid.region || !isValid.country || isValid.region === "Select your Region") ? "" : "transition-all duration-150 hover:scale-[1.02]"}`} type="button" disabled={!isValid.region || !isValid.country || isValid.region === "Select your Region"} onClick={nextStepHandler}>
                    <div className="flex justify-center font-bold text-[16px] leading-[normal] gap-[5px] sm:ms-4">
                        {allStrings["string_next"]}
                        <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                    </div>
                </button>
            </div>
        </>
    )
}

export default Region