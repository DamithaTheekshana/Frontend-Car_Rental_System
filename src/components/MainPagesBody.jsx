import React from "react";
import CarCard from "./CarCard";
import "./MainPagesBody.css";

function MainPagesBody({ vehicles }) {

  return (
    <>

      {/* ================================= */}
      {/* INTRODUCTION SECTION */}
      {/* ================================= */}

      <section className="rental-intro-section">

        <div className="rental-intro-content">

          <span className="rental-small-title">
            THE TRIP KEY
          </span>

          <h1>
            Trusted Car Rental Service
            <span> in Sri Lanka</span>
          </h1>

          <p>
            With over 10 years of experience in the industry, we strive
            to offer the highest levels of customer service and a highly
            personalised service to all our customers who are on the
            lookout for Sri Lanka car rental opportunities.
          </p>

          <p>
            With one of the largest, modern and varied fleets in Sri Lanka,
            our service is backed by a networked front office,
            fully-fledged mechanical servicing and valet servicing onsite.
          </p>

          <div className="rental-intro-icon">
            <img
              src="/img/icons8-car-100.png"
              alt="Car Rental"
            />
          </div>

        </div>

      </section>


      {/* ================================= */}
      {/* VEHICLE SECTION */}
      {/* ================================= */}

      <section className="vehicle-section">

        <div className="vehicle-section-container">


          {/* SEARCH AREA */}

          <div className="vehicle-search-box">

            <div className="vehicle-search-title">

              <div className="vehicle-search-icon">
                <img
                  src="/img/icons8-car-100.png"
                  alt="Car"
                />
              </div>

              <div>
                <span>FIND YOUR VEHICLE</span>
                <h2>Search Cars</h2>
              </div>

            </div>


            <form
              className="vehicle-search-form"
              onSubmit={(e) => e.preventDefault()}
            >

              <input
                type="search"
                placeholder="Select car type..."
              />

              <button type="submit">
                Search
              </button>

            </form>

          </div>


          {/* VEHICLE LIST HEADER */}

          <div className="vehicle-list-header">

            <div>
              <span className="vehicle-list-small-title">
                OUR FLEET
              </span>

              <h2>
                Choose Your Vehicle
              </h2>
            </div>

            <div className="vehicle-count">
              {vehicles?.length || 0} Vehicles Available
            </div>

          </div>


          {/* VEHICLE CARDS */}

          {vehicles && vehicles.length > 0 ? (

            <div className="vehicle-card-grid">

              {vehicles.map((vehicle) => (

                <CarCard
                  key={vehicle.vehicleId}
                  vehicle={vehicle}
                />

              ))}

            </div>

          ) : (

            <div className="no-vehicles-message">
              No vehicles available.
            </div>

          )}

        </div>

      </section>

    </>
  );
}

export default MainPagesBody;