import React from "react";
import "./ComplaintForm.css";
import avatar from "./assets/Ellipse 309.png";
import {
  ArrowLeft,
  Image,
  CircleAlert
} from "lucide-react";

export default function ComplaintForm({onNavigateBack, onNavigateToComplaintList}) {
  return (
    <div className="complaint-page">
      <div className="complaint-container">

        {/* HEADER */}
        <div className="cf-header">
          <button className="back-btn"  onClick={onNavigateBack}>
            &#8249;
          </button>
          <h2>COMPLAINT FORM</h2>
        </div>

        {/* USER */}
        <div className="user-section">
          <div className="avatar">
             <img src={avatar} alt="user" />
          </div>
          <div>
            <h4>Nazrul Islam</h4>
            <p>Electrification 💪</p>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="card">
          <p className="booking-id">Booking Id : 12aa21w</p>

          <label className="tittlename ">Title</label>
          <p className="values">Bulb Change</p>

          <label className="Desc">Description</label>
          <p className="value">askjdhh jkljhdlhasmnjh jhkhk</p>

          <label className="Desc">Appointment</label>
          <div className="date-row">
            <span className="Desc">Jun 10, 2024</span>
            <span className="Desc">9:41 AM</span>
          </div>

          <h4 className="invoice-title">Invoice</h4>

          <table>
            <thead>
              <tr className="Desc">
                <th>Sl.no</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody >
              <tr className="Desc">
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

        {/* STATUS BUTTONS */}
        <button className="status-btn">Service Status</button>
        <button className="status-btn">Payment Status</button>

        {/* INPUT */}
        <div className="input-card">
          <label>Title</label>
          <input type="text" defaultValue="Miss Behave" />
        </div>

        <div className="input-card">
          <label>Description</label>
          <textarea defaultValue="Filled dffdfd sdfsdfsddfsd"></textarea>
        </div>

        {/* UPLOAD */}
        <div className="upload-card">
          <span className="Images">Images & Videos</span>
          <Image size={20}  color="black"/>
        </div>

        {/* BUTTON */}
        <button className="submit-btnsz" onClick={ onNavigateToComplaintList}>
           <span className="book-text">  Conform Complaint</span>
        
          <span className="arrow">→</span>
        </button>

      </div>
    </div>
  );
}