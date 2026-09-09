// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import AdminNavbar from './components/AdminNavbar'
import AdminHomePage from './Pages/AdminHomePage'
import MyBookingsPage from "./Pages/MyBookingsPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/loginpage" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/mybookings" element={<MyBookingsPage />} />
      </Routes>
    </>
  
  )
}

export default App
