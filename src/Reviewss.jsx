import React from "react";
import "./Reviewss.css";
import { ArrowLeft, Star, Heart } from "lucide-react";

export default function Reviews({ onNavigateBack, onNavigateToJobs }) {
  const reviews = [
    {
      name: "Heather S. McMullen",
      rating: 4.2,
      text: "The Course is Very Good dolor sit amet, con sect tur adipiscing elit...",
      likes: 760
    },
    {
      name: "Natasha B. Lambert",
      rating: 4.8,
      text: "The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus...",
      likes: 918
    },
    {
      name: "Marshall A. Lester",
      rating: 4.6,
      text: "The Course is Very Good dolor sit amet, con sect tur adipiscing elit...",
      likes: 914
    }
  ];

  return (
    <div className="reviews-page">
      <div className="reviews-container">

        {/* HEADER */}
        <div className="reviews-header">
          <button className="back-btn" onClick={onNavigateBack}>
             &#8249;
          </button>
          <h2>REVIEWS</h2>
        </div>

        {/* RATING SUMMARY */}
        <div className="summary">
          <h1 >4.8</h1>
          <div className="stars">
            {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#f5a623" color="#f5a623" />)}
          </div>
          <p className="starsp">Based on 448 Reviews</p>
        </div>

        {/* FILTER TABS */}
        <div className="tabs">
          <button className="active">Excellent</button>
          <button>Good</button>
          <button>Average</button>
          <button>Below Average</button>
        </div>

        {/* REVIEW LIST */}
        <div className="review-list">
          {reviews.map((item, i) => (
            <div className="review-card" key={i}>

              <div className="avatar"></div>

              <div className="review-content">
                <div className="review-content">
                    <div className="top-row">
                        <h4>{item.name}</h4>

                        <span className="rating-badge">
                        <Star size={14} fill="#f5a623" color="#f5a623" />
                        <span className="rating-text">{item.rating}</span>
                        </span>

                    </div>
                </div>

                <p>{item.text}</p>

                <div className="bottom-row">
                  <span className="likes">
                    <Heart size={16} color="red" /> 
                    <span className="rating-text">{item.likes}</span>
                  </span>
                  <span className="rating-text">2 Weeks Ago</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button className="write-btn" onClick={onNavigateToJobs}>
          Write a Review
        </button>

      </div>
    </div>
  );
}