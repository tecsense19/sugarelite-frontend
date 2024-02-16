"use client"
import { ConfigProvider, Select } from "antd"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form"

const { Option } = Select;


const SelectBox = ({ name, options, text, control, inx }) => {

    const customStyles = {
        components: {
            Select: {
                selectorBg: "transparent",
                boxShadow: "none",
                controlOutline: "none",
                colorBorder: "#ffffff30",
                controlItemBgHover: "none",
                controlHeight: "48px",
                colorTextPlaceholder: "rgba(255,255,255,0.8)",
                colorText: "rgba(255,255,255,0.8)",
                colorSuccessBorderHover: "none",
                colorInfoBorderHover: "none",
                colorTextActive: "black",
                optionSelectedColor: "#000",
                optionSelectedBg: "rgba(255,255,255,0.8)",
                optionPadding: '6px 24px',
                optionHeight: "auto",
                optionActiveBg: "rgba(255,255,255,0.2)"
            },
        },
        token: {
            borderRadius: '5px',
            colorPrimary: "#535353",
            fontSize: "16px",
            padding: '12px 28px',
            colorIcon: "white",
            fontWeight: "medium"
        }
    }

    const [animation, setAnimation] = useState("")


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })

        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 640) {
                inx % 2 === 0 ? setAnimation("fade-left") : setAnimation("fade-right")
            } else if (width <= 768) {
                inx % 2 === 0 ? setAnimation("fade-right") : setAnimation("fade-left")
            } else if (width <= 1669) {
                if (inx % 3 === 0) {
                    setAnimation('fade-right');
                } else if (inx % 3 === 1) {
                    setAnimation('zoom-in');
                } else {
                    setAnimation('fade-left');

                }
            } else {
                setAnimation("zoom-in")
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        // <div className="relative w-full sm:w-[calc(100%/2-20px)] md:w-[calc(100%/3-20px)] xl:max-w-[327px] profile" data-aos={animation} data-aos-duration="800">
        <div className="relative aspect-auto profile" data-aos={animation} data-aos-duration="800">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <ConfigProvider
                        theme={customStyles}
                    >
                        <Select
                            {...field}
                            placeholder={"ask me"}
                            optionFilterProp="children"
                            dropdownStyle={{ backgroundColor: '#535353' }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            className="w-full text-opacity-[70%]"
                        >
                            {
                                options.map((option, inx) => (
                                    <Option key={inx} value={option}>
                                        {option}
                                    </Option>
                                ))
                            }
                        </Select>
                        <Image src={"/assets/chevron-down.svg"} alt='down_arrow' width={20} height={20} priority className='absolute -translate-x-4 pointer-events-none top-[50%] -translate-y-[50%] right-0 ' />
                        <p className="absolute -top-3 bg-primary ml-[10px] xl:ml-[22px] px-1 text-[15px] md:text-[16px] font-medium text-white text-opacity-50 uppercase">{text}</p>
                    </ConfigProvider>
                )}
            />
        </div>
    )
}

export default SelectBox