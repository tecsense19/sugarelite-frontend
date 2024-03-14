"use server"

import { cookies } from "next/headers"
import { server_routes } from "./helpers"
import CryptoJS from "crypto-js"
import { loadStripe } from "@stripe/stripe-js"
import { setCookie } from "nookies"


export const getCountries = async () => {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/states")
    const data = await res.json()
    return data
}

export const register_action = async (form) => {
    const res = await fetch(server_routes.register, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const data = await res.json()
    return data
}

export const login_action = async (form) => {
    const res = await fetch(server_routes.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const data = await res.json()
    return data
}

export const newsletter_action = async (email) => {
    const formData = new FormData()
    formData.append("email", email)
    const res = await fetch(server_routes.newsLetter, {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    return data
}

export const encrypt_user = (token) => {
    if (token) {
        console.log(token)
        cookies().set("user", token)
    }
}

export const decrypt_user = () => {
    const token = cookies().get("user")?.value
    if (token) {
        const bytes = CryptoJS.AES.decrypt(token, 'SecretKey');
        const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return user
    }
}

export const checkuser_action = async (email) => {
    const formData = new FormData()
    formData.append("email", email)
    const res = await fetch(server_routes.checkUser, {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    return data
}


export const forgot_password_action = async (form) => {
    const res = await fetch(server_routes.forgotPassword, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const data = await res.json()
    return data
}

export const edit_profile_action = async (form) => {
    const res = await fetch(server_routes.register, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: form
    })
    console.log(res)
}

export const logout_user = () => {
    cookies().delete("user")
}

export const all_profiles_action = async () => {
    const res = await fetch(server_routes.allProfiles, { next: { revalidate: 60 } })
    const data = await res.json()
    return data
}

export const search_profile_action = async (id) => {
    try {
        const res = await fetch(server_routes.allProfiles + `?id=${id}`)
        if (res.ok) {
            const data = await res.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const chat_list_action = async () => {
    const res = await fetch(server_routes.chatList)
    const data = await res.json()
    return data
}

export const send_message_action = async (form) => {
    const res = await fetch(server_routes.sendMessage, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const data = await res.json()
    return data
}

export const private_image_access = async (form) => {
    const res = await fetch(server_routes.private_image_access, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const data = await res.json()
    return data
}

export const private_album_notification = async () => {
    const res = await fetch(server_routes.private_album_notification, { cache: "no-cache" })
    const data = await res.json()
    return data
}

export const friends_list_action = async (id) => {
    const res = await fetch(server_routes.friends_list, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
    })
    const data = await res.json()
    return data
}

// Stripe Actions
export const stripe_action = async (form) => {
    const res = await fetch(server_routes.stripe_subscription, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    const data = await res.json()
    return data
}
