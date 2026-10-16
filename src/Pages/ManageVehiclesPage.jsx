import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "./ManageVehiclesPage.css";

function ManageVehiclesPage() {

  // ==========================================
  // STATES
  // ==========================================

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

        formData.append(
          "image",
          updateVehicleImage
        );

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


      // New image ekak update kala nam
      // page reload karanawa

      if (updateVehicleImage) {

        window.location.reload();

        return;

      }


      // Image eka change nokala nam
      // reload nathuwa table eka update karanawa

      setVehicles((prevVehicles) =>

        prevVehicles.map((vehicle) =>

          vehicle.vehicleId === editingVehicle.vehicleId

            ? {
                ...vehicle,
                ...vehicleData
              }

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

      {/* ========================================== */}
      {/* ADMIN NAVBAR */}
      {/* ========================================== */}

      <AdminNavbar />


      {/* ========================================== */}
      {/* PAGE */}
      {/* ========================================== */}

      <main className="manage-vehicles-page">


        {/* ========================================== */}
        {/* PAGE HEADER */}
        {/* ========================================== */}

        <div className="manage-vehicles-header">

          <div>

            <span className="manage-vehicles-small-title">
              VEHICLE MANAGEMENT
            </span>

            <h2>
              Manage Vehicles
            </h2>

            <p>
              Add, update and manage your rental vehicle fleet.
            </p>

          </div>


          <div className="manage-vehicles-total">

            <span>
              Total Vehicles
            </span>

            <strong>
              {vehicles.length}
            </strong>

          </div>

        </div>


        {/* ========================================== */}
        {/* ADD VEHICLE BUTTON */}
        {/* ========================================== */}

        <div className="manage-vehicles-add-area">

          <button

            type="button"

            onClick={() =>
              setShowAddForm(!showAddForm)
            }

            className={
              showAddForm
                ? "manage-close-form-btn"
                : "manage-add-vehicle-btn"
            }

          >

            {showAddForm
              ? "Close Form"
              : "+ Add Vehicle"
            }

          </button>

        </div>


        {/* ========================================== */}
        {/* ADD VEHICLE FORM */}
        {/* ========================================== */}

        {showAddForm && (

          <div className="vehicle-form-card">


            {/* FORM HEADER */}

            <div className="vehicle-form-header">

              <div>

                <span>
                  VEHICLE MANAGEMENT
                </span>

                <h3>
                  Add New Vehicle
                </h3>

                <p>
                  Enter the vehicle information below
                  to add a new vehicle to your fleet.
                </p>

              </div>


              <div className="vehicle-form-header-icon">

                <img
                  src="/img/icons8-car-100.png"
                  alt="Vehicle"
                />

              </div>

            </div>


            {/* FORM GRID */}

            <div className="vehicle-form-grid">


              {/* MODEL */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Model
                </label>

                <input

                  type="text"

                  placeholder="Enter vehicle model"

                  value={newVehicle.model}

                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      model: e.target.value
                    })
                  }

                />

              </div>


              {/* REGISTRATION NUMBER */}

              <div className="vehicle-form-group">

                <label>
                  Registration Number
                </label>

                <input

                  type="text"

                  placeholder="Enter registration number"

                  value={newVehicle.regNo}

                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      regNo: e.target.value
                    })
                  }

                />

              </div>


              {/* BRAND */}

              <div className="vehicle-form-group">

                <label>
                  Brand
                </label>

                <input

                  type="text"

                  placeholder="Enter vehicle brand"

                  value={newVehicle.brand}

                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      brand: e.target.value
                    })
                  }

                />

              </div>


              {/* VEHICLE TYPE */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Type
                </label>

                <input

                  type="text"

                  placeholder="Example: SUV, Sedan, Van"

                  value={newVehicle.type}

                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      type: e.target.value
                    })
                  }

                />

              </div>


              {/* FUEL TYPE */}

              <div className="vehicle-form-group">

                <label>
                  Fuel Type
                </label>

                <input

                  type="text"

                  placeholder="Example: Petrol, Diesel, Hybrid"

                  value={newVehicle.fuelType}

                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      fuelType: e.target.value
                    })
                  }

                />

              </div>


              {/* NUMBER OF SEATS */}

              <div className="vehicle-form-group">

                <label>
                  Number of Seats
                </label>

                <input

                  type="number"

                  placeholder="Enter number of seats"

                  value={newVehicle.seat}

                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      seat: e.target.value
                    })
                  }

                />

              </div>


              {/* DAILY RATE */}

              <div className="vehicle-form-group">

                <label>
                  Daily Rate (Rs.)
                </label>

                <input

                  type="number"

                  placeholder="Enter daily rental rate"

                  value={newVehicle.dailyRate}

                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      dailyRate: e.target.value
                    })
                  }

                />

              </div>


              {/* VEHICLE IMAGE */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Image
                </label>

                <input

                  type="file"

                  accept="image/*"

                  onChange={(e) =>
                    setVehicleImage(
                      e.target.files[0]
                    )
                  }

                />

              </div>


              {/* SAVE BUTTON */}

              <div className="vehicle-form-submit">

                <button

                  type="button"

                  onClick={handleAddVehicle}

                  className="vehicle-save-btn"

                >

                  Save Vehicle

                </button>

              </div>


            </div>

          </div>

        )}


        {/* ========================================== */}
        {/* UPDATE VEHICLE FORM */}
        {/* ========================================== */}

        {editingVehicle && (

          <div className="vehicle-form-card vehicle-update-form">


            {/* UPDATE HEADER */}

            <div className="vehicle-form-header">

              <div>

                <span>
                  VEHICLE MANAGEMENT
                </span>

                <h3>
                  Update Vehicle
                </h3>

                <p>
                  Edit the selected vehicle information
                  and save your changes.
                </p>

              </div>


              <div className="vehicle-form-header-icon">

                <img
                  src="/img/icons8-car-100.png"
                  alt="Vehicle"
                />

              </div>

            </div>


            {/* UPDATE FORM */}

            <div className="vehicle-form-grid">


              {/* MODEL */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Model
                </label>

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

              </div>


              {/* REGISTRATION NUMBER */}

              <div className="vehicle-form-group">

                <label>
                  Registration Number
                </label>

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

              </div>


              {/* BRAND */}

              <div className="vehicle-form-group">

                <label>
                  Brand
                </label>

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

              </div>


              {/* TYPE */}

              <div className="vehicle-form-group">

                <label>
                  Vehicle Type
                </label>

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

              </div>


              {/* FUEL TYPE */}

              <div className="vehicle-form-group">

                <label>
                  Fuel Type
                </label>

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

              </div>


              {/* SEATS */}

              <div className="vehicle-form-group">

                <label>
                  Number of Seats
                </label>

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

              </div>


              {/* DAILY RATE */}

              <div className="vehicle-form-group">

                <label>
                  Daily Rate (Rs.)
                </label>

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

              </div>


              {/* IMAGE */}

              <div className="vehicle-form-group">

                <label>
                  Change Vehicle Image
                  <span className="vehicle-optional-text">
                    {" "}(Optional)
                  </span>
                </label>

                <input

                  type="file"

                  accept="image/*"

                  onChange={(e) =>
                    setUpdateVehicleImage(
                      e.target.files[0]
                    )
                  }

                />

              </div>


              {/* UPDATE BUTTONS */}

              <div className="vehicle-form-submit vehicle-update-actions">

                <button

                  type="button"

                  onClick={handleUpdateVehicle}

                  className="vehicle-update-btn"

                >

                  Update Vehicle

                </button>


                <button

                  type="button"

                  onClick={() => {

                    setEditingVehicle(null);

                    setUpdateVehicleImage(null);

                  }}

                  className="vehicle-cancel-btn"

                >

                  Cancel

                </button>

              </div>


            </div>

          </div>

        )}


        {/* ========================================== */}
        {/* VEHICLE LIST HEADER */}
        {/* ========================================== */}

        <div className="vehicles-list-title">

          <div>

            <span>
              CURRENT FLEET
            </span>

            <h3>
              Vehicle List
            </h3>

          </div>


          <p>
            {vehicles.length}{" "}

            {vehicles.length === 1
              ? "Vehicle"
              : "Vehicles"
            }

          </p>

        </div>


        {/* ========================================== */}
        {/* VEHICLE TABLE */}
        {/* ========================================== */}

        {vehicles.length === 0 ? (

          <div className="vehicles-no-data">

            No vehicles available.

          </div>

        ) : (

          <div className="vehicles-table-wrapper">

            <table className="vehicles-table">


              {/* TABLE HEADER */}

              <thead>

                <tr>

                  <th>
                    Vehicle
                  </th>

                  <th>
                    Registration No
                  </th>

                  <th>
                    Brand
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Fuel Type
                  </th>

                  <th>
                    Seats
                  </th>

                  <th>
                    Daily Rate
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody>

                {vehicles.map((vehicle) => (

                  <tr key={vehicle.vehicleId}>


                    {/* VEHICLE IMAGE + MODEL */}

                    <td>

                      <div className="vehicles-table-vehicle">

                        <img

                          src={
                            `http://localhost:8080/uploads/${vehicle.imagePath}`
                          }

                          alt={vehicle.model}

                          className="vehicles-table-image"

                        />


                        <span className="vehicles-table-model">

                          {vehicle.model}

                        </span>

                      </div>

                    </td>


                    {/* REGISTRATION NUMBER */}

                    <td>

                      {vehicle.regNo}

                    </td>


                    {/* BRAND */}

                    <td>

                      {vehicle.brand}

                    </td>


                    {/* TYPE */}

                    <td>

                      {vehicle.type}

                    </td>


                    {/* FUEL TYPE */}

                    <td>

                      {vehicle.fuelType}

                    </td>


                    {/* SEATS */}

                    <td>

                      {vehicle.seat}

                    </td>


                    {/* DAILY RATE */}

                    <td className="vehicles-table-rate">

                      Rs.{" "}
                      {Number(
                        vehicle.dailyRate
                      ).toLocaleString()}

                    </td>


                    {/* STATUS */}

                    <td>

                      <span

                        className={
                          `vehicles-status-badge ${
                            vehicle.status === "AVAILABLE"

                              ? "vehicles-available"

                              : "vehicles-booked"
                          }`
                        }

                      >

                        {vehicle.status}

                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="vehicles-table-actions">


                        {/* EDIT */}

                        <button

                          type="button"

                          onClick={() => {

                            setEditingVehicle(vehicle);

                            setUpdateVehicleImage(null);

                            setShowAddForm(false);

                            setTimeout(() => {

                              window.scrollTo({
                                top: 150,
                                behavior: "smooth"
                              });

                            }, 50);

                          }}

                          className="vehicles-edit-btn"

                        >

                          Edit

                        </button>


                        {/* DELETE */}

                        <button

                          type="button"

                          onClick={() =>
                            handleDeleteVehicle(
                              vehicle.vehicleId
                            )
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


      </main>

    </>

  );

}

export default ManageVehiclesPage;