import React from 'react'
import Footer from './Footer'

const HeaderFooterLayout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default HeaderFooterLayout