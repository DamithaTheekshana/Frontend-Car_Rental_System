import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import HomeCarousel from '../components/HomeCarousel'
import MainPagesBody from '../components/MainPagesBody'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <>
    <HomeNavbar/>
    <HomeCarousel/>
    <MainPagesBody/>
    <Footer/>
    </>
  )
}

export default HomePage
