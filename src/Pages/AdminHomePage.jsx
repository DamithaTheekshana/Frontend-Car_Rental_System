import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import HomeCarousel from '../components/HomeCarousel'
import MainPagesBody from '../components/MainPagesBody'
import Footer from '../components/Footer'

function AdminHomePage() {
  return (
    <>
      <AdminNavbar/>
      <HomeCarousel/>
      <MainPagesBody/>
      <Footer/>
    </>
  )
}

export default AdminHomePage
