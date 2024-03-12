"use client"
import Image from "next/image"

const Profile_Photos = ({ title, list }) => {
    return (
        <div className="mb-[40px]">
            <h1 className="text-[24px] font-bold lg:text-[30px] " data-aos='zoom-in' data-aos-anchor-placement="bottom">{title}</h1>
            <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[14px] mt-[20px]'>
                {
                    list && list.map((img, index) => {
                        return (
                            <div className="aspect-square relative " key={index} data-aos='zoom-in' data-aos-anchor-placement="bottom">
                                {!img.public_images.includes("http://localhost/SugarElite/storage/app/public/") &&
                                    <Image src={img.public_images} width={1000} height={1000} alt="person" className="h-full border border-dashed border-[#8A8A8A] w-full select-none pointer-events-none  rounded-[5px] object-contain object-center overflow-hidden" />
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                !list && <p className="text-center w-full text-white/50" data-aos='zoom-in' data-aos-anchor-placement="bottom">No {title}</p>
            }
        </div>
    )
}

export default Profile_Photos