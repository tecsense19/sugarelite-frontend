'use client'
import Image from "next/image"
import Select from 'react-select'

const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
]


const Region = ({ nextStepHandler, prevStepHandler, register }) => {

    return (
        <>
            <div className="text-center flex flex-col items-center">
                <div className="bg-secondary h-20 w-20 flex justify-center items-center rounded-full">
                    <Image src={"/assets/treasure_map.svg"} alt="pad_lock" width={48} height={48} className="pointer-events-none select-none" />
                </div>
                <p className="text-2xl pt-5 font-medium max-w-[15rem]">Where are you from? which region?</p>
                <p className='text-white opacity-[50%] mt-3 text-[16px] max-w-[20rem]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className='mt-14 w-full'>

                <Select
                    {...register("customSelect")}
                    isSearchable
                    classNames={{
                        control: (state) =>
                            state.isFocused ? 'border-red-600' : 'border-grey-300',
                    }}
                    options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        // Add more options as needed
                    ]}
                />

            </div>
            <div className='mt-14 w-full'>
                <button className="bg-secondary w-full py-3 mb-3 rounded" onClick={prevStepHandler} type="button">BACK</button>
                <button className=" w-full py-3 rounded border border-[#53535350]" onClick={nextStepHandler} type="button">NEXT</button>
            </div>
        </>
    )
}

export default Region