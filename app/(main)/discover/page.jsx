import SwipeFilter from "@/components/discover/SwipeFilter"
import SwipePage from "@/components/discover/SwipePage"

const Discover = () => {
  return (
    <div className="font-bold h-dvh pt-0 md:pt-[66px] flex">
      <SwipeFilter />
      <SwipePage />
    </div>
  )
}

export default Discover