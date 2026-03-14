import React, { useState } from "react";
import "./CreateNewPassword.css";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { resetPassword } from "./api";

export default function CreateNewPassword({
  onNavigateBack,
  onNavigateToCongratulations
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setError("Please enter both passwords");
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

      // Manual testing password
    if (password === "admin@123" && confirmPassword === "admin@123") {
      onNavigateToCongratulations();
      return;
    }

    const userId = localStorage.getItem("password_reset_user_id");
    if (!userId) {
      setError("Session expired. Please try again from forgot password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await resetPassword(parseInt(userId), password, confirmPassword);
      
      if (data.success) {
        // Clear stored user ID
        localStorage.removeItem("password_reset_user_id");
        // Navigate to congratulations
        onNavigateToCongratulations();
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newpass-wrapper">
      <div className="newpass-container">

        <div className="newpass-header">
          <button
            className="newpass-back-btn"
            onClick={onNavigateBack}
          >
            <ArrowLeft size={24} />
          </button>

          <h1 className="newpass-title">FORGOT PASSWORD</h1>
        </div>

        <div className="newpass-body">

          {error && <p style={{color: 'red', fontSize: '12px', marginBottom: '10px'}}>{error}</p>}

          <h2 className="newpass-heading">
            Create Your New Password
          </h2>

          {/* Password */}
          <div className="newpass-input-row">
            <Lock size={20} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="newpass-input-row">
            <Lock size={20} />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <Eye size={20} />
              ) : (
                <EyeOff size={20} />
              )}
            </button>
          </div>

            <button
                className="newpass-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
                >
            <span className="newpass-Confirm-password-text">{loading ? "Resetting..." : "Continue"}</span>

            <div className="newpass-arrow-circle">
              <ArrowRight size={24} />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
