import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarCard.css";

function CarCard({ vehicle }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleBookNow = async () => {

    if (!user) {
      navigate("/loginpage");
      return;
    }

    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }

    const bookingData = {
      userId: user.userId,
      vehicleId: vehicle.vehicleId,
      startDate: fromDate,
      endDate: toDate
    };

    console.log("Booking Data:", bookingData);

    try {

      const response = await fetch(
        "http://localhost:8080/booking/addBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bookingData)
        }
      );

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      alert("Booking successfully submitted!");

    } catch (error) {

      console.error("Booking Error:", error);
      alert("Booking failed!");

    }
  };


  return (

    <div className="vehicle-card">

      {/* ========================= */}
      {/* IMAGE SECTION */}
      {/* ========================= */}

      <div className="vehicle-image-section">

        <img
          src={`http://localhost:8080/uploads/${vehicle?.imagePath}`}
          alt={vehicle?.model}
          className="vehicle-card-image"
        />

        <div className="vehicle-type-badge">
          {vehicle?.type}
        </div>

      </div>


      {/* ========================= */}
      {/* CARD BODY */}
      {/* ========================= */}

      <div className="vehicle-card-body">

        {/* VEHICLE NAME + PRICE */}

        <div className="vehicle-card-heading">

          <div>
            <p className="vehicle-brand">
              {vehicle?.brand}
            </p>

            <h2 className="vehicle-model">
              {vehicle?.model}
            </h2>
          </div>


          <div className="vehicle-price">

            <span className="vehicle-price-label">
              Per Day
            </span>

            <strong>
              Rs. {Number(
                vehicle?.dailyRate
              ).toLocaleString()}
            </strong>

          </div>

        </div>


        {/* ========================= */}
        {/* VEHICLE INFORMATION */}
        {/* ========================= */}

        <div className="vehicle-info-grid">

          <div className="vehicle-info-item">

            <div className="vehicle-info-icon">
              <img
                src="/img/icons8-car-seat-50.png"
                alt="Seats"
              />
            </div>

            <div>
              <span className="vehicle-info-label">
                Seats
              </span>

              <strong>
                {vehicle?.seat} Seats
              </strong>
            </div>

          </div>


          <div className="vehicle-info-item">

            <div className="vehicle-info-icon">
              <img
                src="/img/icons8-gas-station-48.png"
                alt="Fuel"
              />
            </div>

            <div>
              <span className="vehicle-info-label">
                Fuel
              </span>

              <strong>
                {vehicle?.fuelType}
              </strong>
            </div>

          </div>


          <div className="vehicle-info-item">

            <div className="vehicle-info-icon">
              <img
                src="/img/icons8-brand-64.png"
                alt="Brand"
              />
            </div>

            <div>
              <span className="vehicle-info-label">
                Brand
              </span>

              <strong>
                {vehicle?.brand}
              </strong>
            </div>

          </div>


          <div className="vehicle-info-item">

            <div className="vehicle-info-icon">
              <img
                src="/img/icons8-car-50.png"
                alt="Vehicle Type"
              />
            </div>

            <div>
              <span className="vehicle-info-label">
                Type
              </span>

              <strong>
                {vehicle?.type}
              </strong>
            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* BOOKING DATES */}
        {/* ========================= */}

        <div className="vehicle-booking-section">

          <p className="booking-section-title">
            Select Rental Period
          </p>


          <div className="vehicle-date-row">

            {/* FROM */}

            <div className="vehicle-date-field">

              <label>
                From
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(e.target.value)
                }
              />

            </div>


            {/* TO */}

            <div className="vehicle-date-field">

              <label>
                To
              </label>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(e.target.value)
                }
              />

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* BOOK BUTTON */}
        {/* ========================= */}

        <button
          className="vehicle-book-button"
          onClick={handleBookNow}
        >
          Book Now
        </button>

      </div>

    </div>

  );
}

export default CarCard;