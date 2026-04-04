import React, { useState } from "react";
import "./PaymentMethods.css";
import { ArrowLeft, Plus } from "lucide-react";

export default function PaymentMethods({ onNavigateBack }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="pm-page">
      <div className="pm-container">

        {/* HEADER */}
        <div className="pm-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>
          <h2>PAYMENT METHODS</h2>
        </div>

        {/* CARD */}
        <div className="pm-card">
          <div className="pm-img"></div>
          <div>
            <p className="pm-category">Graphic Design</p>
            <h3>Setup your Graphic Desig..</h3>
          </div>
        </div>

        {/* TITLE */}
        <p className="pm-title">
          Select the Payment Methods you Want to Use
        </p>

        {/* PAYPAL */}
        <div 
          className="pm-option"
          onClick={() => setSelected("paypal")}
        >
          <span className="pm-option-text">Paypal</span>
          <div className={`radio ${selected === "paypal" ? "active" : ""}`}></div>
        </div>

        {/* GOOGLE PAY */}
        <div 
          className="pm-option"
          onClick={() => setSelected("gpay")}
        >
          <span className="pm-option-text">Google Pay</span>
          <div className={`radio ${selected === "gpay" ? "active" : ""}`}></div>
        </div>


        {/* ADD CARD */}
        <div className="pm-option">
          <span className="pm-option-text">Add Credit/Debit</span>
          <Plus size={30} style={{color:"black"}} />
        </div>

        {/* FLOAT BUTTON */}
        <div className="pm-float">
          <Plus size={24} />
        </div>

        {/* FOOTER BUTTON */}
        <button className="pm-btn">
          Enroll Course - $55
          <span className="arrow">→</span>
        </button>

      </div>
    </div>
  );
}