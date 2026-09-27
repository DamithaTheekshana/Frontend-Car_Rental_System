import React from "react";
import AdminNavbar from "../components/AdminNavbar";

function ManageVehiclesPage() {

  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "40px 80px" }}>
        <h2>Manage Vehicles</h2>

        <p>
          Add, update and delete vehicles from here.
        </p>
      </div>
    </>
  );
}

export default ManageVehiclesPage;