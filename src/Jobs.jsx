import React from "react";
import "./Jobs.css";
import {
  ArrowLeft,
  SlidersHorizontal,
  Search,
  Calendar,
  Clock,
  CircleAlert,
   Grid2x2,
   Smartphone,
   RefreshCw,
    SquareMenu,
    Plus,
  CircleHelp
} from "lucide-react";

export default function Jobs({onNavigateBack,onNavigateToServiceDetails}) {
  const jobs = [1, 2]; // demo list

  return (
    <div className="jobs-page">
      <div className="jobs-container">

        {/* HEADER */}
        <div className="jobs-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>

          <h2>Jobs</h2>

          <div className="header-icons">
            <SlidersHorizontal size={18} />
            <Search size={18} />
          </div>
        </div>

        {/* TABS */}
        <div className="tabs" onClick={onNavigateToServiceDetails}>
          <button className="active">Ongoing</button>
          <button>Completed</button>
        </div>

        {/* JOB LIST */}
        {jobs.map((item, i) => (
          <div className="job-card" key={i}>

            {/* LEFT GREEN STRIP */}
            <div className="left-strip"></div>

            <div className="job-content">

              {/* TITLE */}
              <div className="job-top">
                <h4>Tap Repair</h4>
                <span className="view">View</span>
                <span className="close">✕</span>
              </div>

              {/* USER */}
              <div className="user">
                <div className="avatar"></div>
                <span>Keshavan</span>
              </div>

              <p className="status">Active</p>

              {/* DATE TIME */}
              <div className="info-row">
                <Calendar size={16} color="#ff6b00" />
                <span className="date">March 20, 2021</span>

                <Clock size={16} color="#f5a623" />
                <span className="time">09.00 - 10.00 AM</span>
              </div>

              {/* AMOUNT */}
              <div className="amount">
                Amount : 300 /-
              </div>

              {/* ALERT */}
              <div className="alert">
                <CircleAlert size={16} color="red" />
                <span>Additional Requirements</span>
              </div>

              {/* BUTTON */}
                <button className="pay-btn" onClick={onNavigateToServiceDetails}>
                    Complete Payment
                    <span className="arrow">→</span>
                </button>

            </div>
          </div>
        ))}

        {/* BOTTOM NAV */}
        <div className="bottom-nav">
           <Grid2x2 size={18} />
            <Smartphone size={18} />
            <RefreshCw size={18} />
            <SquareMenu size={18} />
            <Plus size={18} />
            <CircleHelp size={18} />
        </div>

      </div>
    </div>
  );
}