import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";

function MyBookingsPage() {

  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const currentBookings = bookings.filter(
    (booking) =>
      booking.status === "PENDING" ||
      booking.status === "APPROVED"
  );

  const bookingHistory = bookings.filter(
    (booking) =>
      booking.status === "SUCCESS" ||
      booking.paymentStatus === "PAID"
  );

  const handleCancelBooking = async (bookingId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/booking/deleteBooking/${bookingId}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Booking cancel failed");
    }

    alert("Booking cancelled successfully!");

    setBookings((prevBookings) =>
      prevBookings.filter(
        (booking) => booking.bookingId !== bookingId
      )
    );

  } catch (error) {
    console.error("Cancel Booking Error:", error);
    alert("Booking cancel failed!");
  }
};

const handlePayment = async (booking) => {
  try {
    const paymentData = {
      bookingId: booking.bookingId,
      amount: booking.totalAmount
    };

    console.log("Payment Data:", paymentData);

    const response = await fetch(
      "http://localhost:8080/payment/addPayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      }
    );

    if (!response.ok) {
      throw new Error("Payment failed");
    }

    alert("Payment completed successfully!");

    setBookings((prevBookings) =>
      prevBookings.map((item) =>
        item.bookingId === booking.bookingId
          ? {
              ...item,
              paymentStatus: "PAID",
              status: "SUCCESS"
            }
          : item
      )
    );

  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment failed!");
  }
};

  useEffect(() => {

    if (!user) {
      return;
    }

    fetch(`http://localhost:8080/booking/userBookings/${user.userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        return response.json();
      })
      .then((data) => {
        console.log("My Bookings:", data);
        setBookings(data);
      })
      .catch((error) => {
        console.error("Booking Fetch Error:", error);
      });

      fetch(`http://localhost:8080/booking-history/customer/${user.userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch booking history");
          }

          return response.json();
        })
        .then((data) => {
          console.log("Booking History:", data);
          setHistory(data);
        })
        .catch((error) => {
          console.error("Booking History Error:", error);
        });

  }, []);

  return (
    <>
      <HomeNavbar />

      <div style={{ padding: "40px" }}>
        <h2>My Bookings</h2>

        <p>Total Bookings: {bookings.length}</p>

        <div
            style={{display: "flex",flexWrap: "wrap",gap: "20px", marginTop: "30px"}}>
            <h3 style={{ marginTop: "30px" }}>Current Bookings</h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "20px"
              }}
            >
              {currentBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  style={{
                    width: "300px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                >
                  <img
                    src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                    alt={booking.vehicleModel}
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "contain",
                      borderRadius: "8px"
                    }}
                  />

                  <h3 style={{ marginTop: "15px" }}>
                    {booking.vehicleModel}
                  </h3>

                  <p><strong>From:</strong> {booking.startDate}</p>
                  <p><strong>To:</strong> {booking.endDate}</p>
                  <p><strong>Total Days:</strong> {booking.totalDays}</p>
                  <p><strong>Daily Rate:</strong> Rs. {booking.dailyRate}</p>
                  <p><strong>Total Amount:</strong> Rs. {booking.totalAmount}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Payment:</strong> {booking.paymentStatus}</p>

                  {booking.status === "PENDING" && (
                    <button
                      onClick={() => handleCancelBooking(booking.bookingId)}
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        padding: "10px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}

                  {booking.status === "APPROVED" &&
                    booking.paymentStatus === "UNPAID" && (
                      <button
                        onClick={() => handlePayment(booking)}
                        style={{
                          width: "100%",
                          marginTop: "15px",
                          padding: "10px",
                          backgroundColor: "#198754",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600"
                        }}
                      >
                        Pay Now
                      </button>
                    )}
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: "50px" }}>Booking History</h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "20px"
              }}
            >
              {history.map((item) => (
                <div
                  key={item.historyId}
                  style={{
                    width: "300px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                >
                  <img
                    src={`http://localhost:8080/uploads/${item.vehicleImage}`}
                    alt={item.vehicleModel}
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "contain",
                      borderRadius: "8px",
                      marginBottom: "15px"
                    }}
                  />

                  <h3>{item.vehicleModel}</h3>

                  <p>
                    <strong>From:</strong> {item.startDate}
                  </p>

                  <p>
                    <strong>To:</strong> {item.endDate}
                  </p>

                  <p>
                    <strong>Total Amount:</strong> Rs. {item.total}
                  </p>

                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>
                </div>
              ))}
            </div>
            </div>
      </div>
    </>
  );
}

export default MyBookingsPage;