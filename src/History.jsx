import React from "react";
import "./History.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function History({ onNavigateBack, onNavigateToSidebar }) {
  return (
    <div className="history-page">
      <div className="history-container">

        {/* HEADER */}
        <div className="history-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>
          <h2>HISTORY</h2>
        </div>

        {/* EMPTY CARD */}
        <div className="history-card">
          <h3>No History Found</h3>
          <p>
            Your activity will appear here once you start using our service
          </p>

          <button className="explore-btn" onClick={onNavigateToSidebar}>
            Explore Services
            <span className="arrowy">
              <ArrowRight size={18} />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}