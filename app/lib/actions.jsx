"use server"

export const getCountries = async () => {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/states")
    const data = await res.json()
    return data
}


