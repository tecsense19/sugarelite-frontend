"use client"
import { Button, ConfigProvider, Popconfirm } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

const UploadPic = ({ control, setValue, name }) => {

    const [photoList, setPhotoList] = useState([])

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const photoHandler = async (e) => {
        let obj = {}
        const { files } = e.target
        if (files[0]) {
            let file = await getBase64(files[0])
            obj.name = files[0].name
            obj.photo_url = file
            setPhotoList((prev) => [...prev, obj])
        }
    }

    const deletePicHandler = (photo) => {
        console.log(photo)
    }

    const customStyles = {
        components: {
            Button: {
                colorPrimary: "#F16667",
                colorPrimaryHover: "#F16667",
                fontSize: "10px",
                primaryShadow: "none",
                colorPrimaryActive: "#F16667",
                controlHeightSM: "18px",
                paddingBlockSM: '1px 6px'
            },
            Popconfirm: {
                controlHeight: "100px",
                fontSize: "12px",
                colorWarning: "#F16667",
            }
        },
        token: {
            paddingSM: "1px",
            boxShadowSecondary: "none"
        }
    }

    return (
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[14px]'>
            {
                photoList && photoList.map((photo, index) => {
                    return <div className="aspect-square relative  popup_upload_pic" key={index} data-aos='zoom-in'>
                        <ConfigProvider theme={customStyles}>
                            <Popconfirm
                                title="Delete the photo"
                                description="Are you sure to delete this photo?"
                                onConfirm={() => deletePicHandler(index)}
                                onCancel={() => deletePicHandler(index)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button className='absolute backdrop-blur-3xl shadow-inner bg-secondary -top-2 -right-2 h-[18px] w-[18px] rounded-full  flex items-center justify-center' type='button'>
                                    <Image src={"/assets/cross.svg"} width={6} height={6} alt="delete" className='' />
                                </button>
                            </Popconfirm>
                        </ConfigProvider>
                        <Image src={photo.photo_url} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none border-dashed border border-[#ffffff70] rounded-[5px] object-contain object-center overflow-hidden" />
                    </div>
                })
            }
            <div className="aspect-square" data-aos='zoom-in'>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => <>
                        <input type='file' {...field} id={name} onChange={photoHandler} className='hidden' accept='.jpg,.png,.jpeg,.svg' />
                        <label htmlFor={name} className='h-full w-full border-dashed border border-[#ffffff70] flex flex-col gap-[10px] justify-center items-center rounded-[5px] cursor-pointer '>
                            <span className='text-[20px] text-white text-opacity-70 -mt-[8px]'>+</span>
                            <span className='text-[16px] font-medium text-white text-opacity-70'>Upload</span>
                        </label>
                    </>}
                />
            </div>
        </div>
    )
}

export default UploadPic