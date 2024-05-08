import Image from "next/image"
import loginLogoSecondaryImg from "/public/assets/login_logo_secondary.svg";

const AuthLoader = () => {
    return (
        <div className="fixed top-0 left-0 z-50 text-white bg-primary-dark/90 flex justify-center items-center h-dvh w-dvw">
            <Image className="loaderLogo" src={loginLogoSecondaryImg} alt="" height={65} width={55} />
        </div>
    )
}

export default AuthLoader