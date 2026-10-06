import React from "react";
import "./HomeCarousel.css";

function HomeCarousel() {

  const scrollToVehicles = () => {
    const vehicleSection = document.getElementById("vehicles");

    if (vehicleSection) {
      vehicleSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="home-hero">

      <div
        id="carouselExample"
        className="carousel slide home-carousel"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >

        {/* ============================== */}
        {/* CAROUSEL IMAGES */}
        {/* ============================== */}

        <div className="carousel-inner">

          <div className="carousel-item active">

            <img
              src="/img/header.jpg"
              className="d-block w-100 home-carousel-image"
              alt="Family enjoying rental vehicle"
            />

          </div>


          <div className="carousel-item">

            <img
              src="/img/Honda-Dealership-In-Atlanta-2021-Odyssey-Elite.avif"
              className="d-block w-100 home-carousel-image"
              alt="Car rental service"
            />

          </div>


          <div className="carousel-item">

            <img
              src="/img/istockphoto-1644775768-612x612.jpg"
              className="d-block w-100 home-carousel-image"
              alt="Travel with The Trip Key"
            />

          </div>

        </div>


        {/* ============================== */}
        {/* DARK OVERLAY */}
        {/* ============================== */}

        <div className="home-carousel-overlay"></div>


        {/* ============================== */}
        {/* HERO CONTENT */}
        {/* ============================== */}

        <div className="home-hero-content">

          <div className="home-hero-small-title">
            <span></span>

            EXPLORE SRI LANKA WITH

            <span></span>
          </div>


          <h1 className="home-hero-title">

            <span className="hero-white-text">
              THE
            </span>

            <span className="hero-orange-text">
              TRIP
            </span>

            <span className="hero-white-text">
              KEY
            </span>

          </h1>


          <p className="home-hero-subtitle">
            Premier Car Rental Services in Sri Lanka
          </p>


          {/* ============================== */}
          {/* FEATURES */}
          {/* ============================== */}

          <div className="home-hero-features">


            {/* FEATURE 1 */}

            <div className="hero-feature">

              <div className="hero-feature-icon">

                <img
                  src="/img/icons8-car-50.png"
                  alt="Vehicles"
                />

              </div>

              <div>
                <strong>Wide Range</strong>
                <span>of Vehicles</span>
              </div>

            </div>


            <div className="hero-feature-divider"></div>


            {/* FEATURE 2 */}

            <div className="hero-feature">

              <div className="hero-feature-icon">
                ✓
              </div>

              <div>
                <strong>Safe & Reliable</strong>
                <span>Service</span>
              </div>

            </div>


            <div className="hero-feature-divider"></div>


            {/* FEATURE 3 */}

            <div className="hero-feature">

              <div className="hero-feature-icon">
                ★
              </div>

              <div>
                <strong>Easy Booking</strong>
                <span>Fast & Simple</span>
              </div>

            </div>

          </div>


          {/* ============================== */}
          {/* BUTTON */}
          {/* ============================== */}

          <button
            className="home-hero-button"
            onClick={scrollToVehicles}
          >
            Explore Vehicles

            <span>
              →
            </span>
          </button>

        </div>


        {/* ============================== */}
        {/* INDICATORS */}
        {/* ============================== */}

        <div className="carousel-indicators home-carousel-indicators">

          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>

        </div>


        {/* ============================== */}
        {/* PREVIOUS BUTTON */}
        {/* ============================== */}

        <button
          className="carousel-control-prev hero-carousel-control hero-control-left"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >

          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Previous
          </span>

        </button>


        {/* ============================== */}
        {/* NEXT BUTTON */}
        {/* ============================== */}

        <button
          className="carousel-control-next hero-carousel-control hero-control-right"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >

          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Next
          </span>

        </button>

      </div>

    </section>
  );
}

export default HomeCarousel;