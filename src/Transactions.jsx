import React from "react";
import "./Transactions.css";
import {
  ArrowLeft,
  SlidersHorizontal,
  Search,
  Grid2x2,
  Smartphone,
  RefreshCw,
  SquareMenu,
  Plus,
  CircleHelp
} from "lucide-react";

export default function Transactions({onNavigateBack,onNavigateToServices}) {

  const transactions = [1,2,3,4,5,6];

  return (
    <div className="transactions-page">
      <div className="transactions-container">

        {/* HEADER */}
        <div className="tr-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>

          <h2>TRANSACTIONS</h2>

          <div className="header-icons">
            <SlidersHorizontal size={18} />
            <Search size={18} />
          </div>
        </div>

        {/* LIST */}
        {transactions.map((item, i) => (
          <div className="transaction-card" key={i}>

            <div className="thumb"></div>

            <div className="info">
              <h4>Build Personal Branding</h4>
              <p>Web Designer</p>
              <span className="paid"  onClick={onNavigateToServices}>Paid</span>
            </div>

          </div>
        ))}

        {/* BOTTOM NAV */}
        <div className="bottom-navu">
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