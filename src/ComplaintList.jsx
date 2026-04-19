import React from "react";
import "./ComplaintList.css";
import {
  ArrowLeft,
  SlidersHorizontal,
  Search,
  Calendar,
  Clock,
  CircleAlert,
  X,
  Grid2x2, 
  Smartphone, 
  RefreshCw, 
  SquareMenu, 
  Plus, 
  CircleHelp
} from "lucide-react";

export default function ComplaintList({onNavigateBack,onNavigateToServiceCompleted}) {
  const data = [
    {
      title: "Tap Repair",
      name: "Keshavan",
      status: "Pending",
      button: "Chat / Call"
    },
    {
      title: "Tap Repair",
      name: "Keshavan",
      status: "Resolved",
      button: "Complete Payment"
    }
  ];

  return (
    <div className="complaint-page">
      <div className="complaint-container">

        {/* HEADER */}
        <div className="header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>

          <h2>COMPLAINT</h2>

          <div className="header-icons">
            <SlidersHorizontal size={18} />
            <Search size={18} />
          </div>
        </div>

        {/* LIST */}
        {data.map((item, i) => (
          <div className="complaint-card" key={i}>

            {/* LEFT GREEN BAR */}
            <div className="left-bar"></div>

            <div className="card-content">

              {/* TOP */}
              <div className="top-row">
                <h3>
                  {item.title} <span className="view">View</span>
                </h3>
                <X size={18} />
              </div>

              {/* USER */}
              <div className="user">
                <div className="avatar"></div>
                <div>
                  <p className="names">{item.name}</p>
                  <span className="status">{item.status}</span>
                </div>
              </div>

              {/* DATE */}
              <div className="info-row">
                <Calendar size={16}  color="red"/>
                <span className="names">March 20, 2021</span>

                <Clock size={16}  color="yellow"/>
                <span className="names">09.00 - 10.00 AM</span>
              </div>

              {/* AMOUNT */}
              <div className="info-row">
                <span className="names">Amount : 300 /-</span>

                <div className="alert">
                  <CircleAlert size={16} />
                  <span>Additional Requirements</span>
                </div>
              </div>

              {/* BUTTON */}
              <button className="action-btn" onClick={onNavigateToServiceCompleted}>
                {item.button}
                <span className="arrows">→</span>
              </button>

            </div>
          </div>
        ))}

        {/* FOOTER */}
        <div className="bottom-navxz" > 
          <Grid2x2 size={18} />
        <Smartphone size={18} />
        <RefreshCw size={18} />
        <SquareMenu size={18} />
        <Plus size={20} />
        <CircleHelp size={20} />
        </div>

      </div>
    </div>
  );
}