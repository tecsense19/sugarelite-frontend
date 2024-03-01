"use client"
import React, { useEffect } from 'react'
import SelectBox from './SelectBox'
import { profile_select_options_appearance, profile_select_options_lifestyle } from '@/app/lib/constants'
import { client_routes } from '@/app/lib/helpers'
import UploadPic from './UploadPic'
import Link from 'next/link'
import Image from 'next/image'
import arrow_left from "/public/assets/arrow_left.svg";
import Aos from 'aos'

const EditMainContent = ({ control, setValue }) => {

    useEffect(() => {
        Aos.init()
    }, [])

    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]" >
            <Link href={client_routes.profile} className="hidden absolute z-[1] bg-secondary top-[96px] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px]" data-aos='fade-left'>
                <Image src={arrow_left} alt="edit" width={30} height={30} className="w-auto h-auto pointer-events-none" />
            </Link>
            <div className="border-white lg:border-b border-opacity-20 lg:pb-[40px]" data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px]" data-aos='zoom-in'>Public Photos</h1>
                <div className="mt-[20px] lg:mt-[25px]">
                    <UploadPic control={control} setValue={setValue} name="public_photos" />
                </div>
            </div>
            <div className="border-white lg:border-b border-opacity-20 pt-[40px] lg:pb-[40px]  w-full" data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px]" data-aos='zoom-in'>Private Photos</h1>
                <div className="mt-[20px] lg:mt-[25px]">
                    <UploadPic control={control} setValue={setValue} name="private_photos" />
                </div>
            </div>
            <div className="border-white lg:border-b border-opacity-20 py-[40px]" data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in'>Appearance</h1>
                <div className="mt-[25px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[20px] lg:gap-[30px]">
                    {
                        profile_select_options_appearance.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} inx={inx} />
                        })
                    }
                </div>
            </div>
            <div className="lg:pt-[40px] pb-[50px] " data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in'>Lifestyle</h1>
                <div className="mt-[25px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[20px] lg:gap-[30px]">
                    {
                        profile_select_options_lifestyle.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} inx={inx} />
                        })
                    }
                </div>
            </div>
            <div className='text-center pb-[50px]' data-aos='zoom-in' data-aos-anchor-placement="bottom">
                <button className='text-[16px] font-[600] lg:font-[500] bg-secondary h-[42px] w-[191px] rounded-[5px]' type='submit'>SAVE PROFILE</button>
            </div>
        </div>
    )
}

export default EditMainContent