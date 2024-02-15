import ProfileMainContent from "@/components/profile/ProfileMainContent"
import SideContent from "@/components/profile/SideContent"

export default ({ params }) => {
  return (
    <>
      <main className="min-h-dvh xl:pt-[66px] bg-primary flex flex-col xl:flex-row w-full">
        <SideContent params={params} />
        <ProfileMainContent />
      </main>
    </>
  )
}