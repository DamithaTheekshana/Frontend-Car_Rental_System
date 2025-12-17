import React from 'react'

function HomeCarousel() {
  return (
    <>
      <div
            id="carouselExample"
            className="carousel slide position-relative"
            data-bs-ride="carousel"
            data-bs-interval="3000" // 3 seconds per slide
            >
            {/* Indicators */}
            <div className="carousel-indicators">
                <button
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
                ></button>
                <button
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to="1"
                aria-label="Slide 2"
                ></button>
                <button
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                ></button>
            </div>

            {/* Carousel images */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="\img\istockphoto-1344954298-612x612.jpg"className="d-block w-100"alt="Slide 1"style={{ height: "70vh", objectFit: "cover" }}/>
                </div>
                <div className="carousel-item">
                    <img src="\img\istockphoto-1331273789-612x612.jpg"className="d-block w-100"alt="Slide 2"style={{ height: "70vh", objectFit: "cover" }}/>
                </div>
                <div className="carousel-item">
                    <img src="\img\istockphoto-1644775768-612x612.jpg"className="d-block w-100"alt="Slide 3"style={{ height: "70vh", objectFit: "cover" }}/>
                </div>
            </div>

            {/* 🔥 Fixed Center Text Overlay */}
            <div className="position-absolute top-50 start-50 translate-middle text-center text-white" style={{ padding: "20px 40px", marginTop: "120px"}}>
                <h1 style={{background: "rgba(0,0,0,0.4)",
                        borderRadius: "10px",
                    fontSize: "4rem",
                    fontWeight: "650",
                    }}
                >
                    <span style={{ color: "#F48B0B" }}>WELCOME</span> TO THE TRIP KEY
                </h1>
                <img
                    src="/img/The trip key.png"
                    alt="Logo"
                    style={{
                        display: "block",
                        margin: "0 auto 10px auto", // top: auto, bottom: 10px spacing
                        maxHeight: "150px", // image size adjust
                    }}
                />
                <br></br>
                <h5 >Premier Car Rental Services in Sri Lanka</h5>

                
            </div>
            

            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

        

        
    </>
  ) 
}

export default HomeCarousel
