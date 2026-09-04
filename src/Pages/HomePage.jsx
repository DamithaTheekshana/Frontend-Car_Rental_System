import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import HomeCarousel from '../components/HomeCarousel'
import MainPagesBody from '../components/MainPagesBody'
import Footer from '../components/Footer'
import { useEffect, useState } from "react";
import { getAllVehicles } from "../services/vehicleService";

function HomePage() {
  const [vehicles, setVehicles] = useState([]);
        useEffect(() => {
            console.log("HomePage loaded");

            getAllVehicles()
                .then((data) => {
                    console.log("Vehicle Data:", data);
                    setVehicles(data);
                })
                .catch((error) => {
                    console.error("Vehicle Error:", error);
                });
        }, []);
  return (
    <>
    <HomeNavbar/>
    <HomeCarousel/>
    <MainPagesBody vehicles={vehicles}/>
    <Footer/>
    </>
  )
}

export default HomePage
