"use client"

const Filters = () => {
  return (
    <div className="bg-primary-dark-3 h-full w-[400px] p-[30px] text-white">
      <button className="bg-black w-full flex items-center justify-center h-[56px] text-white/80 text-[16px] font-[600] rounded-[5px]" style={{ lineHeight: "normal" }}>
        RESET SEARCH
      </button>
      <label className="w-full">
        <div className="text-white text-[16px] font-[500] mt-[20px] mb-[5px]" style={{ lineHeight: "normal" }}>Search by name</div>
        <input type="text" placeholder="Search..." className="bg-primary text-white outline-none border border-white/30 rounded-[5px] h-[56px] text-[15px] font-[300] px-[20px] w-full" style={{ lineHeight: "normal" }} />
      </label>
      <div className="mt-[30px]">
        <div className="font-[500] text-[16px] text-white/80" style={{ lineHeight: "normal" }}>Age from ( 00 )</div>
      </div>
    </div>
  )
}

export default Filters