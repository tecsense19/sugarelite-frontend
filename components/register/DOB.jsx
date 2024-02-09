import Image from "next/image"
import { ConfigProvider, DatePicker } from 'antd';
import { Controller } from "react-hook-form";
import dayjs from 'dayjs';

const DOB = ({ nextStepHandler, prevStepHandler, watch, control }) => {
    const isValid = watch("date_of_birth")

    const isFormValid = {
        sugarType: watch("sugarType"),
        username: watch("username"),
        email: watch("email"),
        password: watch("password"),
        region: watch("region"),
        country: watch("country"),
        date_of_birth: watch("date_of_birth"),
    }
    const dateFormat = 'DD-MM-YYYY';
    console.log(isFormValid)
    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={"/assets/calendar_3.svg"} alt="calender" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl pt-5 font-medium max-w-[15rem]">Enter Date of Birth?</p>
                <p className='text-white opacity-[50%] mt-3 text-[16px] max-w-[20rem]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className='mt-14 w-full'>
                <div className="relative flex justify-end items-center">
                    <Controller
                        name="date_of_birth"
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
                                    maxDate={dayjs('09-02-2024', dateFormat)}
                                    showNow={false}
                                    placeholder="dd/mm/yyyy"
                                    format={'DD/MM/YYYY'}
                                    dropdownStyle={{ backgroundColor: '#232323', }}
                                    className="w-full text-opacity-[70%] pt-4"
                                />
                            </ConfigProvider>
                        )}
                    />
                </div>
            </div>
            <div className='mt-14 w-full'>
                <button className="bg-secondary w-full h-[42px] mb-3 rounded" onClick={prevStepHandler} type="button">BACK</button>
                <button className=" w-full h-[42px] rounded border border-[#53535350]" onClick={nextStepHandler} type="button" disabled={!isValid}>NEXT</button>
            </div>

        </>
    )
}

export default DOB