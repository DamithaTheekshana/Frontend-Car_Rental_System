import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";

function MyBookingsPage() {

  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user) {
      return;
    }

    fetch(`http://localhost:8080/booking/userBookings/${user.userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        return response.json();
      })
      .then((data) => {
        console.log("My Bookings:", data);
        setBookings(data);
      })
      .catch((error) => {
        console.error("Booking Fetch Error:", error);
      });

  }, []);

  return (
    <>
      <HomeNavbar />

      <div style={{ padding: "40px" }}>
        <h2>My Bookings</h2>

        <p>Total Bookings: {bookings.length}</p>
      </div>
    </>
  );
}

export default MyBookingsPage;