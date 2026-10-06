import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./CustomerBookingHistoryPage.css";

function CustomerBookingHistoryPage() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (user?.userId) {
      fetchBookingHistory();
    } else {
      setLoading(false);
    }

  }, []);


  const fetchBookingHistory = async () => {

    try {

      const response = await fetch(
        `http://localhost:8080/booking-history/customer/${user.userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch booking history");
      }

      const data = await response.json();

      console.log("Customer Booking History:", data);

      setHistory(data);

    } catch (error) {

      console.error("Booking History Fetch Error:", error);

    } finally {

      setLoading(false);

    }
  };


  return (
    <>
      <HomeNavbar />

      <div className="customer-history-page">

        <h2 className="customer-history-title">
          My Booking History
        </h2>

        <p className="customer-history-subtitle">
          View your completed, cancelled and rejected bookings.
        </p>


        {loading ? (

          <div className="customer-history-message">
            Loading booking history...
          </div>

        ) : history.length === 0 ? (

          <div className="customer-history-message">
            No booking history available.
          </div>

        ) : (

          <div className="customer-history-table-wrapper">

            <table className="customer-history-table">

              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Booking Date</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>


              <tbody>

                {history.map((booking) => (

                  <tr key={booking.historyId}>

                    {/* Vehicle */}
                    <td>

                      <div className="customer-history-vehicle">

                        <img
                          src={`http://localhost:8080/uploads/${booking.vehicleImage}`}
                          alt={booking.vehicleModel}
                          className="customer-history-vehicle-image"
                        />

                        <span className="customer-history-vehicle-model">
                          {booking.vehicleModel || "-"}
                        </span>

                      </div>

                    </td>


                    {/* Booking Date */}
                    <td>
                      {booking.bookingDate
                        ? new Date(
                            booking.bookingDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>


                    {/* Start Date */}
                    <td>
                      {booking.startDate || "-"}
                    </td>


                    {/* End Date */}
                    <td>
                      {booking.endDate || "-"}
                    </td>


                    {/* Total */}
                    <td className="customer-history-total">
                      Rs. {Number(
                        booking.total
                      ).toLocaleString()}
                    </td>


                    {/* Status */}
                    <td>

                      <span
                        className={`customer-history-status ${
                          booking.status === "COMPLETED"
                            ? "customer-status-completed"
                            : booking.status === "REJECTED"
                            ? "customer-status-rejected"
                            : booking.status === "CANCELLED"
                            ? "customer-status-cancelled"
                            : "customer-status-default"
                        }`}
                      >
                        {booking.status}
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

export default CustomerBookingHistoryPage;