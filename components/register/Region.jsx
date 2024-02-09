"use client"
import { getCountries } from "@/app/lib/actions"
import { ConfigProvider, Select } from "antd"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"

const people = [
    { value: 'Wade Cooper' },
    { value: 'Arlene Mccoy' },
    { value: 'Devon Webb' },
    { value: 'Tom Cook' },
    { value: 'Tanya Fox' },
    { value: 'Hellen Schmidt' },
]
const { Option } = Select;

const Region = ({ nextStepHandler, prevStepHandler, control, watch }) => {

    const [countries, setCountires] = useState([])
    const [states, setStates] = useState([])

    const customStyles = {
        components: {
            Select: {
                selectorBg: "transparent",
                boxShadow: "none",
                controlOutline: "none",
                colorBorder: "#535353",
                controlItemBgHover: "none",
                controlHeight: "42px",
                colorTextPlaceholder: "rgba(255,255,255,0.5)",
                colorText: "rgba(255,255,255,0.8)",
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
            colorPrimary: "#535353",
            fontSize: "16px",
            padding: '12px 18px',
            colorIcon: "white",
            fontWeight: "medium"
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await getCountries()
            setCountires(data.data)
        }
        getData()
    }, [])

    useEffect(() => {
        const filteredArray = countries.filter((country) => country.name === watch("country"))
        setStates(filteredArray[0]?.states)
    }, [watch("country")])


    const isValid = {
        country: watch("country"),
        region: watch("region")
    }

    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={"/assets/treasure_map.svg"} alt="pad_lock" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl pt-5 font-medium max-w-[15rem]">Where are you from? which region?</p>
                <p className='text-white opacity-[50%] mt-3 text-[16px] max-w-[20rem]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className='mt-14 w-full relative text-opacity-[70%] region_dropdown '>
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
                                    placeholder="Select Country"
                                    optionFilterProp="children"
                                    dropdownStyle={{ backgroundColor: '#232323' }}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    className="w-full text-opacity-[70%]"
                                >
                                    {
                                        countries.map((country, inx) => {
                                            return <Option key={inx} value={country.name} >
                                                {country.name}
                                            </Option>
                                        })
                                    }
                                </Select>
                                <Image src={"/assets/chevron-down.svg"} alt='down_arrow' width={20} height={20} priority className='absolute -translate-x-4 pointer-events-none' />
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
                                    placeholder="Select Region"
                                    optionFilterProp="children"
                                    dropdownStyle={{ backgroundColor: '#232323' }}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    className="w-full text-opacity-[70%] pt-4"
                                >
                                    {states && states.map((state) => (
                                        <Option key={state.name} value={state.name} >
                                            {state.name}
                                        </Option>
                                    ))}
                                </Select>
                                <Image src={"/assets/chevron-down.svg"} alt='down_arrow' width={20} height={20} priority className='absolute -translate-x-4 pointer-events-none' />
                            </ConfigProvider>
                        )}
                    />
                </div>
            </div>
            <div className='mt-14 w-full'>
                <button className="bg-secondary w-full  h-[42px] mb-3 rounded" onClick={prevStepHandler} type="button">BACK</button>
                <button className=" w-full  rounded border h-[42px] border-[#53535350]" type="button" disabled={!isValid.region || !isValid.country} onClick={nextStepHandler}>NEXT</button>
            </div>
        </>
    )
}

export default Region