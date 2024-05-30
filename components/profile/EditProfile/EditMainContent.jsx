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

const EditMainContent = ({ control, progress, publicPhotoList, setPublicPhotoList, privatePhotoList, setPrivatePhotoList, user, setRemovalArray, isLoading, allStrings }) => {

    useEffect(() => {
        Aos.init()
    }, [])

    const profileSelectAppearanceOptions = profile_select_options_appearance(allStrings);
    const profileSelectLifestyleOptions = profile_select_options_lifestyle(allStrings);

    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]" >
            <Link href={client_routes.profile} className="hidden absolute z-[1] bg-secondary top-[96px] right-[40px] xl:right-[72px] h-10 w-10 xl:h-14 xl:w-14 md:flex items-center justify-center rounded-[5px] group" data-aos='fade-left'>
                <Image src={arrow_left} alt="edit" width={30} height={30} className="w-auto h-auto pointer-events-none transition-all duration-150 group-hover:scale-[1.2]" />
            </Link>
            <div className="border-white lg:border-b border-opacity-20 lg:pb-[40px]" data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px]" data-aos='zoom-in'>{allStrings["string_public_photos"]}</h1>
                <div className="mt-[20px] lg:mt-[25px]">
                    <UploadPic progress={progress} control={control} name="public_photos" photoList={publicPhotoList} setPhotoList={setPublicPhotoList} uploadedImages={user.get_all_profileimg && user.get_all_profileimg.filter((i) => i.image_type === "public")} setRemovalArray={setRemovalArray} allStrings={allStrings} />
                </div>
            </div>
            <div className="border-white lg:border-b border-opacity-20 pt-[40px] lg:pb-[40px]  w-full" data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px]" data-aos='zoom-in'>{allStrings["string_private_photos"]}</h1>
                <div className="mt-[20px] lg:mt-[25px]">
                    <UploadPic progress={progress} control={control} name="private_photos" photoList={privatePhotoList} setPhotoList={setPrivatePhotoList} uploadedImages={user.get_all_profileimg && user.get_all_profileimg.filter((i) => i.image_type === "private")} setRemovalArray={setRemovalArray} allStrings={allStrings} />
                </div>
            </div>
            <div className="border-white lg:border-b border-opacity-20 py-[40px]" data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in'>{allStrings["string_appearance"]}</h1>
                <div className="mt-[25px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[20px] lg:gap-[30px]">
                    {
                        profileSelectAppearanceOptions.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} inx={inx} user={user} allStrings={allStrings} />
                        })
                    }
                </div>
            </div>
            <div className="lg:pt-[40px] pb-[50px] " data-aos='zoom-in'>
                <h1 className="text-[24px] font-bold lg:text-[30px] select-none" data-aos='zoom-in'>{allStrings["string_lifestyle"]}</h1>
                <div className="mt-[25px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[20px] lg:gap-[30px]">
                    {
                        profileSelectLifestyleOptions.map((type, inx) => {
                            return <SelectBox name={type.name} options={type.options} text={type.text} key={inx} control={control} inx={inx} user={user} allStrings={allStrings} />
                        })
                    }
                </div>
            </div>
            <div className='text-center pb-[50px] flex' data-aos='zoom-in' data-aos-anchor-placement="bottom">
                {
                    !isLoading &&
                    <button className='text-[16px] mx-auto font-[600] lg:font-[500] bg-secondary h-[42px] w-[191px] rounded-[5px] transition-all duration-150 hover:scale-105 uppercase' type='submit'>{allStrings["string_save_profile"]}</button>
                }
                {
                    isLoading && <div className='text-[16px] flex justify-center font-[600] lg:font-[500] bg-secondary h-[42px] w-[191px] rounded-[5px] transition-all duration-150 hover:scale-105 mx-auto' type='submit'>
                        <p className='loader'></p>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditMainContent