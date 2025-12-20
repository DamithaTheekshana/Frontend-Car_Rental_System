import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar() {
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
            <Link to={"/"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-home-page-30 (1).png" alt="Logo" width="50"/>Home</Link>
            <Link to={"/"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-add-male-user-group-50.png" alt="Logo" width="45"/>Add Admin</Link>
            <Link to={"/"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-vehicle-50.png" alt="Logo" width="48"/>Manage Vehicles</Link>
            <Link to={"/"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-booking-48.png" alt="Logo" width="48"/>Bookings</Link>
            <Link to={"/"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-customers-50.png" alt="Logo" width="42"/>Customers</Link>
            <Link to={"/"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-report-50.png" alt="Logo" width="42"/>Repots</Link>
            <Link to={"/loginpage"}style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-login-50.png" alt="Logo" width="48"/>Log out</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default AdminNavbar
