import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="admin-navbar">

      {/* ========================= */}
      {/* LEFT - BRAND */}
      {/* ========================= */}

      <Link to="/admin" className="admin-navbar-brand">

        <img
          src="/img/The trip key.png"
          alt="The Trip Key"
          className="admin-navbar-logo"
        />

        <div className="admin-brand-text">
          <span className="admin-brand-name">
            THE TRIP KEY
          </span>

          <span className="admin-brand-role">
            ADMIN PANEL
          </span>
        </div>

      </Link>


      {/* ========================= */}
      {/* NAVIGATION */}
      {/* ========================= */}

      <div className="admin-navbar-menu">


        {/* HOME */}

        <Link
          to="/admin"
          className={`admin-nav-link ${
            isActive("/admin")
              ? "admin-nav-active"
              : ""
          }`}
        >
          <img
            src="/img/icons8-home-page-30 (1).png"
            alt="Home"
            className="admin-nav-icon"
          />

          <span>Home</span>
        </Link>


        {/* ADD ADMIN */}

        <Link
          to="/admin/add-admin"
          className={`admin-nav-link ${
            isActive("/admin/add-admin")
              ? "admin-nav-active"
              : ""
          }`}
        >
          <img
            src="/img/icons8-add-male-user-group-50.png"
            alt="Add Admin"
            className="admin-nav-icon"
          />

          <span>Add Admin</span>
        </Link>


        {/* MANAGE VEHICLES */}

        <Link
          to="/admin/vehicles"
          className={`admin-nav-link ${
            isActive("/admin/vehicles")
              ? "admin-nav-active"
              : ""
          }`}
        >
          <img
            src="/img/icons8-vehicle-50.png"
            alt="Manage Vehicles"
            className="admin-nav-icon"
          />

          <span>Vehicles</span>
        </Link>


        {/* BOOKINGS */}

        <Link
          to="/admin/bookings"
          className={`admin-nav-link ${
            isActive("/admin/bookings")
              ? "admin-nav-active"
              : ""
          }`}
        >
          <img
            src="/img/icons8-booking-48.png"
            alt="Bookings"
            className="admin-nav-icon"
          />

          <span>Bookings</span>
        </Link>


        {/* CUSTOMERS */}

        <Link
          to="/admin/customers"
          className={`admin-nav-link ${
            isActive("/admin/customers")
              ? "admin-nav-active"
              : ""
          }`}
        >
          <img
            src="/img/icons8-customers-50.png"
            alt="Customers"
            className="admin-nav-icon"
          />

          <span>Customers</span>
        </Link>


        {/* REPORTS */}

        <Link
          to="/admin/reports"
          className={`admin-nav-link ${
            isActive("/admin/reports")
              ? "admin-nav-active"
              : ""
          }`}
        >
          <img
            src="/img/icons8-report-50.png"
            alt="Reports"
            className="admin-nav-icon"
          />

          <span>Reports</span>
        </Link>


        {/* PAYMENTS */}

        <Link
          to="/admin/payments"
          className={`admin-nav-link ${
            isActive("/admin/payments")
              ? "admin-nav-active"
              : ""
          }`}
        >
          <img
            src="/img/payment.png"
            alt="Payments"
            className="admin-nav-icon"
          />

          <span>Payments</span>
        </Link>


        {/* LOGOUT */}

        <Link
          to="/loginpage"
          onClick={handleLogout}
          className="admin-logout-btn"
        >
          <img
            src="/img/icons8-login-50.png"
            alt="Logout"
            className="admin-nav-icon"
          />

          <span>Log out</span>
        </Link>

      </div>

    </nav>
  );
}

export default AdminNavbar;