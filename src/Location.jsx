import React, { useState } from "react";
import "./Location.css";
import { ArrowLeft } from "lucide-react";
import { addLocation } from "./api";

export default function LocationUI({
  onNavigateToOTPVerification,
  onNavigateToFillProfile
}) {
  return (
    <div className="location-overlay-page">

      {/* Blurred Background */}
      <div className="background-layer">

        <div className="fake-avatar"></div>

        <div className="fake-form">
          <div className="fake-input"></div>
          <div className="fake-input"></div>
          <div className="fake-input"></div>
          <div className="fake-input"></div>
          <div className="fake-button"></div>
        </div>

      </div>

      {/* Header */}
      <div className="fake-header">
        <button
          className="otp-back-button"
          onClick={onNavigateToOTPVerification}
        >
          <ArrowLeft size={28} />
        </button>

        <h2>Fill Your Profile</h2>
      </div>

      {/* Popup */}
      <div className="location-popup-card">
        <h1 className="popup-title">Allow Location</h1>

        <button
          className="allow-btn"
          onClick={onNavigateToFillProfile}
        >
          Allow
        </button>

        <label className="manual-label">
          Manually Enter Location
        </label>

        <input
          type="text"
          placeholder="Value"
          className="manual-input"
        />
      </div>

    </div>
  );
}