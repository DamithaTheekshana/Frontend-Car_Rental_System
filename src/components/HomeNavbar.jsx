import React from 'react'
import { Link } from 'react-router-dom'

function HomeNavbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/loginpage";
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

          {/* Right side */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

            <Link to={"/"} style={{color: "white",textDecoration: "none",fontWeight: "500",marginTop: "5px",marginBottom: "5px"}}>
              <img src="/img/icons8-home-page-30 (1).png" alt="Home"width="50"/>
              Home
            </Link>

              {user ? (
              <>
                  <span style={{ color: "white", fontWeight: "600" }}>
                    Welcome, {user.fullName}
                  </span>

                  <button onClick={handleLogout}
                    style={{ backgroundColor: "#dc3545",color: "white",border: "none",borderRadius: "6px",padding: "8px 15px",cursor: "pointer",fontWeight: "600"}}>
                    Logout
                  </button>
                </>
              ) : (
              <>
                <Link to={"/loginpage"}style={{color: "white",textDecoration: "none",fontWeight: "500",marginTop: "5px",marginBottom: "5px" }}>
                  <img src="/img/icons8-login-50.png"alt="Login"width="50"/>
                  Login
                </Link>

                <Link to={"/register"}style={{color: "white",textDecoration: "none",fontWeight: "500",marginTop: "5px",marginBottom: "5px"}}>
                  <img src="/img/icons8-register-64.png" alt="Register" width="50" />
                  Register
                </Link>
              </>
            )}

</div>
        </div>
      </nav>
    </>
  )
}

export default HomeNavbar
