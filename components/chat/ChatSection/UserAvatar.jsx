import Image from "next/image";
import React from "react";

const UserAvatar = ({ avatarUrl, username }) => {
    return (
        <>
            {avatarUrl ?
                <>
                    <Image src={avatarUrl} alt="" height={60} width={60} priority className="hidden min-h-[60px] h-[60px] min-w-[60px] md:flex pointer-events-none rounded-full object-cover" />
                    <Image src={avatarUrl} alt="" height={40} width={40} priority className="md:hidden object-cover min-h-[40px] h-[40px] pointer-events-none rounded-full" />
                </>
                :
                <>
                    <p className="h-[60px] uppercase w-[60px] hidden md:flex items-center justify-center bg-primary-dark rounded-full text-[24px] ">{username.charAt(0)}</p>
                    <p className="h-10 uppercase w-10 md:hidden flex items-center justify-center bg-primary-dark rounded-full text-[22px] ">{username.charAt(0)}</p>
                </>
            }
        </>
    );
};

export default React.memo(UserAvatar);
