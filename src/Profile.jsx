import React from "react";
import "./Profile.css";
import Williammage from "./assets/IMAGE BG 1.png";
import Image2 from "./assets/Image2.png";
import Video1 from "./assets/Video.png";
import { ArrowLeft, Star, MessageCircle, Wrench,
  Smartphone,
  Database,
  Volume2,
  Settings,
  Droplets,
  Cable } from "lucide-react";

 import Marthamage from "./assets/IMAGE BG.png"; // make sure file exists

const reviews = [
  {
    img: Williammage,
    name: "William S. Cunningham",
    text: "The Course is Very Good dolor sit amet, consect tur adipiscing elit. Naturales divitias dixit parab les esse, quod parvo.",
  },
  {
    img: Marthamage,
    name: "Martha E. Thompson",
    text: "The Course is Very Good dolor sit amet, consect tur adipiscing elit. Naturales divitias dixit parab les esse, quod parvo.",
  }
];

export default function Profile({ onNavigateBack,onNavigateToRequest }) { 
  return (
   <div className="profile-page">
  <div className="profile-container">

    {/* HEADER */}
    <div className="profile-header">
      <button
        className="back-btn"
        onClick={onNavigateBack}
        >
         &#8249;
      </button>
      <h2>PROFILE</h2>
    </div>

    {/* COVER */}
    <div className="cover-section"></div>

    {/* CHAT BUTTON */}
    <div className="chat-btn">
      <MessageCircle size={20} />
    </div>

    {/* PROFILE CARD */}
    <div className="profile-card">
      <p className="distance">3 km away</p>

      <div className="profile-title">
        <h3>William S. Cunningham</h3>
        <span className="rating">
          ⭐ <span className="ratings">4.2 | 32 Reviews</span>
        </span>
      </div>

      <p className="role">Plumber</p>

      <div className="profile-stats">
        <div className="prof">
          <span>🎥</span>
          <span className="prof-text">21 videos & images</span>
        </div>

        <span className="divider">|</span>

        <div className="prof">
          <span>⏱</span>
          <span className="prof-text">2 Services listed</span>
        </div>
      </div>
    </div>

    {/* ABOUT */}
    <div className="card">
      <h3>About</h3>
      <p className="card-p">
        Graphic Design now a popular profession graphic design by off your
        carrer about tantas regiones barbarorum pedibus obiit.
      </p>
      <p className="card-p">
        Graphic Design n a popular profession | Cur tantas regiones barbarorum
        pedibus obiit, maria transmi Et ne minimum beatus est; Addidisti ad
        extremum etiam
      </p>
      <span className="read-more">Read More</span>
    </div>

    {/* SERVICES */}
    <div className="card">
  <h3>Services</h3>

  <ul className="services-list">
    <li>
      <Wrench size={18} className="service-icon" />
      Plumbing
    </li>

    <li>
      <Smartphone size={18} className="service-icon" />
      Access Mobile, Desktop & TV
    </li>

    <li>
      <Database size={18} className="service-icon" />
      Water tank fit
    </li>

    <li>
      <Volume2 size={18} className="service-icon" />
      Audio instal
    </li>

    <li>
      <Settings size={18} className="service-icon" />
      Lockset changir
    </li>

    <li>
      <Droplets size={18} className="service-icon" />
      Pumb cleani
    </li>

    <li>
      <Cable size={18} className="service-icon" />
      Wiring
    </li>
  </ul>
</div>

    {/* REVIEWS */}
   <div className="card">
  <div className="card-header">
    <h3>Reviews</h3>
    <span>SEE ALL</span>
  </div>

  {reviews.map((item, index) => (
    <div key={index} className="review-item">

      <div className="review-avatar">
        <img
          src={item.img}
          alt={item.name}
          className="Williammage"
        />
      </div>

      <div className="review-content">
        <div className="review-top">
          <h4>{item.name}</h4>
          <span className="rating-box">⭐ 4.5</span>
        </div>

        <p className="card-textp">{item.text}</p>

        <div className="review-meta">
          ❤️ 578 <span>2 Weeks Ago</span>
        </div>
      </div>

    </div>
  ))}
</div>

    {/* IMAGES */}
    <div className="card">
      <h3>Images</h3>
      <div className="grid">
        {Array(8).fill().map((_, i) => (
          <div key={i} className="grid-box">
             <img src={Image2} alt="Image2" className="Image2" />
          </div>
        ))}
      </div>
    </div>

    {/* VIDEOS */}
    <div className="card">
      <h3>Videos</h3>
      <div className="grid">
        {Array(8).fill().map((_, i) => (
          <div key={i} className="grid-box video">
             <img src={Video1} alt="Video1" className="Video1" />
          </div>
        ))}
      </div>
    </div>
    

    {/* BOOK BUTTON */}
    <button
        className="book-btn"
        onClick={onNavigateToRequest}
      >
      <span className="book-text">Book service</span>
      <span className="arrow">→</span>
    </button>

  </div>
</div>
  );
}