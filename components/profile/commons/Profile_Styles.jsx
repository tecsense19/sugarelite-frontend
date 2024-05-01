import React from 'react'

const Profile_Styles = ({ title, list }) => {
    return (
        <div className="mb-[40px]">
            <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in' data-aos-anchor-placement="bottom">{title}</h1>
            <div className="mt-[25px] grid gap-[14px] md:gap-y-[46px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {
                    list.map((style, inx) => {
                        return <div key={inx} className='aspect-auto 2xl:ps-5' data-aos='zoom-in' data-aos-anchor-placement="bottom">
                            <p className='font-medium  text-[13px] md:text-[16px] text-white text-opacity-50 uppercase mb-[7px]'>{style.type}</p>
                            <p className='font-medium text-[18px] md:text-[20px] text-white text-opacity-80'>{style.value ? (style.value === "ask me" ? "NA" : style.value) : "NA"}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Profile_Styles