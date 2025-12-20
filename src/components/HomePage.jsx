import React from "react";
import HomeCarousel from "./HomeCarousel";
import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      <HomeNavbar />
      <HomeCarousel />
      

      {/* Content Section */}
      <div style={{textAlign: "center",padding: "40px 20px",maxWidth: "1000px",margin: "0 auto",}}>
          {/* Heading */}
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Trusted Car Rental Service in Sri Lanka</h2>

          {/* Paragraph */}
          <p style={{fontSize: "20px",lineHeight: "1.8",color: "#555",}}>
            With over 10 years of experience in the industry, we strive to offer the
            highest levels of customer service and a highly personalised service to
            all our customers who are on the lookout for Sri Lanka car rental
            opportunities. With one of the largest and most modern and varied fleets
            in Sri Lanka, our service is backed by a networked front office,
            fully-fledged mechanical servicing and valet servicing onsite.
          </p>

          {/* Image */}
          <img src="/img/icons8-car-100.png"alt="Car rental icon"style={{width: "120px",height: "120px",objectFit: "contain",marginTop: "30px",}}/>
      </div>

      <nav className="navbar" style={{ backgroundColor: "#ffa500", borderRadius: "10px", margin: "10px auto",  width: "calc(100% - 80px)"}} >
          <img src="/img/icons8-car-100.png" alt="car icon" style={{ width: "50px", height: "50px", marginLeft: "20px" }} />

          <h1 style={{color: "white"}}>Search Cars here...!</h1>

          <div style={{marginRight: "20px"}}>
            <form className="d-flex" role="search">
              <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Select car type..."
                  style={{ minWidth: "500px" }}
              />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </div>
      </nav>
      <Footer/>
    </>
  );
}

export default HomePage;
