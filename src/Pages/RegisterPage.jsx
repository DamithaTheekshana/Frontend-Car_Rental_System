import React, { useState } from 'react'
import HomeNavbar from '../components/HomeNavbar'

function RegisterPage() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nic, setNic] = useState("");

  return (
    <>

        <HomeNavbar/>
        
        <div className="d-flex justify-content-center align-items-center"style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>

            <div style={{backgroundColor: "#fff",padding: "30px",borderRadius: "10px",width: "400px",boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",}}>
                {/* Header */}
                <div style={{ backgroundColor: "#ffa500",padding: "15px",borderRadius: "8px",textAlign: "center",color: "white",marginBottom: "20px",}}>
                    <img src="/img/icons8-car-100.png" alt="Car Icon" style={{ width: "40px", marginBottom: "5px" }}/>
                    <h3 style={{ margin: 0 }}>Welcome THE TRIP KEY</h3>
                    <small>Premier Car Rental Services in Sri Lanka</small>
                </div>

                {/* Form */}
                <form>
                    <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-control" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">ID Number</label>
                        <input type="text" className="form-control" placeholder="Enter your ID number" value={nic} onChange={(e) => setNic(e.target.value)}/>
                    </div>

                    <button type="button"className="btn"style={{backgroundColor: "#3b6a25",color: "white",width: "100%",marginBottom: "15px"}}>Sign-up</button>

                    {/* Social login */}
                    <div className="d-flex justify-content-between gap-2">

                        <button type="button"className="btn btn-light w-50"style={{ border: "1px solid #ccc" }}>
                        <img src="/img/icons8-google-48.png"alt="Google"style={{ width: "20px", marginRight: "5px" }}/>
                        Sign in with Google
                        </button>

                        <button type="button"className="btn btn-light w-50"style={{ border: "1px solid #ccc" }}>
                        <img src="/img/icons8-apple-48.png"alt="Apple"style={{ width: "20px", marginRight: "5px" }}/>
                        Sign in with Apple
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default RegisterPage
