import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  // =====================================
  // LOGIN
  // =====================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setErrorMessage("");

    const loginData = {
      email,
      password
    };

    console.log("Login Data:", loginData);

    try {

      setLoggingIn(true);

      const response = await fetch(
        "http://localhost:8080/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginData)
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      console.log("Login Success:", data);

      // Save logged user
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      // Redirect according to role
      if (data.role === "ADMIN") {

        navigate("/admin");

      } else {

        navigate("/");

      }

    } catch (error) {

      console.error("Login Error:", error);

      setErrorMessage(
        "Invalid email or password. Please try again."
      );

    } finally {

      setLoggingIn(false);

    }
  };


  return (
    <>

      <HomeNavbar />


      <main className="login-page">

        <div className="login-container">


          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="login-welcome-section">

            <div className="login-welcome-overlay"></div>


            <div className="login-welcome-content">

              <img
                src="/img/The trip key.png"
                alt="The Trip Key"
                className="login-brand-logo"
              />


              <span className="login-small-title">
                THE TRIP KEY
              </span>


              <h1>
                Your Journey
                <span> Starts Here.</span>
              </h1>


              <p>
                Sign in to manage your bookings,
                explore our vehicle fleet and enjoy
                a simple car rental experience.
              </p>


              <div className="login-feature-list">

                <div className="login-feature-item">

                  <span>✓</span>

                  <p>
                    Easy vehicle booking
                  </p>

                </div>


                <div className="login-feature-item">

                  <span>✓</span>

                  <p>
                    Manage your bookings
                  </p>

                </div>


                <div className="login-feature-item">

                  <span>✓</span>

                  <p>
                    View booking & payment history
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ================================= */}
          {/* RIGHT SIDE - LOGIN FORM */}
          {/* ================================= */}

          <div className="login-form-section">

            <div className="login-form-container">


              {/* FORM HEADER */}

              <div className="login-form-header">

                <div className="login-form-icon">

                  <img
                    src="/img/icons8-car-100.png"
                    alt="Car"
                  />

                </div>


                <span>
                  WELCOME BACK
                </span>


                <h2>
                  Sign in to your account
                </h2>


                <p>
                  Enter your email and password to continue.
                </p>

              </div>


              {/* ERROR MESSAGE */}

              {errorMessage && (

                <div className="login-error-message">

                  <span>!</span>

                  {errorMessage}

                </div>

              )}


              {/* LOGIN FORM */}

              <form
                className="login-form"
                onSubmit={handleLogin}
              >


                {/* EMAIL */}

                <div className="login-form-group">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <div className="login-input-wrapper">

                    <span className="login-input-icon">
                      ✉
                    </span>

                    <input
                      id="email"
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

                <div className="login-form-group">

                  <label htmlFor="password">
                    Password
                  </label>


                  <div className="login-input-wrapper">

                    <span className="login-input-icon">
                      ●
                    </span>

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                    />


                    <button
                      type="button"
                      className="show-password-button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"
                      }
                    </button>

                  </div>

                </div>


                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="main-login-button"
                  disabled={loggingIn}
                >

                  {loggingIn
                    ? "Signing In..."
                    : "Sign In"
                  }

                  {!loggingIn && (
                    <span>→</span>
                  )}

                </button>

              </form>


              {/* REGISTER */}

              <div className="login-register-section">

                <span>
                  Don't have an account?
                </span>

                <Link to="/register">
                  Create Account
                </Link>

              </div>


              {/* SECURITY MESSAGE */}

              <div className="login-security-message">

                <span>✓</span>

                <p>
                  Secure login for The Trip Key customers
                </p>

              </div>


            </div>

          </div>

        </div>

      </main>

    </>
  );
}

export default LoginPage;