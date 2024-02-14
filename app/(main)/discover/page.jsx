import SwipeFilter from "@/components/discover/SwipeFilter"
import SwipePage from "@/components/discover/SwipePage"

export default () => {
  return (
    <div className="font-bold h-dvh pt-0 md:pt-[66px] flex">
      <SwipeFilter />
      <SwipePage />
    </div>
  )
}