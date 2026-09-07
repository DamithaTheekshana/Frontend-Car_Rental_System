import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CarCard({ vehicle }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  console.log("Image Path:", vehicle?.imagePath);

  const cardStyle = {
    background: "#9e9797",
    borderRadius: "20px",
    padding: "20px",
    width: "400px",
    color: "black",
    display: "flex",
    justifyContent: "space-between"
  };

  const leftStyle = {
    width: "65%"
  };

  const rightStyle = {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    fontSize: "20px"
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffb000",
    marginBottom: "10px"
  };

  const inputStyle = {
    width: "120px",
    padding: "6px",
    borderRadius: "5px",
    border: "none",
    fontSize: "15px"
  };

  const bookBtnStyle = {
    background: "#2bff00",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px"
  };

  const infoRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const handleBookNow = () => {
  if (!user) {
    navigate("/loginpage");
    return;
  }

  if (!fromDate || !toDate) {
    alert("Please select both From and To dates.");
    return;
  }

  console.log("Logged User:", user);
  console.log("Selected Vehicle:", vehicle);
  console.log("From Date:", fromDate);
  console.log("To Date:", toDate);
};

  return (
    <div style={cardStyle}>

      {/* LEFT SIDE */}
      <div style={leftStyle}>
        <h2 style={titleStyle}>{vehicle?.model}</h2>

        {/* Car Image */}
        <img
          src={`http://localhost:8080/uploads/${vehicle?.imagePath}`}
          alt={vehicle?.model}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        {/* Dates */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ width: "50%" }}>
            <p>From</p>
            <input type="date" style={inputStyle} value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>
          </div>
          <div style={{ width: "50%" }}>
            <p>To</p>
            <input type="date" style={inputStyle} value={toDate} onChange={(e) => setToDate(e.target.value)}/>
          </div>
        </div>

        <button style={bookBtnStyle} onClick={handleBookNow}>Book Now!!!</button>
      </div>

      {/* RIGHT SIDE */}
      <div style={rightStyle}>

        <div style={infoRowStyle}>
          <img src="/img/icons8-price-50.png" alt="price" width="25" />
          <span>{vehicle?.dailyRate}</span>
        </div>

        <div style={infoRowStyle}>
          <img src="/img/icons8-car-seat-50.png" alt="seat" width="25" />
          <span>{vehicle?.seat}</span>
        </div>

        <div style={infoRowStyle}>
          <img src="/img/icons8-brand-64.png" alt="brand" width="25" />
          <span>{vehicle?.brand}</span>
        </div>

        <div style={infoRowStyle}>
          <img src="/img/icons8-gas-station-48.png" alt="fuel" width="25" />
          <span>{vehicle?.fuelType}</span>
        </div>

        <div style={infoRowStyle}>
          <img src="/img/icons8-car-50.png" alt="type" width="25" />
          <span>{vehicle?.type}</span>
        </div>

      </div>
    </div>
  );
}

export default CarCard;
