import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import HomeCarousel from '../components/HomeCarousel'
import Footer from '../components/Footer'
import "./AdminHomePage.css";

function AdminHomePage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/booking/allBookings")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Admin Bookings:", data);
        setBookings(data);
      })
      .catch((error) => {
        console.error("Admin Booking Error:", error);
      });

  }, []);

  const handleUpdateStatus = async (bookingId, status) => {
  try {
    const response = await fetch(
      "http://localhost:8080/booking/update-status",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingId: bookingId,
          status: status
        })
      }
    );

    if (!response.ok) {
      throw new Error("Status update failed");
    }

    alert(`Booking ${status.toLowerCase()} successfully!`);

    setBookings((prevBookings) =>
      prevBookings.filter(
        (booking) => booking.bookingId !== bookingId
      )
    );

    } catch (error) {
      console.error("Update Status Error:", error);
      alert("Status update failed!");
    }
  };

  return (
  <>
    <AdminNavbar />
    <HomeCarousel />

    <div className="admin-bookings-section">

      <h2 className="admin-bookings-title">
        Pending & Unpaid Bookings
      </h2>

      <p className="admin-bookings-count">
        Total Bookings: {bookings.length}
      </p>

      <div className="admin-bookings-grid">

        {bookings.map((booking) => (
          <div
            key={booking.bookingId}
            className="admin-booking-card"
          >

            <img
              src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
              alt={booking.vehicleModel}
              className="admin-booking-image"
            />

            <h3>{booking.vehicleModel}</h3>

            <div className="admin-booking-details">

              <p>
                <strong>Customer:</strong> {booking.customerName}
              </p>

              <p>
                <strong>From:</strong> {booking.startDate}
              </p>

              <p>
                <strong>To:</strong> {booking.endDate}
              </p>

              <p>
                <strong>Total Days:</strong> {booking.totalDays}
              </p>

              <p>
                <strong>Daily Rate:</strong> Rs. {booking.dailyRate}
              </p>

              <p className="admin-booking-amount">
                Total Amount: Rs. {booking.totalAmount}
              </p>

              <div className="admin-status-row">

                <div>
                  <strong>Status: </strong>

                  <span
                    className={`admin-status-badge ${
                      booking.status === "APPROVED"
                        ? "admin-approved-badge"
                        : "admin-pending-badge"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div>
                  <strong>Payment: </strong>

                  <span className="admin-payment-badge">
                    {booking.paymentStatus}
                  </span>
                </div>

              </div>

            </div>

            <div className="admin-booking-actions">

              <button
                onClick={() =>
                  handleUpdateStatus(
                    booking.bookingId,
                    "APPROVED"
                  )
                }
                className="admin-action-btn admin-approve-btn"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  handleUpdateStatus(
                    booking.bookingId,
                    "REJECTED"
                  )
                }
                className="admin-action-btn admin-reject-btn"
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>

    <Footer />
  </>
);
}

export default AdminHomePage
