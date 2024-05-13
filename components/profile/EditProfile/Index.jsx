"use client"
import React, { useEffect, useState } from 'react'
import SideContent from '../SideContent'
import EditMainContent from './EditMainContent'
import { useForm } from 'react-hook-form'
import { edit_profile_action, encrypt_user } from '@/app/lib/actions'
import { client_notification, client_routes, server_routes } from '@/app/lib/helpers'
import axios from 'axios'
import { notification } from 'antd'
import { useStore } from '@/store/store'
import { setCookie } from 'nookies'
import CryptoJS from "crypto-js"
import { useRouter } from 'next/navigation'

const Index = ({ user }) => {

    const { handleSubmit, control, setValue, register } = useForm()
    const [publicPhotoList, setPublicPhotoList] = useState([])
    const [privatePhotoList, setPrivatePhotoList] = useState([])
    const [removalArray, setRemovalArray] = useState([])
    const [avatar, setAvatar] = useState(user.avatar_url)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const [api, contextHolder] = notification.useNotification();


    const getPhotoList = (type) => {
        let array = []
        if (type === "public" && publicPhotoList.length) {
            publicPhotoList.forEach((i) => {
                array.push(i.file)
            })
        } else if (type === "private" && privatePhotoList.length) {
            privatePhotoList.forEach(i => {
                array.push(i.file)
            })
        }
        return array
    }


    const editHanlder = async (data) => {
        setIsLoading(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
        let obj = {}
        for (let key in data) {
            if (data[key]) {
                obj[key] = data[key]
            }
        }

        obj = { ...obj, user_id: user.id, "public_images[]": getPhotoList("public"), "total_private_images[]": getPhotoList("private"), avatar_url: avatar, remove_images: removalArray.toString(), mobile_no: user.mobile_no === null ? "" : user.mobile_no }
        let temp = { ...user, ...obj }

        let formData = new FormData();


        for (let key in temp) {
            if (Array.isArray(temp[key])) {
                for (let file of temp[key]) {
                    formData.append(key, file);
                }
            }
            else {
                formData.append(key, temp[key]);
            }
        }

        try {
            const { data } = await axios.post(server_routes.register, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (e) => {
                    let progressBar = Math.round((e.loaded * 100) / e.total)
                    setProgress(progressBar)
                }
            })
            if (data.success) {
                client_notification(api, "topRight", 'success', data.message, 4)
                setIsLoading(false)
                window.location.pathname = client_routes.profile
                // navigate.push(client_routes.profile)
                // window.location.reload()
                // navigate.refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(editHanlder)} className='w-full overflow-x-hidden flex flex-col lg:flex-row'>
                <SideContent user={user} control={control} setValue={setValue} setAvatar={setAvatar} register={register} />
                <EditMainContent progress={progress} user={user} control={control} setValue={setValue} publicPhotoList={publicPhotoList} setPrivatePhotoList={setPrivatePhotoList} privatePhotoList={privatePhotoList} setPublicPhotoList={setPublicPhotoList} setRemovalArray={setRemovalArray} isLoading={isLoading} />
            </form>
        </>
    )
}

export default Index