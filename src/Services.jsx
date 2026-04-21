import React, { useState } from "react";
import "./Services.css";
import {
  SlidersHorizontal,
  Search,
  Star,
  Check,
  Grid2x2,Smartphone,RefreshCw,SquareMenu,Plus,CircleHelp
} from "lucide-react";

export default function Services({onNavigateBack,onNavigateToJobses}) {
  const [activeTab, setActiveTab] = useState("completed");

  const services = [
    {
      category: "Graphic Design",
      title: "Graphic Design Advanced",
      rating: 4.2
    },
    {
      category: "Graphic Design",
      title: "Advance Diploma in Graphic Design",
      rating: 4.7
    },
    {
      category: "Digital Marketing",
      title: "Setup your Graphic Design",
      rating: 4.2
    },
    {
      category: "Web Development",
      title: "Web Developer concepts",
      rating: 4.7
    }
  ];

  return (
    <div className="services-page">
      <div className="services-container">

        {/* HEADER */}
        <div className="services-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>

          <h2>SERVICES</h2>

          <div className="header-icons">
            <SlidersHorizontal size={18} />
            <Search size={18} />
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          <button
            className={activeTab === "ongoing" ? "active" : ""}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing
          </button>

          <button
            className={activeTab === "completed" ? "active" : ""}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>

        {/* LIST */}
        {services.map((item, i) => (
          <div className="service-cards" key={i}>

            {/* IMAGE */}
            <div className="thumb"></div>

            {/* CONTENT */}
            <div className="content">
              <span className="category">{item.category}</span>

              <h4>{item.title}</h4>

              <div className="rating">
                <Star size={14} fill="#f5a623" color="#f5a623" />
                <span>{item.rating}</span>
              </div>
            </div>

            {/* COMPLETED ICON */}
            {activeTab === "completed" && (
              <div className="check" onClick={onNavigateToJobses}>
                <Check size={14} />
              </div>
            )}

          </div>
        ))}

        {/* BOTTOM NAV */}
        <div className="bottom-icon">
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