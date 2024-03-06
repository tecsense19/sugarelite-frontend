import MainContent from "@/components/profile/searched_Profile/MainContent"
import SideContent from "@/components/profile/searched_Profile/SideContent"
import ReportIcon from "/public/assets/chat_report_icon.svg"
import BlockIcon from "/public/assets/chat_block_icon.svg"
import Image from "next/image"
import PopOver from "@/components/profile/commons/PopOver"
import more_horizontal from "../../../../public/assets/more_horizontal.svg"
import { all_profiles_action, search_profile_action } from "@/app/lib/actions"
import Link from "next/link"
import { client_routes } from "@/app/lib/helpers"

export async function generateStaticParams() {
  const res = await all_profiles_action()
  let arr = []
  function gen() {
    res.data.forEach(element => {
      arr.push(element.id)
    });
  }
  gen()
  return arr
}


const ProfileId = async ({ params }) => {

  const queried_user = await search_profile_action(params.id)
  // console.log(queried_user?.data)

  if (queried_user?.success) {
    return (
      <>
        <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full relative">
          <SideContent params={params} user={queried_user.data} />
          <MainContent params={params} user={queried_user.data} />

          {/* report and block functionality */}

          {/* 2xl size */}
          <div className="absolute hidden 2xl:block  2xl:w-[169px] 2xl:max-w-[169px] right-[2%] 2xl:right-[4%] top-[108px] ">
            <button className="w-full h-[38px] 2xl:h-[42px] bg-[#D97706] rounded-[5px] mb-2 2xl:mb-4 flex justify-start items-center px-[19px]">
              <Image src={ReportIcon} alt="report" width={18} height={18} />
              <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">RAPPORTER</span>
            </button>
            <button className="w-full h-[38px] 2xl:h-[42px] bg-[#EF4444] rounded-[5px] flex justify-start items-center px-[19px]">
              <Image src={BlockIcon} alt="block" width={18} height={18} />
              <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">BLOCKER</span>
            </button>
          </div>

        </main>
      </>
    )
  }
  return (
    <>
      <main className="min-h-dvh lg:pt-[66px] bg-primary flex-col flex justify-center items-center text-white text-center gap-3">

        <p>Sorry, We cannot found the user.</p>

        <p className="text-white/60">
          Back to <Link href={client_routes.profile} className="text-secondary">Profile</Link> Page
        </p>

      </main>

    </>
  )

}

export default ProfileId