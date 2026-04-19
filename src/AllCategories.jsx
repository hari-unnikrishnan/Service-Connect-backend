import React, { useState, useEffect } from 'react';
import './All Category.css';
import { Search, SlidersHorizontal, Grid2x2, Smartphone, RefreshCw, SquareMenu, Plus, CircleHelp, RotateCcw } from 'lucide-react';
import { getCategories } from './api';

import ALL from "./assets/all.png";
import DELIVERYSERVICES from "./assets/DELIVERY SERVICES.png";
import HOMEAPPLIANCEREPAIR from "./assets/HOME APPLIANCE REPAIR.png";
import LAUNDRYSERVICE from "./assets/LAUNDRY SERVICE.png";
import BUSINESSSERVICES from "./assets/BUSINESS SERVICES.png";
import EVENTSANDPARTYS from "./assets/EVENTS AND PARTYS.png";
import CLEANINGSERVICE from "./assets/CLEANING SERVICE.png";
import ELECTRONICSREPAIR from "./assets/ELECTRONICS REPAIR.png";
import TECHNOLOGYSERVICES from "./assets/TECHNOLOGY SERVICES.png";
import HEALTHANDFITNESS from "./assets/HEALTH AND FITNESS.png";
import BEAUTYSERVICES  from "./assets/BEAUTY SERVICES.png";

// Map category names to images
const categoryImages = {
  'ALL': ALL,
  'DELIVERY SERVICES': DELIVERYSERVICES,
  'HOME APPLIANCE REPAIR': HOMEAPPLIANCEREPAIR,
  'LAUNDRY SERVICE': LAUNDRYSERVICE,
  'BUSINESS SERVICES': BUSINESSSERVICES,
  'EVENTS AND PARTYS': EVENTSANDPARTYS,
  'CLEANING SERVICE': CLEANINGSERVICE,
  'ELECTRONICS REPAIR': ELECTRONICSREPAIR,
  'TECHNOLOGY SERVICES': TECHNOLOGYSERVICES,
  'HEALTH AND FITNESS': HEALTHANDFITNESS,
  'BEAUTY SERVICES': BEAUTYSERVICES
};

export default function AllCategoryUI({ onNavigateToHome, onNavigateToDeliveryServices }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Add "ALL" option at the beginning
        const allOption = { id: 0, name: 'ALL', image: ALL };
        const fetchedCategories = data.map(cat => ({
          ...cat,
          image: categoryImages[cat.name.toUpperCase()] || ALL
        }));
        setCategories([allOption, ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Use fallback data
        setCategories([
          { name: 'ALL', img: ALL },
          { name: 'DELIVERY SERVICES', img: DELIVERYSERVICES, onClick: onNavigateToDeliveryServices },
          { name: 'HOME APPLIANCE REPAIR', img: HOMEAPPLIANCEREPAIR },
          { name: 'LAUNDRY SERVICE', img: LAUNDRYSERVICE },
          { name: 'BUSINESS SERVICES', img: BUSINESSSERVICES },
          { name: 'EVENTS AND PARTYS', img: EVENTSANDPARTYS },
          { name: 'CLEANING SERVICE', img: CLEANINGSERVICE },
          { name: 'ELECTRONICS REPAIR', img: ELECTRONICSREPAIR },
          { name: 'TECHNOLOGY SERVICES', img: TECHNOLOGYSERVICES },
          { name: 'HEALTH AND FITNESS', img: HEALTHANDFITNESS },
          { name: 'BEAUTY SERVICES', img: BEAUTYSERVICES}
        ]);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      <div className="category-header">
        <button  className="back-btn" onClick={onNavigateToHome}>
          &#8249;
        </button>
        <h2>All Categories</h2>
        <div className="category-header-right">
          <SlidersHorizontal size={16} />
          <Search size={18} />
        </div>
      </div>
      <div className="category-grid">
        {categories.map((item, index) => {
          const image = item.img || item.image || ALL;
          const name = item.name || item.name;
          const onClick = item.onClick || (name === 'DELIVERY SERVICES' ? onNavigateToDeliveryServices : undefined);
          return (
            <div className="category-card" key={index} onClick={onClick}>
              <img src={image} alt={name} className="category-img" />
              <p>{name}</p>
            </div>
          );
        })}
      </div>
      <footer className="bottom-nav">
        <Grid2x2 size={18} />
        <Smartphone size={18} />
        <RefreshCw size={18} />
        <SquareMenu size={18} />
        <Plus size={20} />
        <CircleHelp size={20} />
      </footer>
    </div>
  );
}
