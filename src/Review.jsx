import React, { useState } from "react";
import "./Review.css";
import { ArrowLeft, UploadCloud } from "lucide-react";

export default function Review({ onNavigateBack }) {
  const [review, setReview] = useState("");

  return (
    <div className="review-page">
      <div className="review-container">

        {/* HEADER */}
        <div className="review-header">
          <button className="back-btn" onClick={onNavigateBack}>
           &#8249;
          </button>
          <h2>REVIEW</h2>
        </div>

        {/* COURSE CARD */}
        <div className="review-card">
          <div className="course-img"></div>

          <div>
            <p className="category">Graphic Design</p>
            <h4>Setup your Graphic Desig..</h4>
          </div>
        </div>

        {/* UPLOAD */}
        <h3 className="section-title">Add Photo (or) Video</h3>

        <div className="upload-box">
          <UploadCloud size={40}  color="#000000"  />
          <p  className=" Upload ">Click here to Upload</p>
          <input type="file" className="file-input" />
        </div>

        {/* TEXTAREA */}
        <h3 className="section-title">Write you Review</h3>

        <div className="textarea-box">
          <textarea
            placeholder="Would you like to write anything about this Product?"
            maxLength={250}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <span className="char-count">
            *{250 - review.length} Characters Remaining
          </span>
        </div>

        {/* BUTTON */}
        
        <button class="submit-btn">
            <span class="book-text">Submit Review</span>
           
            </button>

      </div>
    </div>
  );
}