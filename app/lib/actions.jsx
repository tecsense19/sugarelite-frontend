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

export const encrypt_user = (token) => {
    if (token) {
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

export const get_user_action = async () => {
    const token = cookies().get("user")?.value
    if (token) {
        var bytes = CryptoJS.AES.decrypt(token, 'SecretKey');
        var userId = bytes.toString(CryptoJS.enc.Utf8);
        const res = await fetch(server_routes.allProfiles + `?id=${userId}`)
        if (res.ok) {
            const data = await res.json()
            if (data.success) {
                return data.data
            }
        }
    }
}

export const checkuser_action = async (email) => {
    try {
        const formData = new FormData()
        formData.append("email", email)
        const res = await fetch(server_routes.checkUser, {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const forgot_password_action = async (form) => {
    try {
        const res = await fetch(server_routes.forgotPassword, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const edit_profile_action = async (form) => {
    try {
        const res = await fetch(server_routes.register, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: form
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout_user = () => {
    cookies().delete("user")
    cookies().delete("id")
}

export const all_profiles_action = async () => {
    try {
        const res = await fetch(server_routes.allProfiles)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
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
    try {
        const res = await fetch(server_routes.chatList)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const send_message_action = async (form) => {
    try {
        const res = await fetch(server_routes.sendMessage, {
            method: "POST",
            body: form
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const read_message_action = async (form) => {
    try {
        const res = await fetch(server_routes.readMessage, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const private_image_request = async (form) => {
    try {
        const formData = new FormData()
        formData.append("sender_id", form.sender_id)
        formData.append("receiver_id", form.receiver_id)
        formData.append("is_approved", form.is_approved)

        const res = await fetch(server_routes.private_image_request, {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const private_album_notification = async (id) => {
    try {
        const res = await fetch(server_routes.private_album_notification, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        },)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const private_image_access = async (form) => {
    try {
        const res = await fetch(server_routes.private_image_access, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const friend_request_action = async (form) => {
    try {
        const res = await fetch(server_routes.friends, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const read_friend_request_action = async (id) => {
    try {
        const res = await fetch(server_routes.read_friends_request_notification, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const all_friend_Notifications = async () => {
    try {
        const res = await fetch(server_routes.friends_request_notification)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const friend_request_notifications = async (id) => {
    try {
        const res = await fetch(server_routes.friends_request_notification + '?user_id=' + id,)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const block_user_action = async (form) => {
    try {
        const res = await fetch(server_routes.block_user, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const report_user_action = async (form) => {
    try {
        const res = await fetch(server_routes.report_user, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const send_otp_action = async (form) => {
    try {
        const res = await fetch(server_routes.send_otp, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const verify_otp_action = async (form) => {
    try {
        const res = await fetch(server_routes.verify_otp, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const contact_us_action = async (form) => {
    try {
        const res = await fetch(server_routes.contactUs, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const verify_identity_action = async (form) => {
    try {
        const res = await fetch(server_routes.verifyIdentity, {
            method: "POST",
            body: form
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const post_support_msg = async (form) => {
    try {
        const res = await fetch(server_routes.sendSupportMsg, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const get_support_msg = async (form) => {
    try {
        const res = await fetch(server_routes.getSupportMsg, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const get_language_action = async () => {
    try {
        const res = await fetch(server_routes.getLaguageMaster, { cache: "no-store" })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const get_braodcast_msg = async () => {
    try {
        const res = await fetch(server_routes.getBroadcastMsg)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

// Stripe Actions
export const stripe_action = async (form) => {
    try {
        const res = await fetch(server_routes.stripe_subscription, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const start_stop_subscription_action = async (form) => {
    try {
        const res = await fetch(server_routes.start_stop_subscription, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const cancel_subscription_action = async (form) => {
    try {
        const res = await fetch(server_routes.cancel_subscription, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
