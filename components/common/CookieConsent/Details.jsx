import React, { useState } from 'react'
import Left from "/public/assets/chevron_left.svg"
import Image from 'next/image'
import { Switch } from 'antd'
import Link from 'next/link'
import { client_routes } from '@/app/lib/helpers'

const Details = ({ setData, data, allStrings }) => {

    const [isType, setIsType] = useState('')

    const dataConsent = [
        {
            title: allStrings["string_necessary"],
            desc: allStrings["string_necessary_cookies_help_make_a_website_usable_by_enabling_basic_functions_such_as_page_navigation_and_access_to_secure_areas_of_the_website._the_website_cannot_function_properly_without_these_cookies."],
            items: [
                {
                    title: "Elite Sugar",
                    link: client_routes.privacyPolicy,
                    label: allStrings["string_learn_more_about_us"]
                },
                {
                    title: "Stripe",
                    link: 'https://stripe.com/in/privacy',
                    label: allStrings["string_learn_more_about_this_provider"]
                },
                {
                    title: "m.stripe.com",
                    link: 'https://stripe.com/in/privacy',
                    label: allStrings["string_learn_more_about_this_provider"]
                },
            ],
            disabled: true
        },
        {
            title: allStrings["string_statistics"],
            desc: allStrings["string_statistical_cookies_give_website_owners_insight_into_users'_interaction_with_the_website_by_collecting_and_reporting_information_anonymously."],
            items: [
                {
                    title: "Google",
                    link: 'https://business.safety.google/privacy',
                    label: allStrings["string_learn_more_about_this_provider"]
                },
                {
                    title: "m.stripe.com",
                    link: 'https://stripe.com/in/privacy',
                    label: allStrings["string_learn_more_about_this_provider"]
                },
            ],
            disabled: false
        },
        {
            title: allStrings["string_marketing"],
            desc: allStrings["string_marketing_cookies_are_used_to_track_users_across_websites._the_intention_is_to_show_ads_that_are_relevant_and_engaging_for_the_individual_user,_and_thus_more_valuable_to_publishers_and_third-party_advertisers."],
            items: [
                {
                    title: "Google",
                    link: 'https://business.safety.google/privacy',
                    label: allStrings["string_learn_more_about_this_provider"]
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
                        <p className='hover:text-secondary font-semibold'>{allStrings["string_unclassified"]}</p>
                    </div>
                </div>
                <div className='ps-7 mt-1 text-white/80'>
                    <p className='text-[16px]'>
                        {allStrings["string_unclassified_cookies_are_cookies_that_we_are_in_the_process_of_classifying_together_with_the_providers_of_the_individual_cookies."]}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Details