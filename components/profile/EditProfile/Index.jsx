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

const Index = ({ decryptedUser }) => {

    const { state: { userState } } = useStore()

    const [user, setUser] = useState(userState ? userState : decryptedUser)

    useEffect(() => {
        setUser(userState ? userState : decryptedUser)
    }, [userState])

    const { dispatch } = useStore()
    const navigate = useRouter()

    const { handleSubmit, control, setValue, register } = useForm()
    const [publicPhotoList, setPublicPhotoList] = useState([])
    const [privatePhotoList, setPrivatePhotoList] = useState([])
    const [removalArray, setRemovalArray] = useState([])
    const [avatar, setAvatar] = useState(decryptedUser.avatar_url)

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
        let obj = {}
        for (let key in data) {
            if (data[key]) {
                obj[key] = data[key]
            }
        }

        obj = { ...obj, user_id: user.id, "public_images[]": getPhotoList("public"), "total_private_images[]": getPhotoList("private"), avatar_url: avatar, remove_images: removalArray.toString() }
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


        console.log(formData.get("avatar_url"))
        try {
            const { data } = await axios.post(server_routes.register, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (data.success) {
                console.log(data.user)
                dispatch({ type: "Current_User", payload: data.user })
                client_notification(api, "topRight", 'success', data.message, 4)
                const token = CryptoJS.AES.encrypt(JSON.stringify(data.user), "SecretKey").toString()
                setCookie(null, "user", token, { maxAge: 36000, secure: true, path: '/' })
                navigate.replace(client_routes.profile)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(editHanlder)} className='w-full overflow-x-hidden flex flex-col lg:flex-row'>
                <SideContent decryptedUser={user} control={control} setValue={setValue} setAvatar={setAvatar} register={register} />
                <EditMainContent decryptedUser={user} control={control} setValue={setValue} publicPhotoList={publicPhotoList} setPrivatePhotoList={setPrivatePhotoList} privatePhotoList={privatePhotoList} setPublicPhotoList={setPublicPhotoList} setRemovalArray={setRemovalArray} />
            </form>
        </>
    )
}

export default Index