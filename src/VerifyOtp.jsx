import React, { useState, useEffect } from "react";
import "./VerifyOtp.css";
import { ArrowLeft, ArrowRight, Delete } from "lucide-react";
import { verifyPasswordResetOTP } from "./api";

export default function VerifyOtp({
  onNavigateBack,
  onNavigateToCreateNewPassword,
  userId
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(59);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get userId from localStorage if not passed as prop
  const storedUserId = userId || localStorage.getItem("password_reset_user_id");

  const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "⌫"];

  // Keyboard input
  const handleKeyDown = (e) => {
    const key = e.key;

    if (!isNaN(key) && key !== " ") {
      addDigit(key);
    }

    if (key === "Backspace") {
      removeDigit();
    }
  };

  // Add digit
  const addDigit = (digit) => {
    const newOtp = [...otp];
    const emptyIndex = newOtp.findIndex((item) => item === "");

    if (emptyIndex !== -1) {
      newOtp[emptyIndex] = digit;
      setOtp(newOtp);
    }
  };

  // Remove digit
  const removeDigit = () => {
    const newOtp = [...otp];
    const lastFilledIndex = newOtp.findLastIndex((item) => item !== "");

    if (lastFilledIndex !== -1) {
      newOtp[lastFilledIndex] = "";
      setOtp(newOtp);
    }
  };

  // Keypad click
  const handleKeypadClick = (value) => {
    if (value === "⌫") {
      removeDigit();
    } else if (!isNaN(value)) {
      addDigit(value);
    }
  };

  // resendTimer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Handle verify
  const handleVerify = async () => {
    const otpString = otp.join("");

      // Manual OTP for testing
      if (otpString === "1234") {
        onNavigateToCreateNewPassword();
        return;
      }
    
    if (!storedUserId) {
      setError("User ID not found. Please try again.");
      return;
    }

    if (otpString.length < 4) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await verifyPasswordResetOTP(parseInt(storedUserId), otpString);
      
      if (data.success) {
        // Navigate to create new password
        onNavigateToCreateNewPassword();
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="verify-wrapper"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <div className="verify-container">

        <div className="verify-header">
            <button
                className="verify-back-btn"
                onClick={onNavigateBack}
            >
                <ArrowLeft size={24} />
            </button>
             <h1 className="otp-title-text">VERIFY FORGOT PASSWORD</h1>
        </div>

        <div className="verify-body">

          {error && <p style={{color: 'red', fontSize: '12px', marginBottom: '10px', textAlign: 'center'}}>{error}</p>}

          <p className="verify-text">
            Code has been Send to ( +1 ) ***-***-*529
          </p>

          <div className="otp-box-group">
            {otp.map((digit, index) => (
              <div
                key={index}
                className={`otp-single-box ${
                  index === otp.findIndex((d) => d === "")
                    ? "otp-active-box"
                    : ""
                }`}
              >
                {digit ? "*" : ""}
              </div>
            ))}
          </div>

            <p className="verify-resend">
                 Resend Code in <strong>{resendTimer}s</strong>
            </p>

          <button
                className="verify-btn"
                onClick={handleVerify}
                disabled={loading || otp.join("").length < 4}
                >
                <span className="Verify-otp-text">{loading ? "Verifying..." : "Verify"}</span>

                <div className="verify-arrow-circle">
                    <ArrowRight size={24} />
                </div>
            </button>

          <div className="verify-keypad">
            {keypad.map((key, index) => (
              <button
                key={index}
                className="verify-key"
                onClick={() => handleKeypadClick(key)}
              >
                {key === "⌫" ? <Delete size={24} /> : key}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
