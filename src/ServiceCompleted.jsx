import React from "react";
import "./ServiceCompleted.css";
import icon from "./assets/ServiceCompleted.png";
import { Star } from "lucide-react";

export default function ServiceCompleted({ onReview }) {
  return (
    <div className="sc-overlay">

      <div className="sc-card">

        {/* ICON */}
        <div className="sc-icon">
          <img src={icon} alt="sc-icon" />
        </div>

        {/* TITLE */}
        <h2>Services Completed</h2>

        {/* SUBTEXT */}
        <p>
          Complete your Course. Please Write a Review
        </p>

        {/* STARS */}
        <div className="stars">
          {[1,2,3,4].map((i) => (
            <Star key={i} size={22} fill="#f5a623" color="#f5a623" />
          ))}
          <Star size={22} color="#ccc" />
        </div>

        {/* BUTTON */}
        <button className="review-btn" onClick={onReview}>
          Write a Review
          <span className="arrow">→</span>
        </button>

      </div>
    </div>
  );
}