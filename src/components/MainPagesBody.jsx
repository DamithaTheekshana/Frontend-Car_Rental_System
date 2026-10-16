import React, { useState } from "react";
import CarCard from "./CarCard";
import "./MainPagesBody.css";

function MainPagesBody({ vehicles }) {

  const [selectedType, setSelectedType] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(null);

  // Database eken ena vehicles walin
  // unique vehicle types tika gannawa
  const vehicleTypes = [
    ...new Set(
      (vehicles || [])
        .map((vehicle) => vehicle.type)
        .filter(Boolean)
    )
  ];

  // Search button
  const handleSearch = (e) => {

    e.preventDefault();

    // All Vehicle Types select karala nam
    // vehicles okkoma pennanawa
    if (selectedType === "") {
      setFilteredVehicles(null);
      return;
    }

    // Selected type ekata adala vehicles filter karanawa
    const results = vehicles.filter(
      (vehicle) =>
        vehicle.type === selectedType
    );

    setFilteredVehicles(results);
  };


  // Clear search
  const handleClearSearch = () => {

    setSelectedType("");
    setFilteredVehicles(null);

  };


  // Display karana vehicles
  const displayedVehicles =
    filteredVehicles !== null
      ? filteredVehicles
      : vehicles;


  return (
    <>

      {/* ================================= */}
      {/* INTRODUCTION SECTION */}
      {/* ================================= */}

      <section
        className="rental-intro-section"
        id="about"
      >

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

      <section
        className="vehicle-section"
        id="vehicles"
      >

        <div className="vehicle-section-container">


          {/* ================================= */}
          {/* SEARCH AREA */}
          {/* ================================= */}

          <div className="vehicle-search-box">

            <div className="vehicle-search-title">

              <div className="vehicle-search-icon">

                <img
                  src="/img/icons8-car-100.png"
                  alt="Car"
                />

              </div>

              <div>

                <span>
                  FIND YOUR VEHICLE
                </span>

                <h2>
                  Search Cars
                </h2>

              </div>

            </div>


            <form
              className="vehicle-search-form"
              onSubmit={handleSearch}
            >

              {/* VEHICLE TYPE DROPDOWN */}

              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value)
                }
                className="vehicle-type-select"
              >

                <option value="">
                  All Vehicle Types
                </option>

                {vehicleTypes.map((type) => (

                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>

                ))}

              </select>


              {/* SEARCH */}

              <button type="submit">
                Search
              </button>


              {/* CLEAR */}

              {filteredVehicles !== null && (

                <button
                  type="button"
                  className="vehicle-clear-search"
                  onClick={handleClearSearch}
                >
                  Clear
                </button>

              )}

            </form>

          </div>


          {/* ================================= */}
          {/* VEHICLE LIST HEADER */}
          {/* ================================= */}

          <div className="vehicle-list-header">

            <div>

              <span className="vehicle-list-small-title">
                OUR FLEET
              </span>

              <h2>

                {filteredVehicles !== null
                  ? `${selectedType} Vehicles`
                  : "Choose Your Vehicle"
                }

              </h2>

            </div>


            <div className="vehicle-count">

              {displayedVehicles?.length || 0}

              {(displayedVehicles?.length || 0) === 1
                ? " Vehicle Available"
                : " Vehicles Available"
              }

            </div>

          </div>


          {/* ================================= */}
          {/* VEHICLE CARDS */}
          {/* ================================= */}

          {displayedVehicles &&
          displayedVehicles.length > 0 ? (

            <div className="vehicle-card-grid">

              {displayedVehicles.map((vehicle) => (

                <CarCard
                  key={vehicle.vehicleId}
                  vehicle={vehicle}
                />

              ))}

            </div>

          ) : (

            <div className="no-vehicles-message">

              No vehicles available for the selected type.

            </div>

          )}

        </div>

      </section>

    </>
  );
}

export default MainPagesBody;