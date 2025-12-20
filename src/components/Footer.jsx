import React from "react";

function Footer() {

  const footerStyle = {
    backgroundImage: "url('/img/istockphoto-1468178137-612x612.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white"
  };

  const overlayStyle = {
    background: "rgba(0,0,0,0.75)",
    padding: "60px 80px",
    width: "100%"
  };

  const contentStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap"
  };

  const titleStyle = {
    borderBottom: "1px solid #aaa",
    paddingBottom: "5px",
    marginBottom: "15px",
    fontSize: "40px"
  };

  const socialStyle = {
    display: "flex",
    gap: "15px",
    marginTop: "15px"
  };

  const iconBoxStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textDecoration: "none"
  };

  const iconImgStyle = {
    width: "50px"
  };

  return (
    <footer style={footerStyle}>
      <div style={overlayStyle}>
        <div style={contentStyle}>

          {/* Logo */}
          <div>
            <img src="/img/The trip key.png" alt="The Trip Key" width="222" />
            <h3 style={{ margin: "10px 0 0 0" }}>THE TRIP KEY</h3>
            <p style={{ color: "#fbbf24", fontSize: "12px", letterSpacing: "2px" }}>
              CAR RENT SERVICE
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h4 style={titleStyle}>Important Links</h4> 
            <p style={{fontSize:"25px"}}>Home</p>
            <p style={{fontSize:"25px"}}>Vehicles</p>
            <p style={{fontSize:"25px"}}>About us</p>
            <p style={{fontSize:"25px"}}>Contact us</p>
          </div>

          {/* Contact */}
          <div>
            <h4 style={titleStyle}>CONTACT</h4>
            <p>No 222A, Gall Road, Panadura,<br />Sri Lanka</p>
            <p>Email - thetripkey@gmail.com</p>
            <p>Phone - +94 70 123 4 567</p>

            {/* Social icons with links */}
            <div style={socialStyle}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={iconBoxStyle}
              >
                <img src="/img/icons8-facebook-logo-50.png" alt="Facebook" style={iconImgStyle} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={iconBoxStyle}
              >
                <img src="/img/icons8-youtube-logo-48.png" alt="YouTube" style={iconImgStyle} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={iconBoxStyle}
              >
                <img src="/img/icons8-instagram-logo-50.png" alt="Instagram" style={iconImgStyle} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={iconBoxStyle}
              >
                <img src="/img/icons8-twitter-logo-50.png" alt="Twitter" style={iconImgStyle} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
