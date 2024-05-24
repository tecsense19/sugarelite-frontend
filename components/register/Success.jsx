import Image from "next/image"
import { useRouter } from "next/navigation"
import success from "../../public/assets/success.gif"

const Success = ({ allStrings }) => {

    const navigate = useRouter()

    setTimeout(() => navigate.push('/login'), 2000)

    return (
        <div className="text-center flex flex-col items-center">
            <div className=" flex justify-center items-center rounded-full">
                <Image src={success} alt="success" unoptimized width={220} height={220} className="pointer-events-none select-none" />
            </div>
            <p className="text-[30px] pt-5 font-bold max-w-[15rem] text-primary-dark-5 sm:text-white">{allStrings["string_you_are_in!"]}</p>

        </div>
    )
}

export default Success