import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function CustomersPage() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/user/customers"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(data);

    } catch (error) {
      console.error("Customer Fetch Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          padding: "40px",
          backgroundColor: "#f5f6f8",
          minHeight: "100vh"
        }}
      >
        <h2>Customer Management</h2>

        <p style={{ marginBottom: "25px" }}>
          Total Customers: <strong>{customers.length}</strong>
        </p>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            overflowX: "auto",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#212529", color: "white" }}>
                <th style={tableCellStyle}>ID</th>
                <th style={tableCellStyle}>Customer Name</th>
                <th style={tableCellStyle}>Email</th>
                <th style={tableCellStyle}>Phone</th>
                <th style={tableCellStyle}>NIC</th>
                <th style={tableCellStyle}>Role</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.userId}>
                  <td style={tableCellStyle}>
                    {customer.userId}
                  </td>

                  <td style={tableCellStyle}>
                    {customer.fullName}
                  </td>

                  <td style={tableCellStyle}>
                    {customer.email}
                  </td>

                  <td style={tableCellStyle}>
                    {customer.phoneNumber}
                  </td>

                  <td style={tableCellStyle}>
                    {customer.nic}
                  </td>

                  <td style={tableCellStyle}>
                    {customer.role}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}

const tableCellStyle = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  textAlign: "left"
};

export default CustomersPage;