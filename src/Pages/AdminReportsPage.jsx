import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminReportsPage.css";

function AdminReportsPage() {

  const [report, setReport] = useState({
    totalCustomers: 0,
    totalVehicles: 0,
    totalBookings: 0,
    completedBookings: 0,
    totalRevenue: 0
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchReport();
    fetchBookingHistory();
  }, []);


  // =========================
  // FETCH REPORT SUMMARY
  // =========================
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


  // =========================
  // FETCH BOOKING HISTORY
  // =========================
  const fetchBookingHistory = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/booking-history/all"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch booking history");
      }

      const data = await response.json();

      setHistory(data);

    } catch (error) {

      console.error("Booking History Fetch Error:", error);

    }
  };


  return (
    <>
      <AdminNavbar />

      <div className="admin-reports-page">

        {/* ========================= */}
        {/* REPORT SUMMARY */}
        {/* ========================= */}

        <h2 className="reports-main-title">
          System Reports
        </h2>

        <p className="reports-subtitle">
          Car Rental System Summary
        </p>


        <div className="report-card-grid">

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


        {/* ========================= */}
        {/* BOOKING HISTORY */}
        {/* ========================= */}

        <div className="reports-history-section">

          <div className="reports-history-header">

            <div>
              <h2 className="reports-history-title">
                Booking History
              </h2>

              <p className="reports-history-subtitle">
                Completed, cancelled and rejected booking records
              </p>
            </div>

            <div className="reports-history-count">
              Total Records: <strong>{history.length}</strong>
            </div>

          </div>


          {history.length === 0 ? (

            <div className="reports-history-empty">
              No booking history available.
            </div>

          ) : (

            <div className="reports-history-table-wrapper">

              <table className="reports-history-table">

                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Customer</th>
                    <th>Booking Date</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>


                <tbody>

                  {history.map((booking) => (

                    <tr key={booking.historyId}>

                      {/* Vehicle */}
                      <td>

                        <div className="reports-history-vehicle">

                          <img
                            src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                            alt={booking.vehicleModel}
                            className="reports-history-vehicle-image"
                          />

                          <span className="reports-history-vehicle-model">
                            {booking.vehicleModel}
                          </span>

                        </div>

                      </td>


                      {/* Customer */}
                      <td className="reports-customer-name">
                        {booking.customerName || "-"}
                      </td>


                      {/* Booking Date */}
                      <td>
                        {booking.bookingDate
                          ? new Date(
                              booking.bookingDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>


                      {/* Start Date */}
                      <td>
                        {booking.startDate || "-"}
                      </td>


                      {/* End Date */}
                      <td>
                        {booking.endDate || "-"}
                      </td>


                      {/* Total */}
                      <td className="reports-history-total">
                        Rs. {Number(
                          booking.total
                        ).toLocaleString()}
                      </td>


                      {/* Status */}
                      <td>

                        <span
                          className={`reports-history-status ${
                            booking.status === "COMPLETED"
                              ? "reports-status-completed"
                              : booking.status === "REJECTED"
                              ? "reports-status-rejected"
                              : booking.status === "CANCELLED"
                              ? "reports-status-cancelled"
                              : "reports-status-default"
                          }`}
                        >
                          {booking.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </>
  );
}


// =========================
// REPORT CARD COMPONENT
// =========================

function ReportCard({ title, value }) {

  return (

    <div className="report-summary-card">

      <p className="report-card-title">
        {title}
      </p>

      <h2 className="report-card-value">
        {value}
      </h2>

    </div>

  );
}

export default AdminReportsPage;