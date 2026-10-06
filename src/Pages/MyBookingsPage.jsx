import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./MyBookingsPage.css";

function MyBookingsPage() {

  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

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

const handleCardInputChange = (e) => {
  const { name, value } = e.target;

  let formattedValue = value;

  // Card Number - numbers only + space after every 4 digits
  if (name === "cardNumber") {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);

    formattedValue = numbersOnly
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  // Expiry Date - MM/YY format
  if (name === "expiryDate") {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 4);

    if (numbersOnly.length >= 3) {
      formattedValue =
        numbersOnly.slice(0, 2) +
        "/" +
        numbersOnly.slice(2);
    } else {
      formattedValue = numbersOnly;
    }
  }

  // CVV - numbers only
  if (name === "cvv") {
    formattedValue = value
      .replace(/\D/g, "")
      .slice(0, 3);
  }

  setCardDetails((prev) => ({
    ...prev,
    [name]: formattedValue
  }));
};

const handlePayment = async () => {

  if (!selectedBooking) {
    return;
  }

  // Demo card validation
if (paymentMethod === "CARD") {

  const cardNumber =
    cardDetails.cardNumber.replace(/\s/g, "");

  if (cardDetails.cardholderName.trim() === "") {
    alert("Please enter the cardholder name.");
    return;
  }

  if (cardNumber.length !== 16) {
    alert("Please enter a valid 16-digit card number.");
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
    alert("Please enter expiry date in MM/YY format.");
    return;
  }

  const month = Number(
    cardDetails.expiryDate.substring(0, 2)
  );

  if (month < 1 || month > 12) {
    alert("Please enter a valid expiry month.");
    return;
  }

  if (!/^\d{3}$/.test(cardDetails.cvv)) {
    alert("Please enter a valid 3-digit CVV.");
    return;
  }
}

  try {

    setPaymentProcessing(true);

    const paymentData = {
      bookingId: selectedBooking.bookingId,
      amount: selectedBooking.totalAmount,
      type: paymentMethod
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
        item.bookingId === selectedBooking.bookingId
          ? {
              ...item,
              paymentStatus: "PAID",
              status: "SUCCESS"
            }
          : item
      )
    );

    setSelectedBooking(null);

    setPaymentMethod("CASH");

    setCardDetails({
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    });

  } catch (error) {

    console.error("Payment Error:", error);
    alert("Payment failed!");

  } finally {

    setPaymentProcessing(false);

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


      {/* CURRENT BOOKINGS SECTION */}
      <div style={{ marginTop: "40px" }}>

        <h2 style={{ marginBottom: "25px" }}>
          Current Bookings
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          {currentBookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="current-booking-card"
            >
              <img
                src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                alt={booking.vehicleModel}
                className="current-booking-image"
              />

              <h3 style={{ marginTop: "15px" }}>
                {booking.vehicleModel}
              </h3>

              <div className="booking-details">
                <p><strong>From:</strong> {booking.startDate}</p>
                <p><strong>To:</strong> {booking.endDate}</p>
                <p><strong>Total Days:</strong> {booking.totalDays}</p>
                <p><strong>Daily Rate:</strong> Rs. {booking.dailyRate}</p>

                <p className="booking-amount">
                  Total Amount: Rs. {booking.totalAmount}
                </p>
              </div>
              <div className="booking-status-row">

              <div>
                <strong>Status: </strong>

                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "13px",
                    fontWeight: "600",
                    backgroundColor:
                      booking.status === "APPROVED"
                        ? "#d1e7dd"
                        : "#fff3cd",
                    color:
                      booking.status === "APPROVED"
                        ? "#0f5132"
                        : "#664d03"
                  }}
                >
                  {booking.status}
                </span>
              </div>

              <div>
                <strong>Payment: </strong>

                <span className="payment-status">
                  {booking.paymentStatus}
                </span>
              </div>

            </div>

              {booking.status === "PENDING" && (
                <button
                  onClick={() =>
                    handleCancelBooking(booking.bookingId)
                  }
                  className="booking-action-btn cancel-btn"
                >
                  Cancel Booking
                </button>
              )}

              {booking.status === "APPROVED" &&
                booking.paymentStatus === "UNPAID" && (
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setPaymentMethod("CASH");
                    }}
                    className="booking-action-btn pay-btn"
                  >
                    Pay Now
                  </button>
                )}
            </div>
          ))}
        </div>

      </div>


      {/* BOOKING HISTORY SECTION */}
      <div style={{ marginTop: "60px" }}>

        <h2 style={{ marginBottom: "25px" }}>
          Booking History
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          {history.map((item) => (
            <div
                key={item.historyId}
                className="history-booking-card"
              >
              <img
                src={`http://localhost:8080/uploads/${item.vehicleImage}`}
                alt={item.vehicleModel}
                className="history-booking-image"
              />

              <h3>{item.vehicleModel}</h3>

              <div className="history-details">

                <p>
                  <strong>From:</strong> {item.startDate}
                </p>

                <p>
                  <strong>To:</strong> {item.endDate}
                </p>

                <p className="history-amount">
                  Total Amount: Rs. {item.total}
                </p>

              </div>

              <p>
                <strong>Status: </strong>

                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        fontSize: "13px",
                        fontWeight: "600",

                        backgroundColor:
                          item.status === "COMPLETED"
                            ? "#d1e7dd"
                            : item.status === "REJECTED"
                            ? "#f8d7da"
                            : "#e2e3e5",

                        color:
                          item.status === "COMPLETED"
                            ? "#0f5132"
                            : item.status === "REJECTED"
                            ? "#842029"
                            : "#41464b"
                      }}
                    >
                      {item.status}
                    </span>
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>

  {/* PAYMENT MODAL */}
  {selectedBooking && (

  <div className="payment-modal-overlay">

    <div className="payment-modal">

      {/* Header */}
      <div className="payment-modal-header">

        <div>
          <h2>Complete Payment</h2>
          <p>Review your booking and select a payment method</p>
        </div>

        {/* DEMO CARD FORM */}
        {paymentMethod === "CARD" && (

          <div className="card-payment-form">

            <div className="card-form-header">
              <div>
                <h4>Card Details</h4>
                <p>Enter your demo card information</p>
              </div>

              <div className="accepted-cards">
                <span className="visa-badge">VISA</span>
                <span className="mastercard-badge">
                  Mastercard
                </span>
              </div>
            </div>

            <div className="demo-payment-notice">
              Demo Payment — No real card transaction will be made.
            </div>

            <div className="card-form-group">
              <label>Cardholder Name</label>

              <input
                type="text"
                name="cardholderName"
                placeholder="John Smith"
                value={cardDetails.cardholderName}
                onChange={handleCardInputChange}
              />
            </div>


            <div className="card-form-group">
              <label>Card Number</label>

              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
              />
            </div>


            <div className="card-form-row">

              <div className="card-form-group">
                <label>Expiry Date</label>

                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInputChange}
                />
              </div>


              <div className="card-form-group">
                <label>CVV</label>

                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  maxLength="3"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                />
              </div>

            </div>

          </div>

        )}

        <button
          className="payment-modal-close"
          onClick={() => setSelectedBooking(null)}
        >
          ×
        </button>

      </div>


      {/* Booking Details */}
      <div className="payment-booking-summary">

        <div className="payment-vehicle-info">

          <img
            src={`http://localhost:8080/uploads/${selectedBooking.vehicleImage}`}
            alt={selectedBooking.vehicleModel}
          />

          <div>
            <h3>{selectedBooking.vehicleModel}</h3>

            <p>
              {selectedBooking.startDate}
              {" → "}
              {selectedBooking.endDate}
            </p>
          </div>

        </div>


        <div className="payment-summary-row">
          <span>Total Days</span>
          <strong>{selectedBooking.totalDays} Days</strong>
        </div>

        <div className="payment-summary-row">
          <span>Daily Rate</span>

          <strong>
            Rs. {Number(
              selectedBooking.dailyRate
            ).toLocaleString()}
          </strong>
        </div>

        <div className="payment-total-row">

          <span>Total Amount</span>

          <strong>
            Rs. {Number(
              selectedBooking.totalAmount
            ).toLocaleString()}
          </strong>

        </div>

      </div>


      {/* Payment Method */}
      <div className="payment-method-section">

        <h3>Select Payment Method</h3>


        <div className="payment-method-options">

          {/* CASH */}
          <label
            className={`payment-method-card ${
              paymentMethod === "CASH"
                ? "payment-method-selected"
                : ""
            }`}
          >

            <input
              type="radio"
              name="paymentMethod"
              value="CASH"
              checked={paymentMethod === "CASH"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            <div>
              <strong>Cash Payment</strong>
              <p>Pay using cash</p>
            </div>

          </label>


          {/* CARD */}
          <label
            className={`payment-method-card ${
              paymentMethod === "CARD"
                ? "payment-method-selected"
                : ""
            }`}
          >

            <input
              type="radio"
              name="paymentMethod"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            <div>
              <strong>Card Payment</strong>
              <p>Pay using your debit or credit card</p>
            </div>

          </label>

        </div>

      </div>


      {/* Buttons */}
      <div className="payment-modal-actions">

        <button
          className="payment-cancel-btn"
          onClick={() => setSelectedBooking(null)}
        >
          Cancel
        </button>

        <button
          className="payment-confirm-btn"
          onClick={handlePayment}
          disabled={paymentProcessing}
        >
          {paymentProcessing
            ? "Processing Payment..."
            : paymentMethod === "CARD"
            ? `Pay Rs. ${Number(
                selectedBooking.totalAmount
              ).toLocaleString()}`
            : "Confirm Cash Payment"}
        </button>

      </div>

    </div>

  </div>

)}

  </>
);
}

export default MyBookingsPage;