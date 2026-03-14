import React, { useState, useEffect } from "react";
import "./OTPVerification.css";
import { ArrowLeft, ArrowRight, Delete } from "lucide-react";
import { verifyOTP, resendOTP } from "./api";

export default function OTPVerification({
  onNavigateToLogin,
  onNavigateToLocation,
  userId
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(59);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get userId from localStorage if not passed as prop
  const storedUserId = userId || localStorage.getItem("registration_user_id");

  const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  // keyboard typing
  const handleKeyDown = (e) => {
    const key = e.key;

    if (!isNaN(key) && key !== " ") {
      addDigit(key);
    }

    if (key === "Backspace") {
      removeDigit();
    }
  };

  // add digit
  const addDigit = (digit) => {
    const newOtp = [...otp];
    const emptyIndex = newOtp.findIndex((item) => item === "");

    if (emptyIndex !== -1) {
      newOtp[emptyIndex] = digit;
      setOtp(newOtp);
    }
  };

  // remove digit
  const removeDigit = () => {
    const newOtp = [...otp];
    const lastFilledIndex = newOtp.findLastIndex((item) => item !== "");

    if (lastFilledIndex !== -1) {
      newOtp[lastFilledIndex] = "";
      setOtp(newOtp);
    }
  };

  // keypad click
  const handleKeypadClick = (value) => {
    if (value === "") return;

    if (value === "⌫") {
      removeDigit();
    } else {
      addDigit(value);
    }
  };

  // timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // verify
  const handleVerify = async () => {
    const otpString = otp.join("");

      // Manual OTP for testing
      if (otpString === "1234") {
        onNavigateToLocation();
        return;
      }
        
    if (!storedUserId) {
      setError("User ID not found. Please register again.");
      return;
    }

    if (otpString.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await verifyOTP(parseInt(storedUserId), otpString);
      
      if (data.success) {
        // Clear stored user ID after successful verification
        localStorage.removeItem("registration_user_id");
        // Navigate to location after short delay
        setTimeout(() => {
          onNavigateToLocation();
        }, 500);
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!storedUserId) {
      setError("User ID not found. Please register again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await resendOTP(parseInt(storedUserId));
      
      if (data.success) {
        setResendTimer(59);
        // For demo purposes, show OTP (in production, it would be sent via SMS)
        alert(`OTP: ${data.otp}`);
      } else {
        setError(data.error || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="otp-screen-wrapper"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <div className="otp-screen-box">

        <div className="otp-header-bar">
          <button className="otp-back-button" onClick={onNavigateToLogin}>   
            <ArrowLeft size={28} />
          </button>

          <h1 className="otp-title-text">OTP VERIFICATION</h1>
        </div>

        {error && <p className="otp-error-text" style={{color: 'red', marginBottom: '10px'}}>{error}</p>}

        <p className="otp-message-text">
          Code has been sent to your registered email
        </p>

        <div className="otp-box-row">
          {otp.map((digit, index) => (
            <div key={index} className="otp-digit-box">
              {digit ? "*" : ""}
            </div>
          ))}
        </div>

        <p className="otp-timer-text">
          {resendTimer > 0 ? (
            <>Resend Code in <span>{resendTimer}s</span></>
          ) : (
            <span 
              style={{cursor: 'pointer', color: '#007bff'}} 
              onClick={handleResend}
            >
              Resend OTP
            </span>
          )}
        </p>

        <button
          className="otp-submit-button"
          onClick={handleVerify}
          disabled={loading || otp.join("").length < 4}
        >
          <span className="Verify-text">{loading ? "Verifying..." : "Verify"}</span>

          <div className="otp-arrow-circle">
            <ArrowRight size={28} />
          </div>
        </button>

        <div className="otp-keypad-grid">
          {keypad.map((item, index) => (
            <button
              key={index}
              className="otp-keypad-key"
              onClick={() => handleKeypadClick(item)}
              disabled={item === ""}
            >
              {item === "⌫" ? <Delete size={24} /> : item}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}