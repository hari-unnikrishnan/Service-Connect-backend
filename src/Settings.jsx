import React from "react";
import "./Settings.css";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  Languages,
  HelpCircle,
  Power,
  ChevronRight
} from "lucide-react";

export default function Settings({ 
  onNavigateBack, 
  onNavigateToNotificationSettings 
}) {

  const menu = [
    { icon: <User size={20} />, text: "Account" },
    { 
      icon: <Bell size={20} />, 
      text: "Notification", 
      onClick: onNavigateToNotificationSettings 
    },
    { icon: <Shield size={20} />, text: "Privacy" },
    { icon: <CreditCard size={20} />, text: "Payment" },
    { icon: <Languages size={20} />, text: "Language" },
    { icon: <HelpCircle size={20} />, text: "Help" },
    { icon: <Power size={20} />, text: "Logout" }
  ];

  return (
    <div className="settings-page">

      {/* HEADER */}
      <div className="settings-header">
        <button className="back-btn" onClick={onNavigateBack}>
          <ArrowLeft size={22} />
        </button>
        <h2>SETTINGS</h2>
      </div>

      {/* MENU LIST */}
      <div className="settings-list">
        {menu.map((item, index) => (
          <div
            key={index}
            className="settings-item"
            onClick={() => item.onClick && item.onClick()}
          >
            <div className="leftzz">
              <div className="iconu">{item.icon}</div>
              <span>{item.text}</span>
            </div>

            <ChevronRight size={20} className="arrowc" />
          </div>
        ))}
      </div>

    </div>
  );
}