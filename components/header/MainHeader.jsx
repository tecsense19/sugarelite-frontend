const MainHeader = () => {
  return (
    <>
      {/* Mobile View */}
      <header className="sm:hidden flex">
        Main Mobile Navbar
      </header>

      {/* Web View */}
      <header className="hidden sm:flex h-[66px] bg-primary text-white">
        Main Web Navbar
      </header>
    </>
  )
}

export default MainHeader