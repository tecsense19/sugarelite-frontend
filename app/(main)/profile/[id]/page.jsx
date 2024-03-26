// // import MainContent from "@/components/profile/searched_Profile/MainContent"
// // import SideContent from "@/components/profile/searched_Profile/SideContent"
// // import ReportIcon from "/public/assets/chat_report_icon.svg"
// // import BlockIcon from "/public/assets/chat_block_icon.svg"
// // import Image from "next/image"
// // import { all_profiles_action, decrypt_user, private_album_notification, search_profile_action } from "@/app/lib/actions"
// // import Link from "next/link"
// // import { client_routes } from "@/app/lib/helpers"


// // const ProfileId = async ({ params }) => {

// //   const currentUser = decrypt_user()

// //   const queried_user = await search_profile_action(params.id)
// //   const allUsers = await all_profiles_action()
// //   console.log(queried_user.data[0].id)

// //   if (queried_user?.success && allUsers.success && currentUser) {
// //     const accessList = allUsers.data.filter((i) => i.id === currentUser?.id)[0].allow_privateImage_access_users
// //     console.log(queried_user.data[0].allow_privateImage_access_users)
// //     const pendingList = await private_album_notification()
// //     return (
// //       <>
// //         <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full relative">
// //           <SideContent params={params} user={queried_user.data[0]} allUsers={allUsers.success && allUsers.data} pendingList={pendingList.success && pendingList.data} accessList={accessList} />
// //           <MainContent params={params} user={queried_user.data[0]} allUsers={allUsers.success && allUsers.data} pendingList={pendingList.success && pendingList.data} accessList={accessList} />

// //           {/* report and block functionality */}

// //           {/* 2xl size */}
// //           <div className="absolute hidden 2xl:block  2xl:w-[169px] 2xl:max-w-[169px] right-[2%] 2xl:right-[4%] top-[108px] ">
// //             <button className="w-full h-[38px] 2xl:h-[42px] bg-[#D97706] rounded-[5px] mb-2 2xl:mb-4 flex justify-start items-center px-[19px]">
// //               <Image src={ReportIcon} alt="report" width={18} height={18} />
// //               <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">RAPPORTER</span>
// //             </button>
// //             <button className="w-full h-[38px] 2xl:h-[42px] bg-danger rounded-[5px] flex justify-start items-center px-[19px]">
// //               <Image src={BlockIcon} alt="block" width={18} height={18} />
// //               <span className="ms-2 text-white text-[14px] 2xl:text-[16px] leading-[normal] font-medium">BLOCKER</span>
// //             </button>
// //           </div>

// //         </main>
// //       </>
// //     )
// //   }
// //   return (
// //     <>
// //       <main className="min-h-dvh lg:pt-[66px] bg-primary flex-col flex justify-center items-center text-white text-center gap-3">

// //         <p>Sorry, We cannot found the user.</p>

// //         <p className="text-white/60">
// //           Back to <Link href={client_routes.profile} className="text-secondary">Profile</Link> Page
// //         </p>

// //       </main>

// //     </>
// //   )

// // }

// // export default ProfileId

// import { decrypt_user, search_profile_action } from "@/app/lib/actions"
// import { client_routes } from "@/app/lib/helpers"
// import SearchProfileIndex from "@/components/profile/searched_Profile/SearchProfileIndex"
// import Link from "next/link"


// const ProfileId = async ({ params }) => {

//   const currentUser = decrypt_user()
//   const queried_user = await search_profile_action(params.id)

//   if (queried_user.success) {
//     return (
//       <SearchProfileIndex currentUser={currentUser} queried_user={queried_user.data[0]} />
//     )
//   }
//   return (
//     <>
//       <main className="min-h-dvh lg:pt-[66px] bg-primary flex-col flex justify-center items-center text-white text-center gap-3">

//         <p>Sorry, We cannot found the user.</p>

//         <p className="text-white/60">
//           Back to <Link href={client_routes.profile} className="text-secondary">Profile</Link> Page
//         </p>

//       </main>

//     </>
//   )
// }

// export default ProfileId

import { decrypt_user, search_profile_action } from "@/app/lib/actions"
import { client_routes } from "@/app/lib/helpers"
import SearchProfileIndex from "@/components/profile/searched_Profile/SearchProfileIndex"
import Link from "next/link"
import { redirect } from "next/navigation"



const ProfileId = async ({ params }) => {
  const currentUser = decrypt_user();
  const myAccount = await search_profile_action(currentUser.id);

  if (!myAccount.success) {
    return null;
  }

  const isBlockedOrSelf = myAccount.data[0].is_blocked_users.some(i => i.user_id === parseInt(params.id)) || currentUser.id === parseInt(params.id);
  if (isBlockedOrSelf) {
    redirect(client_routes.profile);
    return null;
  }

  const queriedUser = await search_profile_action(params.id);
  if (queriedUser.success) {
    return <SearchProfileIndex currentUser={currentUser} queried_user={queriedUser.data[0]} />;
  }

  return (
    <main className="min-h-dvh lg:pt-[66px] bg-primary flex-col flex justify-center items-center text-white text-center gap-3">
      <p>Sorry, We cannot find the user.</p>
      <p className="text-white/60">
        Back to <Link href={client_routes.profile} className="text-secondary">Profile</Link> Page
      </p>
    </main>
  );
};

export default ProfileId