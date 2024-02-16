import MainContent from "@/components/profile/searched_Profile/MainContent"
import SideContent from "@/components/profile/searched_Profile/SideContent"


export default ({ params }) => {
  return (
    <>
      <main className="min-h-dvh lg:pt-[66px] bg-primary flex flex-col lg:flex-row w-full">
        <SideContent params={params} />
        <MainContent params={params} />
      </main>
    </>
  )
}