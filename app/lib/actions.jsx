"use server"

import { cookies } from "next/headers"
import { server_routes } from "./helpers"
import CryptoJS from "crypto-js"


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


export const logout_user = () => {
    cookies().delete("user")
}