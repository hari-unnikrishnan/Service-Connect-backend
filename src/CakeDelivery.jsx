import React from "react";
import "./CakeDelivery.css";
import {
  ArrowLeft,
  SlidersHorizontal,
  Search,
  MapPin,
  Pencil,
  Bookmark,
  Grid2x2,
  Smartphone,
  RefreshCw,
  SquareMenu,
  Plus,
  CircleHelp
} from "lucide-react";

export default function CakeDelivery({
  onNavigateToDeliveryServices,
  onNavigateToSearch,
  onNavigateToFilter,
  onNavigateToProfile
}) {

  // ✅ FIXED providers array
  const providers = [
    {
      name: "Thomas",
      distance: "3 km away",
      price: "₹280 - 300",
      rating: "4.2",
      reviews: "78 reviews",
      action: "profile"
    },
    {
      name: "Jacop",
      distance: "4 km away",
      price: "₹280 - 300",
      rating: "3.9",
      reviews: "12 reviews"
    },
    {
      name: "Thomas",
      distance: "3 km away",
      price: "₹280 - 300",
      rating: "4.2",
      reviews: "78 reviews"
    },
    {
      name: "Thomas",
      distance: "3 km away",
      price: "₹280 - 300",
      rating: "4.2",
      reviews: "78 reviews"
    }
  ];

  return (
    <div className="cake-page">
      <div className="cake-phone">

        {/* Header */}
        <header className="cake-header">
          <div className="cake-left">
            <button
              className="back-btn"
              onClick={onNavigateToDeliveryServices}
            >
              &#8249;
            </button>
            <h1>CAKE DELIVERY</h1>
          </div>

          <div className="cake-right">
            <SlidersHorizontal
              size={16}
              onClick={onNavigateToFilter}
              style={{ cursor: "pointer" }}
            />
            <Search
              size={18}
              onClick={onNavigateToSearch}
              style={{ cursor: "pointer" }}
            />
          </div>
        </header>

        {/* Location */}
        <div className="location-row">
          <MapPin size={20} />
          <span>[Location name]</span>
          <Pencil size={18} />
        </div>

        {/* Request Button */}
        <button className="open-request-btn">
          Open Request (Request to Random Accounts)
        </button>

        {/* Filter */}
        <div className="distance-filter">
          <button className="active">Near By</button>
          <button>10 KM</button>
          <button>All</button>
        </div>

        {/* Providers */}
        <div className="provider-list">
          {providers.map((item, i) => (
            <div
              className="provider-card"
              key={i}
              onClick={() => {
                // ✅ Navigation logic
                if (item.action === "profile") {
                  onNavigateToProfile();
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="provider-image"></div>

              <div className="provider-info">
                <p className="distance">{item.distance}</p>
                <h3>{item.name}</h3>
                <h2>{item.price}</h2>

                <div className="provider-meta">
                  <span>⭐ {item.rating}</span>
                  <span>|</span>
                  <span>{item.reviews}</span>
                </div>
              </div>

              <div className="bookmark-box">
                <Bookmark size={22} />
                <span>Booked Ones</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <footer className="cake-bottom-nav">
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