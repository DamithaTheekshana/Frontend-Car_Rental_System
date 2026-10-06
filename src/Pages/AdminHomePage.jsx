import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import HomeCarousel from '../components/HomeCarousel'
import Footer from '../components/Footer'
import "./AdminHomePage.css";

function AdminHomePage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/booking/allBookings")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Admin Bookings:", data);
        setBookings(data);
      })
      .catch((error) => {
        console.error("Admin Booking Error:", error);
      });

  }, []);

  const handleUpdateStatus = async (bookingId, status) => {
    try {

      const response = await fetch(
        "http://localhost:8080/booking/update-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            bookingId: bookingId,
            status: status
          })
        }
      );

      if (!response.ok) {
        throw new Error("Status update failed");
      }

      alert(`Booking ${status.toLowerCase()} successfully!`);

      setBookings((prevBookings) =>
        prevBookings.filter(
          (booking) => booking.bookingId !== bookingId
        )
      );

    } catch (error) {
      console.error("Update Status Error:", error);
      alert("Status update failed!");
    }
  };


  return (
    <>
      <AdminNavbar />

      <HomeCarousel />

      <div className="admin-bookings-section">

        <h2 className="admin-bookings-title">
          Pending Booking Requests
        </h2>

        <p className="admin-bookings-count">
          Total Pending Bookings: {bookings.length}
        </p>


        {/* No Bookings */}
        {bookings.length === 0 ? (

          <div className="admin-no-bookings">
            No pending booking requests.
          </div>

        ) : (

          /* Booking Table */
          <div className="admin-bookings-table-wrapper">

            <table className="admin-bookings-table">

              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Customer</th>
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

                {bookings.map((booking) => (

                  <tr key={booking.bookingId}>

                    {/* Vehicle Image + Model */}
                    <td>
                      <div className="admin-table-vehicle">

                        <img
                          src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                          alt={booking.vehicleModel}
                          className="admin-table-vehicle-image"
                        />

                        <span className="admin-table-vehicle-model">
                          {booking.vehicleModel}
                        </span>

                      </div>
                    </td>


                    {/* Customer */}
                    <td>
                      {booking.customerName}
                    </td>


                    {/* Start Date */}
                    <td>
                      {booking.startDate}
                    </td>


                    {/* End Date */}
                    <td>
                      {booking.endDate}
                    </td>


                    {/* Total Days */}
                    <td>
                      {booking.totalDays}
                    </td>


                    {/* Daily Rate */}
                    <td>
                      Rs. {booking.dailyRate}
                    </td>


                    {/* Total Amount */}
                    <td className="admin-table-total">
                      Rs. {booking.totalAmount}
                    </td>


                    {/* Booking Status */}
                    <td>

                      <span
                        className={`admin-status-badge ${
                          booking.status === "APPROVED"
                            ? "admin-approved-badge"
                            : "admin-pending-badge"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </td>


                    {/* Payment Status */}
                    <td>

                      <span className="admin-payment-badge">
                        {booking.paymentStatus}
                      </span>

                    </td>


                    {/* Action Buttons */}
                    <td>

                      <div className="admin-table-actions">

                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              booking.bookingId,
                              "APPROVED"
                            )
                          }
                          className="admin-action-btn admin-approve-btn"
                        >
                          Approve
                        </button>


                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              booking.bookingId,
                              "REJECTED"
                            )
                          }
                          className="admin-action-btn admin-reject-btn"
                        >
                          Reject
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

      <Footer />

    </>
  );
}

export default AdminHomePage