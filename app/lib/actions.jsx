"use server"

import { server_routes } from "./helpers"

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
    // console.log("email", email);
    const formData = new FormData()
    formData.append("email", email)
    const res = await fetch(server_routes.newsLetter, {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    return data
}