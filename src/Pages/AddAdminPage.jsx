import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function AddAdminPage() {

  const [admin, setAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    nic: ""
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    try {

      const adminData = {
        ...admin,
        role: "ADMIN"
      };

      const response = await fetch(
        "http://localhost:8080/user/adminregister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(adminData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add admin");
      }

      alert("Admin added successfully!");

      setAdmin({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        nic: ""
      });

    } catch (error) {
      console.error("Add Admin Error:", error);
      alert("Failed to add admin!");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f6f8",
          padding: "40px"
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
          }}
        >

          <h2 style={{ marginBottom: "25px" }}>
            Add New Admin
          </h2>

          <form onSubmit={handleAddAdmin}>

            <div style={formGroupStyle}>
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={admin.fullName}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                minLength="6"
                required
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label>Phone Number</label>

              <input
                type="text"
                name="phoneNumber"
                value={admin.phoneNumber}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label>NIC</label>

              <input
                type="text"
                name="nic"
                value={admin.nic}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                border: "none",
                borderRadius: "7px",
                backgroundColor: "#198754",
                color: "white",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Add Admin
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "18px"
};

const inputStyle = {
  padding: "11px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  outline: "none"
};

export default AddAdminPage;