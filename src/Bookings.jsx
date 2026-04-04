import React from "react";
import "./Bookings.css";
import {  Search, 
  SlidersHorizontal, 
  Clock,
   Calendar, 
  ChevronDown, 
  Grid2x2,
  Smartphone,
  RefreshCw,
  SquareMenu,
  Plus,
  CircleHelp } from "lucide-react";

export default function Bookings({ onNavigateBack,onNavigateToBookingDetails }) {
  return (
    <div className="bookings-page">
      <div className="bookings-container">

        {/* HEADER */}
        <div className="bookings-header">
          <button className="back-btn" onClick={onNavigateBack}>
             &#8249;
          </button>

          <h2>BOOKINGS</h2>

          <div className="header-icons">
            <SlidersHorizontal size={18} />
            <Search size={18} />
          </div>
        </div>

        {/* CARD 1 */}
        <div className="booking-card pending">
          <div className="card-left dark"></div>

          <div className="card-content">

            <div className="card-top">
                <h3>Tap Repair</h3>

                <div className="card-actions">
                  <span className="view">View</span>
                  <span className="close">×</span>
                </div>
              </div>

              <div className="user-info">
                <div className="avatar"></div>

                <div>
                  <p className="name">Keshavan</p>
                  <p className="status">Booked</p>
                </div>
              </div>

              <div className="date-time">
                <div className="date">
                  <Calendar size={16} style={{color:"#d55d5d"}}/>
                  <span className="date-text">March 20, 2021</span>
                </div>

                <div className="time">
                  <Clock size={16}  style={{color:"#c9c927"}}/>
                  <span className="date-text">09.00 - 10.00 AM</span>
                </div>
              </div>

              <button className="waiting-btn">
                Waiting for Response
              </button>

          </div>
        </div>

        {/* CARD 2 */}
        <div className="booking-card success">
          <div className="card-left green"></div>

          <div className="card-content">
            <div className="card-top">
              <h3>Tap Repair</h3>
              <span className="view">View</span>
              <span className="close">×</span>
            </div>

              <div className="user-info">
                <div className="avatar"></div>

                <div>
                  <p className="name">Keshavan</p>
                  <p className="status">Scheduled</p>
                </div>
              </div>

            

            <div className="date-time">
              <Calendar size={16} style={{color:"#d55d5d"}}/><p className="date-text">March 20, 2021</p>
              <Clock size={16} style={{color:"#c9c927"}}/> <p className="date-text">09.00 - 10.00 AM</p>
            </div>

            <p className="amount">Amount : 300 /-</p>
            <p className="warning">⚠ Additional Requirements</p>

            <button className="accept-btn"  onClick={onNavigateToBookingDetails}>
              <span className="btn-text">Accept and Pay Advance</span>

              <ChevronDown size={28} className="btn-check" />

              <span className="arrow-circle">
                →
              </span>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bottom-navs">
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