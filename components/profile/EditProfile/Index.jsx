"use client"
import React, { useState } from 'react'
import SideContent from '../SideContent'
import EditMainContent from './EditMainContent'
import { useForm } from 'react-hook-form'
import { edit_profile_action } from '@/app/lib/actions'
import { server_routes } from '@/app/lib/helpers'

const Index = ({ user }) => {

    const { handleSubmit, control, setValue } = useForm()
    const [publicPhotoList, setPublicPhotoList] = useState([])
    const [privatePhotoList, setPrivatePhotoList] = useState([])
    console.log(user)

    const getPhotoList = (type) => {
        let array = []
        if (type === "public" && publicPhotoList.length) {
            publicPhotoList.forEach((i) => {
                array.push(i.file)
            })
        } else if (privatePhotoList.length) {
            privatePhotoList.forEach(i => {
                array.push(i.file)
            })
        }
        return array
    }

    const editHanlder = async (data) => {
        data = { ...data, user_id: user.id, "public_images[]": getPhotoList("public"), "private_images[]": getPhotoList("private") }
        console.log("data :: ", data);
        let formData = new FormData();

        for (let key in data) {
            if (Array.isArray(data[key])) {
                for (let file of data[key]) {
                    formData.append(key, file);
                }
            } else {
                formData.append(key, data[key]);
            }
        }


        // try {
        //     const res = await fetch(server_routes.register, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //         body: formData
        //     })
        //     console.log(res)
        // } catch (error) {
        //     console.log(error)
        // }



        // for (let key in data) {
        //     if (key === "public_photos") {
        //         for (let publicPhoto of publicPhotoList) {
        //             formData.append("public_photos[]", publicPhoto.file);
        //         }
        //     } else if (key === "private_photos") {
        //         for (let privatePhoto of privatePhotoList) {
        //             formData.append("public_photos[]", privatePhoto.file);
        //         }
        //     } else {
        //         formData.append(key, data[key]);
        //     }
        // }

        // console.log(formData.getAll("public_photos[]"))
    }

    return (
        <>
            <form onSubmit={handleSubmit(editHanlder)} className='w-full overflow-x-hidden flex flex-col lg:flex-row'>
                <SideContent user={user} control={control} setValue={setValue} />
                <EditMainContent user={user} control={control} setValue={setValue} publicPhotoList={publicPhotoList} setPrivatePhotoList={setPrivatePhotoList} privatePhotoList={privatePhotoList} setPublicPhotoList={setPublicPhotoList} />
            </form>
        </>
    )
}

export default Index