import React from 'react'

const AccessToggler = ({ type }) => {
    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]">
            {type}
        </div>
    )
}

export default AccessToggler