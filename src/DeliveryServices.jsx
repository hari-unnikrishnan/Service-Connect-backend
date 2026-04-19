import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Grid2x2, Smartphone, RefreshCw, SquareMenu, Plus, CircleHelp, RotateCcw } from 'lucide-react';
import "./Delivery Services.css";
import DeliveryServicesImg from "./assets/DELIVERY SERVICES-2.png";
import { getDeliveryServices } from "./api";

// Fallback services
const fallbackServices = [
  { name: 'BOUQUET DELIVERY', img: DeliveryServicesImg },
  { name: 'CAKE DELIVERY', img: DeliveryServicesImg },
  { name: 'DRIVER', img: DeliveryServicesImg },
  { name: 'PACKERS & MOVERS', img: DeliveryServicesImg },
  { name: 'PICK UP & DELIVERY', img: DeliveryServicesImg },
];

export default function DeliveryServicesUI({
  
  onNavigateToAllCategories,
  onNavigateToSearch,
  onNavigateToCakeDelivery,
  
}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getDeliveryServices();
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        } else {
          setServices(fallbackServices);
        }
      } catch (error) {
        console.error("Error fetching delivery services:", error);
        setServices(fallbackServices);
      }
    };
    
    fetchServices();
  }, []);

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="delivery-page">
      {/* Header */}
      <div className="delivery-header">
        <div className="header-left">
          <button className="back-btn" onClick={onNavigateToAllCategories}>
            &#8249;
          </button>
          <h1 className="header-title">DELIVERY SERVICES</h1>
        </div>
        <div className="header-right">
          <SlidersHorizontal size={16} />
        <Search size={18}   onClick={onNavigateToSearch}
                    style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* Service Grid */}
      <div className="service-grid">
  {displayServices.map((item, index) => (
    <div
      className="service-card"
      key={index}
      onClick={() => {
        if (item.name === 'CAKE DELIVERY') {
          onNavigateToCakeDelivery()
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <img
        src={item.image || DeliveryServicesImg}
        alt={item.name}
        className="service-img"
      />
      <p>{item.name}</p>
    </div>
  ))}
</div>
      {/* <div className="service-grid">
        {displayServices.map((item, index) => (
          <div className="service-card" key={index}>
            <img src={item.image || DeliveryServicesImg} alt={item.name} className="service-img" />
            <p>{item.name}</p>
          </div>
        ))}
      </div> */}

      {/* Bottom Navigation */}
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
