const AuthHeader = () => {
  return (
    <>
      {/* Mobile View */}
      <header className="sm:hidden flex">
        Auth Mobile Navbar
      </header>

      {/* Web View */}
      <header className="hidden sm:flex h-[66px] bg-primary text-white">
        Auth Web Navbar
      </header>
    </>
  )
}

export default AuthHeader