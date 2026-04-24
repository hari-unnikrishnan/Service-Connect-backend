import React, { useState } from "react";
import "./NotificationSettings.css";

export default function NotificationSettings({ onNavigateBack }) {
  const [settings, setSettings] = useState({
    offers: true,
    sound: true,
    vibrate: false,
    general: true,
    promo: false,
    payment: true,
    update: true,
    service: false,
    tips: false
  });

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const items = [
    { label: "Special Offers", key: "offers" },
    { label: "Sound", key: "sound" },
    { label: "Vibrate", key: "vibrate" },
    { label: "General Notification", key: "general" },
    { label: "Promo & Discount", key: "promo" },
    { label: "Payment Options", key: "payment" },
    { label: "App Update", key: "update" },
    { label: "New Service Available", key: "service" },
    { label: "New Tips Available", key: "tips" }
  ];

  return (
    <div className="noti-page">

      {/* HEADER */}
      <div className="noti-header">
        <button className="back-btn" onClick={onNavigateBack}>
          &#8249;
        </button>
        <h2>NOTIFICATIONS SETTINGS</h2>
      </div>

      {/* LIST */}
      <div className="noti-list">
        {items.map((item, i) => (
          <div key={i} className="noti-item">
            <span>{item.label}</span>

            {/* TOGGLE */}
            <div
              className={`toggle ${settings[item.key] ? "active" : ""}`}
              onClick={() => toggle(item.key)}
            >
              <div className="circle"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}