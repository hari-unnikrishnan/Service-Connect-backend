import React, { useState } from "react";
import "./HelpCenter.css";
import {
  ArrowLeft,
  SlidersHorizontal,
  Search,
  ChevronDown,
   Headphones,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";

export default function HelpCenter({ onNavigateBack }) {
  const [activeTab, setActiveTab] = useState("faq");
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ["General", "Account", "Payment", "Service"];

  const faqs = [
    {
      q: "How do I manage my notifications?",
      a: 'To manage notifications, go to "Settings", select "Notification Settings", and customize your preferences.'
    },
    {
      q: "How do I start a guided meditation session?",
      a: "Go to Services → Meditation → Start session."
    },
    {
      q: "How do I join a support group?",
      a: "Navigate to Community → Groups → Join."
    },
    {
      q: "How do I manage my notifications?",
      a: "You can update notification settings from your profile."
    },
    {
      q: "Is my data safe and private?",
      a: "Yes, we use secure encryption and privacy policies."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="help-page">

      {/* HEADER */}
      <div className="help-header">
        <button className="back-btn" onClick={onNavigateBack}>
          &#8249;
        </button>

        <h2>HELP CENTER</h2>

        <div className="header-icons">
          <SlidersHorizontal size={18} />
          <Search size={18} />
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          faqFAQ
        </div>

        <div
          className={`tab ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          CONTACT US
        </div>
      </div>

       {/* CONTACT TAB */}
      {activeTab === "contact" && (
      
             <>
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ LIST */}
          <div className="faq-list">
            {faqs.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${
                  openIndex === i ? "open" : ""
                }`}
                onClick={() => toggleFAQ(i)}
              >
                <div className="faq-q">
                  <span className="faq-qp">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={openIndex === i ? "rotate" : ""}
                  />
                </div>

                {openIndex === i && (
                  <div className="faq-a">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* CATEGORY FILTER */}
      {activeTab === "faq" && (
          <div className="help-container">

            {/* CONTACT OPTIONS */}
            <div className="contact-list">
                 <div className="contact-item">
                    <Headphones size={22} />
                    <span>Customer Services</span>
                </div>

                <div className="contact-item">
                    <MessageCircle size={22} />
                    <span>WhatsApp</span>
                </div>

                <div className="contact-item">
                    <Facebook size={22} />
                    <span>Facebook</span>
                </div>

                <div className="contact-item">
                    <Twitter size={22} />
                    <span>Twitter</span>
                </div>

                <div className="contact-item">
                    <Instagram size={22} />
                    <span>Instagram</span>
                </div>
            </div>

           

            </div>
      )}

     
    </div>
  );
}