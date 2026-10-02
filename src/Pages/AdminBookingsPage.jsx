import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function AdminBookingsPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const response = await fetch(
        "http://localhost:8080/booking/adminBookings"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);

    } catch (error) {
      console.error("Booking Fetch Error:", error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          padding: "40px",
          minHeight: "100vh",
          backgroundColor: "#f5f6f8"
        }}
      >

        <h2>Booking Management</h2>

        <p style={{ marginBottom: "25px" }}>
          Total Bookings: <strong>{bookings.length}</strong>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px"
          }}
        >

          {bookings.map((booking) => (

            <div
              key={booking.bookingId}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
              }}
            >

              <div
                style={{
                    width: "100%",
                    height: "220px",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px"
                }}
                >
                <img
                    src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                    alt={booking.vehicleModel}
                    style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                    }}
                />
                </div>

              <div style={{ padding: "20px" }}>

                <h3>{booking.vehicleModel}</h3>

                <p>
                  <strong>Booking ID:</strong>{" "}
                  {booking.bookingId}
                </p>

                <p>
                  <strong>Customer:</strong>{" "}
                  {booking.customerName}
                </p>

                <p>
                  <strong>From:</strong>{" "}
                  {booking.startDate}
                </p>

                <p>
                  <strong>To:</strong>{" "}
                  {booking.endDate}
                </p>

                <p>
                  <strong>Total Days:</strong>{" "}
                  {booking.totalDays}
                </p>

                <p>
                  <strong>Daily Rate:</strong> Rs.{" "}
                  {booking.dailyRate}
                </p>

                <p>
                  <strong>Total Amount:</strong> Rs.{" "}
                  {booking.totalAmount}
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "18px"
                    }}
                    >
                    <span
                        style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",

                        backgroundColor:
                            booking.status === "PENDING"
                            ? "#fff3cd"
                            : booking.status === "APPROVED"
                            ? "#cfe2ff"
                            : booking.status === "SUCCESS"
                            ? "#d1e7dd"
                            : "#e2e3e5",

                        color:
                            booking.status === "PENDING"
                            ? "#664d03"
                            : booking.status === "APPROVED"
                            ? "#084298"
                            : booking.status === "SUCCESS"
                            ? "#0f5132"
                            : "#41464b"
                        }}
                    >
                        {booking.status}
                    </span>

                    <span
                        style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",

                        backgroundColor:
                            booking.paymentStatus === "PAID"
                            ? "#d1e7dd"
                            : "#f8d7da",

                        color:
                            booking.paymentStatus === "PAID"
                            ? "#0f5132"
                            : "#842029"
                        }}
                    >
                        {booking.paymentStatus}
                    </span>
                    </div>

              </div>
            </div>

          ))}

        </div>

        {bookings.length === 0 && (
          <p style={{ marginTop: "30px" }}>
            No bookings available.
          </p>
        )}

      </div>
    </>
  );
}

export default AdminBookingsPage;