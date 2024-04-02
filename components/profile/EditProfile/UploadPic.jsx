"use client"
import { Button, ConfigProvider, Popconfirm } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import cross from "/public/assets/cross.svg"

const UploadPic = ({ name, photoList, setPhotoList, uploadedImages, setRemovalArray, progress }) => {

    // const [photoList, setPhotoList] = useState([])

    const [removalImages, setRemovalImages] = useState(uploadedImages)

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
            let alreadyUploaded = false;
            for (let item of photoList) {
                if (item.name === obj.name) {
                    alreadyUploaded = true;
                    break;
                }
            }
            if (!alreadyUploaded) {
                obj.photo_url = file
                obj.file = files[0]
                setPhotoList((prev) => [...prev, obj])
            }
        }
        e.target.value = null
    }

    const deletePicHandler = (index) => {
        if (index.id) {
            const arr = removalImages.filter((photo, inx) => photo.id !== index.id)
            setRemovalImages(arr)
            setRemovalArray((prev) => [...prev, index.id])
        } else {
            const desiredArr = photoList.filter((photo, inx) => inx !== index)
            setPhotoList(desiredArr)
        }
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
            boxShadowSecondary: "none",
            colorBgElevated: "#000",
        }
    }

    return (
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[14px]'>
            {
                removalImages && removalImages.map((photo, index) => {
                    return <div className="aspect-square relative popup_upload_pic" key={index} data-aos='zoom-in'>
                        <ConfigProvider theme={customStyles}>
                            <Popconfirm
                                title="Delete the photo"
                                placement="bottomLeft"
                                description="Are you sure to delete this photo?"
                                onConfirm={() => deletePicHandler({ id: photo.id })}
                                okText="Yes"
                                cancelText="No"
                                arrow={{ pointAtCenter: true }}
                            >
                                <button className='absolute backdrop-blur-3xl shadow-inner bg-secondary -top-2 -right-2 h-[18px] w-[18px] rounded-full  flex items-center justify-center' type='button'>
                                    <Image src={cross} width={6} height={6} alt="delete" className='' />
                                </button>
                            </Popconfirm>
                        </ConfigProvider>
                        <Image src={photo.public_images} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none border-dashed border border-[#ffffff70] rounded-[5px] object-contain object-center overflow-hidden" />
                    </div>
                })
            }
            {
                photoList && photoList.map((photo, index) => {
                    return <div className="aspect-square relative popup_upload_pic" key={index} data-aos='zoom-in'>
                        <ConfigProvider theme={customStyles}>
                            <Popconfirm
                                title="Delete the photo"
                                placement="bottomLeft"
                                description="Are you sure to delete this photo?"
                                onConfirm={() => deletePicHandler(index)}
                                okText="Yes"
                                cancelText="No"
                                arrow={{ pointAtCenter: true }}
                            >
                                <button className='absolute backdrop-blur-3xl shadow-inner bg-secondary -top-2 -right-2 h-[18px] w-[18px] rounded-full  flex items-center justify-center' type='button'>
                                    <Image src={cross} width={6} height={6} alt="delete" className='' />
                                </button>
                            </Popconfirm>
                        </ConfigProvider>
                        <Image src={photo.photo_url ? photo.photo_url : photo.public_images} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none border-dashed border border-[#ffffff70] rounded-[5px] object-contain object-center overflow-hidden" />
                        <progress id="progressBar" value={progress} max="100" className='absolute w-full h-2 bottom-0 rounded-[5px]'></progress>
                    </div>
                })
            }
            <div className="aspect-square" data-aos='zoom-in'>
                <input type='file' id={name} onChange={photoHandler} className='hidden' accept='.jpg,.png,.jpeg,.svg' />
                <label htmlFor={name} className='h-full w-full border-dashed border border-[#ffffff70] hover:border-secondary transition-all duration-200 group flex flex-col gap-[10px] justify-center items-center rounded-[5px] cursor-pointer '>
                    <span className='text-[20px] text-white text-opacity-70 -mt-[8px] transition-all duration-200 group-hover:text-secondary'>+</span>
                    <span className='text-[16px] font-medium text-white text-opacity-70 transition-all duration-200 group-hover:text-secondary'>Upload</span>
                </label>
            </div>
        </div >
    )
}

export default UploadPic