"use client"
import Image from 'next/image'
import React from 'react'
import SelectBox from './SelectBox'
import { profile_select_options_appearance, profile_select_options_lifestyle } from '@/app/lib/constants'
import { useForm } from 'react-hook-form'

const EditMainContent = () => {

    const { handleSubmit, control } = useForm()

    const editHanlder = (data) => {
        console.log(data)
    }

    return (
        <form className="w-full xl:ml-[400px] text-white mt-[40px] px-[15px] xl:mt-[30px] xl:px-[50px]" onSubmit={handleSubmit(editHanlder)}>
            <div className="border-white xl:border-b border-opacity-20 xl:pb-[40px]">
                <h1 className="text-[24px] font-bold xl:text-[30px]">Photos</h1>
                <div className="mt-[20px] xl:mt-[25px] flex gap-[14px] md:gap-[14px] flex-wrap">
                    {
                        Array.from({ length: 8 }).map((item, index) => (
                            <div className="h-auto w-[calc(100%/3-14px)] sm:w-[calc(100%/4-14px)] md:w-[calc(100%/5-14px)] lg:w-[calc(100%/7-14px)]" key={index}>
                                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="border-white xl:border-b border-opacity-20 py-[40px]">
                <h1 className="text-[24px] font-bold xl:text-[30px] select-none">Appearance</h1>
                <div className="mt-[25px] flex gap-[20px] xl:gap-[30px] flex-wrap">
                    {
                        profile_select_options_appearance.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} />
                        })
                    }
                </div>
            </div>
            <div className="xl:pt-[40px] pb-[50px] ">
                <h1 className="text-[24px] font-bold xl:text-[30px] select-none">Lifestyle</h1>
                <div className="mt-[25px] flex gap-[20px] xl:gap-[30px] flex-wrap">
                    {
                        profile_select_options_lifestyle.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} />
                        })
                    }
                </div>
            </div>
            <div className='text-center pb-[50px]'>
                <button className='text-[16px] font-[600] xl:font-[500] bg-secondary h-[42px] w-[191px] rounded-[5px]' type='submit'>SAVE PROFILE</button>
            </div>
        </form>
    )
}

export default EditMainContent