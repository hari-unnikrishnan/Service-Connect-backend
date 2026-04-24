import React, { useState } from "react";
import "./Login.css";
import google from "./assets/google.png";
import apple from "./assets/apple.png";
import logo2 from "./assets/logo2.png";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { login } from "./api";

export default function Login({ onNavigateToRegister, onNavigateToOTP, onNavigateToForgotPassword, setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both username/email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);

      if (data.success) {
        // Store user data and token in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (setUser) setUser(data.user);
        // Navigate to Home on successful login
        onNavigateToOTP();
      } else {
        setError(data.non_field_errors?.[0] || data.detail || "Invalid username or password");
      }
    } catch (err) {
      setError(err.message || "Connection error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="logo-row">
          <img src={logo2} alt="logo" className="logo-img" />
          <h1 className="logo-title">Service Connect</h1>
        </div>

        <div className="login-header">
          <h1>Let's Sing In.!</h1>
          <p>Login to Your Account to Continue your Services</p>
        </div>

        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

        <div className="form-group">
          <input
            type="text"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="option-row">
          <div className="remember-box"></div>
          <label className="remember-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span>Remember Me</span>
          </label>
          <span
              className="forgot"
              onClick={onNavigateToForgotPassword}>
            Forgot Password?
          </span>
        </div>

       <button 
          className="submit-btn"
          onClick={handleLogin}
          disabled={loading}
        >
           <span className="login-text">{loading ? "Logging in..." : "Log In"}</span>

           <div className="arrow-circle">
             <ArrowRight size={28} />
           </div>
        </button>

        <div className="divider">Or Continue With</div>

        <div className="social-row">
          <button className="social-circle">
            <img src={google} alt="google" className="social-icon" />
          </button>

          <button className="social-circle">
            <img src={apple} alt="apple" className="social-icon" />
          </button>
        </div>

        <p className="signup-link">
          Don't have an Account? <span onClick={onNavigateToRegister} style={{cursor: 'pointer', color: '#007bff', textDecoration: 'underline'}}>SIGN UP</span>
        </p>

      </div>
    </div>
  );
}
