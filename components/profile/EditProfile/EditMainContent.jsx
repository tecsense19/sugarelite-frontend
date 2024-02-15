"use client"
import React, { useEffect } from 'react'
import SelectBox from './SelectBox'
import { profile_select_options_appearance, profile_select_options_lifestyle } from '@/app/lib/constants'
import { useForm } from 'react-hook-form'
import { aosInit } from '@/app/lib/helpers'
import UploadPic from './UploadPic'

const EditMainContent = ({ handleSubmit, control, setValue }) => {

    // const { handleSubmit, control, setValue } = useForm()



    useEffect(() => {
        aosInit()
    }, [])

    return (
        <div className="w-full xl:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] xl:mt-[30px] xl:px-[50px]" >
            <div className="border-white xl:border-b border-opacity-20 xl:pb-[40px]">
                <h1 className="text-[24px] font-bold xl:text-[30px]">Public Photos</h1>
                <div className="mt-[20px] xl:mt-[25px]">
                    <UploadPic control={control} setValue={setValue} name="public_photos" />
                </div>
            </div>
            <div className="border-white xl:border-b border-opacity-20 pt-[40px] xl:pb-[40px]  w-full">
                <h1 className="text-[24px] font-bold xl:text-[30px]">Private Photos</h1>
                <div className="mt-[20px] xl:mt-[25px]">
                    <UploadPic control={control} setValue={setValue} name="private_photos" />
                </div>
            </div>
            <div className="border-white xl:border-b border-opacity-20 py-[40px]">
                <h1 className="text-[24px] font-bold xl:text-[30px] select-none">Appearance</h1>
                <div className="mt-[25px] flex gap-[20px] xl:gap-[30px] flex-wrap">
                    {
                        profile_select_options_appearance.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} inx={inx} />
                        })
                    }
                </div>
            </div>
            <div className="xl:pt-[40px] pb-[50px] ">
                <h1 className="text-[24px] font-bold xl:text-[30px] select-none">Lifestyle</h1>
                <div className="mt-[25px] flex gap-[20px] xl:gap-[30px] flex-wrap">
                    {
                        profile_select_options_lifestyle.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} inx={inx} />
                        })
                    }
                </div>
            </div>
            <div className='text-center pb-[50px]'>
                <button className='text-[16px] font-[600] xl:font-[500] bg-secondary h-[42px] w-[191px] rounded-[5px]' type='submit'>SAVE PROFILE</button>
            </div>
        </div>
    )
}

export default EditMainContent