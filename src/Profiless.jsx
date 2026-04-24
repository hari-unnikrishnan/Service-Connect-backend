import React, { useState, useEffect } from "react";
import "./Profiless.css";
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Languages,
  Eye,
  FileText,
  HelpCircle,
  Mail,
  Power,
  ChevronRight,
  Image,
  Grid2x2,
  Smartphone,
  RefreshCw,
  SquareMenu,
  Plus,
  CircleHelp
} from "lucide-react";

import profileImg from "./assets/profile.png";
import { fetchProfile } from './api.js';

export default function Profile({ onNavigateBack, onNavigateToEditProfiless, onNavigateToNotificationSettings,onNavigateToSecurity,onNavigateToFriends }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  // Save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Load profile data
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []); 

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>
      <div className="profile-container">

        {/* HEADER */}
        <div className="profile-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>
          <h2>PROFILE</h2>
        </div>

        {/* CARD */}
        <div className="profile-card">

          {/* IMAGE */}
          <div className="profile-img-wrapper">
            <img src={profile?.profile_image_url || profileImg} alt="profile" />
            <div className="edit-icon">
              <Image size={25} color="#0f1222" />
            </div>
          </div>

          {/* NAME */}
          {loading ? (
            <div>Loading profile...</div>
          ) : error ? (
            <div className="error">Error: {error}</div>
          ) : (
            <>
              <h3>{profile?.full_name || profile?.username || 'User'}</h3>
              <p className="email">{profile?.email || 'No email'}</p>
            </>
          )}

          {/* MENU */}
          <div className="menu">

            <MenuItem
              icon={<User />}
              text="Edit Profile"
              onClick={onNavigateToEditProfiless}
            />

            <MenuItem icon={<CreditCard />} text="Payment Option" />
            <MenuItem 
              icon={<Bell />} 
              text="Notifications"  
              onClick={onNavigateToNotificationSettings}
            />
            <MenuItem 
            icon={<Shield />}
             text="Security"
             onClick={onNavigateToSecurity}
              />

            <MenuItem
              icon={<Languages />}
              text="Language"
              rightText="English (US)"
            />

            {/* DARK MODE */}
            <div className="menu-item">
              <div className="lefts">
                <Eye size={18} />
                <span>Dark Mode</span>
              </div>

              <div
                className={`toggle ${darkMode ? "active" : ""}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div className="circle"></div>
              </div>
            </div>


            <MenuItem icon={<FileText />} text="Terms & Conditions" />
            <MenuItem icon={<HelpCircle />} text="Help Center" />

            <MenuItem 
            icon={<Mail />} 
            text="Invite Friends" 
            onClick={onNavigateToFriends}
            />
              
            <MenuItem icon={<Power />} text="Logout" />

          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="bottom-navg">
          <Grid2x2 size={18} />
          <Smartphone size={18} />
          <RefreshCw size={18} />
          <SquareMenu size={18} />
          <Plus size={18} />
          <CircleHelp size={18} />
        </div>

      </div>
    </div>
  );
}

/* ✅ FIXED MENU ITEM COMPONENT */
function MenuItem({ icon, text, rightText, onClick }) {
  return (
    <div className="menu-item" onClick={onClick}>
      <div className="lefts">
        {icon}
        <span>{text}</span>
      </div>

      <div className="rights">
        {rightText && <span className="rights-text">{rightText}</span>}
        <ChevronRight size={18} />
      </div>
    </div>
  );
}