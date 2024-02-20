import Image from "next/image"
import no_picture from "../../../public/assets/no_picture.svg"

const Profile_Photos = ({ title, list }) => {
    return (
        <div className="mb-[40px]">
            <h1 className="text-[24px] font-bold lg:text-[30px] " data-aos='zoom-in'>{title}</h1>
            <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[14px] mt-[20px]'>
                {
                    Array.from({ length: 9 }).map((photo, index) => {
                        return <div className="aspect-square relative " key={index} data-aos='zoom-in' data-aos-anchor-placement="bottom">
                            <Image src={no_picture} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none  rounded-[5px] object-contain object-center overflow-hidden" />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Profile_Photos