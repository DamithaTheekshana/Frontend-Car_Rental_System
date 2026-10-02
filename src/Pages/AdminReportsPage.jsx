import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function AdminReportsPage() {

  const [report, setReport] = useState({
    totalCustomers: 0,
    totalVehicles: 0,
    totalBookings: 0,
    completedBookings: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/report/summary"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }

      const data = await response.json();
      setReport(data);

    } catch (error) {
      console.error("Report Fetch Error:", error);
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
        <h2>System Reports</h2>

        <p style={{ marginBottom: "30px", color: "#666" }}>
          Car Rental System Summary
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >

          <ReportCard
            title="Total Customers"
            value={report.totalCustomers}
          />

          <ReportCard
            title="Total Vehicles"
            value={report.totalVehicles}
          />

          <ReportCard
            title="Total Bookings"
            value={report.totalBookings}
          />

          <ReportCard
            title="Completed Bookings"
            value={report.completedBookings}
          />

          <ReportCard
            title="Total Revenue"
            value={`Rs. ${Number(
              report.totalRevenue
            ).toLocaleString()}`}
          />

        </div>
      </div>
    </>
  );
}

function ReportCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
        border: "1px solid #eee"
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#6c757d",
          fontSize: "15px"
        }}
      >
        {title}
      </p>

      <h2
        style={{
          marginTop: "12px",
          marginBottom: 0,
          fontSize: "28px"
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default AdminReportsPage;