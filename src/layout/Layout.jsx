import React from 'react'
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";;
import MainFooter from "../components/ui/MainFooter";
import HeaderLarge from "../components/ui/HeaderLarge";
const Layout = ({children}) => {
  return (
    <div>
    <HeaderLarge/>
    <Header/>
    <div className=''>
    {children}
    </div>
    <MainFooter/>
    <Footer/>
</div>
  )
}

export default Layout
