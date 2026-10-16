import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

  return (
    <footer className="main-footer">

      <div className="footer-overlay">

        <div className="footer-container">


          {/* ================================= */}
          {/* BRAND SECTION */}
          {/* ================================= */}

          <div className="footer-brand">

            <img
              src="/img/The trip key.png"
              alt="The Trip Key"
              className="footer-logo"
            />

            <h2>THE TRIP KEY</h2>

            <span className="footer-brand-subtitle">
              CAR RENT SERVICE
            </span>

            <p className="footer-description">
              Reliable and comfortable vehicle rental services
              for your journey across Sri Lanka.
            </p>

          </div>


          {/* ================================= */}
          {/* QUICK LINKS */}
          {/* ================================= */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <div className="footer-title-line"></div>

            <div className="footer-links">

              <Link to="/">
                <span>›</span>
                Home
              </Link>

              <a href="/#vehicles">
                <span>›</span>
                Vehicles
              </a>

              <a href="/#about">
                <span>›</span>
                About Us
              </a>

              <a href="#contact">
                <span>›</span>
                Contact Us
              </a>

            </div>

          </div>


          {/* ================================= */}
          {/* CONTACT */}
          {/* ================================= */}

          <div
            className="footer-column footer-contact"
            id="contact"
          >

            <h3>Contact Us</h3>

            <div className="footer-title-line"></div>


            {/* ADDRESS */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <span>⌖</span>
              </div>

              <div>
                <span className="footer-contact-label">
                  Address
                </span>

                <p>
                  No 222A, Galle Road,<br />
                  Panadura, Sri Lanka
                </p>
              </div>

            </div>


            {/* EMAIL */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <span>✉</span>
              </div>

              <div>
                <span className="footer-contact-label">
                  Email
                </span>

                <p>
                  thetripkey@gmail.com
                </p>
              </div>

            </div>


            {/* PHONE */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <span>☎</span>
              </div>

              <div>
                <span className="footer-contact-label">
                  Phone
                </span>

                <p>
                  +94 70 123 4 567
                </p>
              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* SOCIAL MEDIA */}
          {/* ================================= */}

          <div className="footer-column footer-social-column">

            <h3>Follow Us</h3>

            <div className="footer-title-line"></div>

            <p className="footer-social-text">
              Follow us on social media for vehicle updates,
              offers and latest news.
            </p>


            <div className="footer-social-icons">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img
                  src="/img/icons8-facebook-logo-50.png"
                  alt="Facebook"
                />
              </a>


              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <img
                  src="/img/icons8-youtube-logo-48.png"
                  alt="YouTube"
                />
              </a>


              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="/img/icons8-instagram-logo-50.png"
                  alt="Instagram"
                />
              </a>


              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <img
                  src="/img/icons8-twitter-logo-50.png"
                  alt="Twitter"
                />
              </a>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* BOTTOM BAR */}
        {/* ================================= */}

        <div className="footer-bottom">

          <p>
            © 2026 The Trip Key. All Rights Reserved.
          </p>

          <p>
            Car Rental Service • Sri Lanka
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;