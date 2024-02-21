import { Checkbox, ConfigProvider } from 'antd'
import React from 'react'
import { Controller } from 'react-hook-form'

const Mob_Checkbox = ({ control, setValue, watch, text, name }) => {
    return (
        <div className='flex justify-between'>
            <label htmlFor={name} className='cursor-pointer text-white/80 text-[16px] font-medium select-none leading-[normal]'>{text}</label>
            <Controller name={name} defaultValue={false} control={control} render={() => (
                <ConfigProvider theme={{ token: { colorPrimary: "#F16667", fontSize: 20 } }}>
                    <Checkbox className='h-6 w-6 flex justify-end' id={name} onChange={(e) => setValue(name, e.target.checked)} checked={watch(name)} />
                </ConfigProvider>
            )} />
        </div>
    )
}

export default Mob_Checkbox