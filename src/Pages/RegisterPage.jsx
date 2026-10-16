import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nic, setNic] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  // =====================================
  // REGISTER
  // =====================================

  const handleRegister = async (e) => {

    e.preventDefault();

    setErrorMessage("");

    const userData = {
      fullName,
      email,
      password,
      phoneNumber,
      nic,
      role: "CUSTOMER"
    };

    console.log("Register Data:", userData);

    try {

      setRegistering(true);

      const response = await fetch(
        "http://localhost:8080/user/userregister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      console.log("Registration Success:", data);

      alert("Registration successful!");

      navigate("/loginpage");

    } catch (error) {

      console.error("Registration Error:", error);

      setErrorMessage(
        "Registration failed. Please check your details and try again."
      );

    } finally {

      setRegistering(false);

    }
  };


  return (
    <>

      <HomeNavbar />


      <main className="register-page">

        <div className="register-container">


          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="register-welcome-section">

            <div className="register-welcome-overlay"></div>


            <div className="register-welcome-content">

              <img
                src="/img/The trip key.png"
                alt="The Trip Key"
                className="register-brand-logo"
              />


              <span className="register-small-title">
                THE TRIP KEY
              </span>


              <h1>
                Start Your
                <span> Journey Today.</span>
              </h1>


              <p>
                Create your account and discover a simple,
                reliable and comfortable way to rent vehicles
                for your journey across Sri Lanka.
              </p>


              <div className="register-feature-list">

                <div className="register-feature-item">

                  <span>✓</span>

                  <p>
                    Explore our modern vehicle fleet
                  </p>

                </div>


                <div className="register-feature-item">

                  <span>✓</span>

                  <p>
                    Book vehicles quickly and easily
                  </p>

                </div>


                <div className="register-feature-item">

                  <span>✓</span>

                  <p>
                    Manage bookings and payments
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

          <div className="register-form-section">

            <div className="register-form-container">


              {/* HEADER */}

              <div className="register-form-header">

                <div className="register-form-icon">

                  <img
                    src="/img/icons8-car-100.png"
                    alt="Car"
                  />

                </div>


                <span>
                  CREATE ACCOUNT
                </span>


                <h2>
                  Join The Trip Key
                </h2>


                <p>
                  Enter your details to create your customer account.
                </p>

              </div>


              {/* ERROR */}

              {errorMessage && (

                <div className="register-error-message">

                  <span>!</span>

                  {errorMessage}

                </div>

              )}


              {/* ================================= */}
              {/* REGISTER FORM */}
              {/* ================================= */}

              <form
                className="register-form"
                onSubmit={handleRegister}
              >


                {/* FULL NAME */}

                <div className="register-form-group">

                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <div className="register-input-wrapper">

                    <span className="register-input-icon">
                      ●
                    </span>

                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div className="register-form-group">

                  <label htmlFor="registerEmail">
                    Email Address
                  </label>

                  <div className="register-input-wrapper">

                    <span className="register-input-icon">
                      ✉
                    </span>

                    <input
                      id="registerEmail"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div className="register-form-group">

                  <label htmlFor="registerPassword">
                    Password
                  </label>

                  <div className="register-input-wrapper">

                    <span className="register-input-icon">
                      ●
                    </span>

                    <input
                      id="registerPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                    />


                    <button
                      type="button"
                      className="register-show-password"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"
                      }
                    </button>

                  </div>

                </div>


                {/* PHONE + NIC ROW */}

                <div className="register-form-row">


                  {/* PHONE */}

                  <div className="register-form-group">

                    <label htmlFor="phoneNumber">
                      Phone Number
                    </label>

                    <div className="register-input-wrapper">

                      <span className="register-input-icon">
                        ☎
                      </span>

                      <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="07X XXX XXXX"
                        value={phoneNumber}
                        onChange={(e) =>
                          setPhoneNumber(e.target.value)
                        }
                        required
                      />

                    </div>

                  </div>


                  {/* NIC */}

                  <div className="register-form-group">

                    <label htmlFor="nic">
                      NIC Number
                    </label>

                    <div className="register-input-wrapper">

                      <span className="register-input-icon">
                        #
                      </span>

                      <input
                        id="nic"
                        type="text"
                        placeholder="Enter NIC"
                        value={nic}
                        onChange={(e) =>
                          setNic(e.target.value)
                        }
                        required
                      />

                    </div>

                  </div>

                </div>


                {/* REGISTER BUTTON */}

                <button
                  type="submit"
                  className="main-register-button"
                  disabled={registering}
                >

                  {registering
                    ? "Creating Account..."
                    : "Create Account"
                  }

                  {!registering && (
                    <span>→</span>
                  )}

                </button>

              </form>


              {/* LOGIN LINK */}

              <div className="register-login-section">

                <span>
                  Already have an account?
                </span>

                <Link to="/loginpage">
                  Sign In
                </Link>

              </div>


              {/* SECURITY */}

              <div className="register-security-message">

                <span>✓</span>

                <p>
                  Your account information is securely protected
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </>
  );
}

export default RegisterPage;