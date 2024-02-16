import Cards from "@/components/search/Cards"
import Filters from "@/components/search/Filters"

const Search = () => {
  return (
    <div className="font-bold h-dvh pt-0 md:pt-[66px] flex">
      <Filters />
      <Cards />
    </div>
  )
}

export default Search