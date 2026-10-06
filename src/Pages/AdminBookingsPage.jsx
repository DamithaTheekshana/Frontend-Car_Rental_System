import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminBookingsPage.css";

function AdminBookingsPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {

      const response = await fetch(
        "http://localhost:8080/booking/adminBookings"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();

      console.log("Admin All Bookings:", data);

      setBookings(data);

    } catch (error) {

      console.error("Booking Fetch Error:", error);

    }
  };


  return (
    <>
      <AdminNavbar />

      <div className="admin-all-bookings-page">

        {/* Page Title */}
        <h2 className="admin-all-bookings-title">
          Booking Management
        </h2>


        {/* Total Bookings */}
        <p className="admin-all-bookings-count">
          Total Bookings: <strong>{bookings.length}</strong>
        </p>


        {/* No Bookings */}
        {bookings.length === 0 ? (

          <div className="admin-all-bookings-empty">
            No bookings available.
          </div>

        ) : (

          /* Booking Table */
          <div className="admin-all-bookings-table-wrapper">

            <table className="admin-all-bookings-table">

              <thead>

                <tr>
                  <th>Vehicle</th>
                  <th>Customer</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Days</th>
                  <th>Daily Rate</th>
                  <th>Total Amount</th>
                  <th>Booking Status</th>
                  <th>Payment Status</th>
                </tr>

              </thead>


              <tbody>

                {bookings.map((booking) => (

                  <tr key={booking.bookingId}>


                    {/* Vehicle Image + Model */}

                    <td>

                      <div className="admin-all-bookings-vehicle">

                        <img
                          src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                          alt={booking.vehicleModel}
                          className="admin-all-bookings-vehicle-image"
                        />

                        <span className="admin-all-bookings-vehicle-model">
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

                    <td className="admin-all-bookings-rate">
                      Rs. {booking.dailyRate}
                    </td>


                    {/* Total Amount */}

                    <td className="admin-all-bookings-total">
                      Rs. {booking.totalAmount}
                    </td>


                    {/* Booking Status */}

                    <td>

                      <span
                        className={`admin-all-bookings-status ${
                          booking.status === "PENDING"
                            ? "booking-status-pending"
                            : booking.status === "APPROVED"
                            ? "booking-status-approved"
                            : booking.status === "SUCCESS"
                            ? "booking-status-success"
                            : "booking-status-default"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </td>


                    {/* Payment Status */}

                    <td>

                      <span
                        className={`admin-all-bookings-payment ${
                          booking.paymentStatus === "PAID"
                            ? "booking-payment-paid"
                            : "booking-payment-unpaid"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>

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

export default AdminBookingsPage;