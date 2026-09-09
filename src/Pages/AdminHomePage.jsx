import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import HomeCarousel from '../components/HomeCarousel'
// import MainPagesBody from '../components/MainPagesBody'
import Footer from '../components/Footer'

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
      <AdminNavbar/>
      <HomeCarousel/>

          <div style={{ padding: "40px 80px" }}>

            <h2 style={{ marginBottom: "25px" }}>Pending Bookings</h2>

            <p>Total Bookings: {bookings.length}</p>

            <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "25px",
                  marginTop: "25px"
                }}
              >
                {bookings.map((booking) => (
                  <div
                    key={booking.bookingId}
                    style={{
                      maxWidth: "350px",
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      padding: "18px",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                      backgroundColor: "white"
                    }}
                  >
                    <img
                      src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                      alt={booking.vehicleModel}
                      style={{
                        width: "100%",
                        height: "170px",
                        objectFit: "contain",
                        borderRadius: "8px",
                        marginBottom: "15px"
                      }}
                    />

                    <h3>{booking.vehicleModel}</h3>

                    <p><strong>Customer:</strong> {booking.customerName}</p>
                    <p><strong>From:</strong> {booking.startDate}</p>
                    <p><strong>To:</strong> {booking.endDate}</p>
                    <p><strong>Total Days:</strong> {booking.totalDays}</p>
                    <p><strong>Daily Rate:</strong> Rs. {booking.dailyRate}</p>
                    <p><strong>Total Amount:</strong> Rs. {booking.totalAmount}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    <p><strong>Payment:</strong> {booking.paymentStatus}</p>

                    <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "15px"
                        }}
                      >
                        <button
                          onClick={() =>
                            handleUpdateStatus(booking.bookingId, "APPROVED")
                          }
                          style={{
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#198754",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600"
                          }}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleUpdateStatus(booking.bookingId, "REJECTED")
                          }
                          style={{
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600"
                          }}
                        >
                          Reject
                        </button>
                      </div>
                                     
                  </div>
                ))}
            </div>

          </div>
      <Footer/>
    </>
  )
}

export default AdminHomePage
