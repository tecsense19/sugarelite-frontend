"use client"
import { client_routes } from '@/app/lib/helpers';
import { useStore } from '@/store/store';
import { ConfigProvider, Drawer, } from 'antd';
import Image from "next/image"
import { useRouter } from 'next/navigation';
import logo from "/public/assets/Logo (1).svg"
import Close from "/public/assets/close.svg"

const SideDrawer = () => {

    const { state: { sideMenu }, dispatch } = useStore()

    const router = useRouter()
    return (
        <div className='side_drawer'>
            <ConfigProvider
                theme={{
                    components: {

                    },
                    token: {
                        colorBgElevated: "#1F1F1F",
                        paddingLG: "0",
                    },
                }}
            >
                <Drawer open={sideMenu} className='!text-white' closeIcon={false}>
                    <div className='w-full h-[66px] bg-black px-4 flex items-center justify-between'>
                        <button onClick={() => router.push(client_routes.profile)}>
                            <Image height={22} width={102} src={logo} alt="" className="pointer-events-none h-[30px] w-[150px]" priority />
                        </button>
                        <button onClick={() => dispatch({ type: "Close_Menu" })}>
                            <Image height={30} width={30} src={Close} alt="" className="pointer-events-none" priority />
                        </button>
                    </div>
                </Drawer>
            </ConfigProvider>
        </div>
    )
}

export default SideDrawer