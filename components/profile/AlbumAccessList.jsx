import Image from 'next/image'
import React from 'react'
import arrow_left from "/public/assets/arrow_left.svg"

const AlbumAccessList = ({ setProfileToggle, type }) => {
    return (
        <div className="w-full lg:ml-[350px] 2xl:ml-[400px] text-white mt-[40px] px-[15px] lg:mt-[30px] lg:px-[50px]">

            <div className='w-full'>
                <div className='w-full flex flex-col items-center'>
                    <div className='text-center text-white text-[30px] font-bold leading-[40px] relative flex items-center justify-center w-full'>
                        <button className='absolute left-0' onClick={() => setProfileToggle("")}>
                            <Image src={arrow_left} alt='' width={24} height={24} className='pointer-events-none' />
                        </button>
                        {type === "photo"
                            ? "Manage Photo Requests"
                            : "Manage Block List"
                        }
                    </div>
                    <div className='text-center mt-[14px] text-[18px] font-light leading-[20px]'>
                        {type === "photo"
                            ? "Hear you Can Remove and Accept requests To See Your Private Photos."
                            : "Manage Your Blocked Profiles: View and Unblock Users You've Previously Blocked"
                        }
                    </div>
                </div>
                {/* <div className='mt-[70px]'>
                    <div className='text-[20px] font-normal leading-[20px]'>
                        {type === "photo"
                            ? "Your Accepted request"
                            : "Your Block List"
                        }
                    </div>
                    <div className='mt-6'>
                        <table className='w-full border-0'>
                            <thead>
                                <tr className='bg-primary-dark h-[58px]'>
                                    <th className='text-center text-[16px] font-normal leading-[20px]'>Name</th>
                                    <th className='text-center text-[16px] font-normal leading-[20px] 2xl:table-cell hidden'></th>
                                    <th className='text-center text-[16px] font-normal leading-[20px]'>Created On</th>
                                    <th className='text-center text-[16px] font-normal leading-[20px]'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length
                                    ? <>
                                        {data.map((item, inx) => (
                                            <tr key={inx} className='bg-primary-dark-6 h-[80px] px-10'>
                                                <td className='text-center px-2 h-full items-center'>
                                                    <div className='flex justify-center items-center'>
                                                        {item.avatar_url
                                                            ? <Image src={item.img} alt='' height={50} width={50} className='rounded-full pointer-events-none' />
                                                            : <div className='h-[50px] w-[50px] bg-secondary text-white flex justify-center items-center rounded-full'>{item.username.charAt(0)}</div>
                                                        }
                                                        <div className='ms-[14px] text-[20px] font-normal leading-[20px] flex items-center'>{item.username}</div>
                                                    </div>
                                                </td>
                                                <td className='text-center px-2 h-full text-[18px] font-normal leading-[20px] 2xl:table-cell hidden'>
                                                    {type === "photo"
                                                        ? `${item.username} requested to view your photo.`
                                                        : `You have blocked the profile of ${item.username}.`
                                                    }
                                                </td>
                                                <td className='text-center px-2 h-full text-[20px] font-normal leading-[20px]'>{item.date}</td>
                                                <td className='text-center px-2 h-full '>
                                                    <button className='bg-danger px-4 py-[6px] text-[16px] font-medium rounded-[5px] leading-[20px]' onClick={() => handleSubmit(item.id)}>
                                                        {type === "photo"
                                                            ? "Decline"
                                                            : "Unblock"
                                                        }
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    : <tr className='bg-primary-dark-6 h-[80px]'>
                                        <td colSpan={4} className='text-center'>No data found !</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default AlbumAccessList