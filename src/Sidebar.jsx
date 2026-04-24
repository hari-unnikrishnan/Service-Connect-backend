import React, { useState } from "react";
import "./Sidebar.css";
import { X, LogOut, ArrowLeft } from "lucide-react";
import avatar from './assets/IMAGE BG22.png';

export default function App({onNavigateToAbout,onNavigateToTermsConditions,onNavigateToHelpCenter,onNavigateToSettings, onNavigateToChat , onNavigateToFriends}) {


  return (
    <>
      {/* ===== BACKGROUND PAGE ===== */}
      <div className={`edit-page ${open ? "blur-bg" : ""}`}>
        
        <div className="header">
          <button className="back-btn">
            <ArrowLeft />
          </button>
          <h2>EDIT PROFILE</h2>

          {/* 👉 Open Popup Button */}
          <button
            style={{ marginLeft: "auto" }}
       
          >
            Open Menu
          </button>
        </div>

        <div className="profile-img-box">
          <img
                     src={avatar}
                     alt="profile"
                     className="fillprofile-avatar"
                   />
          <div className="edit-icon">📷</div>
        </div>

        <div className="form">
          <input placeholder="Full Name" />
          <input placeholder="Nick Name" />
          <input placeholder="Date of Birth" />
          <input placeholder="Email" />
          <input placeholder="+91 7248481225" />
          <input placeholder="Gender" />
          <input placeholder="Student" />
        </div>

        <button className="update-btn">Update →</button>
      </div>

      {/* ===== SIDEBAR POPUP ===== */}
      <div
        className={`overlay ${open ? "show" : ""}`}
     
      >
        <div
          className="sidebar-card"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" >
            <X size={18} />
          </button>

          <div className="profile-section">
            <div className="avatar-wrapper">
               <img
                     src={avatar}
                     alt="profile"
                     className="fillprofile-avatar"
                   />
              <span className="online-dot"></span>
            </div>

            <h3 className="name">Stone Stellar</h3>
            <p className="uid">UID: CU102</p>
            <p className="status">Online</p>
          </div>

          <button className="profile-btn">My Profile</button>

         <ul className="menu">
            {[
              "Home","Bookings","Active Services","Services",
              "Complaints","Message","Settings","Transaction",
              "History","About Us","Help Center",
              "Invite a Friend","Terms & Conditions"
            ].map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  if (item === "About Us") {
                    onNavigateToAbout();
                  } else if (item === "Terms & Conditions") {
                    onNavigateToTermsConditions();
                  } else if (item === "Help Center") {
                    onNavigateToHelpCenter();
                  } else if (item === "Settings") {
                    onNavigateToSettings();
                  } else if (item === "Message") {
                    onNavigateToChat();
                  } else if (item === "Invite a Friend") {
                    onNavigateToFriends();
                  }
                }}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="logout">
            <LogOut size={16} />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </>
  );
}