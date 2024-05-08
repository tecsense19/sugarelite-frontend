import Image from "next/image"
import loginLogoImg from "/public/assets/login_logo.svg";

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 z-50 text-white bg-tinder flex justify-center items-center h-dvh w-dvw">
            {/* <div className="lds-hourglass"></div> */}
            <Image className="loaderLogo" src={loginLogoImg} alt="" height={65} width={55} />
        </div>
    )
}

export default Loader