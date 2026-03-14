import React, { useState } from 'react';
import './FillProfile.css';
import logo from './assets/profile.png';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Mail,
  ChevronDown
} from 'lucide-react';
import { updateProfile } from './api';

export default function FillProfile({
  onNavigateToOTPVerification,
  onNavigateToRegisterService,
  user
}) {
  const [fullName, setFullName] = useState(user?.first_name ? `${user.first_name} ${user.last_name}` : '');
  const [address, setAddress] = useState(user?.address || '');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState('');
  const [houseName, setHouseName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!fullName || !email || !phone) {
      setError("Please fill in required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const profileData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        address: `${address}, ${houseName}, ${landmark}, ${pincode}, ${district}, ${state}`
      };

      const data = await updateProfile(profileData);
      
      if (data.user || data.success) {
        // Update localStorage with user data
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        onNavigateToRegisterService();
      } else {
        // For demo, still navigate
        onNavigateToRegisterService();
      }
    } catch {
      // For demo, still navigate
      onNavigateToRegisterService();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fillprofile-wrapper">
      <div className="fillprofile-container">

        <div className="fillprofile-header">
         <button className="otp-back-button" onClick={onNavigateToOTPVerification}>
                    <ArrowLeft size={28} />
                  </button>

          <h1 className="fillprofile-title">
            FILL YOUR PROFILE
          </h1>
        </div>

        {error && <p style={{color: 'red', fontSize: '12px', marginBottom: '10px', textAlign: 'center'}}>{error}</p>}

        <div className="fillprofile-avatar-wrap">
          <img
            src={logo}
            alt="profile"
            className="fillprofile-avatar"
          />
        </div>

        <input 
          className="fillprofile-input" 
          placeholder="Full Name *" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input 
          className="fillprofile-input" 
          placeholder="Address" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="fillprofile-icon-field">
          <Calendar size={20} />
          <input 
            placeholder="Date of Birth" 
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="fillprofile-icon-field">
          <Mail size={20} />
          <input 
            placeholder="Email *" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="fillprofile-phone-field">
          <select className="fillprofile-country-select">
            <option value="+91">🇮🇳 (+91)</option>
            <option value="+1">🇺🇸 (+1) </option>
            <option value="+61">🇦🇺 (+61)</option>
          </select>

          <input
            type="tel"
            placeholder="Phone Number *"
            className="fillprofile-phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="fillprofile-select-field">
          <select 
            className="fillprofile-gender-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <ChevronDown size={22} />
        </div>

        <input 
          className="fillprofile-input" 
          placeholder="House Name"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
        />
        <input 
          className="fillprofile-input" 
          placeholder="Land mark"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
        />
        <input 
          className="fillprofile-input" 
          placeholder="Pin code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <input 
          className="fillprofile-input" 
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <input 
          className="fillprofile-input" 
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <button
          className="fillprofile-submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          <span className="fillprofile-text">{loading ? "Saving..." : "Continue"}</span>

          <div className="fillprofile-arrow-btn">
            <ArrowRight size={26} />
          </div>
        </button>

      </div>
    </div>
  );
}