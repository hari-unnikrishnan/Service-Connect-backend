import React from "react";
import "./App.css";

import profile from "./assets/profile.png";
import offerImage from "./assets/OFFER-removebg-preview.png";
import userprofile from "./assets/user profile.png";
import Fabian from "./assets/Fabian.png";
import George from "./assets/George.png";
import Clara from "./assets/Clara.png";

import {
  Bell,
  Menu,
  Search,
  SlidersHorizontal,
  Grid2x2,
  Smartphone,
  RefreshCw,
  SquareMenu,
  Plus,
  CircleHelp,
  ChevronRight
} from "lucide-react";
export default function Home({ onNavigateToAllCategory }){

  const categories = [
    { name: "Cleaning", image: userprofile },
    { name: "Electrical", image: Clara },
    { name: "Delivery", image: Fabian },
    { name: "Beauty", image: George },
    { name: "Cleaning", image: userprofile },
    { name: "Delivery", image: Fabian },
     { name: "Beauty", image: George },
     { name: "Electrical", image: Clara },
  ];

  const providers = ["Sonja", "Jensen", "Victoria", "Castaldo","Victoria","Jensen","Castaldo","Sonja","Sonja"];

  return (
    <div className="app-shell">
      <div className="phone-frame">

        <header className="top-header">
          <div className="header-left">
            <Menu size={20} />
            <h1>SERVICE CONNECT</h1>
          </div>

          <div className="header-right">
            <Bell size={18} />
            <div className="avatar">
              <img src={profile} alt="profile" />
            </div>
          </div>
        </header>

        <main className="content-area">

          <div className="search-box">
            <div className="search-left">
              <Search size={18} />
              <span>Search for..</span>
            </div>

            <button className="filter-btn">
              <SlidersHorizontal size={16} />
            </button>
          </div>

          <div className="distance-tabs">
            <button className="active">Near By</button>
            <button>10 KM</button>
            <button>All</button>
            <button>km</button>
          </div>

          <div className="offer-banner">
            <img src={offerImage} alt="offer" className="offer-bg" />

            <div className="offer-content">
              <div>
                <p>25% OFF*</p>
                <h2>Today's Special</h2>
                <span>
                  Get a Discount for Every Course Order only Valid for Today!
                </span>
              </div>

              <button>SEE ALL</button>
            </div>
          </div>

          <section>
            <div className="section-title">
              <h3>Services Category</h3>
              <span style={{ color: "#1c2036", cursor: "pointer" }} 
                onClick={onNavigateToAllCategory}>SEE ALL</span>
            </div>

            <div className="category-row">
              {categories.map((item, i) => (
                <div className="category-item" key={i}>
                  <div className="category-circle">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p style={{color: "#1c2036",}}>{item.name}</p>
                </div>
              ))}

              <ChevronRight size={20} />
            </div>
          </section>

          <section>
            <div className="section-title">
              <h3>Popular Services</h3>
              <span>SEE ALL</span>
            </div>

            <div className="service-tabs">
              <button>All</button>
              <button className="active">Plumbing</button>
              <button>Electrical</button>
              <button>Health</button>
            </div>

            <div className="service-scroll">
              {[1, 2,3,4].map((item) => (
                <div className="service-card" key={item}>
                  <div className="service-image"></div>

                  <div className="service-body">
                    <p>Plumbing</p>
                    <h4>Complete Residential Plumbing</h4>

                    <div className="service-meta">
                      <span style={{
                        color: "#1c2036",
                        borderRight: "2px solid #000000",
                      
                        marginRight: "8px"
                      }}>₹100-200</span>
                      <span style={{
                        color: "#1c2036",
                        borderRight: "2px solid #000000",
                      
                        marginRight: "8px"}}>⭐ 4.2</span>
                      <span style={{ color: "#000000" }}>7830 Reviews</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="section-title">
              <h3>Top Service Providers</h3>
              <span>SEE ALL</span>
            </div>

            <div className="provider-row">
              {providers.map((name, i) => (
                <div className="provider-item" key={i}>
                  <div className="provider-avatar"></div>
                  <p style={{color: "#1c2036",}} >{name}</p>
                </div>
              ))}
            </div>
          </section>

        </main>

        <footer className="bottom-nav">
          <Grid2x2 size={18} />
          <Smartphone size={18} />
          <RefreshCw size={18} />
          <SquareMenu size={18} />
          <Plus size={18} />
          <CircleHelp size={18} />
        </footer>

      </div>
    </div>
  );
}