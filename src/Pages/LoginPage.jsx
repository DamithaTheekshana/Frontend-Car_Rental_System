import React from 'react'
import HomeNavbar from '../components/HomeNavbar'

function LoginPage() {
  return (
    <>
        <HomeNavbar/>
        <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "100vh",backgroundColor: "#f0f2f5",}}>
            <div style={{backgroundColor: "white",borderRadius: "12px",width: "500px",padding: "0 30px 30px 30px",boxShadow: "0 10px 25px rgba(0,0,0,0.2)",}}>
                    {/* Header */}
                    <div style={{marginTop: "10px",backgroundColor: "#ffa500",borderRadius: "12px",padding: "5px",textAlign: "center",color: "white",fontWeight: "bold",}}>
                    <img src="/img/icons8-car-100.png"alt="Car Icon"style={{ width: "40px", marginBottom: "5px" }}/>
                    <h2 style={{ margin: 0 }}>Welcome Back!</h2>
                    <p style={{ fontWeight: "normal", fontSize: "14px" }}>Enter your Credentials to access your account</p>
                    </div>

                    {/* Form */}
                    <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>

                    <label>Username</label>
                    <input type="text"placeholder="Enter your username"style={{padding: "10px",borderRadius: "6px",border: "1px solid #ccc",}}/>

                    <label>Password</label>
                    <input type="password"placeholder="Enter your password"style={{padding: "10px",borderRadius: "6px",border: "1px solid #ccc",}}/>

                    <button type="submit"style={{marginTop: "10px",padding: "10px",borderRadius: "6px",border: "none",backgroundColor: "#3e5b2b",color: "white",fontWeight: "bold",cursor: "pointer",}}>
                        Log-In
                    </button>
                    </form>

                    {/* Social Login */}
                    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button style={{display: "flex",alignItems: "center",justifyContent: "center",gap: "10px",padding: "10px",borderRadius: "6px",border: "1px solid #ccc",cursor: "pointer",backgroundColor: "white",}}>
                        <img src="/img/icons8-google-48.png" alt="Google" style={{ width: "20px" }} />
                        Sign in with Google
                    </button>

                    <button style={{display: "flex",alignItems: "center",justifyContent: "center",gap: "10px",padding: "10px",borderRadius: "6px",border: "1px solid #ccc",cursor: "pointer",backgroundColor: "white", }}>
                        <img src="/img/icons8-apple-48.png" alt="Apple" style={{ width: "20px" }} />
                        Sign in with Apple
                    </button>
                    </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage
