import React, { useState } from 'react'
import Left from "/public/assets/chevron_left.svg"
import Image from 'next/image'
import { Switch } from 'antd'
import Link from 'next/link'
import { client_routes } from '@/app/lib/helpers'

const Details = ({ setData, data }) => {

    const [isType, setIsType] = useState('')

    const dataConsent = [
        {
            title: "Necessary",
            desc: "Necessary cookies help make a website usable by enabling basic functions such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
            items: [
                {
                    title: "Elite Sugar",
                    link: client_routes.privacyPolicy,
                    label: "Learn more about us"
                },
                {
                    title: "Stripe",
                    link: 'https://stripe.com/in/privacy',
                    label: "Learn more about this provider"
                },
                {
                    title: "m.stripe.com",
                    link: 'https://stripe.com/in/privacy',
                    label: "Learn more about this provider"
                },
            ],
            disabled: true
        },
        {
            title: "Statistics",
            desc: "Statistical cookies give website owners insight into users' interaction with the website by collecting and reporting information anonymously.",
            items: [
                {
                    title: "Google",
                    link: 'https://business.safety.google/privacy',
                    label: "Learn more about this provider"
                },
                {
                    title: "m.stripe.com",
                    link: 'https://stripe.com/in/privacy',
                    label: "Learn more about this provider"
                },
            ],
            disabled: false
        },
        {
            title: "Marketing",
            desc: "Marketing cookies are used to track users across websites. The intention is to show ads that are relevant and engaging for the individual user, and thus more valuable to publishers and third-party advertisers.",
            items: [
                {
                    title: "Google",
                    link: 'https://business.safety.google/privacy',
                    label: "Learn more about this provider"
                }
            ],
            disabled: false
        },

    ]

    return (
        <div className='flex flex-col gap-y-3 '>
            {
                dataConsent.map((i, inx) => {
                    return <div className='border-b border-[#4b4b4b] pb-3' key={inx}>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-x-2 text-[18px] items-center cursor-pointer' onClick={() => setIsType(isType === i.title ? "" : i.title)}>
                                <Image src={Left} alt='logo' width={1000} height={1000} priority className={`h-5 w-5 transition-transform duration-300 ${isType === i.title ? "rotate-[270deg]" : "rotate-180"}`} />
                                <p className='hover:text-secondary font-semibold'>{i.title}</p>
                            </div>
                            <div>
                                <Switch disabled={i.disabled} defaultChecked onChange={(e) => setData({ ...data, [i.title]: e })} />
                            </div>
                        </div>
                        <div className='ps-7 mt-1 text-white/80'>
                            <p className='text-[16px]'>{i.desc}</p>
                            <div className={`${isType === i.title ? "block" : "hidden"} mt-3 flex flex-col gap-y-2`}>
                                {
                                    i.items.map((j, index) => (
                                        <div className='border border-[#4b4b4b] rounded-[5px] py-3 px-5' key={index}>
                                            <p className='text-[18px] font-semibold'>{j.title}</p>
                                            <Link href={j.link} className='text-gray-400'>{j.label}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                })
            }
            <div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-x-2 text-[18px] items-center cursor-pointer'>
                        <Image src={Left} alt='logo' width={1000} height={1000} priority className={`h-5 w-5 transition-transform duration-300 ${isType === "necessary" ? "rotate-[270deg]" : "rotate-180"}`} />
                        <p className='hover:text-secondary font-semibold'>Unclassified</p>
                    </div>
                </div>
                <div className='ps-7 mt-1 text-white/80'>
                    <p className='text-[16px]'>Unclassified cookies are cookies that we are in the process of classifying together with the providers of the individual cookies.</p>
                </div>
            </div>
        </div>
    )
}

export default Details