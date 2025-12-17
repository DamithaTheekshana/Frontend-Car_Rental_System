import React from 'react'
import { Link } from 'react-router-dom'

function HomeNavbar() {
  return (
    <>
      <nav className="navbar bg-dark bg-opacity-75 px-4 py-0">
        <div style={{display: "flex",justifyContent: "space-between",alignItems: "center", width: "100%"}}>

          {/* Left side - Logo + Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }} >
            <img src="\img\The trip key.png" alt="Logo" width="50"/>
            <h2 style={{ color: "white", margin: 0, fontWeight: "1000"}}>THE TRIP KEY</h2>
          </div>

          {/* Right side - Login & Register */}
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={"/"}style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-home-page-30 (1).png" alt="Logo" width="50"/>Home</Link>
            <Link to={"/loginpage"}style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-login-50.png" alt="Logo" width="50"/>Login</Link>
            <Link to={"/register"}style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-register-64.png" alt="Logo" width="50"/>Register</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default HomeNavbar
