import React, { useState, useEffect } from "react";
import "./PaymentSuccess.css";
import sucessImg from "./assets/sucess.png";   // ✅ correct path
import { X } from "lucide-react";

export default function PaymentSuccess({
  selected,
  amount,
  onNavigateToHome
}) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // loading animation
    const timer1 = setTimeout(() => {
      setShowLoading(false);
    }, 800);

    // auto redirect after 3s
    const timer2 = setTimeout(() => {
      onNavigateToHome();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onNavigateToHome]);

  return (
    <div className="success-overlay">
      <div className="success-card">

        {/* CLOSE BUTTON */}
        <div className="close-btn" onClick={onNavigateToHome}>
          <X size={22} />
        </div>

        {/* LOADING STATE */}
        {showLoading ? (
          <div className="pay-message">
            Pay with {selected?.toUpperCase() || "UPI"} ₹{amount || 300}
            <span className="arrow">→</span>
          </div>
        ) : (
          <>
            {/* IMAGE */}
            <div className="success-graphic">
              <img
                src={sucessImg}
                alt="success"
                className="success-image"
              />
            </div>

            {/* TITLE */}
            <h2 className="success-title">Congratulations 🎉</h2>

            {/* TEXT */}
            <p className="success-text">
             Your Payment is Successfully. Purchase a New Course
            </p>

            <p className="watch-link">Watch the Course</p>

            {/* BUTTON */}
            <button
              className="receipt-btn"
              onClick={onNavigateToHome}
            >
               E - Receipt
              <span className="arrow">→</span>
            </button>
          </>
        )}

      </div>
    </div>
  );
}