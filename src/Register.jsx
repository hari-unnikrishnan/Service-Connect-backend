import React, { useState } from "react";
import "./Register.css";
import google from "./assets/google.png";
import apple from "./assets/apple.png";
import logo2 from "./assets/logo2.png";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { register } from "./api";

export default function Register({
  onNavigateToLogin,
  onNavigateToOTP,
  setUserId
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await register({
        username: username,
        email: email,
        password: password,
        password_confirm: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        role: "customer"
      });

      // Store user_id, email, and phone for OTP verification
      if (setUserId) {
        setUserId(data.user_id);
      }
      localStorage.setItem("registration_user_id", data.user_id);
      localStorage.setItem("registration_email", email);
      localStorage.setItem("registration_phone", phone);
      localStorage.setItem("registration_email_backend", data.email_backend || "");
      // Show OTP for immediate verification (development aid)
      if (data.otp) {
        const isConsole = data.email_backend && data.email_backend.includes("console");
        if (isConsole) {
          alert(`Your OTP is: ${data.otp}\n\n(Development mode: emails are logged to the server console only. No real email was sent.)`);
        } else {
          alert(`Your OTP is: ${data.otp}\n\nAn email has been sent to your registered email.`);
        }
      }
      // Navigate to OTP
      onNavigateToOTP();
    } catch (err) {
      setError(err.message || "Connection error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-screen-wrapper">
      <div className="signup-screen-boxssv">

        

        <div className="signup-brand-rowvv">
          <img src={logo2} alt="logo2" className="signup-brand-image" />
          <h1 className="signup-brand-title">Service Connect</h1>
        </div>

        <div className="signup-heading-block">
          <h1>Getting Started.!</h1>
        </div>

        {error && (
          <div style={{color: 'red', marginBottom: '10px', fontSize: '14px'}}>
            {error}
          </div>
        )}

        <div className="signup-input-box">
          <input
            type="text"
            placeholder="Username *"
            className="signup-input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type="email"
            placeholder="Email *"
            className="signup-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type="text"
            placeholder="First Name"
            className="signup-input-field"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type="text"
            placeholder="Last Name"
            className="signup-input-field"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type="tel"
            placeholder="Phone Number"
            className="signup-input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="signup-input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password "
            className="signup-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="signup-visibility-toggle"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

       <div className="signup-input-box">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password "
          className="signup-input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="signup-visibility-toggle"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          type="button"
        >
          {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>

       {/* Login Navigation */}
        <div className="signup-terms-row" onClick={() => setAgreeTerms(!agreeTerms)}>
          <div className="signup-check-circle">
            {agreeTerms ? "✓" : ""}
          </div>
          <span>Agree to Terms & Conditions</span>
        </div>

        {/* Register → OTP */}
        <button 
          className="submit-btn" 
          onClick={handleRegister}
          disabled={loading}
        >
           <span className="login-text">{loading ? "Registering..." : "Sign Up"}</span>
         <div className="arrow-circle">
            <ArrowRight size={28} />
          </div>
        </button>

        <div className="signup-divider-label">Or Continue With</div>

        <div className="signup-social-group">
          <button className="signup-social-button">
            <img src={google} alt="google" className="signup-social-icon" />
          </button>
          <button className="signup-social-button"> <img src={apple} alt="apple" className="signup-social-icon" /></button>
        </div>

        {/* Login Navigation */}
        <p className="signup-footer-text">
          Already have an Account?{" "}
          <span
            onClick={onNavigateToLogin}
            style={{
              cursor: "pointer",
              color: "#007bff",
              textDecoration: "underline"
            }}
          >
            SIGN IN
          </span>
        </p>

      </div>
     </div>
  );
}

