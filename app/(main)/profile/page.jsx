import Image from "next/image"

export default () => {
  return (
    <>
      <main className="min-h-dvh md:pt-[66px] bg-primary flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:bg-primary-dark-3 md:h-[calc(100vh-66px)] md:w-[400px] text-white flex justify-start flex-col">
          <div className="md:hidden w-full px-[15px] mt-[12px] mb-[30px] flex justify-between items-center">
            <Image src={'/assets/arrow_left.svg'} alt="left" width={24} height={24} priority className="cursor-pointer" />
            <p className="text-[24px] font-semibold select-none">Profile</p>
            <Image src={'/assets/more_horizontal.svg'} alt="more" width={30} height={30} priority className="cursor-pointer" />
          </div>
          <div className="w-full flex justify-start items-center flex-col md:items-start h-full md:pt-[30px] px-[15px] md:px-[30px] overflow-y-auto">
            <div className="h-[140px] w-[140px] sm:h-[220px] sm:w-[220px] md:h-[330px] md:w-[340px] md:rounded-[10px]">
              <Image src={'/assets/profile_person.png'} width={1000} height={1000} alt="person" className="h-full w-full rounded-full md:rounded-[10px] select-none pointer-events-none" />
            </div>
            <div className="md:self-start mt-[20px] md:mt-[30px]">
              <div className="flex flex-col text-center md:text-left">
                <div>
                  <span className="text-[30px] font-bold">Rajesh, 23</span>
                  <span className="text-[20px] font-semibold text-opacity-80 text-white ps-[20px]">LIVING IN</span>
                </div>
                <span className="text-[16px] font-semibold text-opacity-80 text-white mt-[11px]">Ask me, Del Valle</span>
              </div>
            </div>
            <div className="w-full bg-[#626262] mt-[30px] rounded-[5px]">
              <div className="p-4 text-[16px] font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, cumque quas. Sint reiciendis commodi libero, sequi ipsam nam sed iusto odio perferendis voluptates eveniet ducimus nostrum quidem est. Voluptatum, voluptatibus?
              </div>
              <div className="bg-primary-dark-3 md:bg-primary px-[24px] py-[12px] rounded-b-[5px]">
                <p className="text-[18px] font-medium">Biography</p>
                <p className="text-[12px] font-medium text-white text-opacity-80">No Cinema</p>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="w-full text-white mt-[40px] px-[15px] md:mt-[30px] md:px-[50px]">
          <div className="border-white md:border-b border-opacity-20 md:pb-[40px]">
            <h1 className="text-[24px] font-bold md:text-[30px]">Photos</h1>
            <div className="mt-[20px] md:mt-[25px] flex gap-[14px] flex-wrap">
              <div className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] ">
                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" />
              </div>
              <div className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] ">
                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" />
              </div>
              <div className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] ">
                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" />
              </div>
              <div className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] ">
                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" />
              </div>
              <div className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] ">
                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" />
              </div>
              <div className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] ">
                <Image src={'/assets/no_picture.svg'} width={1000} height={1000} alt="person" className="h-full w-full select-none pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="border-white md:border-b border-opacity-20 py-[40px]">
            <h1 className="text-[24px] font-bold md:text-[30px]">Appearance</h1>
            <div className="mt-[20px] md:mt-[25px] flex gap-[14px] flex-wrap">

            </div>
          </div>
        </div>
      </main>
    </>
  )
}