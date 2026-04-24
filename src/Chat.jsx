import React, { useState } from "react";
import "./Chat.css";
import { ArrowLeft, SlidersHorizontal, Search, Phone } from "lucide-react";

export default function Chat({ onNavigateBack, onNavigateToChatDetails }) {
  const [activeTab, setActiveTab] = useState("chat");

  // CHAT DATA
  const chats = [
    {
      name: "Virginia M. Patterson",
      msg: "Hi, Good Evening Bro.!",
      time: "14:59",
      unread: 3
    },
    {
      name: "Dominick S. Jenkins",
      msg: "I Just Finished It.!",
      time: "06:35",
      unread: 2
    },
    {
      name: "Duncan E. Hoffman",
      msg: "How are you?",
      time: "08:10"
    },
    {
      name: "Roy R. McCraney",
      msg: "OMG, This is Amazing..",
      time: "21:07",
      unread: 5
    },
    {
      name: "Janice R. Norris",
      msg: "Wow, This is Really Epic",
      time: "09:15"
    }
  ];

  // CALL DATA
  const calls = [
    {
      id: 1,
      name: "Patricia D. Regalado",
      type: "incoming",
      date: "Nov 03, 202X"
    },
    {
      id: 2,
      name: "Jonathon K. Nix",
      type: "incoming",
      date: "Nov 05, 202X"
    },
    {
      id: 3,
      name: "Ellen N. Cranford",
      type: "outgoing",
      date: "Nov 06, 202X"
    },
    {
      id: 4,
      name: "William W. Spicer",
      type: "missed",
      date: "Nov 15, 202X"
    },
     {
      id: 5,
      name: "Scott D. Chambers",
      type: "outgoing",
      date: "Nov 17, 202X"
    }, {
      id: 6,
      name: "Hilda M. Hernandez",
      type: "missed",
      date: "Nov 18, 202X"
    },
    {
      id: 7,
      name: "Wanda T. Seidl",
      type: "incoming",
      date: "Nov 21, 202X"
    },
  ];

  return (
    <div className="chat-page">

      {/* HEADER */}
      <div className="chat-header">
        <button className="back-btn" onClick={onNavigateBack}>
           &#8249;
        </button>

        <h2>CHAT</h2>

        <div className="header-icons">
          <SlidersHorizontal size={18} />
          <Search size={18} />
        </div>
      </div>

      {/* TABS */}
      <div className="chat-tabs">
        <div
          className={`tab ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </div>

        <div
          className={`tab ${activeTab === "call" ? "active" : ""}`}
          onClick={() => setActiveTab("call")}
        >
          Call
        </div>
      </div>

      {/* LIST */}
      <div className="chat-list">

        {/* CHAT LIST */}
        {activeTab === "chat" &&
          chats.map((item, i) => (
            <div
              key={i}
              className="chat-item"
              onClick={onNavigateToChatDetails}
            >
              <div className="avatar"></div>

              <div className="chat-content">
                <h4>{item.name}</h4>
                <p>{item.msg}</p>
              </div>

              <div className="chat-right">
                {item.unread && (
                  <div className="badge">
                    {item.unread.toString().padStart(2, "0")}
                  </div>
                )}
                <span className="time">{item.time}</span>
              </div>
            </div>
          ))}

        {/* CALL LIST */}
        {activeTab === "call" &&
          calls.map((call) => (
            <div key={call.id} className="call-card">

              {/* LEFT */}
              <div className="call-left">
                <div className="avatar"></div>

                <div className="call-info">
                  <h4>{call.name}</h4>

                  <div className="call-meta">
                    <span className={`status-icon ${call.type}`}>
                      {call.type === "incoming" && "+"}
                      {call.type === "outgoing" && "−"}
                      {call.type === "missed" && "×"}
                    </span>

                    <span className={`call-text ${call.type}`}>
                      {call.type.charAt(0).toUpperCase() + call.type.slice(1)}
                    </span>

                    <span className="divider">|</span>

                    <span className="date">{call.date}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT ICON */}
              <div className="call-icon">
                <Phone size={20} />
              </div>

            </div>
          ))}

      </div>

    </div>
  );
}