import Cards from "@/components/search/Cards"
import Filters from "@/components/search/Filters"

export default () => {
  return (
    <div className="font-bold h-dvh pt-0 lg:pt-[66px] flex">
      <Filters />
      <Cards />
    </div>
  )
}