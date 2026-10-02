import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function ManageVehiclesPage() {

  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
  model: "",
  regNo: "",
  brand: "",
  type: "",
  fuelType: "",
  seat: "",
  dailyRate: ""
});

const [vehicleImage, setVehicleImage] = useState(null);

  useEffect(() => {

    fetch("http://localhost:8080/vehicle/adminDisplayVehicles")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Admin Vehicles:", data);
        setVehicles(data);
      })
      .catch((error) => {
        console.error("Vehicle Fetch Error:", error);
      });

  }, []);

  const handleAddVehicle = async () => {

  try {

    if (!vehicleImage) {
      alert("Please select a vehicle image!");
      return;
    }

    const vehicleData = {
      model: newVehicle.model,
      regNo: newVehicle.regNo,
      brand: newVehicle.brand,
      type: newVehicle.type,
      fuelType: newVehicle.fuelType,
      seat: Number(newVehicle.seat),
      dailyRate: Number(newVehicle.dailyRate)
    };

    const formData = new FormData();

    const vehicleBlob = new Blob(
      [JSON.stringify(vehicleData)],
      {
        type: "application/json"
      }
    );

    formData.append("vehicle", vehicleBlob);
    formData.append("image", vehicleImage);

    const response = await fetch(
      "http://localhost:8080/vehicle/addVehicle",
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add vehicle");
    }

    alert("Vehicle added successfully!");

    window.location.reload();

  } catch (error) {

    console.error("Add Vehicle Error:", error);
    alert("Failed to add vehicle!");

  }
};

const handleDeleteVehicle = async (vehicleId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this vehicle?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:8080/vehicle/deleteVehicle/${vehicleId}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete vehicle");
    }

    alert("Vehicle deleted successfully!");

    setVehicles((prevVehicles) =>
      prevVehicles.filter(
        (vehicle) => vehicle.vehicleId !== vehicleId
      )
    );

  } catch (error) {

    console.error("Delete Vehicle Error:", error);
    alert("Failed to delete vehicle!");

  }
};

  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "40px 80px" }}>

        <h2>Manage Vehicles</h2>

        <div style={{ marginTop: "20px", marginBottom: "30px" }}>

            <button
                onClick={() => setShowAddForm(!showAddForm)}
                style={{padding: "10px 20px",backgroundColor: "#198754",color: "white",border: "none",borderRadius: "7px",fontWeight: "600",cursor: "pointer"}}>
                {showAddForm ? "Close Form" : "+ Add Vehicle"}
            </button>

        </div>

        {showAddForm && (
        <div
            style={{
            maxWidth: "700px",
            padding: "25px",
            marginBottom: "30px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
        >
            <h3 style={{ marginBottom: "20px" }}>Add New Vehicle</h3>

            <div style={{ display: "grid", gap: "15px" }}>

            <input type="text"placeholder="Vehicle Model"value={newVehicle.model}onChange={(e) =>setNewVehicle({ ...newVehicle, model: e.target.value })}/>

            <input type="text"placeholder="Registration Number"value={newVehicle.regNo}onChange={(e) =>setNewVehicle({ ...newVehicle, regNo: e.target.value })}/>

            <input type="text"placeholder="Brand"value={newVehicle.brand}onChange={(e) =>setNewVehicle({ ...newVehicle, brand: e.target.value })}/>

            <input type="text"placeholder="Vehicle Type"value={newVehicle.type}onChange={(e) =>setNewVehicle({ ...newVehicle, type: e.target.value })}/>

            <input type="text"placeholder="Fuel Type"value={newVehicle.fuelType}onChange={(e) =>setNewVehicle({ ...newVehicle, fuelType: e.target.value })}/>

            <input type="number"placeholder="Number of Seats"value={newVehicle.seat}onChange={(e) =>setNewVehicle({ ...newVehicle, seat: e.target.value })}/>

            <input type="number"placeholder="Daily Rate"value={newVehicle.dailyRate}onChange={(e) =>setNewVehicle({ ...newVehicle, dailyRate: e.target.value })}/>

            <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                Vehicle Image
                </label>

                <input type="file"accept="image/*"onChange={(e) => setVehicleImage(e.target.files[0])}/>
            </div>

            <button onClick={handleAddVehicle}
                type="button"style={{padding: "11px",backgroundColor: "#198754",color: "white",border: "none",borderRadius: "7px",fontWeight: "600",cursor: "pointer"}}>
                Save Vehicle
            </button>

            </div>
        </div>
        )}

        <p>Total Vehicles: {vehicles.length}</p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px"
          }}
        >

          {vehicles.map((vehicle) => (

            <div
              key={vehicle.vehicleId}
              style={{
                width: "300px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >

              <img
                src={`http://localhost:8080/uploads/${vehicle.imagePath}`}
                alt={vehicle.model}
                style={{
                  width: "100%",
                  height: "170px",
                  objectFit: "contain"
                }}
              />

              <h3 style={{ marginTop: "15px" }}>
                {vehicle.model}
              </h3>

              <p>
                <strong>Brand:</strong> {vehicle.brand}
              </p>

              <p>
                <strong>Registration No:</strong> {vehicle.regNo}
              </p>

              <p>
                <strong>Type:</strong> {vehicle.type}
              </p>

              <p>
                <strong>Fuel:</strong> {vehicle.fuelType}
              </p>

              <p>
                <strong>Seats:</strong> {vehicle.seat}
              </p>

              <p>
                <strong>Daily Rate:</strong> Rs. {vehicle.dailyRate}
              </p>

              <p>
                <strong>Status:</strong> {vehicle.status}
              </p>

              <button onClick={() => handleDeleteVehicle(vehicle.vehicleId)}style={{width: "100%",marginTop: "15px",padding: "10px",backgroundColor: "#dc3545",color: "white",border: "none",borderRadius: "7px",cursor: "pointer",fontWeight: "600"}}>
                Delete Vehicle
              </button>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default ManageVehiclesPage;