import React from "react";
import "./Friends.css";
import { ArrowLeft, SlidersHorizontal, Search } from "lucide-react";

export default function InviteFriends({ onNavigateBack }) {

  const users = [
    { name: "Virginia M. Patterson", phone: "(+1) 702-897-7965", active: true },
    { name: "Dominick S. Jenkins", phone: "(+1) 702-897-7965", active: true },
    { name: "Duncan E. Hoffman", phone: "(+1) 727-688-4052", active: false },
    { name: "Roy R. McCraney", phone: "(+1) 601-897-1714", active: true },
    { name: "Janice R. Norris", phone: "(+1) 802-312-3206", active: false }
  ];

  return (
    <div className="invite">

      {/* HEADER */}
      <header className="invite__header">
        <button className="invite__back" onClick={onNavigateBack}>
          <ArrowLeft size={18} />
        </button>

        <h2 className="invite__title">INVITE FRIEND</h2>

        <div className="invite__actions">
          <div className="invite__icon">
            <SlidersHorizontal size={16} />
          </div>
          <div className="invite__icon">
            <Search size={16} />
          </div>
        </div>
      </header>

      {/* LIST CARD */}
      <div className="invite__card">
        {users.map((user, i) => (
          <div key={i} className="invite__item">

            <div className="invite__avatar"></div>

            <div className="invite__info">
              <h4 className="invite__name">{user.name}</h4>
              <p className="invite__phone">{user.phone}</p>
            </div>

            <button className={`invite__btn ${user.active ? "invite__btn--dark" : "invite__btn--light"}`}>
              Invite
            </button>

          </div>
        ))}
      </div>

      {/* SHARE */}
      <div className="invite__share">
        <h3 className="invite__share-title">Share Invite Via</h3>

        <div className="invite__socials">
          <div className="invite__social invite__social--fb">f</div>
          <div className="invite__social invite__social--tw">t</div>
          <div className="invite__social invite__social--gp">G+</div>
          <div className="invite__social invite__social--wa">w</div>
        </div>
      </div>

    </div>
  );
}