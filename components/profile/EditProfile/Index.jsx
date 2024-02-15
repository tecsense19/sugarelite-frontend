"use client"
import React from 'react'
import SideContent from '../SideContent'
import EditMainContent from './EditMainContent'
import { useForm } from 'react-hook-form'

const Index = () => {

    const { handleSubmit, control, setValue } = useForm()

    const editHanlder = (data) => {
        console.log(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(editHanlder)} className='w-full xl:w-[calc(100%-100px)]'>
                <SideContent control={control} setValue={setValue} />
                <EditMainContent control={control} setValue={setValue} />
            </form>

        </>
    )
}

export default Index