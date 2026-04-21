import React, { useState, useRef } from "react";
import "./EditProfiless.css";
import {
  ArrowLeft,
  Image,
  Calendar,
  Mail,
  ChevronDown,
  ArrowRight
} from "lucide-react";

import profileImg from "./assets/profile.png";

export default function EditProfile({ onNavigateBack }) {

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    dob: "",
    email: "",
    phone: "",
    gender: ""
  });

  const dateRef = useRef(null); // 🔥 important

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="edit-page">
      <div className="edit-container">

        {/* HEADER */}
        <div className="edit-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>
          <h2>EDIT PROFILE</h2>
        </div>

        {/* PROFILE IMAGE */}
        <div className="profile-img-wrap">
          <img src={profileImg} alt="profile" />
          <div className="edit-icon">
            <Image size={18} />
          </div>
        </div>

        {/* FORM */}
        <div className="form">

          <input
            className="input-box"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="input-box"
            placeholder="Nick Name"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />

          {/* ✅ DATE PICKER WITH ICON CLICK */}
          <div className="input-box with-icon">

            <Calendar
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (dateRef.current.showPicker) {
                  dateRef.current.showPicker(); // Chrome
                } else {
                  dateRef.current.focus(); // fallback
                }
              }}
            />

            <input
              ref={dateRef}
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div className="input-box with-icon">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* PHONE */}
          <input
            className="input-box"
            placeholder="(+91) 724-848-1225"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* GENDER */}
          <div className="input-box with-right">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <ChevronDown size={18} />
          </div>

          <input
            className="input-box"
            placeholder="Student"
          />

        </div>

        {/* BUTTON */}
        <button className="update-btn">
          Update
          <span className="arrow">
            <ArrowRight size={18} />
          </span>
        </button>

      </div>
    </div>
  );
}