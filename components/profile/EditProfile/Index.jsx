"use client"
import React from 'react'
import SideContent from '../SideContent'
import EditMainContent from './EditMainContent'
import { useForm } from 'react-hook-form'

const Index = ({ user }) => {

    const { handleSubmit, control, setValue } = useForm()

    const editHanlder = (data) => {
        console.log(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(editHanlder)} className='w-full overflow-x-hidden flex flex-col lg:flex-row'>
                <SideContent user={user} control={control} setValue={setValue} />
                <EditMainContent user={user} control={control} setValue={setValue} />
            </form>
        </>
    )
}

export default Index