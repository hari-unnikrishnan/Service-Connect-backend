import React, { useState } from "react";
import "./Security.css";
import { ChevronRight } from "lucide-react";

export default function Security({ onNavigateBack }) {
  const [settings, setSettings] = useState({
    remember: true,
    biometric: true,
    face: false
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="security-page">

      {/* HEADER */}
      <div className="security-header">
        <button className="back-btn" onClick={onNavigateBack}>
          &#8249;
        </button>
        <h2>SECURITY</h2>
      </div>

      {/* LIST */}
      <div className="security-list">

        {/* TOGGLE ITEMS */}
        <div className="security-item">
          <span>Remember Me</span>
          <div
            className={`togglez ${settings.remember ? "on" : ""}`}
            onClick={() => toggle("remember")}
          >
            <div className="thumbw"></div>
          </div>
        </div>

        <div className="security-item">
          <span>Biometric ID</span>
          <div
            className={`togglez ${settings.biometric ? "on" : ""}`}
            onClick={() => toggle("biometric")}
          >
            <div className="thumbw"></div>
          </div>
        </div>

        <div className="security-item">
          <span>Face ID</span>
          <div
            className={`togglez ${settings.face ? "on" : ""}`}
            onClick={() => toggle("face")}
          >
            <div className="thumbw"></div>
          </div>
        </div>

        {/* NAV ITEM */}
        <div className="security-item arrow-item">
          <span>Google Authenticator</span>
          <ChevronRight size={20} />
        </div>

      </div>

      {/* BUTTONS */}
      <div className="security-actions">
        <button className="btn light">Change PIN</button>
        <button className="btn dark">Change Password</button>
      </div>

    </div>
  );
}