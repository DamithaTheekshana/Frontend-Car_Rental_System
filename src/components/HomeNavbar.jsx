import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./HomeNavbar.css";

function HomeNavbar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="home-navbar">

      {/* LEFT - BRAND */}
      <Link to="/" className="navbar-brand-section">

        <img
          src="/img/The trip key.png"
          alt="The Trip Key"
          className="navbar-logo"
        />

        <span className="navbar-brand-name">
          THE TRIP KEY
        </span>

      </Link>


      {/* RIGHT SIDE */}
      <div className="navbar-right">

        {/* HOME */}
        <Link
          to="/"
          className={`navbar-menu-link ${
            isActive("/") ? "navbar-active" : ""
          }`}
        >
          <img
            src="/img/icons8-home-page-30 (1).png"
            alt="Home"
            className="navbar-menu-icon"
          />

          <span>Home</span>
        </Link>


        {user ? (
          <>

            {/* MY BOOKINGS */}
            <Link
              to="/mybookings"
              className={`navbar-menu-link ${
                isActive("/mybookings")
                  ? "navbar-active"
                  : ""
              }`}
            >
              <img
                src="/img/icons8-booking-48.png"
                alt="My Bookings"
                className="navbar-menu-icon"
              />

              <span>My Bookings</span>
            </Link>


            {/* BOOKING HISTORY */}
            <Link
              to="/booking-history"
              className={`navbar-menu-link ${
                isActive("/booking-history")
                  ? "navbar-active"
                  : ""
              }`}
            >
              <img
                src="/img/icons8-report-50.png"
                alt="Booking History"
                className="navbar-menu-icon"
              />

              <span>Booking History</span>
            </Link>


            {/* PAYMENT HISTORY */}
            <Link
              to="/payment-history"
              className={`navbar-menu-link ${
                isActive("/payment-history")
                  ? "navbar-active"
                  : ""
              }`}
            >
              <img
                src="/img/icons8-report-50.png"
                alt="Payment History"
                className="navbar-menu-icon"
              />

              <span>Payment History</span>
            </Link>


            {/* USER */}
            <div className="navbar-user">

              <div className="navbar-user-avatar">
                {user.fullName
                  ? user.fullName.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <span>
                Welcome, {user.fullName}
              </span>

            </div>


            {/* LOGOUT */}
            <Link
              to="/loginpage"
              onClick={handleLogout}
              className="navbar-logout"
            >
              <img
                src="/img/icons8-login-50.png"
                alt="Logout"
                className="navbar-menu-icon"
              />

              <span>Log out</span>
            </Link>

          </>
        ) : (
          <>

            {/* LOGIN */}
            <Link
              to="/loginpage"
              className="navbar-menu-link"
            >
              <img
                src="/img/icons8-login-50.png"
                alt="Login"
                className="navbar-menu-icon"
              />

              <span>Login</span>
            </Link>


            {/* REGISTER */}
            <Link
              to="/register"
              className="navbar-menu-link"
            >
              <img
                src="/img/icons8-register-64.png"
                alt="Register"
                className="navbar-menu-icon"
              />

              <span>Register</span>
            </Link>

          </>
        )}

      </div>

    </nav>
  );
}

export default HomeNavbar;