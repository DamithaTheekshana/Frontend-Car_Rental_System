import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar() {

  const handleLogout = () => {
  localStorage.removeItem("user");
  };

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
            <Link to={"/admin"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-home-page-30 (1).png" alt="Logo" width="50"/>Home</Link>
            <Link to={"/admin/add-admin"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-add-male-user-group-50.png" alt="Logo" width="45"/>Add Admin</Link>
            <Link to={"/admin/vehicles"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-vehicle-50.png" alt="Logo" width="48"/>Manage Vehicles</Link>
            <Link to={"/admin/bookings"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-booking-48.png" alt="Logo" width="48"/>Bookings</Link>
            <Link to={"/admin/customers"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-customers-50.png" alt="Logo" width="42"/>Customers</Link>
            <Link to={"/admin/reports"} style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-report-50.png" alt="Logo" width="42"/>Reports</Link>
            <Link to={"/admin/payments"}style={{color: "white",textDecoration: "none",fontWeight: "500",marginTop: "5px",marginBottom: "5px"}}><img src="/img/payment.png"alt="Logo"width="50"/>Payments</Link>
            <Link to={"/loginpage"} onClick={handleLogout}style={{color: "white",textDecoration: "none",fontWeight: "500", marginTop: "5px", marginBottom:"5px"}}><img src="/img/icons8-login-50.png" alt="Logo" width="48"/>Log out</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default AdminNavbar
