import React from "react";
import "./Request.css";
import profile from "./assets/Ellipse 309.png"; 
import {
  ArrowLeft,
  Calendar,
  Clock,
  Pencil,
  Image,
   Plus
} from "lucide-react";

export default function Request({ 
  onNavigateBack, 
  onNavigateToBookings 
}) {
  return (
    <div className="request-service-main-page">
      <div className="request-service-main-container">

        {/* HEADER */}
        <div className="request-service-header">
        
          <button
                  className="back-btn"
                  onClick={onNavigateBack}
                  >
                   &#8249; 
                </button>
          <h2>REQUEST SERVICE</h2>
        </div>

        {/* USER */}
        <div className="request-service-user-profile-section">
          <img src={profile} alt="user" />
          <div>
            <h3>Nazrul Islam</h3>
            <p className="request-service-text">Electrification 💪</p>
          </div>
        </div>

        {/* TITLE */}
        <div className="request-service-input-field-card">
          <label>Title</label>
          <input type="text" placeholder="Change Bulb" />
        </div>

        {/* DESCRIPTION */}
        <div className="request-service-input-field-card">
          <label>Description</label>
          <textarea placeholder="Filled dffdfd sdfsdfsddfsd"></textarea>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="request-service-media-upload-card">
          <span className="request-service-media-upload-text" >Images & Videos</span>
          <Image size={25} style={{color:"black"}} />
        </div>

          <div className="request-service-media-row">
          <Image size={34} style={{color:"black"}} />
          <Image size={34}  style={{color:"black"}}/>
          <Image size={34}  style={{color:"black"}}/>
          <Plus size={34}  style={{color:"black"}}/>
        </div>

        {/* AVAILABILITY */}
        <div className="request-service-availability-section">
          <h3>
            Availability <Pencil size={16} />
          </h3>

          {/* FROM */}
          <p className="request-service-date-label">From</p>
          <div className="request-service-date-time-row">
            <div className="request-service-date-time-input">
              <span >Date</span>
              <p className="request-service-date-time-text">12/12/2020</p> 
              <Calendar size={18} style={{ color: "#000" }} />
            </div>

            <div className="request-service-date-time-input">
              <span>Time</span>
              <p className="request-service-date-time-text">12:00 PM</p>
              <Clock size={18} style={{ color: "#000" }} />
            </div>
          </div>

          {/* TO */}
          <p className="request-service-date-label">To</p>
          <div className="request-service-date-time-row">
            <div className="request-service-date-time-input">
              <span>Date</span>
              <p className="request-service-date-time-text">12/12/2020</p>
              <Calendar size={18}  style={{ color: "#000" }}/>
            </div>

            <div className="request-service-date-time-input">
              <span>Time</span>
              <p className="request-service-date-time-text">12:00 PM</p>
              <Clock size={18}  style={{ color: "#000" }}/>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="request-service-confirm-button"  
          onClick={onNavigateToBookings}
        >
          Conform
          <span className="request-service-confirm-arrow-icon">→</span>
        </button>

      </div>
    </div>
  );
}
