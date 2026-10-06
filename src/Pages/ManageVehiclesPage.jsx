import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "./ManageVehiclesPage.css";

function ManageVehiclesPage() {

  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [updateVehicleImage, setUpdateVehicleImage] = useState(null);

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


  // ==========================================
  // GET ALL VEHICLES
  // ==========================================

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


  // ==========================================
  // ADD VEHICLE
  // ==========================================

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


  // ==========================================
  // DELETE VEHICLE
  // ==========================================

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


  // ==========================================
  // UPDATE VEHICLE
  // ==========================================

  const handleUpdateVehicle = async () => {

    try {

      const vehicleData = {
        vehicleId: editingVehicle.vehicleId,
        imagePath: editingVehicle.imagePath,
        model: editingVehicle.model,
        regNo: editingVehicle.regNo,
        brand: editingVehicle.brand,
        type: editingVehicle.type,
        fuelType: editingVehicle.fuelType,
        seat: Number(editingVehicle.seat),
        dailyRate: Number(editingVehicle.dailyRate)
      };

      const formData = new FormData();

      const vehicleBlob = new Blob(
        [JSON.stringify(vehicleData)],
        {
          type: "application/json"
        }
      );

      formData.append("vehicle", vehicleBlob);

      // New image selected nam witharak image eka yawanne
      if (updateVehicleImage) {
        formData.append("image", updateVehicleImage);
      }

      const response = await fetch(
        "http://localhost:8080/vehicle/updateVehicle",
        {
          method: "PUT",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vehicle");
      }

      alert("Vehicle updated successfully!");

      // New image ekak update kala nam page reload karanawa
      if (updateVehicleImage) {
        window.location.reload();
        return;
      }

      // Image eka change nokala nam reload nathuwa table eka update karanawa
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.vehicleId === editingVehicle.vehicleId
            ? { ...vehicle, ...vehicleData }
            : vehicle
        )
      );

      setEditingVehicle(null);
      setUpdateVehicleImage(null);

    } catch (error) {

      console.error("Update Vehicle Error:", error);
      alert("Failed to update vehicle!");

    }
  };


  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "40px 80px" }}>

        <h2>Manage Vehicles</h2>


        {/* ==========================================
            ADD VEHICLE BUTTON
        ========================================== */}

        <div
          style={{
            marginTop: "20px",
            marginBottom: "30px"
          }}
        >

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#198754",
              color: "white",
              border: "none",
              borderRadius: "7px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {showAddForm ? "Close Form" : "+ Add Vehicle"}
          </button>

        </div>


        {/* ==========================================
            ADD VEHICLE FORM
        ========================================== */}

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

            <h3 style={{ marginBottom: "20px" }}>
              Add New Vehicle
            </h3>

            <div
              style={{
                display: "grid",
                gap: "15px"
              }}
            >

              <input
                type="text"
                placeholder="Vehicle Model"
                value={newVehicle.model}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    model: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Registration Number"
                value={newVehicle.regNo}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    regNo: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Brand"
                value={newVehicle.brand}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    brand: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Vehicle Type"
                value={newVehicle.type}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    type: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Fuel Type"
                value={newVehicle.fuelType}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    fuelType: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Number of Seats"
                value={newVehicle.seat}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    seat: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Daily Rate"
                value={newVehicle.dailyRate}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    dailyRate: e.target.value
                  })
                }
              />

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "5px"
                  }}
                >
                  Vehicle Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setVehicleImage(e.target.files[0])
                  }
                />

              </div>

              <button
                onClick={handleAddVehicle}
                type="button"
                style={{
                  padding: "11px",
                  backgroundColor: "#198754",
                  color: "white",
                  border: "none",
                  borderRadius: "7px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Save Vehicle
              </button>

            </div>

          </div>

        )}


        {/* ==========================================
            TOTAL VEHICLES
        ========================================== */}

        <p>
          Total Vehicles: {vehicles.length}
        </p>


        {/* ==========================================
            UPDATE VEHICLE FORM
        ========================================== */}

        {editingVehicle && (

          <div
            style={{
              maxWidth: "700px",
              padding: "25px",
              marginTop: "30px",
              marginBottom: "30px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
            }}
          >

            <h3 style={{ marginBottom: "20px" }}>
              Update Vehicle
            </h3>

            <div
              style={{
                display: "grid",
                gap: "15px"
              }}
            >

              <input
                type="text"
                placeholder="Vehicle Model"
                value={editingVehicle.model}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    model: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Registration Number"
                value={editingVehicle.regNo}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    regNo: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Brand"
                value={editingVehicle.brand}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    brand: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Vehicle Type"
                value={editingVehicle.type}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    type: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Fuel Type"
                value={editingVehicle.fuelType}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    fuelType: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Number of Seats"
                value={editingVehicle.seat}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    seat: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Daily Rate"
                value={editingVehicle.dailyRate}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    dailyRate: e.target.value
                  })
                }
              />

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "5px"
                  }}
                >
                  Change Vehicle Image (Optional)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setUpdateVehicleImage(e.target.files[0])
                  }
                />

              </div>


              <div
                style={{
                  display: "flex",
                  gap: "10px"
                }}
              >

                <button
                  onClick={handleUpdateVehicle}
                  type="button"
                  style={{
                    flex: 1,
                    padding: "11px",
                    backgroundColor: "#0d6efd",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  Update Vehicle
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingVehicle(null);
                    setUpdateVehicleImage(null);
                  }}
                  style={{
                    flex: 1,
                    padding: "11px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )}


        {/* ==========================================
            VEHICLE TABLE
        ========================================== */}

        {vehicles.length === 0 ? (

          <div className="vehicles-no-data">
            No vehicles available.
          </div>

        ) : (

          <div className="vehicles-table-wrapper">

            <table className="vehicles-table">

              <thead>

                <tr>
                  <th>Vehicle</th>
                  <th>Registration No</th>
                  <th>Brand</th>
                  <th>Type</th>
                  <th>Fuel Type</th>
                  <th>Seats</th>
                  <th>Daily Rate</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {vehicles.map((vehicle) => (

                  <tr key={vehicle.vehicleId}>

                    {/* Vehicle Image + Model */}

                    <td>

                      <div className="vehicles-table-vehicle">

                        <img
                          src={`http://localhost:8080/uploads/${vehicle.imagePath}`}
                          alt={vehicle.model}
                          className="vehicles-table-image"
                        />

                        <span className="vehicles-table-model">
                          {vehicle.model}
                        </span>

                      </div>

                    </td>


                    {/* Registration Number */}

                    <td>
                      {vehicle.regNo}
                    </td>


                    {/* Brand */}

                    <td>
                      {vehicle.brand}
                    </td>


                    {/* Type */}

                    <td>
                      {vehicle.type}
                    </td>


                    {/* Fuel Type */}

                    <td>
                      {vehicle.fuelType}
                    </td>


                    {/* Seats */}

                    <td>
                      {vehicle.seat}
                    </td>


                    {/* Daily Rate */}

                    <td className="vehicles-table-rate">
                      Rs. {vehicle.dailyRate}
                    </td>


                    {/* Status */}

                    <td>

                      <span
                        className={`vehicles-status-badge ${
                          vehicle.status === "AVAILABLE"
                            ? "vehicles-available"
                            : "vehicles-booked"
                        }`}
                      >
                        {vehicle.status}
                      </span>

                    </td>


                    {/* Action */}

                    <td>

                      <div className="vehicles-table-actions">

                        <button
                          onClick={() => {
                            setEditingVehicle(vehicle);
                            setUpdateVehicleImage(null);
                          }}
                          className="vehicles-edit-btn"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteVehicle(vehicle.vehicleId)
                          }
                          className="vehicles-delete-btn"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>
  );
}

export default ManageVehiclesPage;