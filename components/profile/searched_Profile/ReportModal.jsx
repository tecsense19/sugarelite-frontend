
import { ConfigProvider, Modal, notification } from 'antd'
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CloseIcon from '/public/assets/close.svg'
import { report_user_action } from '@/app/lib/actions';
import { client_notification } from '@/app/lib/helpers';

const ReportModal = ({ setIsModalOpen, isModalOpen, toUser, currentUser, allStrings }) => {

    const [isLoading, setisLoading] = useState(false)
    const { handleSubmit, register, reset } = useForm()
    const [api, contextHolder] = notification.useNotification()

    const submitHandler = async ({ reason }) => {
        setisLoading(true)
        const res = await report_user_action({ sender_id: currentUser.id, receiver_id: toUser.id, reason: reason })
        if (res.success) {
            reset()
            client_notification(api, "topRight", "success", res.message, 3)
            setIsModalOpen(false)
        } else {
            client_notification(api, "topRight", "warning", res.message, 3)
        }
        setisLoading(false)
    }

    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleColor: "#070F2B",
                            titleFontSize: "22px",
                            padding: 0,
                        },
                    },
                    "token": {
                        "colorPrimary": "#f16667",
                        "colorInfo": "#f16667",
                        "colorBgBase": "#2d2d2d",
                        "colorTextBase": "#ffffff"
                    }
                }}
            >

                <Modal
                    closeIcon={false}
                    centered={true}
                    open={isModalOpen}
                    footer={null}
                    className='report-container'
                >
                    <div className='w-full text-white'>
                        <div className=' border-t-[6px] border-secondary rounded-t-md w-full text-xl justify-between bg-white/10 flex items-center pb-[2px] px-5 text-Primary font-semibold h-14'>
                            <div className='flex gap-3 items-center mt-1'>
                                {
                                    toUser.avatar_url ? <Image src={toUser.avatar_url} alt='avatar' width={40} height={40} className='object-cover min-h-10 pointer-events-none rounded-full' /> : <p className='h-10 w-10 rounded-full bg-primary capitalize flex justify-center items-center'>{toUser.username.charAt(0)}</p>
                                }
                                <p className='capitalize'>{toUser.username}</p>
                            </div>
                            <Image src={CloseIcon} alt='colse' width={24} height={24} onClick={() => { setIsModalOpen(false) }} className='cursor-pointer' />
                        </div>
                        <form className=' flex-col flex gap-2' onSubmit={handleSubmit(submitHandler)}>
                            <div className='px-4 pt-4'>
                                <textarea {...register("reason", { required: true })} cols="30" rows="5" placeholder={allStrings["string_enter_reason..."]} className='w-full bg-primary-dark-5 outline-none p-2 rounded-[5px] resize-none' required></textarea>
                            </div>
                            <div className='flex justify-center gap-x-4 pb-2 pt-[6px]'>
                                <button type='button' onClick={() => setIsModalOpen(false)} className='py-1 border border-white hover:border-secondary hover:text-secondary w-[6rem] font-semibold text-[17px] rounded-[7px] text-center'>{allStrings["string_cancel"]}</button>
                                <button type='submit' className={`py-1 w-[6rem] border border-secondary bg-secondary text-[17px] font-semibold rounded-[7px] text-center ${isLoading && "pointer-events-none"}`}>
                                    {
                                        isLoading ? <span className='loader after:border-[11px]'></span> : allStrings["string_report"]
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </ConfigProvider>

        </>
    )
}

export default ReportModal