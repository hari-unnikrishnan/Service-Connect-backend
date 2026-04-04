import React from "react";
import "./BookingDetails.css";
import profile from "./assets/Ellipse 309.png";

import {
  ArrowLeft,
  SlidersHorizontal,
  Search,
  Calendar,
  Clock,
  Image,
  AlertCircle,
   Plus,
   ChevronDown
} from "lucide-react";

export default function BookingDetails({ onNavigateBack ,onNavigateToPaymentMethods}) {
  return (
    <div className="bd-page">
      <div className="bd-container">

        {/* HEADER */}
        <div className="bd-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249; 
          </button>

          <h2>BOOKINGS DETAILS</h2>

          <div className="bd-icons">
            <SlidersHorizontal size={18} />
            <Search size={18} />
          </div>
        </div>

        {/* USER */}
        <div className="bd-user">
          <img src={profile} alt="user" />
          <div>
            <h3>Nazrul Islam</h3>
            <p className="bd-user-text">Electrification</p>
          </div>
        </div>

        <p className="bd-id">Booking Id : 12aa21w</p>

        {/* TITLE */}
        <div className="bd-input">
          <label>Title</label>
          <p>Change Bulb</p>
        </div>

        {/* DESCRIPTION */}
        <div className="bd-input">
          <label>Description</label>
          <p>Filled dffdfd sdfsdfsddfsd</p>
        </div>

        {/* UPLOAD */}
        <div className="bd-upload">
          <span className="bd-upload-text">Images & Videos</span>
          <Image size={20}  style={{color:"black"}}/>
        </div>

        {/* IMAGE PREVIEW */}
        <div className="bd-images">
            <Image size={50}  style={{color:"black"}}/>
            <Image size={50}  style={{color:"black"}}/>
            <Image size={50}  style={{color:"black"}}/>
            <Plus size={50}  style={{color:"black"}}/>
        </div>

        {/* AVAILABILITY */}
        <div className="bd-availability">
          <h3>Availability</h3>

          <p className="bd-row-text">From</p>
          <div className="bd-row">
            <div className="bd-small">
              <span>Date</span>
              <p>12/12/2020</p>
              <Calendar size={18} />
            </div>

            <div className="bd-small">
              <span>Time</span>
              <p>12:00 PM</p>
              <Clock size={18} />
            </div>
          </div>

          <p className="bd-row-text" >To</p>
          <div className="bd-row">
            <div className="bd-small">
              <span>Date</span>
              <p>12/12/2020</p>
              <Calendar size={18} />
            </div>

            <div className="bd-small">
              <span>Time</span>
              <p>12:00 PM</p>
              <Clock size={18} />
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="bd-reschedule">
          Reschedule Appointment
        </button>

        {/* INVOICE */}
        <div className="bd-card">
          <h3>Appointment</h3>

          <div className="bd-tags">
            <span>Jun 10, 2024</span>
            <span>9:41 AM</span>
          </div>

          <h4>Invoice</h4>

          <div className="bd-table">
            <div>Sl.no</div>
            <div>Description</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Total</div>

            <div>1</div>
            <div>Bulb Change</div>
            <div>1</div>
            <div>300</div>
            <div>300</div>
          </div>

          <p className="total">Grand Total 300</p>

          <p className="terms">
            Terms and conditions <br />
            Valid up to 1 month
          </p>

          <p className="warning">
            <AlertCircle size={16} /> Additional Requirements
          </p>

          <p className="req">
            Provide Ladder <br />
            Bulb should be provided
          </p>
        </div>

        {/* FOOTER BUTTON */}
        <button className="bd-pay" onClick={onNavigateToPaymentMethods}>
        <span className=" bd-pay-text"> Accept & Pay Full</span>
        <ChevronDown size={28} className="btn-check-arrow" />
          <span className="arrow">→</span>
        </button>

      </div>
    </div>
  );
}