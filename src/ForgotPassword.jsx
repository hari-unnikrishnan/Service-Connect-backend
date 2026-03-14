import React, { useState } from "react";
import "./ForgotPassword.css";
import { ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react";
import { requestPasswordReset } from "./api";

export default function ForgotPassword({ onNavigateToLogin, onNavigateToVerifyOtp, setUserId }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!email && !phone) {
      setError("Please enter email or phone number");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = await requestPasswordReset(email || null, phone || null);
      
      if (data.success) {
        setSuccessMessage("OTP sent successfully!");
        // Store user ID for next step
        if (data.user_id) {
          localStorage.setItem("password_reset_user_id", data.user_id);
          if (setUserId) setUserId(data.user_id);
        }
        // Show OTP for demo (in production, sent via SMS/email)
        alert(`OTP: ${data.otp}`);
        // Navigate to verify OTP
        setTimeout(() => {
          onNavigateToVerifyOtp();
        }, 1000);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="forgot-wrapper">
      <div className="forgot-box">

        <div className="forgot-header">
            <button
                className="forgot-back-btn"
                onClick={onNavigateToLogin}
                >
                <ArrowLeft size={24} />
            </button>
          <h1 className="forgot-title">FORGOT PASSWORD</h1>
        </div>

        <div className="forgot-content">

          <p className="forgot-description">
            Enter your registered email or phone number to receive a OTP to reset your password
          </p>

        {error && <p style={{color: 'red', fontSize: '12px', marginBottom: '10px'}}>{error}</p>}
        {successMessage && <p style={{color: 'green', fontSize: '12px', marginBottom: '10px'}}>{successMessage}</p>}

          <div className="forgot-input-row">
            <Mail size={18} />
            <input 
              type="text" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="forgot-input-row">
            <Phone size={18} />
            <input 
              type="text" 
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button 
            className="forgot-submit-btn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="forgot-Continue-text"  >{loading ? "Sending..." : "Continue"}</span>
            <div className="forgot-arrow-circle">
              <ArrowRight size={24} />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}