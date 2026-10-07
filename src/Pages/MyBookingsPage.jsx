import React, { useEffect, useState } from "react";

import HomeNavbar from "../components/HomeNavbar";

import "./MyBookingsPage.css";



function MyBookingsPage() {



  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);



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


  // Close payment modal and reset all payment data
  const closePaymentModal = () => {
    setSelectedBooking(null);
    setPaymentMethod("CASH");
    setPaymentProcessing(false);
    setCardDetails({
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    });
  };





  // ==========================================

  // CURRENT BOOKINGS

  // ==========================================



  const currentBookings = bookings.filter(

    (booking) =>

      booking.status === "PENDING" ||

      booking.status === "APPROVED"

  );





  // ==========================================

  // CANCEL BOOKING

  // ==========================================



  const handleCancelBooking = async (bookingId) => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

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





  // ==========================================

  // CARD INPUT

  // ==========================================



  const handleCardInputChange = (e) => {



    const { name, value } = e.target;



    let formattedValue = value;





    // Card Number

    if (name === "cardNumber") {



      const numbersOnly = value

        .replace(/\D/g, "")

        .slice(0, 16);



      formattedValue = numbersOnly

        .replace(/(.{4})/g, "$1 ")

        .trim();

    }





    // Expiry Date

    if (name === "expiryDate") {



      const numbersOnly = value

        .replace(/\D/g, "")

        .slice(0, 4);



      if (numbersOnly.length >= 3) {



        formattedValue =

          numbersOnly.slice(0, 2) +

          "/" +

          numbersOnly.slice(2);



      } else {



        formattedValue = numbersOnly;

      }

    }





    // CVV

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





  // ==========================================

  // PAYMENT

  // ==========================================



  const handlePayment = async () => {



    if (!selectedBooking) {

      return;

    }





    // ========================================

    // DEMO CARD VALIDATION

    // ========================================



    if (paymentMethod === "CARD") {



      const cardNumber =

        cardDetails.cardNumber.replace(/\s/g, "");





      // Cardholder Name

      if (cardDetails.cardholderName.trim() === "") {



        alert("Please enter the cardholder name.");



        return;

      }





      // Card Number

      if (cardNumber.length !== 16) {



        alert("Please enter a valid 16-digit card number.");



        return;

      }





      // Expiry Format

      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {



        alert("Please enter expiry date in MM/YY format.");



        return;

      }





      // Expiry Month

      const month = Number(

        cardDetails.expiryDate.substring(0, 2)

      );



      if (month < 1 || month > 12) {



        alert("Please enter a valid expiry month.");



        return;

      }





      // CVV

      if (!/^\d{3}$/.test(cardDetails.cvv)) {



        alert("Please enter a valid 3-digit CVV.");



        return;

      }

    }





    // ========================================

    // SEND PAYMENT

    // ========================================



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





      // Update frontend booking

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





      // Close Payment Modal

      setSelectedBooking(null);





      // Reset Payment Method

      setPaymentMethod("CASH");





      // Clear Card Details

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





  // ==========================================

  // FETCH CUSTOMER BOOKINGS

  // ==========================================



  useEffect(() => {



    if (!user?.userId) {

      return;

    }





    fetch(

      `http://localhost:8080/booking/userBookings/${user.userId}`

    )

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



        console.error(

          "Booking Fetch Error:",

          error

        );

      });



  }, []);





  // ==========================================

  // PAGE

  // ==========================================



  return (



    <>



      <HomeNavbar />





      <div className="my-bookings-page">



        {/* ================================ */}

        {/* PAGE HEADER */}

        {/* ================================ */}



        <div className="my-bookings-header">



          <div>



            <h2>

              My Bookings

            </h2>



            <p>

              View and manage your current vehicle bookings

            </p>



          </div>





          <div className="my-bookings-count">



            Total Current Bookings: {currentBookings.length}



          </div>



        </div>





        {/* ================================ */}

        {/* CURRENT BOOKINGS TABLE */}

        {/* ================================ */}



        {currentBookings.length === 0 ? (



          <div className="no-current-bookings">



            No current bookings found.



          </div>



        ) : (



          <div className="my-bookings-table-wrapper">



            <table className="my-bookings-table">



              <thead>



                <tr>



                  <th>Vehicle</th>



                  <th>Start Date</th>



                  <th>End Date</th>



                  <th>Total Days</th>



                  <th>Daily Rate</th>



                  <th>Total Amount</th>



                  <th>Status</th>



                  <th>Payment</th>



                  <th>Action</th>



                </tr>



              </thead>





              <tbody>



                {currentBookings.map((booking) => (



                  <tr key={booking.bookingId}>





                    {/* VEHICLE */}



                    <td>



                      <div className="booking-table-vehicle">



                        <img

                          src={`http://localhost:8080/uploads/${booking.vehicleImage}`}

                          alt={booking.vehicleModel}

                        />



                        <span>

                          {booking.vehicleModel}

                        </span>



                      </div>



                    </td>





                    {/* START DATE */}



                    <td>



                      {booking.startDate}



                    </td>





                    {/* END DATE */}



                    <td>



                      {booking.endDate}



                    </td>





                    {/* TOTAL DAYS */}



                    <td>



                      {booking.totalDays}



                    </td>





                    {/* DAILY RATE */}



                    <td>



                      Rs.{" "}

                      {Number(

                        booking.dailyRate

                      ).toLocaleString()}



                    </td>





                    {/* TOTAL AMOUNT */}



                    <td className="booking-table-amount">



                      Rs.{" "}

                      {Number(

                        booking.totalAmount

                      ).toLocaleString()}



                    </td>





                    {/* BOOKING STATUS */}



                    <td>



                      <span

                        className={`booking-table-status ${

                          booking.status === "APPROVED"

                            ? "booking-approved"

                            : "booking-pending"

                        }`}

                      >



                        {booking.status}



                      </span>



                    </td>





                    {/* PAYMENT STATUS */}



                    <td>



                      <span

                        className={`booking-table-payment ${

                          booking.paymentStatus === "PAID"

                            ? "payment-paid"

                            : "payment-unpaid"

                        }`}

                      >



                        {booking.paymentStatus}



                      </span>



                    </td>





                    {/* ACTION */}



                    <td>





                      {/* PENDING -> CANCEL */}



                      {booking.status === "PENDING" && (



                        <button

                          onClick={() =>

                            handleCancelBooking(

                              booking.bookingId

                            )

                          }

                          className="table-cancel-btn"

                        >



                          Cancel



                        </button>



                      )}





                      {/* APPROVED -> PAY */}



                      {booking.status === "APPROVED" &&

                        booking.paymentStatus === "UNPAID" && (



                          <button

                            onClick={() => {



                              setSelectedBooking(booking);



                              setPaymentMethod("CASH");



                            }}

                            className="table-pay-btn"

                          >



                            Pay Now



                          </button>



                        )}



                    </td>



                  </tr>



                ))}



              </tbody>



            </table>



          </div>



        )}



      </div>







      {/* ================================= */}

      {/* PAYMENT MODAL */}

      {/* ================================= */}



      {selectedBooking && (



        <div className="payment-modal-overlay">



          <div className="payment-modal">





            {/* =========================== */}

            {/* MODAL HEADER */}

            {/* =========================== */}



            <div className="payment-modal-header">



              <div>



                <h2>

                  Complete Payment

                </h2>



                <p>

                  Review your booking and select a payment method

                </p>



              </div>





              <button

                className="payment-modal-close"

                onClick={closePaymentModal}

              >



                ×



              </button>



            </div>







            {/* =========================== */}

            {/* BOOKING SUMMARY */}

            {/* =========================== */}



            <div className="payment-booking-summary">





              <div className="payment-vehicle-info">



                <img

                  src={`http://localhost:8080/uploads/${selectedBooking.vehicleImage}`}

                  alt={selectedBooking.vehicleModel}

                />





                <div>



                  <h3>

                    {selectedBooking.vehicleModel}

                  </h3>



                  <p>



                    {selectedBooking.startDate}



                    {" → "}



                    {selectedBooking.endDate}



                  </p>



                </div>



              </div>







              <div className="payment-summary-row">



                <span>

                  Total Days

                </span>



                <strong>



                  {selectedBooking.totalDays} Days



                </strong>



              </div>







              <div className="payment-summary-row">



                <span>

                  Daily Rate

                </span>



                <strong>



                  Rs.{" "}

                  {Number(

                    selectedBooking.dailyRate

                  ).toLocaleString()}



                </strong>



              </div>







              <div className="payment-total-row">



                <span>

                  Total Amount

                </span>



                <strong>



                  Rs.{" "}

                  {Number(

                    selectedBooking.totalAmount

                  ).toLocaleString()}



                </strong>



              </div>



            </div>







            {/* =========================== */}

            {/* PAYMENT METHOD */}

            {/* =========================== */}



            <div className="payment-method-section">



              <h3>

                Select Payment Method

              </h3>





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

                    checked={

                      paymentMethod === "CASH"

                    }

                    onChange={(e) =>

                      setPaymentMethod(

                        e.target.value

                      )

                    }

                  />





                  <div>



                    <strong>

                      Cash Payment

                    </strong>



                    <p>

                      Pay using cash

                    </p>



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

                    checked={

                      paymentMethod === "CARD"

                    }

                    onChange={(e) =>

                      setPaymentMethod(

                        e.target.value

                      )

                    }

                  />





                  <div>



                    <strong>

                      Card Payment

                    </strong>



                    <p>

                      Pay using your debit or credit card

                    </p>



                  </div>



                </label>



              </div>



            </div>







            {/* =========================== */}

            {/* DEMO CARD FORM */}

            {/* =========================== */}



            {paymentMethod === "CARD" && (



              <div className="card-payment-form">





                <div className="card-form-header">



                  <div>



                    <h4>

                      Card Details

                    </h4>



                    <p>

                      Enter your demo card information

                    </p>



                  </div>





                  <div className="accepted-cards">



                    <span className="visa-badge">

                      VISA

                    </span>



                    <span className="mastercard-badge">

                      Mastercard

                    </span>



                  </div>



                </div>







                <div className="demo-payment-notice">



                  Demo Payment — No real card transaction will be made.



                </div>



                {/* ================================= */}

                {/* VIRTUAL CARD PREVIEW */}

                {/* ================================= */}



                <div className="virtual-card-preview">



                  <div className="virtual-card-top">



                    <div>

                      <span className="virtual-card-bank">

                        THE TRIP KEY

                      </span>



                      <span className="virtual-card-type">

                        DEBIT CARD

                      </span>

                    </div>



                    <div className="virtual-card-chip">

                      <div></div>

                      <div></div>

                      <div></div>

                    </div>



                  </div>





                  <div className="virtual-card-number">



                    {cardDetails.cardNumber

                      ? (() => {



                          const digits =

                            cardDetails.cardNumber.replace(/\s/g, "");



                          const lastFour =

                            digits.slice(-4);



                          return digits.length > 0

                            ? `••••  ••••  ••••  ${lastFour.padStart(4, "•")}`

                            : "••••  ••••  ••••  ••••";



                        })()

                      : "••••  ••••  ••••  ••••"

                    }



                  </div>





                  <div className="virtual-card-bottom">



                    <div className="virtual-card-detail">



                      <span>

                        CARD HOLDER

                      </span>



                      <strong>

                        {cardDetails.cardholderName.trim()

                          ? cardDetails.cardholderName.toUpperCase()

                          : "YOUR NAME"

                        }

                      </strong>



                    </div>





                    <div className="virtual-card-detail">



                      <span>

                        EXPIRES

                      </span>



                      <strong>

                        {cardDetails.expiryDate || "MM/YY"}

                      </strong>



                    </div>





                    <div className="virtual-card-brand">

                      <span>VISA</span>

                    </div>



                  </div>



                </div>



                {/* CARDHOLDER NAME */}



                <div className="card-form-group">



                  <label>

                    Cardholder Name

                  </label>



                  <input

                    type="text"

                    name="cardholderName"

                    placeholder="John Smith"

                    value={

                      cardDetails.cardholderName

                    }

                    onChange={

                      handleCardInputChange

                    }

                  />



                </div>







                {/* CARD NUMBER */}



                <div className="card-form-group">



                  <label>

                    Card Number

                  </label>



                  <input

                    type="text"

                    name="cardNumber"

                    placeholder="1234 5678 9012 3456"

                    maxLength="19"

                    value={

                      cardDetails.cardNumber

                    }

                    onChange={

                      handleCardInputChange

                    }

                  />



                </div>







                <div className="card-form-row">





                  {/* EXPIRY */}



                  <div className="card-form-group">



                    <label>

                      Expiry Date

                    </label>



                    <input

                      type="text"

                      name="expiryDate"

                      placeholder="MM/YY"

                      maxLength="5"

                      value={

                        cardDetails.expiryDate

                      }

                      onChange={

                        handleCardInputChange

                      }

                    />



                  </div>







                  {/* CVV */}



                  <div className="card-form-group">



                    <label>

                      CVV

                    </label>



                    <input

                      type="password"

                      name="cvv"

                      placeholder="123"

                      maxLength="3"

                      value={

                        cardDetails.cvv

                      }

                      onChange={

                        handleCardInputChange

                      }

                    />



                  </div>



                </div>



              </div>



            )}







            {/* =========================== */}

            {/* MODAL BUTTONS */}

            {/* =========================== */}



            <div className="payment-modal-actions">





              <button

                className="payment-cancel-btn"

                onClick={closePaymentModal}

                disabled={paymentProcessing}

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