"use client"
import { useStore } from '@/store/store'
import { ConfigProvider, Modal } from 'antd'
import React, { useState } from 'react'
import StripeModal from './StripeModal'

const subscriptions = [
  { name: "4 Weeks", value: "4week", key: process.env.NEXT_PUBLIC_STRIPE_4_WEEKS, amount: 116 },
  { name: "6 Weeks", value: "6week", key: process.env.NEXT_PUBLIC_STRIPE_6_WEEKS, amount: 156 },
  { name: "12 Weeks", value: "12week", key: process.env.NEXT_PUBLIC_STRIPE_12_WEEKS, amount: 228 },
]

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentObj, setSelectedPaymentObj] = useState("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (obj) => {
    setSelectedPaymentObj(obj)
    showModal()
  }
  return (
    <div className='md:pt-[66px]'>
      <div className='w-full p-10 grid grid-cols-3 gap-5 text-white'>
        {subscriptions.map((item, inx) => (
          <div key={inx} className='p-5 border border-secondary rounded-[5px]'>
            <div className='text-[20px]'>{item.name}</div>
            <div className='w-full flex items-center justify-center'>
              <button className='mt-4 bg-secondary rounded-[5px] px-5 py-1' onClick={() => handleSubmit(item)}>
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfigProvider theme={{
        "token": {
          "colorPrimary": "#f16661",
          "colorInfo": "#f16661"
        }
      }}>
        <Modal title="Enter card details" centered footer={false} open={isModalOpen} onCancel={handleCancel}>
          <StripeModal selectedPaymentObj={selectedPaymentObj} setIsModalOpen={setIsModalOpen} />
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default Index