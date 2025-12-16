// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomeNavbar from './components/HomeNavbar'
import HomeCarousel from './components/HomeCarousel'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <HomeNavbar/>
      <HomeCarousel/>
    </>
  )
}

export default App
