// import { specificCountries } from '@/app/lib/allCountries'
import Image from 'next/image'
import React from 'react'

const GetCountries = ({ countries, setCountries, selectedCountry, setSelectedCountry, showCountryCode, setShowCountryCode }) => {
    // const [countries, setCountries] = useState(specificCountries);
    // const [selectedCountry, setSelectedCountry] = useState(specificCountries[0]);
    // const [showCountryCode, setShowCountryCode] = useState(false);

    const handleCountryCodeChange = (obj) => {
        // setCountryCode(code)
        setSelectedCountry(obj)
    }

    return (
        <div className='basis-[29.17%] lg:basis-3/12 border border-white h-full rounded-[5px] flex justify-center items-center relative'>
            <span className='w-full bg-transparent text-[18px] text-white font-semibold outline-none px-2 flex justify-center items-center cursor-pointer gap-x-[5px]' onClick={() => setShowCountryCode(!showCountryCode)}>
                <Image src={selectedCountry.flag} alt='' width={30} height={20} className='pointer-events-none border-[1px]' />
                {selectedCountry.code}
            </span>
            {showCountryCode
                ? <div className='absolute bg-white rounded-[5px] left-0 top-12 z-[1] max-h-[160px] overflow-auto flex flex-col p-1' style={{ scrollbarWidth: "none" }}>
                    {countries.map((obj, inx) => (
                        <span key={inx} className="flex gap-x-5 items-center justify-between w-full rounded-[5px] hover:bg-gray-600/30 px-2 py-1 cursor-pointer" onClick={() => { handleCountryCodeChange(obj); setShowCountryCode(!showCountryCode) }}>
                            <div className="flex gap-x-2 w-max items-center">
                                <Image src={obj.flag} alt='' width={20} height={20} className='pointer-events-none' />
                                <div className='text-[#263238] font-semibold'>{obj.name}</div>
                            </div>
                            <div className="text-[#263238]/80">{obj.code}</div>
                        </span>
                    ))}
                </div>
                : <></>
            }
        </div>
    )
}

export default GetCountries