import React, { useState } from "react";
import { getReceipt } from "./api.js";
import "./EReceipt.css";
import { ArrowLeft, MoreVertical, Copy } from "lucide-react";

export default function EReceipt({ onNavigateBack , onNavigateToReview }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="receipt-page">
      <div className="receipt-container">

        {/* HEADER */}
        <div className="receipt-header">
          <button className="back-btn" onClick={onNavigateBack}>
              &#8249; 
          </button>

          <h2>E-RECEIPT</h2>

          <MoreVertical
            size={20}
            onClick={() => setShowMenu(!showMenu)}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* MENU POPUP */}
        {showMenu && (
          <div className="menu-popup">
            <div
              className="menu-item"
              onClick={() => {
                alert("Share clicked");
                setShowMenu(false);
              }}
            >
              Share ✈️
            </div>

            <div
              className="menu-item"
              onClick={() => {
                alert("Download clicked");
                setShowMenu(false);
              }}
            >
              Download ⬇️
            </div>

            <div
              className="menu-item"
              onClick={() => {
                window.print();
                setShowMenu(false);
              }}
            >
              Print 🖨️
            </div>
          </div>
        )}

        {/* ICON */}
        <div className="receipt-top">
          <div className="receipt-icon">₹ ✔</div>
        </div>

        {/* BARCODE */}
        <div className="barcode">
          <div className="lines"></div>
          <div className="barcode-numbers">
            <span className="numbers">25234567</span>
            <span className="numbers">28646345</span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="receipt-details">

          <div className="row">
            <span>Name</span>
            <p>Scott R. Shoemake</p>
          </div>

          <div className="row">
            <span>Email ID</span>
            <p>shoemake.redial@gmail.com</p>
          </div>

          <div className="row">
            <span>Course</span>
            <p>3d Character Illustration Cre...</p>
          </div>

          <div className="row">
            <span>Category</span>
            <p>Web Development</p>
          </div>

          <div className="row">
            <span>TransactionID</span>
            <p>
              SK345680976 <Copy size={14} />
            </p>
          </div>

          <div className="row">
            <span>Price</span>
            <p>$55.00</p>
          </div>

          <div className="row">
            <span>Date</span>
            <p>Nov 20, 202X / 15:45</p>
          </div>

          <div className="row">
            <span>Status</span>
            <p 
              className="paid"
              onClick={onNavigateToReview}
              style={{ cursor: "pointer" }}
            >
              Paid
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}