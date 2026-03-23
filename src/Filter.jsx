import React, { useState } from "react";
import "./Filter.css";
import { ArrowLeft } from "lucide-react";

export default function Filter({ onNavigateToCakeDelivery }) {
  const [selected, setSelected] = useState({});

  const toggle = (key) => {
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearAll = () => {
    setSelected({});
  };

  const subCategories = [
    "xxxxxxxxxxxxxxxx",
    "xxxxxxxxxxxx",
    "xxxxxxxxxx",
    "xxxxxxxxxxxx",
    "xxxxxxxxxxxxxxxx",
    "xxxxxxxxxxxxxxxxxx",
  ];

  const otherCategory1 = [
    "Alxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xxxxxxxxxxxx",
    "xxxxxxxxxxxx ",
    "xxxxxxxxxxxxx",
  ];

  const price = ["Paid", "Free"];

  const otherCategory = [
    "All xxxxxx",
    "xxxxxxxx",
    "xxxxxxxx Exercise",
    "xxxxxxxxxxxx x",
  ];

  const rating = [
    "4.5 & Up Above",
    "4.0 & Up Above",
    "3.5 & Up Above",
    "3.0 & Up Above",
  ];

  const duration = [
    "0-2 Hours",
    "3-6 Hours",
    "7-16 Hours",
    "17+ Hours",
  ];

  const Checkbox = ({ label, id }) => (
    <div className="filter-item" onClick={() => toggle(id)}>
      <div className={`checkbox ${selected[id] ? "active" : ""}`}>
        {selected[id] && "✓"}
      </div>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="filter-page">
      <div className="filter-container">
        
        <header className="filter-header">
          <button className="back-btnzz" onClick={onNavigateToCakeDelivery }>
            <ArrowLeft size={28} />
          </button>
          <h1>FILTER</h1>
          <span className="clear-btn" onClick={clearAll}>Clear</span>
        </header>

        <div className="filter-section">
          <h3>SubCategories:</h3>
          {subCategories.map((item, i) => (
            <Checkbox key={i} id={`sub${i}`} label={item} />
          ))}
        </div>

        <div className="filter-section">
          <h3>xxxxxx</h3>
          {otherCategory1.map((item, i) => (
            <Checkbox key={i} id={`other${i}`} label={item} />
          ))}
        </div>

        <div className="filter-section">
          <h3>Price:</h3>
          {price.map((item, i) => (
            <Checkbox key={i} id={`price${i}`} label={item} />
          ))}
        </div>

         <div className="filter-section">
          <h3>xxxxxx</h3>
          {otherCategory.map((item, i) => (
            <Checkbox key={i} id={`other${i}`} label={item} />
          ))}
        </div>

        <div className="filter-section">
          <h3>Rating:</h3>
          {rating.map((item, i) => (
            <Checkbox key={i} id={`rating${i}`} label={item} />
          ))}
        </div>

        <div className="filter-section">
          <h3>Duration:</h3>
          {duration.map((item, i) => (
            <Checkbox key={i} id={`duration${i}`} label={item} />
          ))}
        </div>

        <button className="apply-btn" onClick={onNavigateToCakeDelivery}>Apply</button>

      </div>
    </div>
  );
}