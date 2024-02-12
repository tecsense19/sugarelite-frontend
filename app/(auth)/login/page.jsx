import Image from "next/image"

export default () => {
  return (
    <main className="sm:hidden flex bg-black h-dvh">
      <div className="h-full w-full relative">
        <div className="h-[calc(100%-12px)] w-full absolute p-4">
          <div className="text-white w-full h-full flex justify-center items-center">
            <Image src={`/assets/login_logo.svg`} alt={"logo"} width={54} height={64} priority />
          </div>
        </div>
        <Image src={'/assets/Group 427318831.png'} width={1000} height={1000} alt="mob_bg" priority className="w-full block sm:hidden h-full object-cover object-top" />
      </div>
    </main>
  )
}