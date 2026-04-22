import React from "react";
import "./Notifications.css";
import {
  ArrowLeft,
  Grid,
  CreditCard,
  Ticket,
  User
} from "lucide-react";

export default function Noti({ onNavigateBack }) {
  return (
    <div className="notify-page">

      {/* HEADER */}
      <div className="notify-header">
        <button className="back-btn" onClick={onNavigateBack}>
          &#8249;
        </button>
        <h2>NOTIFICATIONS</h2>
      </div>

      {/* CONTENT */}
      <div className="notify-content">

        {/* TODAY */}
        <h3>Today</h3>

        <NotificationCard
          icon={<Grid size={22} />}
          title="New Category Course.!"
          desc="New the 3D Design Course is Availa.."
        />

        <NotificationCard
          dark
          icon={<CreditCard size={22} />}
          title="New Category Course.!"
          desc="New the 3D Design Course is Availa.."
        />

        <NotificationCard
          icon={<Ticket size={22} />}
          title="Today’s Special Offers"
          desc="You Have made a Coure Payment."
        />

        {/* YESTERDAY */}
        <h3>Yesterday</h3>

        <NotificationCard
          icon={<CreditCard size={22} />}
          title="Credit Card Connected.!"
          desc="Credit Card has been Linked.!"
        />

        {/* DATE */}
        <h3>Nov 20, 2022</h3>

        <NotificationCard
          icon={<User size={22} />}
          title="Account Setup Successful.!"
          desc="Your Account has been Created."
        />

      </div>
    </div>
  );
}


/* REUSABLE CARD */
function NotificationCard({ icon, title, desc, dark }) {
  return (
    <div className="notify-card">

      <div className={`icon-box ${dark ? "dark" : ""}`}>
        {icon}
      </div>

      <div className="text">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>

    </div>
  );
}