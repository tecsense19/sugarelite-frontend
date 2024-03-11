"use client"
import Image from "next/image"
import { ConfigProvider, DatePicker } from 'antd';
import { Controller } from "react-hook-form";
import dayjs from 'dayjs';
import calendar_3 from "../../public/assets/calendar_3.svg"
import chevron_right from "../../public/assets/chevron_right.svg"
import calendar from "../../public/assets/calendar.svg"

const DOB = ({ nextStepHandler, isLoading, prevStepHandler, watch, control }) => {

    const isValid = watch("birthdate")
    const dateFormat = 'DD/MM/YYYY';

    const ageController = (current) => {
        return current && current > dayjs().subtract(1, 'year');
    }

    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={calendar_3} alt="calender" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl sm:text-[20px] pt-5 font-medium max-w-[15rem] sm:max-w-full sm:pt-[11px]">Enter Date of Birth?</p>
                <p className='text-white opacity-[50%] mt-3 text-[16px] max-w-[20rem] sm:hidden'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className='mt-14 w-full sm:mt-[25px]'>
                <div className="relative flex justify-end items-center">
                    <Controller
                        name="birthdate"
                        control={control}
                        render={({ field }) => (
                            <ConfigProvider
                                theme={{
                                    components: {
                                        DatePicker: {
                                            activeBg: "transparent",
                                            activeBorderColor: "#535353",
                                            hoverBorderColor: "#535353",
                                            paddingBlock: "12px 18px",
                                            controlOutline: "none",
                                            colorText: "rgba(225,225,225,.7)",
                                            inputFontSize: "16px"
                                        }
                                    },
                                    token: {
                                        colorBgContainerDisabled: "transparent",
                                        colorBorder: "#535353",
                                        colorBgContainer: "transparent",
                                        colorPrimary: "#535353",
                                        borderRadius: '5px',
                                        colorTextPlaceholder: "rgba(225,225,225,.7)",
                                        colorIcon: "black",
                                        colorText: "black",
                                        colorTextDescription: "black"
                                    }
                                }}
                            >
                                <DatePicker
                                    {...field}
                                    maxDate={dayjs(dayjs().subtract(1, 'year'), dateFormat)}
                                    showNow={false}
                                    disabledDate={ageController}
                                    // maxDate={dayjs('2020-06-30', dateFormat)}

                                    placeholder="dd/mm/yyyy"
                                    format={dateFormat}
                                    dropdownStyle={{ backgroundColor: '#232323', }}
                                    className="w-full text-opacity-[70%] pt-4"
                                />
                                <Image src={calendar} alt="dob" width={20} height={20} className="absolute left-0 opacity-70 translate-x-4" />
                            </ConfigProvider>
                        )}
                    />
                </div>
            </div>
            <div className='mt-14 w-full sm:grid grid-cols-2 gap-x-[37px]'>
                <button className="border sm:border-none border-[#535353] sm:bg-black w-full h-[42px] mb-3 rounded text-white text-opacity-[70%] transition-all duration-150 hover:scale-[1.02]" onClick={prevStepHandler} type="button">
                    <div className="sm:flex justify-center font-bold gap-[5px]">
                        <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block rotate-180 w-auto h-auto hidden opacity-70 " />
                        BACK
                    </div>
                </button>
                <button className={`w-full h-[42px] rounded bg-secondary relative text-white text-opacity-[70%] ${isValid ? "transition-all duration-150 hover:scale-[1.02]" : ""}`} type="submit" disabled={!isValid} >
                    <div className="sm:flex justify-center gap-[5px] font-bold ">
                        {
                            !isLoading ?
                                <>
                                    SUBMIT
                                    <Image src={chevron_right} width={20} height={20} alt="next_btn" priority className="sm:block hidden w-auto h-auto text-white" />
                                </>
                                :
                                <div className="flex justify-center items-center ">
                                    <div className="loader"></div>
                                </div>
                        }

                    </div>
                </button>
            </div>

        </>
    )
}

export default DOB