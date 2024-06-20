"use client"
import Image from "next/image"
import counterBgDesktopImage from "../../public/new_assets/new_counter_desktop.svg";
import counterBgMobileImage from "../../public/new_assets/new_counter_mobile.svg";
import CountUp from 'react-countup'
import { useEffect, useRef, useState } from "react";

const NewCounter = ({ allStrings }) => {
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const convertStringToNumber = (str) => {
        let obj = {
            number: 0,
            string: ""
        }
        if (typeof str === "string") {
            try {
                let number = parseInt(str);
                if (number >= 1000) {
                    obj.number = Math.floor(number / 1000);
                    obj.string = "k";
                    return obj;
                }
                obj.number = number;
                return obj;
            } catch (err) {
                obj.number = 1;
                return obj;
            }
        } else {
            obj.number = 1;
            return obj;
        }
    }

    const counters = [
        { id: 1, name: allStrings["string_happy_members"], value: convertStringToNumber(allStrings["string_happy_members_count"]) },
        { id: 2, name: allStrings["string_elite_male"], value: convertStringToNumber(allStrings["string_elite_male_count"]) },
        { id: 3, name: allStrings["string_elite_female"], value: convertStringToNumber(allStrings["string_elite_female_count"]) },
        { id: 4, name: allStrings["string_happy_match"], value: convertStringToNumber(allStrings["string_happy_match_count"]) }
    ]

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Change this threshold according to your needs
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        }, options);
        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, []);
    return (
        // <div className="w-full flex justify-center px-4 sm:px-0">
        <div className="w-full h-[370px] lg:h-[240px] flex justify-center items-center relative overflow-hidden">
            <Image src={counterBgDesktopImage} alt="" width={1000} height={1000} className="w-full h-full select-none pointer-events-none object-cover object-left hidden md:block" />
            <Image src={counterBgMobileImage} alt="" width={1000} height={1000} className="w-full h-full select-none pointer-events-none object-cover object-top block md:hidden" />
            <div ref={countRef} className="h-full w-full md:w-8/12 xl:7/12 absolute py-[65px] lg:py-[75px] grid grid-cols-2 gap-x-[25px] gap-y-[40px] lg:flex lg:justify-between items-center px-4">
                {counters.map((item, idx) => {
                    return (
                        <div key={idx} className="flex flex-col justify-center items-center">
                            <div className="text-[26px] md:text-[clamp(36px,3vw,40px)] leading-[normal] font-bold text-center text-gradient">
                                {item.value?.number > 0
                                    ? <>
                                        {isVisible && <CountUp start={0} end={item.value.number} duration={2} />}{item.value.string ? item.value.string : ""}+
                                    </>
                                    : 0
                                }
                            </div>
                            <div className="text-[clamp(15px,2vw,18px)] md:text-[18px] leading-[normal] font-semibold mt-[10px] md:mt-4 text-center text-black">{item.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
        // </div>
    )
}

export default NewCounter