import React from "react";
import "./ServiceDetails.css";
import image2 from "./assets/Image2.png";
import plus1 from "./assets/Plus1.png";
import avatar from "./assets/Ellipse 309.png";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Image,
  CircleAlert
} from "lucide-react";

export default function ServiceDetails({onNavigateBack,onNavigateToComplaint}) {
  return (
    <div className="service-details-page">
      <div className="service-details-container">

        {/* HEADER */}
        <div className="sd-header">
          <button className="back-btn" onClick={onNavigateBack}>
           &#8249;
          </button>
          <h2>SERVICE DETAILS</h2>
        </div>

        {/* USER */}
        <div className="user-section">
          <div className="avatar">
             <img src={avatar} alt="user" />
          </div>
          <div>
            <h4>Nazrul Islam</h4>
            <p className="sublittle">Electrification 💪</p>
          </div>
        </div>

        <p className="booking-id">Booking Id : 12aa21w</p>

        {/* TITLE */}
        <div className="card">
          <label className="sublittle">Title</label>
          <p className="sublittle">Change Bulb</p>
        </div>

        {/* DESCRIPTION */}
        <div className="card">
          <label>Description</label>
          <textarea  className="textarea "value="Filled dffdfd sdfsdfsddfsd" readOnly />
        </div>

        {/* IMAGE */}
        <div className="upload-card">
          <span className="upload-cards">Images & Videos</span>
          <Image size={20}  color="black"/>
        </div>

        {/* IMAGE PREVIEW */}
        <div className="image-row">
          <div className="img-box">
            <img src={image2} alt="preview" />
          </div>
          <div className="img-box">
            <img src={image2} alt="preview" />
          </div>
          <div className="img-box">
            <img src={image2} alt="preview" />
          </div>
          <div className="add-box">
            <img src={plus1} alt="preview" />
          </div>
        </div>

        {/* AVAILABILITY */}
        <h4 className="section-title">Availability</h4>

        <p className="label">From</p>
        <div className="row">
          <div className="small-card">
            <span className="date">Date : 12/12/2020</span>
            <Calendar size={18}  color="black"/>
          </div>
          <div className="small-card">
            <span  className="date">Time :12:00 PM</span>
            <Clock size={18} color="black"/>
          </div>
        </div>

        <p className="label">To</p>
        <div className="row">
          <div className="small-card">
            <span  className="date">: 12/12/2020</span>
            <Calendar size={18}  color="black"/>
          </div>
          <div className="small-card">
            <span className="date">Time :12:00 PM</span>
            <Clock size={18} color="black"/>
          </div>
        </div>

        {/* STATUS BUTTON */}
        <button className="completed-btn">Completed</button>

        {/* APPOINTMENT */}
        <div className="invoice-card">
          <h4>Appointment</h4>

          <div className="date-time">
            <span className="timedate">Jun 10, 2024</span>
            <span className="timedate">9:41 AM</span>
          </div>

          <h5>Invoice</h5>

          <table>
            <thead>
              <tr className="numbers">
                <th>Sl.no</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bulb Change</td>
                <td>1</td>
                <td>300</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>

          <div className="total">Grand Total : 300</div>

          <p className="terms">Valid up to 1 month</p>

          <div className="alert">
            <CircleAlert size={16} />
            <span>Additional Requirements</span>
          </div>

          <p className="req">
            Provide Ladder <br />
            Bulb should be provided
          </p>
        </div>

        {/* BUTTONS */}
        <button className="pay-btns"onClick={onNavigateToComplaint}>
          Complete Payment
          <span>→</span>
        </button>

        <button className="complaint-btn" onClick={() => onNavigateToComplaint(1)}>
          Raise a Complaint
          <span>→</span>
        </button>

      </div>
    </div>
  );
}