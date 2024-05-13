import { Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const DateModal = ({ isOpen, setIsModalOpened, setValue, day, setDay, month, setMonth, year, setYear }) => {

    const generateDays = () => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, index) => index + 1);
    };

    // const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 19;

    const years = Array.from({ length: 100 }, (_, index) => minYear - index);

    const onSubmit = () => {
        setIsModalOpened(false);
        setValue("birthdate", year + '/' + month + '/' + day)
    };

    const onClose = () => {
        setIsModalOpened(false);
    }

    const containerYearRef = useRef(null);
    const containerMonRef = useRef(null);
    const containerDayRef = useRef(null);

    const handleYearScroll = () => {
        if (containerYearRef.current) {
            const containerTop = containerYearRef.current.getBoundingClientRect().top;
            const containerHeight = containerYearRef.current.clientHeight;
            const containerCenter = containerTop + containerHeight / 2; // Calculate container center

            const years = containerYearRef.current.querySelectorAll('.year-item');
            let closestYear = null;
            let minDistance = Number.MAX_SAFE_INTEGER;

            years.forEach((year) => {
                const yearRect = year.getBoundingClientRect();
                const yearCenter = (yearRect.top + yearRect.bottom) / 2; // Calculate year item center
                const distance = Math.abs(containerCenter - yearCenter); // Calculate distance to container center

                if (distance < minDistance) {
                    closestYear = year.innerText;
                    minDistance = distance;
                }
            });

            setYear(parseInt(closestYear))
        }
    };

    const handleMonScroll = () => {
        if (containerMonRef.current) {
            const containerTop = containerMonRef.current.getBoundingClientRect().top;
            const containerHeight = containerMonRef.current.clientHeight;
            const containerCenter = containerTop + containerHeight / 2;

            const years = containerMonRef.current.querySelectorAll('.mon-item');
            let closestYear = null;
            let minDistance = Number.MAX_SAFE_INTEGER;

            years.forEach((year) => {
                const yearRect = year.getBoundingClientRect();
                const yearCenter = (yearRect.top + yearRect.bottom) / 2;
                const distance = Math.abs(containerCenter - yearCenter);

                if (distance < minDistance) {
                    closestYear = year.innerText;
                    minDistance = distance;
                }
            });
            const findIndex = months.findIndex(i => i === closestYear)
            setMonth(findIndex + 1)
        }
    }

    const handleDayScroll = () => {
        if (containerDayRef.current) {
            const containerTop = containerDayRef.current.getBoundingClientRect().top;
            const containerHeight = containerDayRef.current.clientHeight;
            const containerCenter = containerTop + containerHeight / 2;

            const years = containerDayRef.current.querySelectorAll('.day-item');
            let closestYear = null;
            let minDistance = Number.MAX_SAFE_INTEGER;

            years.forEach((year) => {
                const yearRect = year.getBoundingClientRect();
                const yearCenter = (yearRect.top + yearRect.bottom) / 2;
                const distance = Math.abs(containerCenter - yearCenter);

                if (distance < minDistance) {
                    closestYear = year.innerText;
                    minDistance = distance;
                }
            });

            setDay(closestYear)
        }
    }

    useEffect(() => {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
            setDay(daysInMonth);
        }
    }, [year, month]);

    const monthClickHandler = (y) => {
        if (month > (y + 1)) {
            containerMonRef.current.scrollTop -= 54
        } else {
            containerMonRef.current.scrollTop += 54
        }
    }

    const isSelectedMonth = (selectedMonth, mon) => {
        return (months[selectedMonth - 1] === months[mon] ? "font-semibold text-secondary" : "text-black/70 text-[10px]")

    };

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (containerYearRef.current) {
    //             if (event.key === 'ArrowUp') {
    //                 containerYearRef.current.scrollTop -= 54;
    //             } else if (event.key === 'ArrowDown') {
    //                 containerYearRef.current.scrollTop += 54;
    //             }
    //         }
    //     };

    //     document.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [containerYearRef]);

    return (
        <Modal
            open={isOpen}
            closeIcon={false}
            centered={true}
            footer={null}
            className='dob-container'
            width={360}
            maskClosable={true}
            onCancel={onClose}
        >
            <div className='flex flex-col  h-full  rounded-[5px]'>
                <div className='h-[3.8rem] flex justify-between items-center px-5 text-[20px] font-semibold border-b'>
                    <p>Date of Birth</p>
                    <p className='text-secondary'>{`${months[month - 1]} ${day < 10 ? ("0" + day) : day}, ${year}`}</p>
                </div>
                <div className='h-[12rem] w-full justify-center flex flex-col gap-4  relative'>
                    {/* <p className='text-center  text-xl'>{year + "-" + months[month - 1] + "-" + (day < 10 ? `0${day}` : day)}</p> */}
                    <div className='flex w-full  items-center justify-between px-10 '>
                        <div
                            className='h-[10rem] overflow-y-scroll date_scroller relative snap-y '
                            style={{ scrollBehavior: 'smooth' }}
                            ref={containerYearRef}
                            onScroll={handleYearScroll}
                        >
                            <div className='sticky top-[50%] h-[53.4px] -translate-y-[50%] w-14 border-y border-y-secondary'></div>
                            {years.map((y) => (
                                <p
                                    className={`text-[20px] cursor-pointer h-[calc(100%/3)] flex items-center justify-center w-14 z-10 snap-center year-item ${parseInt(year) === y ? "font-semibold text-secondary" : "text-black/70"}`}
                                    key={y}
                                    onClick={(e) => { (y < year ? containerYearRef.current.scrollTop += 54 : (y > year ? containerYearRef.current.scrollTop -= 54 : <></>)) }}
                                >
                                    {y}
                                </p>
                            ))}
                            <p className=' h-[calc(100%/3)] w-14'></p>
                        </div>
                        <div
                            className='h-[10rem] overflow-y-scroll date_scroller relative snap-y'
                            style={{ scrollBehavior: 'smooth' }}
                            ref={containerMonRef}
                            onScroll={handleMonScroll}
                        >
                            <div className='sticky top-[50%] h-[53.4px] -translate-y-[50%] w-14 border-y border-y-secondary'></div>
                            {months.map((y, inx) => (
                                <p
                                    className={`text-[20px] cursor-pointer h-[calc(100%/3)]  flex items-center justify-center w-14 snap-center mon-item ${isSelectedMonth(month, inx)}`}
                                    key={y}
                                    onClick={() => monthClickHandler(inx)}
                                >
                                    {y}
                                </p>
                            ))}
                            <p className=' h-[calc(100%/3)] w-14'></p>
                        </div>
                        <div
                            className='h-[10rem] overflow-y-scroll date_scroller relative snap-y'
                            style={{ scrollBehavior: 'smooth' }}
                            ref={containerDayRef}
                            onScroll={handleDayScroll}
                        >
                            <div className='sticky top-[50%] h-[53.4px] -translate-y-[50%] w-14 border-y-secondary border-y bottom-[50%]'></div>
                            {generateDays().map((d) => (
                                <p
                                    className={`text-[20px] cursor-pointer h-[calc(100%/3)]  flex items-center justify-center w-14 snap-center day-item ${d === parseInt(day) ? "font-semibold text-secondary" : "text-black/70"}`}
                                    key={d}
                                    onClick={(e) => { (d < day ? containerDayRef.current.scrollTop -= 54 : (d > day ? containerDayRef.current.scrollTop += 54 : <></>)) }}

                                >
                                    {d}
                                </p>
                            ))}
                            <p className=' h-[calc(100%/3)] w-14'></p>
                        </div>
                    </div>
                </div>
                <div className=' w-full pb-3 flex items-center justify-between gap-x-2 px-5'>
                    <button onClick={onClose} className='  text-center bg-primary-dark-4 text-white text-[17px] rounded-full w-[50%] py-[6px]'>Cancel</button>
                    <button type='submit' className='  text-center bg-secondary text-[17px] text-white font-medium rounded-full w-[50%] py-[6px]' onClick={onSubmit}>
                        Ok
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DateModal;
